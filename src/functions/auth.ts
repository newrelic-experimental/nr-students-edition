import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from 'aws-lambda/handler';
import { LambdaResponse } from "../types/response";
import { Logger } from "../utils/logger";

export const authGithub = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Mocked auth lambda');

  const fakeUrl = 'this is not url';

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Location': fakeUrl
    },
    statusCode: 302,
    body: ''
  };
};
