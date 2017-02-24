const expect = require('expect');

var { isRealString } = require('./validation');


describe('isRealString', () => {
  it('should reject non-string values', () => {
    var argument = 5,
        result = isRealString(argument);
    expect(result).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var argument = '          ',
        result = isRealString(argument);
    expect(result).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var argument = '  ##$$&&&&  ',
        result = isRealString(argument);
    expect(result).toBe(true);
  });
});
