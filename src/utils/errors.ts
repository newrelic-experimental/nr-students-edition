import { LambdaResponse } from "../types/response";
import { StatusCodes } from 'http-status-codes';

export const badRequestError: LambdaResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: StatusCodes.BAD_REQUEST,
  body: JSON.stringify({
    internalStatusCode: 40001,
    message: 'Bad parameters provided to endpoint.',
  }),
};

export const internalLambdaError: LambdaResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  body: JSON.stringify({
    internalStatusCode: 50001,
    message: 'Something went wrong, please check the logs to gather more information'
  }),
};