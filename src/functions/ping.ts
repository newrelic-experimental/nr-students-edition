import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/response';
import { Logger } from '../utils/logger';

export const ping = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: 'λ is alive!',
  };
};
