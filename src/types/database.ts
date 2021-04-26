import { StudentEntity } from "./person";

export type DatabaseContext = {
  resourceArn: string;
  secretArn: string;
  database: string;
};

export type ValidationHistory = {
  records: Array<StudentEntity>;
};

export type ValidationStatus = boolean;
