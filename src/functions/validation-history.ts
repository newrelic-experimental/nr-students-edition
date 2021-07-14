import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from 'aws-lambda/handler';
import { LambdaResponse } from "../types/response";
import StatusCode from 'http-status-codes';
import { Logger } from "../utils/logger";
import { badRequestError } from "../utils/errors";
import { ValidationHistoryRequest } from "../types/validation-history";
import { checkValidColumnName, createSql } from "../utils/database/sql";
import { getValidationHistory } from "../utils/database/database";
import { ValidationCount, ValidationHistory, ValidationHistoryResponse } from "../types/database";

export const validationHistory = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Getting validation history...');

  const params = event.queryStringParameters || {};
  logger.info(`Obtained parameters: ${JSON.stringify(params)}`);

  logger.info('Checking if required account id is provided...');
  if (params.accountId && params.searchPhrase) {
    return badRequestError;
  }

  if (!params.startDate && !params.endDate) {
    return badRequestError;
  }

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

  logger.info(`Preparing get data query and count query for id: ${validationHistory.accountId}`);
  const sqlQuery = createSql(validationHistory, false);
  const countQuery = createSql(validationHistory, true);

  logger.info(`SQL Query: ${sqlQuery}`);
  logger.info(`Count Query: ${countQuery}`);

  const history = await getValidationHistory(sqlQuery, validationHistory) as ValidationHistory;
  const recordCount = await getValidationHistory(countQuery, validationHistory) as ValidationCount;



  logger.info(`Return results... ${validationHistory.accountId}`);
  logger.info(JSON.stringify(history.records));

  const response: ValidationHistoryResponse = {
    data: history.records,
    records: recordCount.records.length > 0 ? recordCount.records[0].count : 0,
  };

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: StatusCode.OK,
    body: JSON.stringify(response)
  };
};
