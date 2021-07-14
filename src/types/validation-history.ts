import myzod, { Infer } from 'myzod';


export const validationHistorySchema = myzod.object({
  accountId: myzod.string(),
  orderBy: myzod.string(),
  orderAsc: myzod.boolean().default(false),
  limit: myzod.number(),
  offset: myzod.number(),
  searchPhrase: myzod.string(),
  startDate: myzod.date(),
  endDate: myzod.date()
});

export type ValidationHistoryRequest = Infer<typeof validationHistorySchema>;
