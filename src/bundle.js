(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var InvertedIndex = require('./inverted-index.js');

var invertedIndex = new InvertedIndex();
var reader = new FileReader();
var files = void 0;
var fileData = void 0;
var fileArray = ['<option value="" disable>Select File</option>'];

/**
 * getFile function
 *
 * @return
 * **/
function getFile(e) {
  console.log(e.target.value, 'value');
  reader.readAsText(fileData[e.target.value]);
}

/**
 * getOptions function
 *
 * @return
 * **/
function getOptions() {
  files = document.getElementById('upload').files;
  var someFiles = Array.from(files);
  console.log(someFiles, 'somefiles');
  fileData = someFiles.reduce(function (acc, val) {
    console.log('val', val.name);
    acc[val.name] = val;
    console.log('acc', acc);
    return acc;
  }, {});
  var someOptions = Array.from(files).map(function (x) {
    return '<option value=' + x.name + '>' + x.name + '</option>';
  });
  var resultArray = fileArray.concat(someOptions);
  document.getElementById('selectfile').innerHTML = resultArray.join('');
}

reader.onload = function (event) {
  var fileContent = JSON.parse(event.target.result);
  for (var i = 0; i < fileContent.length; i++) {
    console.log(fileContent[i].name);

    if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
      (function () {
        var ffff = invertedIndex.createIndex(fileContent[i].name, fileContent);
        var indexObject = invertedIndex.getIndex();

        var display = ['<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1 </b><td id="book2"><b> Book 2 </b></td></td></tr>'];
        Object.keys(indexObject).map(function (key) {
          display.push('<tr><td id="words" + key + >' + key + '<td>' + (indexObject[key].indexOf(0) > -1 ? 'mark' : 'cancel') + '</td>' + ('<td>' + (indexObject[key].indexOf(1) > -1 ? 'mark' : 'cancel') + '</td>') + '</td></tr>');
          document.getElementById('result').innerHTML = display.join(' ');
        });
      })();
    }
  }
};
var fileInput = document.getElementById('upload');
var onSelect = document.getElementById('selectfile');
onSelect.addEventListener('change', getFile);
fileInput.addEventListener('change', getOptions);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0QjtBQUNBLElBQU0sU0FBUyxJQUFJLFVBQUosRUFBZjtBQUNBLElBQUksY0FBSjtBQUNBLElBQUksaUJBQUo7QUFDQSxJQUFNLFlBQVksQ0FBQywrQ0FBRCxDQUFsQjs7QUFFQTs7Ozs7QUFLQSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsVUFBUSxHQUFSLENBQVksRUFBRSxNQUFGLENBQVMsS0FBckIsRUFBNEIsT0FBNUI7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsU0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFsQixDQUFsQjtBQUNEOztBQUVEOzs7OztBQUtBLFNBQVMsVUFBVCxHQUFzQjtBQUNwQixVQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQyxLQUExQztBQUNBLE1BQU0sWUFBWSxNQUFNLElBQU4sQ0FBVyxLQUFYLENBQWxCO0FBQ0EsVUFBUSxHQUFSLENBQVksU0FBWixFQUF1QixXQUF2QjtBQUNBLGFBQVcsVUFBVSxNQUFWLENBQWlCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN4QyxZQUFRLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLElBQUksSUFBdkI7QUFDQSxRQUFJLElBQUksSUFBUixJQUFnQixHQUFoQjtBQUNBLFlBQVEsR0FBUixDQUFZLEtBQVosRUFBbUIsR0FBbkI7QUFDQSxXQUFPLEdBQVA7QUFDRCxHQUxVLEVBS1IsRUFMUSxDQUFYO0FBTUEsTUFBTSxjQUFjLE1BQU0sSUFBTixDQUFXLEtBQVgsRUFBa0IsR0FBbEIsQ0FBc0I7QUFBQSw4QkFBc0IsRUFBRSxJQUF4QixTQUFnQyxFQUFFLElBQWxDO0FB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TUFBTSxDQUFOLENBQVgsRUFBcUIsTUFBckIsQ0FBNEIsS0FBNUIsQ0FBdkI7QUFDRDtBQUNGO0FBQ0YsT0FYRDtBQVlBLGFBQU8sVUFBUDtBQUNEOzs7Z0NBRVcsRyxFQUFLO0FBQ2YsVUFBTSxVQUFVLEtBQUssUUFBTCxFQUFoQjtBQUNBLGNBQVEsR0FBUixDQUFZLE9BQVo7QUFDQSxVQUFNLFlBQVksRUFBbEI7QUFDQSxVQUFNLFNBQVMsSUFBSSxNQUFKLENBQVcsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQ3RDLFlBQUksUUFBUSxHQUFSLENBQUosRUFBa0I7QUFDaEIsY0FBSSxHQUFKLElBQVcsUUFBUSxHQUFSLENBQVg7QUFDRCxTQUZELE1BR0s7QUFDSCxjQUFJLEdBQUosSUFBVyxFQUFYO0FBQ0Q7QUFDRCxlQUFPLEdBQVA7QUFDRCxPQVJjLEVBUVosRUFSWSxDQUFmOztBQVVBLGNBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsVUFBcEI7QUFDRDs7OzZCQXpDZSxJLEVBQU07QUFDcEIsYUFBTyxLQUFLLEdBQUwsQ0FBUyxVQUFDLE1BQUQsRUFBWTtBQUMxQixZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxZQUFNLFFBQVEsTUFBTSxPQUFOLENBQWMsS0FBZCxFQUFxQixHQUFyQixDQUFkO0FBQ0EsZUFBTyxLQUFQO0FBQ0QsT0FKTSxDQUFQO0FBS0Q7Ozs7OztBQXNDSCxPQUFPLE9BQVAsR0FBaUIsYUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgSW52ZXJ0ZWRJbmRleCA9IHJlcXVpcmUoJy4vaW52ZXJ0ZWQtaW5kZXguanMnKTtcblxuY29uc3QgaW52ZXJ0ZWRJbmRleCA9IG5ldyBJbnZlcnRlZEluZGV4KCk7XG5jb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xubGV0IGZpbGVzO1xubGV0IGZpbGVEYXRhO1xuY29uc3QgZmlsZUFycmF5ID0gWyc8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZT5TZWxlY3QgRmlsZTwvb3B0aW9uPiddO1xuXG4vKipcbiAqIGdldEZpbGUgZnVuY3Rpb25cbiAqXG4gKiBAcmV0dXJuXG4gKiAqKi9cbmZ1bmN0aW9uIGdldEZpbGUoZSkge1xuICBjb25zb2xlLmxvZyhlLnRhcmdldC52YWx1ZSwgJ3ZhbHVlJyk7XG4gIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVEYXRhW2UudGFyZ2V0LnZhbHVlXSk7XG59XG5cbi8qKlxuICogZ2V0T3B0aW9ucyBmdW5jdGlvblxuICpcbiAqIEByZXR1cm5cbiAqICoqL1xuZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJykuZmlsZXM7XG4gIGNvbnN0IHNvbWVGaWxlcyA9IEFycmF5LmZyb20oZmlsZXMpO1xuICBjb25zb2xlLmxvZyhzb21lRmlsZXMsICdzb21lZmlsZXMnKTtcbiAgZmlsZURhdGEgPSBzb21lRmlsZXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCd2YWwnLCB2YWwubmFtZSk7XG4gICAgYWNjW3ZhbC5uYW1lXSA9IHZhbDtcbiAgICBjb25zb2xlLmxvZygnYWNjJywgYWNjKVxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgY29uc3Qgc29tZU9wdGlvbnMgPSBBcnJheS5mcm9tKGZpbGVzKS5tYXAoeCA9PiBgPG9wdGlvbiB2YWx1ZT0ke3gubmFtZX0+JHt4Lm5hbWV9PC9vcHRpb24+YCk7XG4gIGNvbnN0IHJlc3VsdEFycmF5ID0gZmlsZUFycmF5LmNvbmNhdChzb21lT3B0aW9ucyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RmaWxlJykuaW5uZXJIVE1MID0gcmVzdWx0QXJyYXkuam9pbignJyk7XG59XG5cbnJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgZmlsZUNvbnRlbnQgPSBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc29sZS5sb2coZmlsZUNvbnRlbnRbaV0ubmFtZSk7XG5cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVDb250ZW50KSAmJiBmaWxlQ29udGVudC5sZW5ndGggJiYgZmlsZUNvbnRlbnRbaV0uaGFzT3duUHJvcGVydHkoJ3RpdGxlJykgJiYgZmlsZUNvbnRlbnRbaV0uaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xuICAgICAgY29uc3QgZmZmZiA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZUNvbnRlbnRbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgY29uc3QgaW5kZXhPYmplY3QgPSBpbnZlcnRlZEluZGV4LmdldEluZGV4KCk7XG5cblxuICAgICAgY29uc3QgZGlzcGxheSA9IFsnPHRyPjx0ZCBpZD1cIndvcmRzXCI+PGI+IFdvcmRzIFRva2VuIDwvYj48L3RkPjx0ZCBpZD1cImJvb2sxXCI+PGI+IEJvb2sgMSA8L2I+PHRkIGlkPVwiYm9vazJcIj48Yj4gQm9vayAyIDwvYj48L3RkPjwvdGQ+PC90cj4nXTtcbiAgICAgIE9iamVjdC5rZXlzKGluZGV4T2JqZWN0KS5tYXAoKGtleSkgPT4ge1xuICAgICAgICBkaXNwbGF5LnB1c2goYDx0cj48dGQgaWQ9XCJ3b3Jkc1wiICsga2V5ICsgPiR7a2V5fTx0ZD4ke2luZGV4T2JqZWN0W2tleV0uaW5kZXhPZigwKSA+IC0xID8gJ21hcmsnIDogJ2NhbmNlbCd9PC90ZD5gICsgYDx0ZD4ke2luZGV4T2JqZWN0W2tleV0uaW5kZXhPZigxKSA+IC0xID8gJ21hcmsnIDogJ2NhbmNlbCd9PC90ZD5gICsgJzwvdGQ+PC90cj4nKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9IGRpc3BsYXkuam9pbignICcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuY29uc3QgZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZCcpO1xuY29uc3Qgb25TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZmlsZScpO1xub25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0RmlsZSk7XG5maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0T3B0aW9ucyk7XG4iLCJjbGFzcyBJbnZlcnRlZEluZGV4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxlID0ge307XG4gIH1cblxuICBjcmVhdGVJbmRleChmaWxlTmFtZSwgZmlsZUNvbnRlbnQpIHtcbiAgICB0aGlzLmZpbGVbZmlsZU5hbWVdID0gZmlsZUNvbnRlbnQ7XG4gICAgdGhpcy5jdXJyZW50RmlsZSA9IGZpbGVDb250ZW50O1xuICB9XG5cbiAgc3RhdGljIHRva2VuaXplKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5tYXAoKHRva2VucykgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnMudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHdvcmRzID0gdG9rZW4ucmVwbGFjZSgvXFxXL2csICcgJyk7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSk7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICBjb25zdCB0b2tlbkFycmF5ID0ge307XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnRGRkZGaWxlJywgdGhpcy5jdXJyZW50RmlsZSk7XG4gICAgdGhpcy5jdXJyZW50RmlsZS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dC5zcGxpdCgnICcpO1xuICAgICAgY29uc3QgdG9rZW4gPSBBcnJheS5mcm9tKG5ldyBTZXQoSW52ZXJ0ZWRJbmRleC50b2tlbml6ZSh0ZXh0KSkpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRva2VuQXJyYXlbdG9rZW5baV1dKSB7XG4gICAgICAgICAgdG9rZW5BcnJheVt0b2tlbltpXV0gPSBbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRva2VuQXJyYXlbdG9rZW5baV1dID0gdG9rZW5BcnJheVt0b2tlbltpXV0uY29uY2F0KGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbkFycmF5O1xuICB9XG5cbiAgc2VhcmNoSW5kZXgoYXJyKSB7XG4gICAgY29uc3QgYWxsVGV4dCA9IHRoaXMuZ2V0SW5kZXgoKTtcbiAgICBjb25zb2xlLmxvZyhhbGxUZXh0KTtcbiAgICBjb25zdCBzZWFyY2hPYmogPSB7fTtcbiAgICBjb25zdCByZXN1bHQgPSBhcnIucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgaWYgKGFsbFRleHRbdmFsXSkge1xuICAgICAgICBhY2NbdmFsXSA9IGFsbFRleHRbdmFsXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2NbdmFsXSA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQsICd3aGF0ZXZlcicpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW52ZXJ0ZWRJbmRleDsiXX0=
