import myzod, { Infer } from 'myzod';

export const studentSchema = myzod.object({
  accountId: myzod.string(),
  nrEmail: myzod.string().pattern(/\S+@\S+\.\S+/),
  userEmail: myzod.string().pattern(/\S+@\S+\.\S+/),
  firstname: myzod.string(),
  lastname: myzod.string(),
  university: myzod.string(),
  levelOfStudy: myzod.string(),
  graduation_date: myzod.date(),
  country: myzod.string(),
  isThirteenYo: myzod.boolean(),
  parentsEmail: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  validationStatus: myzod.boolean()
}).collectErrors();

export type Student = Infer<typeof studentSchema>;

// TODO: remove if unnecessary
export type Person = {
  id: number;
  account_id: string;
  nr_email: string;
  user_email: string;
  firstname: string;
  lastname: string;
  university: string;
  level_of_study: string;
  graduation_date: Date;
  country: string;
  is_thirteen_yo: boolean;
  parentsEmail?: string;
  validation_status: boolean;
  creation_date: Date;
};
