export type DatabaseContext = {
  resourceArn: string;
  secretArn: string;
  database: string;
};

export type ValidationHistory = {
  records: Array<Student>;
};

type Student = {
  id: number;
  nr_email: string;
  user_email: string;
  name: string;
  surname: string;
  university: string;
  graduation_date: Date;
  country: string;
  validation_status: boolean;
  creation_date: Date;
};
