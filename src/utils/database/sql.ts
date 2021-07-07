export const checkValidColumnName = (columnName: string): boolean => {
  const columnNames = ['account_id', 'name', 'surname', 'university'];

  return columnNames.includes(columnName);
};
