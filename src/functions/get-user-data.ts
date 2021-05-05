import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { StateAndCode } from '../types/github';
import { badRequestError, recordNotFound } from '../utils/errors';
import { getDataFromState } from '../utils/database/database';
import { State } from '../types/database';
import { sendGetRequest, sendPostRequest } from '../utils/http/request';
import { config } from '../config';

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
  if (stateFromDB !== undefined) {
    return recordNotFound;
  }

  logger.info(`Get data from state: account_id: (${stateFromDB.records[0].account_id}), state: (${stateFromDB.records[0].state})`);

  const url = 'https://github.com/login/oauth/access_token';
  const accessToken = await sendPostRequest(url, {
    clientId: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_SECRET,
    code: stateAndCode.code
  });

  logger.info(`Access Token: ${JSON.stringify(accessToken)}`);

  const userDataUrl = 'https://education.github.com/api/user';
  const userData = await sendGetRequest(userDataUrl, accessToken as string);

  logger.info(`User data: ${JSON.stringify(userData)}`);

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: ''
  };
};
