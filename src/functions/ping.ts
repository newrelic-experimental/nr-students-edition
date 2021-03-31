import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';
import { Context } from 'aws-lambda/handler';


export const ping = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Ping λ just started...');

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: 'λ is alive!',
  };
};
