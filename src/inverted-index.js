class InvertedIndex {
  constructor() {
    this.file = {};
  }

  createIndex(fileName, fileContent) {
    this.file[fileName] = fileContent;
    this.currentFile = fileContent;
    const contentArray = [];
    this.getIndex();
  }

  static tokenize(text) {
    return text.map((tokens) => {
      const token = tokens.toLowerCase();
      const words = token.replace(/\W/g, ' ');
      return words;
    });
  }

  getIndex() {
    const tokenArray = {};
    this.currentFile.forEach((element, index) => {
      const text = element.text.split(' ');
      const token = Array.from(new Set(InvertedIndex.tokenize(text)));
      for (let i = 0; i < token.length; i++) {
        if (!tokenArray[token[i]]) {
          tokenArray[token[i]] = [index];
        }
        else {
          tokenArray[token[i]] = tokenArray[token[i]].concat(index);
        }
      }
    });
    return tokenArray;
  }

  searchIndex(arr) {
    const allText = this.getIndex();
    console.log(allText);
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

    console.log(result, 'whatever');
  }
}
