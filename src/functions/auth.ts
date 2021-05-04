import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from 'aws-lambda/handler';
import { LambdaResponse } from "../types/response";
import { Logger } from "../utils/logger";
import { StateEntity } from '../types/state';
import { ValidationError } from "myzod";
import { badRequestError, internalLambdaError } from "../utils/errors";
import { generateState } from "../utils/generators/state-generator";
import { saveState } from '../utils/database/database';
import { config } from '../config';


const STATE_SIZE = 32;


export const authGithub = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  const params = event.queryStringParameters || {};
  let accountId: string;
  logger.info('Authentication with Github - redirect lambda');

  if (params.accountId) {
    accountId = params.accountId;
  } else {
    return badRequestError;
  }

  const state = generateState(STATE_SIZE);
  let location = '';

  try {
    const stateEntity: StateEntity = {
      account_id: accountId,
      state: state
    };

    await saveState(stateEntity);

    location = config.GITHUB_URL.concat(state);

  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error(`Validation error: ${error.message}`);

      return badRequestError;
    }

    logger.error(`Something went wrong: ${error.message}`);
    return internalLambdaError;
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': 'newrelic.com',
      'Location': location
    },
    statusCode: 302,
    body: ''
  };
};
