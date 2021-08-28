import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../../types/response';
import { Logger } from '../../utils/logger';
import { Context } from 'aws-lambda/handler';
import StatusCode from 'http-status-codes';
import { StudentDTO, studentDTOSchema } from '../../types/person';
import { createStudentData } from '../../utils/database/database';
import { badRequestError, internalLambdaError } from '../../utils/errors';
import { ValidationError } from 'myzod';


export const createStudent = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Parse incoming body with student data...');
  const body = JSON.parse(event.body);

  let student: StudentDTO = null;

  logger.info('Creating student data in the database...');

  try {
    student = studentDTOSchema.parse(body);
    logger.info(JSON.stringify(student));

    logger.info('Saving student data...');

    await createStudentData(student);

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
    statusCode: StatusCode.CREATED,
    body: ''
  };
};
