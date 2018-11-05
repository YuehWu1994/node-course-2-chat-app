var expect = require('expect');
const {app} = require('./../server');
var {generateMessage, generateLocationMessage} = require('./message');

describe('geneerateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    var from  = 'Admin';
    var text = "Hello this is admin";
    var message = generateMessage(from, text);

    expect(message).toMatchObject({
      from: from,
      text: text
    })

    expect(typeof message.createdAt).toBe('number');

  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = 14;
    var longitude = 13;
    var url = 'https://google.com/maps?q=14,13';

    var message = generateLocationMessage(from, latitude, longitude);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});node
  });
})
