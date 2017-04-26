/**
 * InvertedIndex javascript code for frontend
 */
const InvertedIndex = require('./inverted-index.js');

const invertedIndex = new InvertedIndex();
const reader = new FileReader();
const reader2 = new FileReader();
let display;
let fileData;
const fileArray = ['<option value="" disable>Select File</option>'];

/**
 * getFile function
 * @param {event} e
 * @return {void}
 **/
function getFile(e) {
  e.preventDefault();
  reader.readAsText(fileData[e.target.value]);
}

function readFiles(someFiles) {
  const shallowFiles = [...someFiles];
  if (shallowFiles.length > 0) {
    const file = shallowFiles.shift();
    reader2.onloadend = function (loadEvent) {
      console.log(loadEvent.target.result, 'results');
      const fileContent = JSON.parse(loadEvent.target.result);
      if (Array.isArray(fileContent) && fileContent.length &&
        fileContent[0].hasOwnProperty('title') &&
        fileContent[0].hasOwnProperty('text')) {
        fileArray.push(`<option value=${file.name}>${file.name}</option>`);
      }
      readFiles(shallowFiles);
    };
    reader2.readAsText(file);
  } else {
    document.getElementById('selectfile').innerHTML = fileArray.join(' ');
  }
}

/**
 * getOptions function
 * @return {Object} acc to populate the select options
 * **/
function getOptions() {
  const files = document.getElementById('upload').files;
  const someFiles = Array.from(files);
  fileData = someFiles.reduce((acc, val) => {
    acc[val.name] = val;
    return acc;
  }, {});
  readFiles(files);
  // const someOptions = someFiles.map(x =>
  // `<option value=${x.name}>${x.name}</option>`);
  // const resultArray = fileArray.concat(someOptions);
}


reader.onloadend = function readFile(event) {
  const fileContent = JSON.parse(event.target.result);
  console.log(fileContent, 'file contnet');

  for (let i = 0; i < fileContent.length; i++) {
    if (Array.isArray(fileContent) && fileContent.length &&
    fileContent[i].hasOwnProperty('title') &&
    fileContent[i].hasOwnProperty('text')) {
      const create = invertedIndex.createIndex(fileContent[i].name, fileContent);
      const indexObject = invertedIndex.getIndex();

      display =
      [`<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1
      </b><td id="book2"><b> Book 2 </b></td></td></tr>`];
      Object.keys(indexObject).map((key) => {
        display.push(`<tr><td id="words" + key + >${key}
        <td>${indexObject[key].indexOf(0) > -1 ? 'mark' : 'cancel'}</td>` +
        `<td>${indexObject[key].indexOf(1) > -1 ? 'mark' : 'cancel'}</td>` +
        '</td></tr>');
        document.getElementById('result').innerHTML = display.join(' ');
      });
    }
  }
};
const fileInput = document.getElementById('upload');
const onSelect = document.getElementById('selectfile');
onSelect.addEventListener('change', getFile);
// const myButton = document.getElementById('create');
// myButton.addEventListener('click', getFile);
fileInput.addEventListener('change', getOptions);
