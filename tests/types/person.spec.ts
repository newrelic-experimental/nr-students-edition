// import { ValidationError } from 'myzod';
// import { ValidationError } from 'myzod';
import { ValidationError } from 'myzod';
import { studentSchema } from '../../src/types/person';
import { studentFixture } from '../fixtures/student';

describe('Person type validation tests', () => {
  it('Empty object to parse, parse should throw the ValidationError', () => {
    expect(() => studentSchema.parse({})).toThrow(ValidationError);
  });

  it('Each fields are provided, parse shouldn\'t throw ValidationError', () => {
    expect(() => studentSchema.parse(studentFixture.fullObject)).not.toThrow(ValidationError);
  });

  it('Wrong type of validation status, should return ValidationError', () => {
    expect(() => studentSchema.parse(studentFixture.wrongValueForValidationStatus)).toThrow(ValidationError);
  });
});
