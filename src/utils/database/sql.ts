import { ValidationHistoryRequest } from "../../types/validation-history";

export const checkValidColumnName = (columnName: string): boolean => {
  const columnNames = ['account_id', 'name', 'surname', 'university'];

  return columnNames.includes(columnName);
};

export const createSql = (params: ValidationHistoryRequest, isCountQuery: boolean): string => {
  let query = createQueryBegin(isCountQuery);

  if (params.startDate && params.endDate) {
    query += 'WHERE creation_date BETWEEN :start_date AND :end_date ';
  }

  if (params.accountId) {
    query += 'AND account_id = :account_id ';
  }

  if (params.searchPhrase) {
    query += `AND (name ILIKE CONCAT('%', :search_phrase, '%') OR surname ILIKE CONCAT('%', :search_phrase, '%') OR account_id ILIKE CONCAT('%', :search_phrase, '%') OR university ILIKE CONCAT('%', :search_phrase, '%')) `;
  }

  if (!isCountQuery) {
    if (params.orderAsc !== undefined && params.orderBy) {
      query += `ORDER BY ${params.orderBy} ${params.orderAsc ? 'ASC' : 'DESC'} `;
    }

    if (params.limit) {
      query += `LIMIT :limit `;
    }

    if (params.offset) {
      query += `OFFSET :offset `;
    }
  }

  return query;
};

const createQueryBegin = (isCountQuery: boolean): string => {
  if (isCountQuery) {
    return `SELECT COUNT(*) FROM validation_history `;
  }

  return `SELECT * FROM validation_history `;
};
