import { APIGatewayProxyEvent } from "aws-lambda";
import { LambdaResponse } from "../types/response";
import { Logger } from "../utils/logger";
import { Context } from 'aws-lambda/handler';
import { Student, studentSchema } from "../types/person";
import { ValidationError } from "myzod";
import { badRequestError } from "../utils/errors";


export const save = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  let student: Student = null;
  logger.info('Save user data...');

  try {
    student = studentSchema.parse(event.queryStringParameters);
    logger.info(JSON.stringify(student));

    // TODO: Save object to the database

  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error(`Validation error: ${error.message}`);

      return badRequestError;
    }
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 201,
    body: ''
  };
};
