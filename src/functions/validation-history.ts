import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from 'aws-lambda/handler';
import { LambdaResponse } from "../types/response";
import StatusCode from 'http-status-codes';
import { Logger } from "../utils/logger";
import { badRequestError } from "../utils/errors";
import { ValidationHistoryRequest } from "../types/validation-history";
import { checkValidColumnName } from "../utils/database/sql";

export const getValidationHistory = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Getting validation history...');

  const params = event.queryStringParameters || {};
  logger.info(`Obtained parameters: ${JSON.stringify(params)}`);

  logger.info('Checking if required account id is provided...');
  if (!params.accountId) {
    return badRequestError;
  }

  try {
    const validationHistory: ValidationHistoryRequest = {
      accountId: params.accountId,
      startDate: new Date(params.startDate),
      endDate: new Date(params.endDate),
      orderAsc: (params.orderAsc === 'true' ? true : false),
      orderBy: params.orderBy,
      limit: Number(params.limit),
      offset: Number(params.offset),
      searchPhrase: params.searchPhrase
    };

    logger.info(`Validation history request: ${JSON.stringify(validationHistory)}`);

    if (!checkValidColumnName(validationHistory.orderBy)) {
      logger.error('Provided column name does not match allowed sorting columns');
      return badRequestError;
    }

  } catch (error) {
    logger.error(error.message);
    return badRequestError;
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: StatusCode.OK,
    body: 'MOCK'
  };
};
