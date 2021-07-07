import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from 'aws-lambda/handler';
import { LambdaResponse } from "../types/response";
import StatusCode from 'http-status-codes';
import { Logger } from "../utils/logger";

export const getValidationHistory = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Getting validation history...');


  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: StatusCode.OK,
    body: 'MOCK'
  };
};
