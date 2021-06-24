import myzod, { Infer } from 'myzod';


export type GithubCredentials = {
  client_id: string;
  client_secret: string;
  code: string;
};

export const stateAndCodeSchema = myzod.object({
  state: myzod.string(),
  code: myzod.string()
}).collectErrors();

export const studentResponseSchema = myzod.object({
  student: myzod.boolean(),
  faculty: myzod.boolean()
});

export const tokenEntitySchema = myzod.object({
  account_id: myzod.string(),
  access_token: myzod.string()
});

export type StateAndCode = Infer<typeof stateAndCodeSchema>;
export type StudentResponseGithub = Infer<typeof studentResponseSchema>;
export type TokenEntity = Infer<typeof tokenEntitySchema>;
export type StudentResponse = StudentResponseGithub & { account_id: string };
