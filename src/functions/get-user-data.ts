import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { GithubCredentials, StateAndCode, StudentResponseGithub, TokenEntity } from '../types/github';
import { badRequestError, handleGithubCancel, recordNotFound } from '../utils/errors';
import { getDataFromState, saveAccessToken, saveValidationAttempt } from '../utils/database/database';
import { State } from '../types/database';
import { config } from '../config';
import { sendPostRequest, sendGetRequest, sendGetRequestWithToken } from '../utils/http/request';
import { StudentDTO, ValidationStatus } from '../types/person';

export const getUserData = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info(`Getting user data from Github`);

  const params = event.queryStringParameters || {};
  const stateAndCode: StateAndCode = {};

  if (params.state && params.error) {
    const stateFromDB = await getDataFromState(params.state) as State;
    return handleGithubCancel(stateFromDB.records[0].redirect_to);
  }

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

  const accountType = stateFromDB.records[0].account_type;

  logger.info('Obtained state data from database...');

  const body: GithubCredentials = {
    client_id: config.GITHUB_CLIENT_ID,
    client_secret: config.GITHUB_SECRET,
    code: stateAndCode.code
  };

  const {data: {access_token}} = await sendPostRequest(config.GITHUB_ACCESS_TOKEN_URL, body);
  logger.info(`Obtained access token...`);

  const userData = await sendGetRequest(config.GITHUB_USER_DATA_URL, access_token) as StudentResponseGithub;
  logger.info(`Obtained user data...`);

  if ((accountType === 'student' && userData.student) || (accountType === 'teacher' && userData.faculty)) {
    logger.info('Saving access token to the database...');

    logger.info('Getting github id...');
    const { id } = await sendGetRequestWithToken(config.GITHUB_API_USER_URL, access_token);
    logger.info('Obtained github id...');

    await saveAccessToken(
      {
        account_id: stateFromDB.records[0].account_id,
        access_token: access_token
      } as TokenEntity
    );

    const preStudentData: StudentDTO = {
      accountId: stateFromDB.records[0].account_id,
      githubId: id,
      validationStatus: ValidationStatus.ongoingValidation,
      accountType: accountType
    };

    logger.info(JSON.stringify(preStudentData));

    try {
      await saveValidationAttempt(preStudentData);
    } catch (error) {
      logger.error(error.message);

      const preStudentData: StudentDTO = {
        accountId: stateFromDB.records[0].account_id,
        validationStatus: ValidationStatus.ineligibleGithubAccountAlreadyUsed,
        accountType: accountType
      };

      logger.error('Pre Student Data on error ' + JSON.stringify(preStudentData));

      await saveValidationAttempt(preStudentData);

      logger.info('Account already exists');
    }

    logger.info('Saved access token to the database...');
  } else {
    logger.info('Ineligible user');

    const preStudentData: StudentDTO = {
      accountId: stateFromDB.records[0].account_id,
      validationStatus: ValidationStatus.ineligible,
      accountType: accountType
    };

    logger.info('Before save on else');

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
