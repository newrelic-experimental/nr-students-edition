import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { GithubCredentials, StateAndCode, StudentResponse, StudentResponseGithub, TokenEntity } from '../types/github';
import { badRequestError, githubApiError, recordNotFound } from '../utils/errors';
import { getDataFromState, saveAccessToken } from '../utils/database/database';
import { State } from '../types/database';
import { config } from '../config';
import { sendPostRequest, sendGetRequest } from '../utils/http/request';

export const getUserData = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info(`Getting user data from Github`);

  const params = event.queryStringParameters || {};
  const stateAndCode: StateAndCode = {};
  let data: any;
  let userData: StudentResponseGithub;

  if (params.state && params.code) {
    stateAndCode.state = params.state;
    stateAndCode.code = params.code;
  } else {
    return badRequestError;
  }

  const stateFromDB = await getDataFromState(stateAndCode.state) as State;
  if (stateFromDB === undefined) {
    return recordNotFound;
  }

  const body: GithubCredentials = {
    client_id: config.GITHUB_CLIENT_ID,
    client_secret: config.GITHUB_SECRET,
    code: stateAndCode.code
  };
  try {
    const data = await sendPostRequest(config.GITHUB_ACCESS_TOKEN_URL, body);
    logger.info(`Obtained access token...`);

    userData = await sendGetRequest(config.GITHUB_USER_DATA_URL, data.data.access_token) as StudentResponseGithub;
    logger.info(`Obtained user data...`);
  } catch (error) {
    logger.info(`Something went wrong with Github API: ${error.message}`);
    return githubApiError;
  }

  if (userData.student) {
    logger.info('Saving access token to the database...');

    await saveAccessToken(
      {
        account_id: stateFromDB.records[0].account_id,
        access_token: data.data.access_token
      } as TokenEntity
    );

    logger.info('Saved access token to the database...');
  }

  const response: StudentResponse = {
    account_id: stateFromDB.records[0].account_id,
    student: userData.student
  };

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
