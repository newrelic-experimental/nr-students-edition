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

export const getValidationStatusByAccountId = async (accountId: string): Promise<any | undefined> => {
  const result = await dbClient.query(
    `SELECT ::fields FROM ::table WHERE account_id = :account_id`,
    {
      fields: ['account_id'],
      table: '',
      account_id: accountId
    }
  );

  return result;
};
