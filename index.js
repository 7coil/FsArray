const fs = require('fs');
const path = require('path');

class FsArray {
  /**
   * Create a new FileSystem Array
   * @param {String} path The path to the location in which arrays are stored
   */
  constructor(path) {
    this.path = path;

    // Create a new FsArray workspace
    // Make a temp folder
    try {
      const info = fs.lstatSync(path);

      // If the path is a file, it cannot use the folder.
      if (info.isFile()) {
        throw new Error('Cannot create FsArray as the path is a file, and not a folder.');
      }
    } catch (e) {
      // If the folder doesn't exist, create the folder
      fs.mkdirSync(path);
      this.setLength(0);
    }
  }

  /**
   * Push any JSON compatible element into the array
   * @param {*} element A single element to push
   */
  push(element) {
    const length = this.getLength();
    this.setLength(length + 1);
    this.setElement(length, element);
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
    const contents = fs.readFileSync(path.join(this.path, `${index}.json`), 'UTF-8');

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
    fs.writeFileSync(path.join(this.path, `${index}.json`), JSON.stringify(contents, null, 2) + "\n");
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
  
  clearArray() {
    if (this.getLength() > 0) {
      const files = fs.readdirSync(this.path);
      files.forEach((file) => {
        fs.unlinkSync(path.join(this.path, file));
      });
      this.setLength(0);
    }
  }
}

module.exports = FsArray;
