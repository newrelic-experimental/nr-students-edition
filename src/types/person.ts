import myzod, { Infer } from 'myzod';

export const studentDTOSchema = myzod.object({
  accountId: myzod.string(),
  nrEmail: myzod.string().pattern(/\S+@\S+\.\S+/),
  userEmail: myzod.string().pattern(/\S+@\S+\.\S+/),
  firstname: myzod.string(),
  lastname: myzod.string(),
  university: myzod.string(),
  levelOfStudy: myzod.string(),
  graduationDate: myzod.date(),
  country: myzod.string(),
  isThirteenYo: myzod.boolean(),
  parentsEmail: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  validationStatus: myzod.boolean()
}).collectErrors();

export const studentEntitySchema = myzod.object({
  account_id: myzod.string(),
  nr_email: myzod.string().pattern(/\S+@\S+\.\S+/),
  user_email: myzod.string().pattern(/\S+@\S+\.\S+/),
  name: myzod.string(),
  surname: myzod.string(),
  university: myzod.string(),
  level_of_study: myzod.string(),
  graduation_date: myzod.date(),
  country: myzod.string(),
  is_thirteen_yo: myzod.boolean(),
  parents_email: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  validation_status: myzod.boolean()
}).collectErrors();

export type StudentDTO = Infer<typeof studentDTOSchema>;
export type StudentEntity = Infer<typeof studentEntitySchema>;
