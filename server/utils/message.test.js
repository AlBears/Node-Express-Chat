var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate a correct message object', () => {
    var from = 'Jen',
        text = 'Some message',
        message = generateMessage(from, text);
    expect(message).toInclude({ from, text });
    expect(message.createdAt).toBeA("number");
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Peter',
        latitude = 1,
        longitude = 1,
        url = 'https://google.com/maps?q=1,1';
        message = generateLocationMessage(from, latitude, longitude);
    expect(message).toInclude({ from, url });
    expect(message.createdAt).toBeA("number");
  });
});
