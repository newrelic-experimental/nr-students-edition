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
