import { DatabaseContext, ValidationHistory } from '../../types/database';
import { config } from '../../config';
import DataApiClient from 'data-api-client';
import { StudentDTO } from '../../types/person';
import { StateEntity } from '../../types/state';

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

export const checkIfStateExists = async (state: string): Promise<any | undefined> => {
  const result = await dbClient.query(`select exists(select 1 from state where state = :state`,
  {
    state: state
  });

  return result;
};

export const getDataFromState = async (state: string): Promise<any | undefined> => {
  const result = await dbClient.query(`select * from state where state = :state`,
  {
    state: state
  });

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

export const saveValidationAttempt = async (student: StudentDTO): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO validation_history (account_id, nr_email, user_email, name, surname, university, graduation_date, country, is_thirteen_yo, level_of_study, parents_email, validation_status, code)
      VALUES (:account_id, :nr_email, :user_email, :name, :surname, :university, :graduation_date, :country, :is_thirteen_yo, :level_of_study, :parents_email, :validation_status, :code)`,
    parameters: [
      {
        account_id: student.accountId,
        nr_email: student.nrEmail,
        user_email: student.userEmail,
        name: student.firstname,
        surname: student.lastname,
        university: student.university,
        graduation_date: student.graduationDate,
        country: student.country,
        is_thirteen_yo: student.isThirteenYo,
        level_of_study: student.levelOfStudy,
        parents_email: student.parentsEmail || '',
        validation_status: student.validationStatus,
        code: student.code
      },
    ],
  });

  return result;
};

export const saveState = async (stateEntity: StateEntity): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO state (account_id, state) VALUES (:account_id, :state)`,
    parameters: [
      {
        account_id: stateEntity.account_id,
        state: stateEntity.state
      }
    ]
  });

  return result;
};
