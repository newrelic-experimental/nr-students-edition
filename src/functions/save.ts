import { APIGatewayProxyEvent } from "aws-lambda";
import { LambdaResponse } from "../types/response";
import { Logger } from "../utils/logger";
import { Context } from 'aws-lambda/handler';
import { StudentDTO, studentDTOSchema } from "../types/person";
import { ValidationError } from "myzod";
import { badRequestError, internalLambdaError } from "../utils/errors";
import { saveValidationAttempt } from '../utils/database/database';


export const save = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Pasre incoming bod...');
  const body = JSON.parse(event.body);

  // TODO: Write DTO to Entity conversion and apply for the database

  let student: StudentDTO = null;
  logger.info('Save user data...');

  try {
    student = studentDTOSchema.parse(body);
    logger.info(JSON.stringify(student));

    await saveValidationAttempt(student);

    logger.info('Saved students data to the database');
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error(`Validation error: ${error.message}`);

      return badRequestError;
    }

    logger.error(`Something went wrong: ${error.message}`);
    return internalLambdaError;
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 201,
    body: ''
  };
};
