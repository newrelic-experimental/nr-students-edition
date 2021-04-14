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
  const result = await dbClient.query({
    sql: `SELECT * FROM validation_history
          WHERE account_id = :account_id
          ORDER BY validation_date DESC
          LIMIT 1`,
    parameters: [
      {
        account_id: accountId,
      },
    ],
  });

  return result;
};
