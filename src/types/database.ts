import { Student } from "./person";

export type DatabaseContext = {
  resourceArn: string;
  secretArn: string;
  database: string;
};

export type ValidationHistory = {
  records: Array<Student>;
};

export type ValidationStatus = boolean;
