import myzod, { Infer } from 'myzod';

export enum ValidationStatus {
  eligible = 'eligible',
  ineligible = 'ineligible',
  ongoingValidation = 'ongoing_validation'
}

export const studentDTOSchema = myzod.object({
  accountId: myzod.string(),
  nrEmail: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  userEmail: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  firstname: myzod.string().optional(),
  lastname: myzod.string().optional(),
  university: myzod.string().optional(),
  levelOfStudy: myzod.string().optional(),
  graduationDate: myzod.date().optional(),
  country: myzod.string().optional(),
  isThirteenYo: myzod.boolean().optional(),
  parentsEmail: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  validationStatus: myzod.enum(ValidationStatus)
}).collectErrors();

export const studentEntitySchema = myzod.object({
  account_id: myzod.string(),
  nr_email: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  user_email: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  name: myzod.string().optional(),
  surname: myzod.string().optional(),
  university: myzod.string().optional(),
  level_of_study: myzod.string().optional(),
  graduation_date: myzod.date().optional(),
  country: myzod.string().optional(),
  is_thirteen_yo: myzod.boolean().optional(),
  parents_email: myzod.string().pattern(/\S+@\S+\.\S+/).optional(),
  validation_status: myzod.string()
}).collectErrors();

export type StudentDTO = Infer<typeof studentDTOSchema>;
export type StudentEntity = Infer<typeof studentEntitySchema>;
