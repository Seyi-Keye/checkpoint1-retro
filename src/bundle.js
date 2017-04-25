(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * InvertedIndex javascript code for frontend
 */
var InvertedIndex = require('./inverted-index.js');

var invertedIndex = new InvertedIndex();
var reader = new FileReader();
var files = void 0;
var fileData = void 0;
var fileArray = ['<option value="" disable>Select File</option>'];

/**
 * getFile function
 * @param {event} e
 * @return {void}
 **/
function getFile(e) {
  reader.readAsText(fileData[e.target.value]);
}

/**
 * getOptions function
 * @return {Object} acc to populate the select options
 * **/
function getOptions() {
  files = document.getElementById('upload').files;
  var someFiles = Array.from(files);
  fileData = someFiles.reduce(function (acc, val) {
    acc[val.name] = val;
    return acc;
  }, {});
  var someOptions = someFiles.map(function (x) {
    return '<option value=' + x.name + '>' + x.name + '</option>';
  });
  var resultArray = fileArray.concat(someOptions);
  document.getElementById('selectfile').innerHTML = resultArray.join('');
}

reader.onload = function readFile(event) {
  var fileContent = JSON.parse(event.target.result);
  for (var i = 0; i < fileContent.length; i++) {
    if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
      (function () {
        var create = invertedIndex.createIndex(fileContent[i].name, fileContent);
        var indexObject = invertedIndex.getIndex();

        var display = ['<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1\n      </b><td id="book2"><b> Book 2 </b></td></td></tr>'];
        Object.keys(indexObject).map(function (key) {
          display.push('<tr><td id="words" + key + >' + key + '\n        <td>' + (indexObject[key].indexOf(0) > -1 ? 'mark' : 'cancel') + '</td>' + ('<td>' + (indexObject[key].indexOf(1) > -1 ? 'mark' : 'cancel') + '</td>') + '</td></tr>');
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

/**
 * InvertedIndex class with constructor
 */
var InvertedIndex = function () {
  /**
   * class constructor
   * @constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.file = {};
  }

  /**
   * Create index
   * @function
   * @param {string} fileName Name of the json input file
   * @param {Array} fileContent array content of input file
   * @return {void}
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',
    value: function createIndex(fileName, fileContent) {
      this.file[fileName] = fileContent;
      this.currentFile = fileContent;
    }

    /**
     * Static tokenize gets all words without symbols
     * @function
     * @param {string} text
     * @return {array} array of words in lowercase without symbols
     */

  }, {
    key: 'getIndex',


    /**
     * getIndex
     * @function
     * @return {Object} tokenObect
     */
    value: function getIndex() {
      var tokenObect = {};
      this.currentFile.forEach(function (element, index) {
        var text = element.text.split(' ');
        var token = Array.from(new Set(InvertedIndex.tokenize(text)));
        for (var i = 0; i < token.length; i++) {
          if (!tokenObect[token[i]]) {
            tokenObect[token[i]] = [index];
          } else {
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

  }, {
    key: 'searchIndex',
    value: function searchIndex(arr) {
      var allText = this.getIndex();
      var searchObj = {};
      var result = arr.reduce(function (acc, val) {
        if (allText[val]) {
          acc[val] = allText[val];
        } else {
          acc[val] = [];
        }
        return acc;
      }, {});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7O0FBR0EsSUFBTSxnQkFBZ0IsUUFBUSxxQkFBUixDQUF0Qjs7QUFFQSxJQUFNLGdCQUFnQixJQUFJLGFBQUosRUFBdEI7QUFDQSxJQUFNLFNBQVMsSUFBSSxVQUFKLEVBQWY7QUFDQSxJQUFJLGNBQUo7QUFDQSxJQUFJLGlCQUFKO0FBQ0EsSUFBTSxZQUFZLENBQUMsK0NBQUQsQ0FBbEI7O0FBRUE7Ozs7O0FBS0EsU0FBUyxPQUFULENBQWlCLENBQWpCLEVBQW9CO0FBQ2xCLFNBQU8sVUFBUCxDQUFrQixTQUFTLEVBQUUsTUFBRixDQUFTLEtBQWxCLENBQWxCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxTQUFTLFVBQVQsR0FBc0I7QUFDcEIsVUFBUSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBMUM7QUFDQSxNQUFNLFlBQVksTUFBTSxJQUFOLENBQVcsS0FBWCxDQUFsQjtBQUNBLGFBQVcsVUFBVSxNQUFWLENBQWlCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN4QyxRQUFJLElBQUksSUFBUixJQUFnQixHQUFoQjtBQUNBLFdBQU8sR0FBUDtBQUNELEdBSFUsRUFHUixFQUhRLENBQVg7QUFJQSxNQUFNLGNBQWMsVUFBVSxHQUFWLENBQWM7QUFBQSw4QkFDakIsRUFBRSxJQURlLFNBQ1AsRUFBRSxJQURLO0FBQUEsR0FBZCxDQUFwQjtBQUVBLE1BQU0sY0FBYyxVQUFVLE1BQVYsQ0FBaUIsV0FBakIsQ0FBcEI7QUFDQSxXQUFTLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0MsU0FBdEMsR0FBa0QsWUFBWSxJQUFaLENBQWlCLEVBQWpCLENBQWxEO0FBQ0Q7O0FBR0QsT0FBTyxNQUFQLEdBQWdCLFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUN2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UUFBUSxHQUFSLENBQUosRUFBa0I7QUFDaEIsY0FBSSxHQUFKLElBQVcsUUFBUSxHQUFSLENBQVg7QUFDRCxTQUZELE1BR0s7QUFDSCxjQUFJLEdBQUosSUFBVyxFQUFYO0FBQ0Q7QUFDRCxlQUFPLEdBQVA7QUFDRCxPQVJjLEVBUVosRUFSWSxDQUFmO0FBU0Q7Ozs2QkFoRGUsSSxFQUFNO0FBQ3BCLGFBQU8sS0FBSyxHQUFMLENBQVMsVUFBQyxNQUFELEVBQVk7QUFDMUIsWUFBTSxRQUFRLE9BQU8sV0FBUCxFQUFkO0FBQ0EsWUFBTSxRQUFRLE1BQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBZDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7QUE2Q0gsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogSW52ZXJ0ZWRJbmRleCBqYXZhc2NyaXB0IGNvZGUgZm9yIGZyb250ZW5kXG4gKi9cbmNvbnN0IEludmVydGVkSW5kZXggPSByZXF1aXJlKCcuL2ludmVydGVkLWluZGV4LmpzJyk7XG5cbmNvbnN0IGludmVydGVkSW5kZXggPSBuZXcgSW52ZXJ0ZWRJbmRleCgpO1xuY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbmxldCBmaWxlcztcbmxldCBmaWxlRGF0YTtcbmNvbnN0IGZpbGVBcnJheSA9IFsnPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGU+U2VsZWN0IEZpbGU8L29wdGlvbj4nXTtcblxuLyoqXG4gKiBnZXRGaWxlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICoqL1xuZnVuY3Rpb24gZ2V0RmlsZShlKSB7XG4gIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVEYXRhW2UudGFyZ2V0LnZhbHVlXSk7XG59XG5cbi8qKlxuICogZ2V0T3B0aW9ucyBmdW5jdGlvblxuICogQHJldHVybiB7T2JqZWN0fSBhY2MgdG8gcG9wdWxhdGUgdGhlIHNlbGVjdCBvcHRpb25zXG4gKiAqKi9cbmZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gIGZpbGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZCcpLmZpbGVzO1xuICBjb25zdCBzb21lRmlsZXMgPSBBcnJheS5mcm9tKGZpbGVzKTtcbiAgZmlsZURhdGEgPSBzb21lRmlsZXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgIGFjY1t2YWwubmFtZV0gPSB2YWw7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICBjb25zdCBzb21lT3B0aW9ucyA9IHNvbWVGaWxlcy5tYXAoeCA9PlxuICBgPG9wdGlvbiB2YWx1ZT0ke3gubmFtZX0+JHt4Lm5hbWV9PC9vcHRpb24+YCk7XG4gIGNvbnN0IHJlc3VsdEFycmF5ID0gZmlsZUFycmF5LmNvbmNhdChzb21lT3B0aW9ucyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RmaWxlJykuaW5uZXJIVE1MID0gcmVzdWx0QXJyYXkuam9pbignJyk7XG59XG5cblxucmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIHJlYWRGaWxlKGV2ZW50KSB7XG4gIGNvbnN0IGZpbGVDb250ZW50ID0gSlNPTi5wYXJzZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVDb250ZW50KSAmJiBmaWxlQ29udGVudC5sZW5ndGggJiZcbiAgICBmaWxlQ29udGVudFtpXS5oYXNPd25Qcm9wZXJ0eSgndGl0bGUnKSAmJlxuICAgIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgIGNvbnN0IGNyZWF0ZSA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZUNvbnRlbnRbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgY29uc3QgaW5kZXhPYmplY3QgPSBpbnZlcnRlZEluZGV4LmdldEluZGV4KCk7XG5cbiAgICAgIGNvbnN0IGRpc3BsYXkgPVxuICAgICAgICBbYDx0cj48dGQgaWQ9XCJ3b3Jkc1wiPjxiPiBXb3JkcyBUb2tlbiA8L2I+PC90ZD48dGQgaWQ9XCJib29rMVwiPjxiPiBCb29rIDFcbiAgICAgIDwvYj48dGQgaWQ9XCJib29rMlwiPjxiPiBCb29rIDIgPC9iPjwvdGQ+PC90ZD48L3RyPmBdO1xuICAgICAgT2JqZWN0LmtleXMoaW5kZXhPYmplY3QpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGRpc3BsYXkucHVzaChgPHRyPjx0ZCBpZD1cIndvcmRzXCIgKyBrZXkgKyA+JHtrZXl9XG4gICAgICAgIDx0ZD4ke2luZGV4T2JqZWN0W2tleV0uaW5kZXhPZigwKSA+IC0xID8gJ21hcmsnIDogJ2NhbmNlbCd9PC90ZD5gICtcbiAgICAgICAgYDx0ZD4ke2luZGV4T2JqZWN0W2tleV0uaW5kZXhPZigxKSA+IC0xID8gJ21hcmsnIDogJ2NhbmNlbCd9PC90ZD5gICtcbiAgICAgICAgJzwvdGQ+PC90cj4nKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLmlubmVySFRNTCA9IGRpc3BsYXkuam9pbignICcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuY29uc3QgZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZCcpO1xuY29uc3Qgb25TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZmlsZScpO1xub25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0RmlsZSk7XG5maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZ2V0T3B0aW9ucyk7XG4iLCIvKipcbiAqIEludmVydGVkSW5kZXggY2xhc3Mgd2l0aCBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBJbnZlcnRlZEluZGV4IHtcbiAgLyoqXG4gICAqIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGluZGV4XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWUgTmFtZSBvZiB0aGUganNvbiBpbnB1dCBmaWxlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGZpbGVDb250ZW50IGFycmF5IGNvbnRlbnQgb2YgaW5wdXQgZmlsZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgY3JlYXRlSW5kZXgoZmlsZU5hbWUsIGZpbGVDb250ZW50KSB7XG4gICAgdGhpcy5maWxlW2ZpbGVOYW1lXSA9IGZpbGVDb250ZW50O1xuICAgIHRoaXMuY3VycmVudEZpbGUgPSBmaWxlQ29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgdG9rZW5pemUgZ2V0cyBhbGwgd29yZHMgd2l0aG91dCBzeW1ib2xzXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKiBAcmV0dXJuIHthcnJheX0gYXJyYXkgb2Ygd29yZHMgaW4gbG93ZXJjYXNlIHdpdGhvdXQgc3ltYm9sc1xuICAgKi9cbiAgc3RhdGljIHRva2VuaXplKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5tYXAoKHRva2VucykgPT4ge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnMudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHdvcmRzID0gdG9rZW4ucmVwbGFjZSgvXFxXL2csICcgJyk7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0SW5kZXhcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge09iamVjdH0gdG9rZW5PYmVjdFxuICAgKi9cbiAgZ2V0SW5kZXgoKSB7XG4gICAgY29uc3QgdG9rZW5PYmVjdCA9IHt9O1xuICAgIHRoaXMuY3VycmVudEZpbGUuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LnRleHQuc3BsaXQoJyAnKTtcbiAgICAgIGNvbnN0IHRva2VuID0gQXJyYXkuZnJvbShuZXcgU2V0KEludmVydGVkSW5kZXgudG9rZW5pemUodGV4dCkpKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0b2tlbk9iZWN0W3Rva2VuW2ldXSkge1xuICAgICAgICAgIHRva2VuT2JlY3RbdG9rZW5baV1dID0gW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0b2tlbk9iZWN0W3Rva2VuW2ldXSA9IHRva2VuT2JlY3RbdG9rZW5baV1dLmNvbmNhdChpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW5PYmVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZWFyY2hJbmRleFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHthcnJheX0gYXJyIGlucHV0IHRvIHNlYXJjaFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGFjYyBvZiBzZWFyY2ggdGVybSB3aXRoIGluZGV4IGFzIHZhbHVlXG4gICAqL1xuICBzZWFyY2hJbmRleChhcnIpIHtcbiAgICBjb25zdCBhbGxUZXh0ID0gdGhpcy5nZXRJbmRleCgpO1xuICAgIGNvbnN0IHNlYXJjaE9iaiA9IHt9O1xuICAgIGNvbnN0IHJlc3VsdCA9IGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZiAoYWxsVGV4dFt2YWxdKSB7XG4gICAgICAgIGFjY1t2YWxdID0gYWxsVGV4dFt2YWxdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjY1t2YWxdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVydGVkSW5kZXg7XG4iXX0=
