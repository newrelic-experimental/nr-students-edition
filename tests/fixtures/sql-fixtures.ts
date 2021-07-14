export const SqlFixtures = {
  selectQueryBegin: 'SELECT * FROM validation_history ',
  countQueryBegin: 'SELECT COUNT(*) FROM validation_history ',
  minimumQuery: 'SELECT * FROM validation_history WHERE creation_date BETWEEN :start_date AND :end_date ',
  queryWithAccountId:
    'SELECT * FROM validation_history WHERE creation_date BETWEEN :start_date AND :end_date AND account_id = :account_id ORDER BY creation_date ASC LIMIT :limit OFFSET :offset ',
  queryWithoutOffset:
    'SELECT * FROM validation_history WHERE creation_date BETWEEN :start_date AND :end_date AND account_id = :account_id ORDER BY creation_date ASC LIMIT :limit ',
  queryWithSearchPhrase:
    "SELECT * FROM validation_history WHERE creation_date BETWEEN :start_date AND :end_date AND (name ILIKE CONCAT('%', :search_phrase, '%') OR surname ILIKE CONCAT('%', :search_phrase, '%') OR account_id ILIKE CONCAT('%', :search_phrase, '%') OR university ILIKE CONCAT('%', :search_phrase, '%')) ORDER BY creation_date ASC LIMIT :limit ",
};
