# FsArray
Why make arrays which take up valuable RAM when you can use FsArray to use the filesystem instead?

## Examples
See `test.js`

## Documentation
- Constructor
  - `new FsArray('test')`
    - Create a new FileSystem array of length 0 and named `test`
  - `new FsArray('test', 5)`
    - Create a new FileSystem array of length 5 and named `test`
  - `new FsArray('test', ['a', 'b', ['c']])
    - Create a new FileSystem array with existing elements and named `test`
- `push(element)`
  - Push an element into the array
- `toArray()`
  - Grab all elements and put into a boring old JavaScript array.
- `getElement(index)`
  - Grab a single element
- `setElement(index, element)`
  - Set a single element
- `forEach((element, index) => {})`
  - Iterate over each element
  - Probably more efficient than `toArray().forEach()`
