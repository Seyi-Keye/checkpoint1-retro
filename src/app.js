const InvertedIndex = require('./inverted-index.js');

const invertedIndex = new InvertedIndex();

function getFile(e) {
  console.log(InvertedIndex.toString(), 'got here?');
  e.preventDefault();
  const fileArray = ['<option value="" disable>Select File</option>'];
  const files = document.getElementById('upload').files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i].name);

    const reader = new FileReader();
    reader.onload = function(event) {
      console.log('Event.target', event.target.result);
      // const contentArray = event.target.result;
      const fileContent = JSON.parse(event.target.result);
      console.log(fileContent, 'file Content', i);

      if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
        fileArray.push('<option value="' + files[i].name + '">' + files[i].name + '</option>');
        const ffff = invertedIndex.createIndex(files[i].name, fileContent);
        const index = invertedIndex.getIndex();
        console.log('I got here', index);


        const display = ['<td id="words">Jill</td>'];
        alert('Yes ooo');
console.log('index still dey keteet', index)
        index.forEach((element) => {
          display.push('<td id="words" + element + >' + element + '</td>');
        });
      } else {
        alert('Wrong Content Format');
      }
      document.getElementById('selectfile').innerHTML = fileArray.join('');
    };
    reader.readAsText(files[i]);
  }
}
const fileInput = document.getElementById('upload');
fileInput.addEventListener('change', getFile);
