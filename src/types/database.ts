import { StudentEntity } from "./person";
import { StateEntity } from "./state";

export type DatabaseContext = {
  resourceArn: string;
  secretArn: string;
  database: string;
};

export type ValidationHistory = {
  records: Array<StudentEntity>;
};

export type State = {
  records: Array<StateEntity>;
};

export type ValidationStatus = boolean;

export type StatusAndAccountType = {
  validationStatus: string,
  accountType: string
};

export type ValidationHistoryResponse = {
  data: Array<StudentEntity>;
  records: number;
};

export type ValidationCount = {
  records: Array<Count>;
};

type Count = {
  count: number;
};
