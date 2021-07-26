import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ValidationHistory } from '../types/database';
import { ManualApproval } from '../types/manual-approval';
import { LambdaResponse } from '../types/response';
import { getValidationStatusByAccountId, saveManualApproval } from '../utils/database/database';
import { accountAlreadyExist, badRequestError } from '../utils/errors';
import { Logger } from '../utils/logger';


export const manualApprove = async (event: APIGatewayProxyEvent, context: Context): Promise<LambdaResponse> => {
  const logger = new Logger(context);
  logger.info('Manual approval lambda...');

  try {
    const body = JSON.parse(event.body);
    const manual = body as ManualApproval;
    logger.info(JSON.stringify(manual));

    logger.info(`Checking if account is existing already... ${manual.accountId}`);
    const result: ValidationHistory = await getValidationStatusByAccountId(manual.accountId);

    if (result.records.length > 0) {
      logger.error('Account already exists in the database');
      return accountAlreadyExist;
    }

    logger.info(`Saving user data for manual validation for account: ${manual.accountId}`);
    const manualApproved = await saveManualApproval(manual.accountId, manual.description, manual.validationSource);

    logger.info(`Saved user data for account id: ${manual.accountId}`);
    logger.info(manualApproved);

  } catch (error) {
    logger.error('Something happend while saving the data...');
    logger.error(error.message);
    return badRequestError;
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 201,
    body: JSON.stringify(''),
  };
};
