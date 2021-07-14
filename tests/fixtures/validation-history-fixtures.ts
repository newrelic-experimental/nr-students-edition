import { ValidationHistoryRequest } from '../../src/types/validation-history';

export const ValidationHistoryFixtures = {
  validationHistoryBasicRequest: {
    searchPhrase: 'company',
    orderBy: 'creation_date',
    orderAsc: true,
    limit: 1,
    offset: 0,
    startDate: new Date('2021-02-01T00:00:00Z'),
    endDate: new Date('2021-02-02T00:00:00Z'),
  } as ValidationHistoryRequest,

  validationHistoryAccountId: {
    accountId: '1',
    orderBy: 'creation_date',
    orderAsc: true,
    limit: 1,
    offset: 1,
    startDate: new Date('2021-02-01T00:00:00Z'),
    endDate: new Date('2021-02-02T00:00:00Z'),
  } as ValidationHistoryRequest,

  validationHistoryWithoutOffset: {
    accountId: '1',
    orderBy: 'creation_date',
    orderAsc: true,
    limit: 1,
    offset: 0,
    startDate: new Date('2021-02-01T00:00:00Z'),
    endDate: new Date('2021-02-02T00:00:00Z'),
  } as ValidationHistoryRequest,

  validationHistorySearchPhrase: {
    searchPhrase: 'company',
    orderBy: 'creation_date',
    orderAsc: true,
    limit: 1,
    offset: 0,
    startDate: new Date('2021-02-01T00:00:00Z'),
    endDate: new Date('2021-02-02T00:00:00Z'),
  } as ValidationHistoryRequest,

  validationHistoryMinimum: {
    startDate: new Date('2021-02-01T00:00:00Z'),
    endDate: new Date('2021-02-02T00:00:00Z'),
  } as ValidationHistoryRequest,
};
