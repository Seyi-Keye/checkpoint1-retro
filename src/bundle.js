(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var InvertedIndex = require('./inverted-index.js');

var invertedIndex = new InvertedIndex();

function getFile(e) {
  console.log(InvertedIndex.toString(), 'got here?');
  e.preventDefault();
  var fileArray = ['<option value="" disable>Select File</option>'];
  var files = document.getElementById('upload').files;

  var _loop = function _loop(i) {
    console.log(files[i].name);

    var reader = new FileReader();
    reader.onload = function (event) {
      console.log('Event.target', event.target.result);
      // const contentArray = event.target.result;
      var fileContent = JSON.parse(event.target.result);
      console.log(fileContent, 'file Content', i);

      if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
        fileArray.push('<option value="' + files[i].name + '">' + files[i].name + '</option>');
        var ffff = invertedIndex.createIndex(files[i].name, fileContent);
        var indexObject = invertedIndex.getIndex();

        var display = ['<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1 </b><td id="book2"><b> Book 2 </b></td></td></tr>'];
        // alert('Yes ooo');
        console.log(indexObject, '////');
        window.x = indexObject;
        for (var key in indexObject) {
          display.push('<tr><td id="words" + key + >' + key + '<td>' + (indexObject[key].indexOf(0) > -1 ? 'mark' : 'cancel') + '</td>' + '<td>' + (indexObject[key].indexOf(1) > -1 ? 'mark' : 'cancel') + '</td>' + '</td></tr>');
          console.log(indexObject[key], "hghjkkjhkjlljk");
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
  };

  for (var i = 0; i < files.length; i++) {
    _loop(i);
  }
}
var fileInput = document.getElementById('upload');
fileInput.addEventListener('change', getFile);

},{"./inverted-index.js":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InvertedIndex = function () {
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.file = {};
  }

  _createClass(InvertedIndex, [{
    key: 'createIndex',
    value: function createIndex(fileName, fileContent) {
      this.file[fileName] = fileContent;
      this.currentFile = fileContent;
    }
  }, {
    key: 'getIndex',
    value: function getIndex() {
      var tokenArray = {};
      console.log('currentFFFFile', this.currentFile);
      this.currentFile.forEach(function (element, index) {
        var text = element.text.split(' ');
        var token = Array.from(new Set(InvertedIndex.tokenize(text)));
        for (var i = 0; i < token.length; i++) {
          if (!tokenArray[token[i]]) {
            tokenArray[token[i]] = [index];
          } else {
            tokenArray[token[i]] = tokenArray[token[i]].concat(index);
          }
        }
      });
      return tokenArray;
    }
  }, {
    key: 'searchIndex',
    value: function searchIndex(arr) {
      var allText = this.getIndex();
      console.log(allText);
      var searchObj = {};
      var result = arr.reduce(function (acc, val) {
        if (allText[val]) {
          acc[val] = allText[val];
        } else {
          acc[val] = [];
        }
        return acc;
      }, {});

      console.log(result, 'whatever');
    }
  }], [{
    key: 'tokenize',
    value: function tokenize(text) {
      return text.map(function (tokens) {
        var token = tokens.toLowerCase();
        var words = token.replace(/\W/g, ' ');
        return words;
      });
    }
  }]);

  return InvertedIndex;
}();

module.exports = InvertedIndex;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0Qjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsVUFBUSxHQUFSLENBQVksY0FBYyxRQUFkLEVBQVosRUFBc0MsV0FBdEM7QUFDQSxJQUFFLGNBQUY7QUFDQSxNQUFNLFlBQVksQ0FBQywrQ0FBRCxDQUFsQjtBQUNBLE1BQU0sUUFBUSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBaEQ7O0FBSmtCLDZCQUtULENBTFM7QUFNaEIsWUFBUSxHQUFSLENBQVksTUFBTSxDQUFOLEVBQVMsSUFBckI7O0FBRUEsUUFBTSxTQUFTLElBQUksVUFBSixFQUFmO0FBQ0EsV0FBTyxNQUFQLEdBQWdCLFVBQVMsS0FBVCxFQUFnQjtBQUM5QixjQUFRLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLE1BQU0sTUFBTixDQUFhLE1BQXpDO0FBQ0E7QUFDQSxVQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsTUFBTSxNQUFOLENBQWEsTUFBeEIsQ0FBcEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLGNBQXpCLEVBQXlDLENBQXpDOztBQUVBLFVBQUksTUFBTSxPQUFOLENBQWMsV0FBZCxLQUE4QixZQUFZLE1BQTFDLElBQW9ELFlBQVksQ0FBWixFQUFlLGNBQWYsQ0FBOEIsT0FBOUIsQ0FBcEQsSUFBOEYsWUFBWSxDQUFaLEVBQWUsY0FBZixDQUE4QixNQUE5QixDQUFsRyxFQUF5STtBQUN2SSxrQkFBVSxJQUFWLENBQWUsb0JBQW9CLE1BQU0sQ0FBTixFQUFTLElBQTdCLEdBQW9DLElBQXBDLEdBQTJDLE1BQU0sQ0FBTixFQUFTLElBQXBE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QUNmLFVBQU0sVUFBVSxLQUFLLFFBQUwsRUFBaEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0EsVUFBTSxZQUFZLEVBQWxCO0FBQ0EsVUFBTSxTQUFTLElBQUksTUFBSixDQUFXLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN0QyxZQUFJLFFBQVEsR0FBUixDQUFKLEVBQWtCO0FBQ2hCLGNBQUksR0FBSixJQUFXLFFBQVEsR0FBUixDQUFYO0FBQ0QsU0FGRCxNQUdLO0FBQ0gsY0FBSSxHQUFKLElBQVcsRUFBWDtBQUNEO0FBQ0QsZUFBTyxHQUFQO0FBQ0QsT0FSYyxFQVFaLEVBUlksQ0FBZjs7QUFVQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFVBQXBCO0FBQ0Q7Ozs2QkF6Q2UsSSxFQUFNO0FBQ3BCLGFBQU8sS0FBSyxHQUFMLENBQVMsVUFBQyxNQUFELEVBQVk7QUFDMUIsWUFBTSxRQUFRLE9BQU8sV0FBUCxFQUFkO0FBQ0EsWUFBTSxRQUFRLE1BQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBZDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7QUFzQ0gsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IEludmVydGVkSW5kZXggPSByZXF1aXJlKCcuL2ludmVydGVkLWluZGV4LmpzJyk7XG5cbmNvbnN0IGludmVydGVkSW5kZXggPSBuZXcgSW52ZXJ0ZWRJbmRleCgpO1xuXG5mdW5jdGlvbiBnZXRGaWxlKGUpIHtcbiAgY29uc29sZS5sb2coSW52ZXJ0ZWRJbmRleC50b1N0cmluZygpLCAnZ290IGhlcmU/Jyk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZmlsZUFycmF5ID0gWyc8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZT5TZWxlY3QgRmlsZTwvb3B0aW9uPiddO1xuICBjb25zdCBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKS5maWxlcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGZpbGVzW2ldLm5hbWUpO1xuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFdmVudC50YXJnZXQnLCBldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIC8vIGNvbnN0IGNvbnRlbnRBcnJheSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICBjb25zdCBmaWxlQ29udGVudCA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICBjb25zb2xlLmxvZyhmaWxlQ29udGVudCwgJ2ZpbGUgQ29udGVudCcsIGkpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlQ29udGVudCkgJiYgZmlsZUNvbnRlbnQubGVuZ3RoICYmIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0aXRsZScpICYmIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgICAgZmlsZUFycmF5LnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgZmlsZXNbaV0ubmFtZSArICdcIj4nICsgZmlsZXNbaV0ubmFtZSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgY29uc3QgZmZmZiA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZXNbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgICBjb25zdCBpbmRleE9iamVjdCA9IGludmVydGVkSW5kZXguZ2V0SW5kZXgoKTtcblxuXG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSBbJzx0cj48dGQgaWQ9XCJ3b3Jkc1wiPjxiPiBXb3JkcyBUb2tlbiA8L2I+PC90ZD48dGQgaWQ9XCJib29rMVwiPjxiPiBCb29rIDEgPC9iPjx0ZCBpZD1cImJvb2syXCI+PGI+IEJvb2sgMiA8L2I+PC90ZD48L3RkPjwvdHI+J107XG4gICAgICAgIC8vIGFsZXJ0KCdZZXMgb29vJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4T2JqZWN0LCAnLy8vLycpO1xuICAgICAgICB3aW5kb3cueCA9IGluZGV4T2JqZWN0O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBpbmRleE9iamVjdCkge1xuICAgICAgICAgIGRpc3BsYXkucHVzaCgnPHRyPjx0ZCBpZD1cIndvcmRzXCIgKyBrZXkgKyA+JyArIGtleSArICc8dGQ+JyArIChpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMCkgPiAtMSA/ICdtYXJrJyA6J2NhbmNlbCcpICsgJzwvdGQ+JyArICc8dGQ+JyArIChpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMSkgPiAtMSA/ICdtYXJrJyA6J2NhbmNlbCcpICsgJzwvdGQ+JyArICc8L3RkPjwvdHI+Jyk7XG4gICAgICAgICAgY29uc29sZS5sb2coaW5kZXhPYmplY3Rba2V5XSwgXCJoZ2hqa2tqaGtqbGxqa1wiKVxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUwgPSBkaXNwbGF5LmpvaW4oJyAnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkaXNwbGF5LmpvaW4oJycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbmRleE9iamVjdC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnSSBnb3QgaGVyZScsIGtleSk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIGZvciAoY29uc3QgdmFsdWUgaW4gaW5kZXhPYmplY3QpIHtcbiAgICAgICAgLy8gICBjb25zdCB2YWx1ZUFycmF5ID0gWyc8dHI+PHRkIGlkPVwidmFsdWVcIj4nICsgdmFsdWUgKyAnPC90ZD48L3RyPiddO1xuICAgICAgICAvLyAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUw9IHZhbHVlQXJyYXkuam9pbignICcpO1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmRleCBzdGlsbCBkZXkga2V0ZWV0JywgZWxlbWVudCk7XG4gICAgICAgIC8vIGRpc3BsYXkucHVzaCgnPHRkIGlkPVwid29yZHNcIiArIGtleSArID4nICsga2V5ICsgJzwvdGQ+Jyk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgfVxuICAgICAgLy8gZWxzZSB7XG4gICAgICAvLyAgIGFsZXJ0KCdXcm9uZyBDb250ZW50IEZvcm1hdCcpO1xuICAgICAgLy8gfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGZpbGUnKS5pbm5lckhUTUwgPSBmaWxlQXJyYXkuam9pbignJyk7XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlc1tpXSk7XG4gIH1cbn1cbmNvbnN0IGZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKTtcbmZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBnZXRGaWxlKTtcbiIsImNsYXNzIEludmVydGVkSW5kZXgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpbGUgPSB7fTtcbiAgfVxuXG4gIGNyZWF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudCkge1xuICAgIHRoaXMuZmlsZVtmaWxlTmFtZV0gPSBmaWxlQ29udGVudDtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gZmlsZUNvbnRlbnQ7XG4gIH1cblxuICBzdGF0aWMgdG9rZW5pemUodGV4dCkge1xuICAgIHJldHVybiB0ZXh0Lm1hcCgodG9rZW5zKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vucy50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgd29yZHMgPSB0b2tlbi5yZXBsYWNlKC9cXFcvZywgJyAnKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIGNvbnN0IHRva2VuQXJyYXkgPSB7fTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudEZGRkZpbGUnLCB0aGlzLmN1cnJlbnRGaWxlKTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0LnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCB0b2tlbiA9IEFycmF5LmZyb20obmV3IFNldChJbnZlcnRlZEluZGV4LnRva2VuaXplKHRleHQpKSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdG9rZW5BcnJheVt0b2tlbltpXV0pIHtcbiAgICAgICAgICB0b2tlbkFycmF5W3Rva2VuW2ldXSA9IFtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdG9rZW5BcnJheVt0b2tlbltpXV0gPSB0b2tlbkFycmF5W3Rva2VuW2ldXS5jb25jYXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuQXJyYXk7XG4gIH1cblxuICBzZWFyY2hJbmRleChhcnIpIHtcbiAgICBjb25zdCBhbGxUZXh0ID0gdGhpcy5nZXRJbmRleCgpO1xuICAgIGNvbnNvbGUubG9nKGFsbFRleHQpO1xuICAgIGNvbnN0IHNlYXJjaE9iaiA9IHt9O1xuICAgIGNvbnN0IHJlc3VsdCA9IGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZiAoYWxsVGV4dFt2YWxdKSB7XG4gICAgICAgIGFjY1t2YWxdID0gYWxsVGV4dFt2YWxdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjY1t2YWxdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnNvbGUubG9nKHJlc3VsdCwgJ3doYXRldmVyJyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnZlcnRlZEluZGV4OyJdfQ==
