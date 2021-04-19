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
  const validationHistory = await getValidationStatusByAccountId(accountId);
  logger.info(`ValidationStatus: ${JSON.stringify(validationHistory)}`);

  if (validationHistory.records.length === 0) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 204,
      body: ''
    };
  }

  const { validation_status } = validationHistory.records[0];

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(validation_status)
  };
};
