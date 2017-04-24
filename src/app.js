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
        const indexObject = invertedIndex.getIndex();


        const display = ['<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1 </b><td id="book2"><b> Book 2 </b></td></td></tr>'];
        // alert('Yes ooo');
        console.log(indexObject, '////');
        window.x = indexObject;
        for (const key in indexObject) {
          display.push('<tr><td id="words" + key + >' + key + '<td>' + (indexObject[key].indexOf(0) > -1 ? 'mark' :'cancel') + '</td>' + '<td>' + (indexObject[key].indexOf(1) > -1 ? 'mark' :'cancel') + '</td>' + '</td></tr>');
          console.log(indexObject[key], "hghjkkjhkjlljk")
          document.getElementById('result').innerHTML = display.join(' ');
          console.log(display.join(''));
        }
        // indexObject.forEach((key) => {
        //   console.log('I got here', key);
        // });

        // for (const value in indexObject) {
        //   const valueArray = ['<tr><td id="value">' + value + '</td></tr>'];
        //   // document.getElementById('result').innerHTML= valueArray.join(' ');
        //   console.log(value);
        // }

        // console.log('index still dey keteet', element);
        // display.push('<td id="words" + key + >' + key + '</td>');
        // });
      }
      // else {
      //   alert('Wrong Content Format');
      // }
      document.getElementById('selectfile').innerHTML = fileArray.join('');
    };
    reader.readAsText(files[i]);
  }
}
const fileInput = document.getElementById('upload');
fileInput.addEventListener('change', getFile);
