/**
 * InvertedIndex class with constructor
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.file = {};
  }

  /**
   * Create index
   * @function
   * @param {string} fileName Name of the json input file
   * @param {Array} fileContent array content of input file
   * @return {void}
   */
  createIndex(fileName, fileContent) {
    this.file[fileName] = fileContent;
    this.currentFile = fileContent;
  }

  /**
   * Static tokenize gets all words without symbols
   * @function
   * @param {string} text
   * @return {array} array of words in lowercase without symbols
   */
  static tokenize(text) {
    return text.map((tokens) => {
      const token = tokens.toLowerCase();
      const words = token.replace(/\W/g, ' ');
      return words;
    });
  }

  /**
   * getIndex
   * @function
   * @return {Object} tokenObect
   */
  getIndex() {
    const tokenObect = {};
    this.currentFile.forEach((element, index) => {
      const text = element.text.split(' ');
      const token = Array.from(new Set(InvertedIndex.tokenize(text)));
      for (let i = 0; i < token.length; i++) {
        if (!tokenObect[token[i]]) {
          tokenObect[token[i]] = [index];
        }
        else {
          tokenObect[token[i]] = tokenObect[token[i]].concat(index);
        }
      }
    });
    return tokenObect;
  }

  /**
   * searchIndex
   * @function
   * @param {array} arr input to search
   * @return {Object} acc of search term with index as value
   */
  searchIndex(arr) {
    const allText = this.getIndex();
    const searchObj = {};
    const result = arr.reduce((acc, val) => {
      if (allText[val]) {
        acc[val] = allText[val];
      }
      else {
        acc[val] = [];
      }
      return acc;
    }, {});
  }
}

module.exports = InvertedIndex;
