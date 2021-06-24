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

export const recordNotFound: LambdaResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: StatusCodes.NOT_FOUND,
  body: JSON.stringify({
    internalStatusCode: 40401,
    message: 'Record not found in the database'
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

export const githubApiError: LambdaResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: StatusCodes.SERVICE_UNAVAILABLE,
  body: JSON.stringify({
    internalStatusCode: 50301,
    message: 'Something went wrong with external API'
  }),
};

export const handleGithubCancel = (redirectTo: string): LambdaResponse => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Location': redirectTo
    },
    statusCode: 302,
    body: ''
  };
};
