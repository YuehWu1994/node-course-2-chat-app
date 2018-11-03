var expect = require('expect');
const {app} = require('./../server');
var {generateMessage} = require('./message');

describe('geneerateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    var from  = 'Admin';
    var text = "Hello this is admin";
    var res = generateMessage(from, text);

    expect(res).toMatchObject({
      from: from,
      text: text
    })

    expect(typeof res.createdAt).toBe('number');

  })
})
