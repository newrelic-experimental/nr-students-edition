import { ValidationError } from 'myzod';
import { studentDTOSchema } from '../../src/types/person';
import { studentFixture } from '../fixtures/student';

describe('Person type validation tests', () => {
  it('Empty object to parse, parse should throw the ValidationError', () => {
    expect(() => studentDTOSchema.parse({})).toThrow(ValidationError);
  });

  it('Each fields are provided, parse shouldn\'t throw ValidationError', () => {
    expect(() => studentDTOSchema.parse(studentFixture.fullObject)).not.toThrow(ValidationError);
  });
});
