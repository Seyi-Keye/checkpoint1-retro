(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * InvertedIndex javascript code for frontend
 */
var InvertedIndex = require('./inverted-index.js');

var invertedIndex = new InvertedIndex();
var reader = new FileReader();
var files = void 0;
var display = void 0;
var fileData = void 0;
var fileArray = ['<option value="" disable>Select File</option>'];

/**
 * getFile function
 * @param {event} e
 * @return {void}
 **/
function getFile(e) {
  e.preventDefault();
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
  window.x = fileData;
  var someOptions = someFiles.map(function (x) {
    return '<option value=' + x.name + '>' + x.name + '</option>';
  });
  var resultArray = fileArray.concat(someOptions);
  document.getElementById('selectfile').innerHTML = resultArray.join('');
}

reader.onload = function readFile(event) {
  var fileContent = JSON.parse(event.target.result);
  console.log(fileContent, 'file contnet');

  for (var i = 0; i < fileContent.length; i++) {
    if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
      (function () {
        var create = invertedIndex.createIndex(fileContent[i].name, fileContent);
        var indexObject = invertedIndex.getIndex();

        display = ['<tr><td id="words"><b> Words Token </b></td><td id="book1"><b> Book 1\n      </b><td id="book2"><b> Book 2 </b></td></td></tr>'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7O0FBR0EsSUFBTSxnQkFBZ0IsUUFBUSxxQkFBUixDQUF0Qjs7QUFFQSxJQUFNLGdCQUFnQixJQUFJLGFBQUosRUFBdEI7QUFDQSxJQUFNLFNBQVMsSUFBSSxVQUFKLEVBQWY7QUFDQSxJQUFJLGNBQUo7QUFDQSxJQUFJLGdCQUFKO0FBQ0EsSUFBSSxpQkFBSjtBQUNBLElBQU0sWUFBWSxDQUFDLCtDQUFELENBQWxCOztBQUVBOzs7OztBQUtBLFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFvQjtBQUNsQixJQUFFLGNBQUY7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsU0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFsQixDQUFsQjtBQUNEOztBQUVEOzs7O0FBSUEsU0FBUyxVQUFULEdBQXNCO0FBQ3BCLFVBQVEsU0FBUyxjQUFULENBQXdCLFFBQXhCLEVBQWtDLEtBQTFDO0FBQ0EsTUFBTSxZQUFZLE1BQU0sSUFBTixDQUFXLEtBQVgsQ0FBbEI7QUFDQSxhQUFXLFVBQVUsTUFBVixDQUFpQixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDeEMsUUFBSSxJQUFJLElBQVIsSUFBZ0IsR0FBaEI7QUFDQSxXQUFPLEdBQVA7QUFDRCxHQUhVLEVBR1IsRUFIUSxDQUFYO0FBSUEsU0FBTyxDQUFQLEdBQVcsUUFBWDtBQUNBLE1BQU0sY0FBYyxVQUFVLEdBQVYsQ0FBYztBQUFBLDhCQUNqQixFQUFFLElBRGUsU0FDUCxFQUFFLElBREs7QUFBQSxHQUFkLENBQXBCO0FBRUEsTUFBTSxjQUFjLFVBQVUsTUFBVixDQUFpQixXQUFqQixDQUFwQjtBQUNBLFdBQVMsY0FBVCxDQUF3QixZQUF4QixFQUFzQyxTQUF0QyxHQUFrRCxZQUFZLElBQVosQ0FBaUIsRUFBakIsQ0FBbEQ7QUFD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aEI7QUFDQSxVQUFNLFlBQVksRUFBbEI7QUFDQSxVQUFNLFNBQVMsSUFBSSxNQUFKLENBQVcsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQ3RDLFlBQUksUUFBUSxHQUFSLENBQUosRUFBa0I7QUFDaEIsY0FBSSxHQUFKLElBQVcsUUFBUSxHQUFSLENBQVg7QUFDRCxTQUZELE1BR0s7QUFDSCxjQUFJLEdBQUosSUFBVyxFQUFYO0FBQ0Q7QUFDRCxlQUFPLEdBQVA7QUFDRCxPQVJjLEVBUVosRUFSWSxDQUFmO0FBU0Q7Ozs2QkFoRGUsSSxFQUFNO0FBQ3BCLGFBQU8sS0FBSyxHQUFMLENBQVMsVUFBQyxNQUFELEVBQVk7QUFDMUIsWUFBTSxRQUFRLE9BQU8sV0FBUCxFQUFkO0FBQ0EsWUFBTSxRQUFRLE1BQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBZDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7QUE2Q0gsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogSW52ZXJ0ZWRJbmRleCBqYXZhc2NyaXB0IGNvZGUgZm9yIGZyb250ZW5kXG4gKi9cbmNvbnN0IEludmVydGVkSW5kZXggPSByZXF1aXJlKCcuL2ludmVydGVkLWluZGV4LmpzJyk7XG5cbmNvbnN0IGludmVydGVkSW5kZXggPSBuZXcgSW52ZXJ0ZWRJbmRleCgpO1xuY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbmxldCBmaWxlcztcbmxldCBkaXNwbGF5O1xubGV0IGZpbGVEYXRhO1xuY29uc3QgZmlsZUFycmF5ID0gWyc8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZT5TZWxlY3QgRmlsZTwvb3B0aW9uPiddO1xuXG4vKipcbiAqIGdldEZpbGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiovXG5mdW5jdGlvbiBnZXRGaWxlKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZWFkZXIucmVhZEFzVGV4dChmaWxlRGF0YVtlLnRhcmdldC52YWx1ZV0pO1xufVxuXG4vKipcbiAqIGdldE9wdGlvbnMgZnVuY3Rpb25cbiAqIEByZXR1cm4ge09iamVjdH0gYWNjIHRvIHBvcHVsYXRlIHRoZSBzZWxlY3Qgb3B0aW9uc1xuICogKiovXG5mdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKS5maWxlcztcbiAgY29uc3Qgc29tZUZpbGVzID0gQXJyYXkuZnJvbShmaWxlcyk7XG4gIGZpbGVEYXRhID0gc29tZUZpbGVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICBhY2NbdmFsLm5hbWVdID0gdmFsO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgd2luZG93LnggPSBmaWxlRGF0YTtcbiAgY29uc3Qgc29tZU9wdGlvbnMgPSBzb21lRmlsZXMubWFwKHggPT5cbiAgYDxvcHRpb24gdmFsdWU9JHt4Lm5hbWV9PiR7eC5uYW1lfTwvb3B0aW9uPmApO1xuICBjb25zdCByZXN1bHRBcnJheSA9IGZpbGVBcnJheS5jb25jYXQoc29tZU9wdGlvbnMpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZmlsZScpLmlubmVySFRNTCA9IHJlc3VsdEFycmF5LmpvaW4oJycpO1xufVxuXG5cbnJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiByZWFkRmlsZShldmVudCkge1xuICBjb25zdCBmaWxlQ29udGVudCA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gIGNvbnNvbGUubG9nKGZpbGVDb250ZW50LCAnZmlsZSBjb250bmV0Jyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVDb250ZW50KSAmJiBmaWxlQ29udGVudC5sZW5ndGggJiZcbiAgICBmaWxlQ29udGVudFtpXS5oYXNPd25Qcm9wZXJ0eSgndGl0bGUnKSAmJlxuICAgIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgIGNvbnN0IGNyZWF0ZSA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZUNvbnRlbnRbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgY29uc3QgaW5kZXhPYmplY3QgPSBpbnZlcnRlZEluZGV4LmdldEluZGV4KCk7XG5cbiAgICAgIGRpc3BsYXkgPVxuICAgICAgW2A8dHI+PHRkIGlkPVwid29yZHNcIj48Yj4gV29yZHMgVG9rZW4gPC9iPjwvdGQ+PHRkIGlkPVwiYm9vazFcIj48Yj4gQm9vayAxXG4gICAgICA8L2I+PHRkIGlkPVwiYm9vazJcIj48Yj4gQm9vayAyIDwvYj48L3RkPjwvdGQ+PC90cj5gXTtcbiAgICAgIE9iamVjdC5rZXlzKGluZGV4T2JqZWN0KS5tYXAoKGtleSkgPT4ge1xuICAgICAgICBkaXNwbGF5LnB1c2goYDx0cj48dGQgaWQ9XCJ3b3Jkc1wiICsga2V5ICsgPiR7a2V5fVxuICAgICAgICA8dGQ+JHtpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMCkgPiAtMSA/ICdtYXJrJyA6ICdjYW5jZWwnfTwvdGQ+YCArXG4gICAgICAgIGA8dGQ+JHtpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMSkgPiAtMSA/ICdtYXJrJyA6ICdjYW5jZWwnfTwvdGQ+YCArXG4gICAgICAgICc8L3RkPjwvdHI+Jyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUwgPSBkaXNwbGF5LmpvaW4oJyAnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IGZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKTtcbmNvbnN0IG9uU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGZpbGUnKTtcbm9uU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldEZpbGUpO1xuZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldE9wdGlvbnMpO1xuIiwiLyoqXG4gKiBJbnZlcnRlZEluZGV4IGNsYXNzIHdpdGggY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgSW52ZXJ0ZWRJbmRleCB7XG4gIC8qKlxuICAgKiBjbGFzcyBjb25zdHJ1Y3RvclxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBpbmRleFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIE5hbWUgb2YgdGhlIGpzb24gaW5wdXQgZmlsZVxuICAgKiBAcGFyYW0ge0FycmF5fSBmaWxlQ29udGVudCBhcnJheSBjb250ZW50IG9mIGlucHV0IGZpbGVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNyZWF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudCkge1xuICAgIHRoaXMuZmlsZVtmaWxlTmFtZV0gPSBmaWxlQ29udGVudDtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gZmlsZUNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIHRva2VuaXplIGdldHMgYWxsIHdvcmRzIHdpdGhvdXQgc3ltYm9sc1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICogQHJldHVybiB7YXJyYXl9IGFycmF5IG9mIHdvcmRzIGluIGxvd2VyY2FzZSB3aXRob3V0IHN5bWJvbHNcbiAgICovXG4gIHN0YXRpYyB0b2tlbml6ZSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQubWFwKCh0b2tlbnMpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB3b3JkcyA9IHRva2VuLnJlcGxhY2UoL1xcVy9nLCAnICcpO1xuICAgICAgcmV0dXJuIHdvcmRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldEluZGV4XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHRva2VuT2JlY3RcbiAgICovXG4gIGdldEluZGV4KCkge1xuICAgIGNvbnN0IHRva2VuT2JlY3QgPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0LnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCB0b2tlbiA9IEFycmF5LmZyb20obmV3IFNldChJbnZlcnRlZEluZGV4LnRva2VuaXplKHRleHQpKSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdG9rZW5PYmVjdFt0b2tlbltpXV0pIHtcbiAgICAgICAgICB0b2tlbk9iZWN0W3Rva2VuW2ldXSA9IFtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdG9rZW5PYmVjdFt0b2tlbltpXV0gPSB0b2tlbk9iZWN0W3Rva2VuW2ldXS5jb25jYXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuT2JlY3Q7XG4gIH1cblxuICAvKipcbiAgICogc2VhcmNoSW5kZXhcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7YXJyYXl9IGFyciBpbnB1dCB0byBzZWFyY2hcbiAgICogQHJldHVybiB7T2JqZWN0fSBhY2Mgb2Ygc2VhcmNoIHRlcm0gd2l0aCBpbmRleCBhcyB2YWx1ZVxuICAgKi9cbiAgc2VhcmNoSW5kZXgoYXJyKSB7XG4gICAgY29uc3QgYWxsVGV4dCA9IHRoaXMuZ2V0SW5kZXgoKTtcbiAgICBjb25zdCBzZWFyY2hPYmogPSB7fTtcbiAgICBjb25zdCByZXN1bHQgPSBhcnIucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgaWYgKGFsbFRleHRbdmFsXSkge1xuICAgICAgICBhY2NbdmFsXSA9IGFsbFRleHRbdmFsXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2NbdmFsXSA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnZlcnRlZEluZGV4O1xuIl19
