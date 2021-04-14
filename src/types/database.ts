export type DatabaseContext = {
  resourceArn: string;
  secretArn: string;
  database: string;
};

export type ValidationHistory = {
  records: Array<Student>;
};

export type Student = {
  id: number;
  nr_email: string;
  user_email: string;
  firstname: string;
  lastname: string;
  university: string;
  graduation_date: Date;
  country: string;
  is_thirteen_yo: boolean;
  parentsEmail?: string;
  validation_status: boolean;
  creation_date: Date;
};
