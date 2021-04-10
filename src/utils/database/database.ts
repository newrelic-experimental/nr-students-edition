import { DatabaseContext } from '../../types/database';
import { config } from '../../config';
import DataApiClient from 'data-api-client';

const databaseContext: DatabaseContext = {
  resourceArn: config.DATABASE_RESOURCE_ARN,
  secretArn: config.DATABASE_SECRET_ARN,
  database: config.DATABASE,
};

const dbClient = DataApiClient(databaseContext);


// TODO: setup the return type based on database model
export const getAll = async (): Promise<any | undefined> => {
  const result = await dbClient.query(`SELECT * FROM validation_attempts'`);
  return result;
};
