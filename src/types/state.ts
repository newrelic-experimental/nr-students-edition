import myzod, { Infer } from 'myzod';
import { AccountType } from './account-type';

export const stateEntitySchema = myzod.object({
  account_id: myzod.string(),
  state: myzod.string(),
  redirect_to: myzod.string(),
  account_type: myzod.enum(AccountType)
}).collectErrors();

export const authDtoSchema = myzod.object({
  accountId: myzod.string()
}).collectErrors();

export const locationDtoSchema = myzod.object({
  location: myzod.string()
}).collectErrors();

export type StateEntity = Infer<typeof stateEntitySchema>;
export type AuthDTO = Infer<typeof authDtoSchema>;
export type StateDTO = Infer<typeof locationDtoSchema>;
