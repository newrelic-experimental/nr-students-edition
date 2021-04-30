import { generateState } from '../../src/utils/generators/state-generator';

describe('Generate random base64 url safe state', () => {
  it('Should generate 7 length base64 string', () => {
    expect(generateState(7)).toHaveLength(7);
  });

  it('Should generate 5 length base64 string', () => {
    expect(() => generateState(5)).toThrow('State size should be at least 6 characters');
  });

  it('Should throw an error, when size is less than 0', () => {
    expect(() => generateState(-2)).toThrow('State size should be at least 6 characters');
  });
});
