import myzod, { Infer } from 'myzod';

export enum ValidationStatus {
  eligible = 'eligible',
  ineligible = 'ineligible',
  ongoingValidation = 'ongoing_validation',
  ineligibleGithubAccountAlreadyUsed = 'ineligible_gh_already_used'
}

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

export const studentDTOSchema = myzod.object({
  accountId: myzod.string(),
  githubId: myzod.string().optional(),
  nrEmail: myzod.string().pattern(EMAIL_PATTERN).optional(),
  userEmail: myzod.string().pattern(EMAIL_PATTERN).optional(),
  firstname: myzod.string().optional(),
  lastname: myzod.string().optional(),
  university: myzod.string().optional(),
  levelOfStudy: myzod.string().optional(),
  graduationDate: myzod.date().optional(),
  country: myzod.string().optional(),
  isThirteenYo: myzod.boolean().optional(),
  parentsEmail: myzod.string().pattern(EMAIL_PATTERN).optional(),
  validationStatus: myzod.string()
}).collectErrors();

export const studentEntitySchema = myzod.object({
  account_id: myzod.string(),
  github_id: myzod.string().optional(),
  nr_email: myzod.string().pattern(EMAIL_PATTERN).optional(),
  user_email: myzod.string().pattern(EMAIL_PATTERN).optional(),
  name: myzod.string().optional(),
  surname: myzod.string().optional(),
  university: myzod.string().optional(),
  level_of_study: myzod.string().optional(),
  graduation_date: myzod.date().optional(),
  country: myzod.string().optional(),
  is_thirteen_yo: myzod.boolean().optional(),
  parents_email: myzod.string().pattern(EMAIL_PATTERN).optional(),
  validation_status: myzod.string()
}).collectErrors();

export type StudentDTO = Infer<typeof studentDTOSchema>;
export type StudentEntity = Infer<typeof studentEntitySchema>;
