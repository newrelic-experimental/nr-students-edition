import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { badRequestError, internalLambdaError } from '../utils/errors';
import { deleteValidationAttempt } from '../utils/database/database';
import StatusCode from 'http-status-codes';


export const deleteOnCancel = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Delete user with ongoing validation status on cancel event');

  const params = event.queryStringParameters || {};
  let accountId: string;

  if (params.accountId ) {
    accountId = params.accountId;
  } else {
    logger.warn('Bad request provided');
    return badRequestError;
  }

  try {
    logger.info('Removing validation attempt...');
    await deleteValidationAttempt(accountId);
    logger.info('Deleted the attempt');
  } catch (error) {
    logger.error('Something wrong...');
    logger.error(error.message);

    return internalLambdaError;
  }

  logger.info('Finishing the operation...');

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: StatusCode.OK,
    body: ''
  };
};
