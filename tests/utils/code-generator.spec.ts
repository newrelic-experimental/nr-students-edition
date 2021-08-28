import { generateOneTimeCode, extractOnlyCode } from '../../src/utils/generators/code-generator';


describe('Code generator util', () => {
  describe('Generate code', () => {
    it('Generate code with account id at the beginning', () => {
      const code = generateOneTimeCode('123456');
      expect(code.substring(0, 6)).toEqual('123456');
    });

    it('Generate code with length 13', () => {
      const code = generateOneTimeCode('123456');
      expect(code).toHaveLength(13);
    });

    it('Generated code should have 25 length', () => {
      const code = generateOneTimeCode('123456', 18);
      expect(code).toHaveLength(25);
    });
  });

  describe('Extracy only code from one time code', () => {
    it('Gets only otp code', () => {
      const code = generateOneTimeCode('code45612');
      expect(extractOnlyCode(code)).toHaveLength(6);
    });

    it('Extracted code should be length 10', () => {
      const code = generateOneTimeCode('123456', 10);
      expect(extractOnlyCode(code)).toHaveLength(10);
    });
  });
});
