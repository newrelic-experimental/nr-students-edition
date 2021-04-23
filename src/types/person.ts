import myzod, { Infer } from 'myzod';

export const studentSchema = myzod.object({
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

export type Student = Infer<typeof studentSchema>;
