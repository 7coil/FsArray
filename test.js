const FsArray = require('./index.js');

const array1 = new FsArray('1');
array1.push('test');
array1.push('world');
array1.push({
  'test': 'nope'
})

console.log(array1);
console.log(array1.toArray());
// FsArray { name: '1', length: 3 }
// [ 'test', 'world', { test: 'nope' } ]


const array2 = new FsArray('2', 5);
array2.setElement(3, 'CircuitRCAY is a meme');

console.log(array2);
console.log(array2.toArray());
// FsArray { name: '2', length: 5 }
// [ undefined,
//   undefined,
//   undefined,
//   'CircuitRCAY is a meme',
//   undefined ]

array2.forEach((element) => {
  console.log(element);
});
// undefined
// undefined
// undefined
// CircuitRCAY is a meme
// undefined

console.log(array2.getLength());
