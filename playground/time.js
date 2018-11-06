
const moment = require('moment');
//


// var date = new Date();
// console.log(date.getMonth());
// var date = moment();
// date.add(1, 'y').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createAt = 1234
var date = moment(1234);
console.log(date.format('h:mm a' ))
