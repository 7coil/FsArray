const fs = require('fs');
const path = require('path');

class FsArray {
  /**
   * Create a new FileSystem Array
   * @param {String} name The name of the array
   * @param {(Number|*[])} array The length, or a set of existing iterable items.
   */
  constructor(name, array) {
    this.name = name;
    this.length = 0;

    // Make a temp folder
    try {
      fs.mkdirSync(path.join('/', 'tmp', name));
    } catch (e) {
      // ree
    }

    // Check iterability
    // https://stackoverflow.com/questions/18884249/checking-whether-something-is-iterable
    if (array !== null && array !== undefined && typeof array[Symbol.iterator] === 'function') {
      const items = [...array];
      // If it is iterable, iterate through each element and push the element into the stack
      items.forEach((element) => {
        push(element);
      })
      this.length = items.length;
    } else if (typeof array === 'number') {
      // If it's a number, create files from 0 to the number.
      for (let i = 0; i < array; i += 1) {
        this.push(undefined);
      }
    }
  }

  /**
   * Push any JSON compatible element into the array
   * @param {*} element A single element to push
   */
  push(element) {
    // Increase the array length by one, and add the next element to the end.
    this.length += 1;
    this.setElement(this.length - 1, element);
  }
  
  /**
   * Retrieve all elements and return a JavaScript Array
   * @returns {Array} An array of all elements
   */
  toArray() {
    const array = [];
    for (let i = 0; i < this.length; i += 1) {
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
    if (contents === 'undefined') {
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
    if (index >= this.length) {
      return undefined;
    } else if (index < 0) {
      return undefined;
    } else {
      fs.writeFileSync(path.join('/', 'tmp', this.name, "" + index), JSON.stringify(element));
    }
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this.getElement(i), i);
    }
  }
}

module.exports = FsArray;
