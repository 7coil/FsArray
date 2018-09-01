# FsArray
Why make arrays which take up valuable RAM when you can use FsArray to use the filesystem instead?

## Examples
See `test.js`

## Documentation
- Constructor
  - `new FsArray('/tmp/hi')`
    - Create, or reuse the FsArray at the `/tmp/hi` folder
  - `new FsArray(path.join(__dirname, 'data'))`
    - Create an FsArray in the `data` directory relative to the script
- `push(element)`
  - Push an element into the array
- `toArray()`
  - Grab all elements and put into a boring old JavaScript array.
- `getElement(index)`
  - Grab a single element
- `setElement(index, element)`
  - Set a single element
- `deleteElement(index)`
  - Delete a single element
  - Very resource intensive, as it renames every file after the index
- `forEach((element, index) => {})`
  - Iterate over each element
  - Probably more efficient than `toArray().forEach()`
- `getLength()`
  - Get the length of the array
- `clearArray()`
  - Delete all items in the array
  - Does not do anything if the length of the array is `0`

**Secrets!**
- `setLength(length)`
  - Set the length of the array
- `writeFile(index, contents)`
  - Write to any arbitary file without checks
- `path`
  - Get the path to the folder containing the FsArray

## Warnings

1. Do not use in a wet damp environment
2. Editing the `length.json` file will affect the stability of the FsArray
