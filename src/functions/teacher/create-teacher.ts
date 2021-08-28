import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from '../../types/response';
import { Logger } from '../../utils/logger';
import { Context } from 'aws-lambda/handler';
import StatusCode from 'http-status-codes';
import { TeacherDTO, teacherDTOSchema } from '../../types/person';
import { ValidationError } from 'myzod';
import { badRequestError, internalLambdaError } from '../../utils/errors';
import { createTeacherData } from '../../utils/database/database';


export const createTeacher = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Parse incoming body with teacher data...');
  const body = JSON.parse(event.body);

  let teacher: TeacherDTO = null;

  logger.info('Creating teacher data in the database...');

  try {
    teacher = teacherDTOSchema.parse(body);
    logger.info(JSON.stringify(teacher));

    logger.info('Saving teacher data...');

    await createTeacherData(teacher);

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
