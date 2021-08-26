import { DatabaseContext, ValidationCount, ValidationHistory } from '../../types/database';
import { config } from '../../config';
import DataApiClient from 'data-api-client';
import { StudentDTO, ValidationStatus  } from '../../types/person';
import { StateEntity } from '../../types/state';
import { TokenEntity } from '../../types/github';
import { ValidationHistoryRequest } from '../../types/validation-history';

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
    `SELECT validation_status, account_type FROM validation_history WHERE account_id = :account_id ORDER BY creation_date DESC`,
    { account_id: accountId }
  );

  return result;
};

export const updateStudentData = async (student: StudentDTO): Promise<any | undefined> => {
  let result = null;

  if (!student.graduationDate) {
    result = await dbClient.query({
      sql: `UPDATE validation_history
        SET nr_email = :nr_email, user_email = :user_email, name = :name, surname = :surname, university = :university, country = :country, validation_status = :validation_status, validation_source = :validation_source
        WHERE id = (SELECT id FROM validation_history WHERE account_id = :account_id ORDER BY creation_date DESC LIMIT 1)`,
      parameters: [
        {
          account_id: student.accountId,
          nr_email: student.nrEmail,
          user_email: student.userEmail,
          name: student.firstname,
          surname: student.lastname,
          university: student.university,
          country: student.country,
          validation_status: student.validationStatus,
          validation_source: 'github'
        },
      ],
    });
  } else {
    result = await dbClient.query({
      sql: `UPDATE validation_history
        SET nr_email = :nr_email, user_email = :user_email, name = :name, surname = :surname, university = :university, graduation_date = :graduation_date, country = :country, is_thirteen_yo = :is_thirteen_yo, level_of_study = :level_of_study, parents_email = :parents_email, validation_status = :validation_status, validation_source = :validation_source
        WHERE id = (SELECT id FROM validation_history WHERE account_id = :account_id ORDER BY creation_date DESC LIMIT 1)`,
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
          is_thirteen_yo: student.isThirteenYo || false,
          level_of_study: student.levelOfStudy,
          parents_email: student.parentsEmail || '',
          validation_status: student.validationStatus,
          validation_source: 'github'
        },
      ],
    });
  }

  return result;
};

export const saveValidationAttempt = async (student: StudentDTO): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO validation_history (account_id, validation_status, github_id, account_type, validation_source)
      VALUES (:account_id, :validation_status, :github_id, :account_type, :validation_source)`,
    parameters: [
      {
        account_id: student.accountId,
        github_id: student.githubId || null,
        validation_status: student.validationStatus.toString(),
        account_type: student.accountType,
        validation_source: 'github'
      },
    ],
  });

  return result;
};

export const saveManualApproval = async (
  accountId: string,
  description: string,
  validationSource: string
): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO validation_history (validation_status, account_id, description, validation_source)
      VALUES (:validation_status, :account_id, :description, :validation_source)`,
    parameters: [
      {
        account_id: accountId,
        description: description,
        validation_status: ValidationStatus.eligible.toString(),
        validation_source: validationSource,
      },
    ],
  });

  return result;
};

export const updateBasedOnManualApprovalData = async (accountId: string, description: string, validationSource: string): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `UPDATE validation_history SET validation_status = :validation_status, description = :description, validation_source = :validation_source
            WHERE account_id = (SELECT account_id FROM validation_history WHERE account_id = :account_id ORDER BY creation_date DESC LIMIT 1)`,
    parameters: [
      {
        account_id: accountId,
        description: description,
        validation_status: ValidationStatus.eligible.toString(),
        validation_source: validationSource,
      },
    ],
  });

  return result;
};

export const deleteValidationAttempt = async (accountId: string): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `DELETE FROM validation_history WHERE account_id = :account_id AND validation_status = :validation_status`,
    parameters: [
      {
        account_id: accountId,
        validation_status: ValidationStatus.ongoingValidation.toString()
      }
    ]
  });

  return result;
};

export const saveState = async (stateEntity: StateEntity): Promise<any | undefined> => {
  const result = await dbClient.query({
    sql: `INSERT INTO states (account_id, state, redirect_to, account_type) VALUES (:account_id, :state, :redirect_to, :account_type)`,
    parameters: [
      {
        account_id: stateEntity.account_id,
        state: stateEntity.state,
        redirect_to: stateEntity.redirect_to,
        account_type: stateEntity.account_type
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

export const getValidationHistory = async (query: string, params: ValidationHistoryRequest): Promise<ValidationCount | ValidationHistory | undefined> => {
  const result = await dbClient.query({
    sql: query,
    parameters: [
      {
        account_id: params.accountId
      },
      {
        search_phrase: params.searchPhrase
      },
      {
        column: params.orderBy
      },
      {
        direction: params.orderAsc
      },
      {
        limit: params.limit
      },
      {
        offset: params.offset
      },
      {
        start_date: params.startDate
      },
      {
        end_date: params.endDate
      }
    ]
  });

  return result;
};
