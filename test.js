const FsArray = require('./index.js');
const path = require('path');

const array1 = new FsArray(path.join(__dirname, 'test'));
array1.clearArray();

array1.push('test');
array1.push('world');
array1.push({
  'test': 'nope'
})

const array2 = new FsArray(path.join(__dirname, 'test'));
console.log(array2.getLength());
array2.forEach((element) => console.log(element));
