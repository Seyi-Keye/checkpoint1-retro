const InvertedIndex = require('./inverted-index.js');

const invertedIndex = new InvertedIndex();
const reader = new FileReader();
let files;
const fileArray = ['<option value="" disable>Select File</option>'];

function getFile(e) {
  reader.readAsText(files[0]);
}
function getOptions() {
  files = document.getElementById('upload').files;
  const someOptions = Array.from(files).map(x => `<option value=${x.name}>${x.name}</option>`);
  const resultArray = fileArray.concat(someOptions);
  document.getElementById('selectfile').innerHTML = resultArray.join('');
}

reader.onload = function (event) {
  const fileContent = JSON.parse(event.target.result);
  for (let i = 0; i < files.length; i++) {
    console.log(files[i].name);


    if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
      const ffff = invertedIndex.createIndex(files[i].name, fileContent);
      const indexObject = invertedIndex.getIndex();


      const display = ['<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1 </b><td id="book2"><b> Book 2 </b></td></td></tr>'];
      Object.keys(indexObject).map((key) => {
        display.push(`<tr><td id="words" + key + >${key}<td>${indexObject[key].indexOf(0) > -1 ? 'mark' : 'cancel'}</td>` + `<td>${indexObject[key].indexOf(1) > -1 ? 'mark' : 'cancel'}</td>` + '</td></tr>');
        document.getElementById('result').innerHTML = display.join(' ');
      });
    }
  }
};
const fileInput = document.getElementById('upload');
const onSelect = document.getElementById('selectfile');
onSelect.addEventListener('change', getFile);
fileInput.addEventListener('change', getOptions);
