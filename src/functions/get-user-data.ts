import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { GithubCredentials, StateAndCode, StudentResponseGithub, TokenEntity } from '../types/github';
import { badRequestError, recordNotFound } from '../utils/errors';
import { getDataFromState, saveAccessToken, saveValidationAttempt } from '../utils/database/database';
import { State } from '../types/database';
import { config } from '../config';
import { sendPostRequest, sendGetRequest } from '../utils/http/request';
import { StudentDTO, StudentEntity, ValidationStatus } from '../types/person';

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

  logger.info(`STATE FROM DB: ${JSON.stringify(stateFromDB)}`);

  const body: GithubCredentials = {
    client_id: config.GITHUB_CLIENT_ID,
    client_secret: config.GITHUB_SECRET,
    code: stateAndCode.code
  };


  const {data: {access_token}} = await sendPostRequest(config.GITHUB_ACCESS_TOKEN_URL, body);
  logger.info(`Obtained access token...`);

  logger.info(`Access token ${access_token}`);

  const userData = await sendGetRequest(config.GITHUB_USER_DATA_URL,access_token) as StudentResponseGithub;
  logger.info(`Obtained user data...`);

  logger.info(`USER DATA: ${userData}`);

  if (userData.student) {
    logger.info('Saving access token to the database...');

    await saveAccessToken(
      {
        account_id: stateFromDB.records[0].account_id,
        access_token: access_token
      } as TokenEntity
    );

    const preStudentData: StudentDTO = {
      accountId: stateFromDB.records[0].account_id,
      validationStatus: ValidationStatus.ongoingValidation
    };

    await saveValidationAttempt(preStudentData);

    logger.info('Saved access token to the database...');
  } else {
    logger.info('Ineligible student');

    const preStudentData: StudentEntity = {
      account_id: stateFromDB.records[0].account_id,
      validation_status: ValidationStatus.ineligible.toString()
    };

    await saveValidationAttempt(preStudentData);

    logger.info('Saved access token to the database...');
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Location': stateFromDB.records[0].redirect_to
    },
    statusCode: 302,
    body: ''
  };
};
