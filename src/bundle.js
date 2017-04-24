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
        var index = invertedIndex.getIndex();
        console.log('I got here', index);

        var display = ['<td id="words">Jill</td>'];
        alert('Yes ooo');
        console.log('index still dey keteet', index);
        index.forEach(function (element) {
          display.push('<td id="words" + element + >' + element + '</td>');
        });
      } else {
        alert('Wrong Content Format');
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0Qjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsVUFBUSxHQUFSLENBQVksY0FBYyxRQUFkLEVBQVosRUFBc0MsV0FBdEM7QUFDQSxJQUFFLGNBQUY7QUFDQSxNQUFNLFlBQVksQ0FBQywrQ0FBRCxDQUFsQjtBQUNBLE1BQU0sUUFBUSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBaEQ7O0FBSmtCLDZCQUtULENBTFM7QUFNaEIsWUFBUSxHQUFSLENBQVksTUFBTSxDQUFOLEVBQVMsSUFBckI7O0FBRUEsUUFBTSxTQUFTLElBQUksVUFBSixFQUFmO0FBQ0EsV0FBTyxNQUFQLEdBQWdCLFVBQVMsS0FBVCxFQUFnQjtBQUM5QixjQUFRLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLE1BQU0sTUFBTixDQUFhLE1BQXpDO0FBQ0E7QUFDQSxVQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsTUFBTSxNQUFOLENBQWEsTUFBeEIsQ0FBcEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLGNBQXpCLEVBQXlDLENBQXpDOztBQUVBLFVBQUksTUFBTSxPQUFOLENBQWMsV0FBZCxLQUE4QixZQUFZLE1BQTFDLElBQW9ELFlBQVksQ0FBWixFQUFlLGNBQWYsQ0FBOEIsT0FBOUIsQ0FBcEQsSUFBOEYsWUFBWSxDQUFaLEVBQWUsY0FBZixDQUE4QixNQUE5QixDQUFsRyxFQUF5STtBQUN2SSxrQkFBVSxJQUFWLENBQWUsb0JBQW9CLE1BQU0sQ0FBTixFQUFTLElBQTdCLEdBQW9DLElBQXBDLEdBQTJDLE1BQU0sQ0FBTixFQUFTLElBQXBE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TSxRQUFRLE9BQU8sV0FBUCxFQUFkO0FBQ0EsWUFBTSxRQUFRLE1BQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBZDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7QUFzQ0gsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IEludmVydGVkSW5kZXggPSByZXF1aXJlKCcuL2ludmVydGVkLWluZGV4LmpzJyk7XG5cbmNvbnN0IGludmVydGVkSW5kZXggPSBuZXcgSW52ZXJ0ZWRJbmRleCgpO1xuXG5mdW5jdGlvbiBnZXRGaWxlKGUpIHtcbiAgY29uc29sZS5sb2coSW52ZXJ0ZWRJbmRleC50b1N0cmluZygpLCAnZ290IGhlcmU/Jyk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZmlsZUFycmF5ID0gWyc8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZT5TZWxlY3QgRmlsZTwvb3B0aW9uPiddO1xuICBjb25zdCBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKS5maWxlcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGZpbGVzW2ldLm5hbWUpO1xuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFdmVudC50YXJnZXQnLCBldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIC8vIGNvbnN0IGNvbnRlbnRBcnJheSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICBjb25zdCBmaWxlQ29udGVudCA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICBjb25zb2xlLmxvZyhmaWxlQ29udGVudCwgJ2ZpbGUgQ29udGVudCcsIGkpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlQ29udGVudCkgJiYgZmlsZUNvbnRlbnQubGVuZ3RoICYmIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0aXRsZScpICYmIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgICAgZmlsZUFycmF5LnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgZmlsZXNbaV0ubmFtZSArICdcIj4nICsgZmlsZXNbaV0ubmFtZSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgY29uc3QgZmZmZiA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZXNbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IGludmVydGVkSW5kZXguZ2V0SW5kZXgoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0kgZ290IGhlcmUnLCBpbmRleCk7XG5cblxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gWyc8dGQgaWQ9XCJ3b3Jkc1wiPkppbGw8L3RkPiddO1xuICAgICAgICBhbGVydCgnWWVzIG9vbycpO1xuY29uc29sZS5sb2coJ2luZGV4IHN0aWxsIGRleSBrZXRlZXQnLCBpbmRleClcbiAgICAgICAgaW5kZXguZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgIGRpc3BsYXkucHVzaCgnPHRkIGlkPVwid29yZHNcIiArIGVsZW1lbnQgKyA+JyArIGVsZW1lbnQgKyAnPC90ZD4nKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydCgnV3JvbmcgQ29udGVudCBGb3JtYXQnKTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RmaWxlJykuaW5uZXJIVE1MID0gZmlsZUFycmF5LmpvaW4oJycpO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZXNbaV0pO1xuICB9XG59XG5jb25zdCBmaWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJyk7XG5maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0RmlsZSk7XG4iLCJjbGFzcyBJbnZlcnRlZEluZGV4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxlID0ge307XG4gIH1cblxuICBjcmVhdGVJbmRleChmaWxlTmFtZSwgZmlsZUNvbnRlbnQpIHtcbiAgICB0aGlzLmZpbGVbZmlsZU5hbWVdID0gZmlsZUNvbnRlbnQ7XG4gICAgdGhpcy5jdXJyZW50RmlsZSA9IGZpbGVDb250ZW50O1xuICB9XG5cbiAgc3RhdGljIHRva2VuaXplKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5tYXAoKHRva2VucykgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnMudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHdvcmRzID0gdG9rZW4ucmVwbGFjZSgvXFxXL2csICcgJyk7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSk7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICBjb25zdCB0b2tlbkFycmF5ID0ge307XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnRGRkZGaWxlJywgdGhpcy5jdXJyZW50RmlsZSk7XG4gICAgdGhpcy5jdXJyZW50RmlsZS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dC5zcGxpdCgnICcpO1xuICAgICAgY29uc3QgdG9rZW4gPSBBcnJheS5mcm9tKG5ldyBTZXQoSW52ZXJ0ZWRJbmRleC50b2tlbml6ZSh0ZXh0KSkpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRva2VuQXJyYXlbdG9rZW5baV1dKSB7XG4gICAgICAgICAgdG9rZW5BcnJheVt0b2tlbltpXV0gPSBbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRva2VuQXJyYXlbdG9rZW5baV1dID0gdG9rZW5BcnJheVt0b2tlbltpXV0uY29uY2F0KGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbkFycmF5O1xuICB9XG5cbiAgc2VhcmNoSW5kZXgoYXJyKSB7XG4gICAgY29uc3QgYWxsVGV4dCA9IHRoaXMuZ2V0SW5kZXgoKTtcbiAgICBjb25zb2xlLmxvZyhhbGxUZXh0KTtcbiAgICBjb25zdCBzZWFyY2hPYmogPSB7fTtcbiAgICBjb25zdCByZXN1bHQgPSBhcnIucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgaWYgKGFsbFRleHRbdmFsXSkge1xuICAgICAgICBhY2NbdmFsXSA9IGFsbFRleHRbdmFsXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2NbdmFsXSA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQsICd3aGF0ZXZlcicpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW52ZXJ0ZWRJbmRleDsiXX0=
