import myzod, { Infer } from 'myzod';


export type GithubCredentials = {
  clientId: string;
  clientSecret: string;
  code: string;
};

export const stateAndCodeSchema = myzod.object({
  state: myzod.string(),
  code: myzod.string()
}).collectErrors();

export type StateAndCode = Infer<typeof stateAndCodeSchema>;
