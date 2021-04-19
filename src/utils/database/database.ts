import { DatabaseContext, ValidationHistory } from '../../types/database';
import { config } from '../../config';
import DataApiClient from 'data-api-client';

const databaseContext: DatabaseContext = {
  resourceArn: config.DATABASE_RESOURCE_ARN,
  secretArn: config.DATABASE_SECRET_ARN,
  database: config.DATABASE,
};

const dbClient = DataApiClient(databaseContext);


export const getAll = async (): Promise<ValidationHistory | undefined> => {
  const result = await dbClient.query(`SELECT * FROM validation_history'`);
  return result;
};

export const getValidationStatusByAccountId = async (accountId: string): Promise<ValidationHistory | undefined> => {
  const result = await dbClient.query(
    `SELECT validation_status FROM validation_history WHERE account_id = :account_id`,
    { account_id: accountId }
  );

  return result;
};

export const getValidationStatus = async (accountId: string): Promise<any | undefined> => {
  const result = await dbClient.query(
    'SELECT ::fields FROM ::table WHERE id = :account_id',
    {
      fields: ['validation_status'],
      table: 'validation_history',
      account_id: accountId
    });

  return result;
};
