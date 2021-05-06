import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { GithubCredentials, StateAndCode, StudentResponse, StudentResponseGithub, TokenEntity } from '../types/github';
import { badRequestError, recordNotFound } from '../utils/errors';
import { getDataFromState, saveAccessToken } from '../utils/database/database';
import { State } from '../types/database';
import { sendGetRequest } from '../utils/http/request';
import { config } from '../config';
import axios, { AxiosResponse } from 'axios';

export const getUserData = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info(`Getting user data from Github`);

  const params = event.queryStringParameters || {};
  const stateAndCode: StateAndCode = {};

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

  const data: AxiosResponse<{access_token: string}> = await axios(config.GITHUB_ACCESS_TOKEN_URL, {
    headers: {
      'Accept': 'application/json'
    },
    data: body,
    method: 'POST'
  });

  logger.info(`Obtained access token...`);

  const userData = await sendGetRequest(config.GITHUB_USER_DATA_URL, data.data.access_token) as StudentResponseGithub;

  logger.info(`Is a student: ${JSON.stringify(userData)}`);

  if (userData.student) {
    await saveAccessToken(
      {
        account_id: stateFromDB.records[0].account_id,
        access_token: data.data.access_token
      } as TokenEntity
    );
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
