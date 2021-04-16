import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';
import { badRequestError } from '../utils/errors';
import { getValidationStatusByAccountId } from '../utils/database/database';


export const check = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  const params = event.queryStringParameters || {};
  let accountId: string;

  if (params.accountId) {
    accountId = params.accountId;
  } else {
    return badRequestError;
  }

  logger.info(`Getting validation status for ${accountId}`);
  const validationStatus = await getValidationStatusByAccountId(accountId);

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: 'For now you cannot check your status hehe',
  };
};
