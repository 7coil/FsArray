const fs = require('fs');
const path = require('path');

class FsArray {
  /**
   * Create a new FileSystem Array
   * @param {String} name The name of the array
   * @param {(Number|*[]|Boolean)} array The length, an existing array or whether or not to use an existing filesystem
   */
  constructor(name, array) {
    this.name = name;

    if (array === true) {
      // Do not do anything, use existing workspace
    } else {
      // Create a new FsArray workspace
      // Make a temp folder
      try {
        fs.mkdirSync(path.join('/', 'tmp', name));
      } catch (e) {
        // ree
      }

      this.setLength(0);

      // Check iterability
      // https://stackoverflow.com/questions/18884249/checking-whether-something-is-iterable
      if (array !== null && array !== undefined && typeof array[Symbol.iterator] === 'function') {
        const items = [...array];
        // If it is iterable, iterate through each element and push the element into the stack
        items.forEach((element) => {
          push(element);
        })
      } else if (typeof array === 'number') {
        // If it's a number, create files from 0 to the number.
        for (let i = 0; i < array; i += 1) {
          this.push(undefined);
        }
      }
    }
  }

  /**
   * Push any JSON compatible element into the array
   * @param {*} element A single element to push
   */
  push(element) {
    const length = this.getLength();
    this.setElement(length, element);
    this.setLength(length + 1);
  }
  
  /**
   * Retrieve all elements and return a JavaScript Array
   * @returns {Array} An array of all elements
   */
  toArray() {
    const array = [];
    for (let i = 0; i < this.getLength(); i += 1) {
      array[i] = this.getElement(i);
    }
    return array;
  }

  /**
   * Get a sepecific element
   * @param {number} index A specific index
   */
  getElement(index) {
    const contents = fs.readFileSync(path.join('/', 'tmp', this.name, "" + index), 'UTF-8');

    // JSON.stringify can create undefined, but JSON.parse can't parse it
    if (contents.startsWith('undefined')) {
      return undefined;
    } else {
      return JSON.parse(contents);
    }
  }

  /**
   * Set a specific element
   * @param {number} index The index to set
   * @param {*} element The JSON compatible item to set
   */
  setElement(index, element) {
    if (index >= this.getLength()) {
      return undefined;
    } else if (index < 0) {
      return undefined;
    } else {
      this.writeFile(index, element);
    }
  }

  /**
   * Write to a file
   * @param {String} index The file name to write to
   * @param {*} contents The contents of the file
   */
  writeFile(index, contents) {
    fs.writeFileSync(path.join('/', 'tmp', this.name, "" + index), JSON.stringify(contents, null, 2) + "\n");
  }

  /**
   * Iterate over all elements
   * @param {Function} callback 
   */
  forEach(callback) {
    for (let i = 0; i < this.getLength(); i++) {
      callback(this.getElement(i), i);
    }
  }

  /**
   * Get the length of the array
   * @returns {Number} The length of the array
   */
  getLength() {
    return this.getElement('length');
  }

  /**
   * Set the length of the array
   */
  setLength(length) {
    this.writeFile('length', length);
  }
}

module.exports = FsArray;
