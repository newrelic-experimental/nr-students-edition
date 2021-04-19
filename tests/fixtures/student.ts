import { Student } from "../../src/types/person";

export const studentFixture = {
  fullObject: {
    accountId: "1",
    firstname: "Jack",
    lastname: "Sparrow",
    nrEmail: "example@newrelic.com",
    userEmail: "user@example.com",
    country: "USA",
    isThirteenYo: false,
    graduationDate: new Date('21.03.2022'),
    levelOfStudy: "Student",
    validationStatus: false,
    university: "The Example University"
  } as Student,
  wrongValueForValidationStatus: {
    accountId: "1",
    firstname: "Jack",
    lastname: "Sparrow",
    nrEmail: "example@newrelic.com",
    userEmail: "user@example.com",
    country: "USA",
    isThirteenYo: false,
    graduationDate: new Date('21.03.2022'),
    levelOfStudy: "Student",
    validationStatus: "false",
    university: "The Example University"
  } as unknown,
};
