import { DatabaseContext, ValidationHistory } from '../../types/database';
import { config } from '../../config';
import DataApiClient from 'data-api-client';
import { StudentDTO  } from '../../types/person';
import { StateEntity } from '../../types/state';
import { TokenEntity } from '../../types/github';

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
  const result = await dbClient.query(`select exists(select 1 from states where state = :state`,
  {
    state: state
  });

  return result;
};

export const getDataFromState = async (state: string): Promise<any | undefined> => {
  const result = await dbClient.query(`select * from states where state = :state`,
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

export const updateStudentData = async (student: StudentDTO): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `UPDATE validation_history SET nr_email = :nr_email, user_email = :user_email, name = :name, surname = :surname, university = :university, graduation_date = :graduation_date, country = :country, is_thirteen_yo = :is_thirteen_yo, level_of_study = :level_of_study, parents_email = :parents_email, validation_status = :validation_status WHERE account_id = :account_id`,
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
        validation_status: student.validationStatus
      },
    ],
  });

  return result;
};

export const saveValidationAttempt = async (student: StudentDTO): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO validation_history (account_id, validation_status)
      VALUES (:account_id, :validation_status)`,
    parameters: [
      {
        account_id: student.accountId,
        validation_status: student.validationStatus.toString()
      },
    ],
  });

  return result;
};

export const saveState = async (stateEntity: StateEntity): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO states (account_id, state, redirect_to) VALUES (:account_id, :state, :redirect_to)`,
    parameters: [
      {
        account_id: stateEntity.account_id,
        state: stateEntity.state,
        redirect_to: stateEntity.redirect_to
      }
    ]
  });

  return result;
};

export const saveAccessToken = async (tokenEntity: TokenEntity): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO tokens (account_id, access_token) VALUES (:account_id, :access_token)`,
    parameters: [
      {
        account_id: tokenEntity.account_id,
        access_token: tokenEntity.access_token
      }
    ]
  });

  return result;
};
