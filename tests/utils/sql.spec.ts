import { checkValidColumnName } from "../../src/utils/database/sql";

describe('Check if given column name is correct', () => {
  it('Valid column name, should return true', () => {
    const columnName = 'account_id';
    expect(checkValidColumnName(columnName)).toBe(true);
  });

  it('Invalid column name, should return false', () => {
    const columnName = 'account_uuid';
    expect(checkValidColumnName(columnName)).toBe(false);
  });

  it('Non string and not existing column name, should return false', () => {
    const columnName = 123 as any;
    expect(checkValidColumnName(columnName)).toBe(false);
  });
});
