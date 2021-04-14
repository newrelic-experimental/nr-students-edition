import { LambdaResponse } from "../types/response";
import { StatusCodes } from 'http-status-codes';

export const badRequestError: LambdaResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: StatusCodes.BAD_REQUEST,
  body: JSON.stringify({
    internalStatusCode: 40004,
    message: 'Bad parameters provided to endpoint.',
  }),
};
