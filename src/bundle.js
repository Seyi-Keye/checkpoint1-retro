(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * InvertedIndex javascript code for frontend
 */
var InvertedIndex = require('./inverted-index.js');

var invertedIndex = new InvertedIndex();
var reader = new FileReader();
var reader2 = new FileReader();
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

function readFiles(someFiles) {
  var shallowFiles = [].concat(_toConsumableArray(someFiles));
  if (shallowFiles.length > 0) {
    var file = shallowFiles.shift();
    reader2.onloadend = function (loadEvent) {
      console.log(loadEvent.target.result, 'results');
      var fileContent = JSON.parse(loadEvent.target.result);
      if (Array.isArray(fileContent) && fileContent.length && fileContent[0].hasOwnProperty('title') && fileContent[0].hasOwnProperty('text')) {
        fileArray.push('<option value=' + file.name + '>' + file.name + '</option>');
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
  var files = document.getElementById('upload').files;
  var someFiles = Array.from(files);
  fileData = someFiles.reduce(function (acc, val) {
    acc[val.name] = val;
    return acc;
  }, {});
  readFiles(files);
  // const someOptions = someFiles.map(x =>
  // `<option value=${x.name}>${x.name}</option>`);
  // const resultArray = fileArray.concat(someOptions);
}

reader.onloadend = function readFile(event) {
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
// const myButton = document.getElementById('create');
// myButton.addEventListener('click', getFile);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOzs7QUFHQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0QjtBQUNBLElBQU0sU0FBUyxJQUFJLFVBQUosRUFBZjtBQUNBLElBQU0sVUFBVSxJQUFJLFVBQUosRUFBaEI7QUFDQSxJQUFJLGdCQUFKO0FBQ0EsSUFBSSxpQkFBSjtBQUNBLElBQU0sWUFBWSxDQUFDLCtDQUFELENBQWxCOztBQUVBOzs7OztBQUtBLFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFvQjtBQUNsQixJQUFFLGNBQUY7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsU0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFsQixDQUFsQjtBQUNEOztBQUVELFNBQVMsU0FBVCxDQUFtQixTQUFuQixFQUE4QjtBQUM1QixNQUFNLDRDQUFtQixTQUFuQixFQUFOO0FBQ0EsTUFBSSxhQUFhLE1BQWIsR0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsUUFBTSxPQUFPLGFBQWEsS0FBYixFQUFiO0FBQ0EsWUFBUSxTQUFSLEdBQW9CLFVBQVUsU0FBVixFQUFxQjtBQUN2QyxjQUFRLEdBQVIsQ0FBWSxVQUFVLE1BQVYsQ0FBaUIsTUFBN0IsRUFBcUMsU0FBckM7QUFDQSxVQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsVUFBVSxNQUFWLENBQWlCLE1BQTVCLENBQXBCO0FBQ0EsVUFBSSxNQUFNLE9BQU4sQ0FBYyxXQUFkLEtBQThCLFlBQVksTUFBMUMsSUFDRixZQUFZLENBQVosRUFBZSxjQUFmLENBQThCLE9BQTlCLENBREUsSUFFRixZQUFZLENBQVosRUFBZSxjQUFmLENBQThCLE1BQTlCLENBRkYsRUFFeUM7QUFDdkMsa0JBQVUsSUFBVixvQkFBZ0MsS0FBSyxJ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aUIsYUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBJbnZlcnRlZEluZGV4IGphdmFzY3JpcHQgY29kZSBmb3IgZnJvbnRlbmRcbiAqL1xuY29uc3QgSW52ZXJ0ZWRJbmRleCA9IHJlcXVpcmUoJy4vaW52ZXJ0ZWQtaW5kZXguanMnKTtcblxuY29uc3QgaW52ZXJ0ZWRJbmRleCA9IG5ldyBJbnZlcnRlZEluZGV4KCk7XG5jb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuY29uc3QgcmVhZGVyMiA9IG5ldyBGaWxlUmVhZGVyKCk7XG5sZXQgZGlzcGxheTtcbmxldCBmaWxlRGF0YTtcbmNvbnN0IGZpbGVBcnJheSA9IFsnPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGU+U2VsZWN0IEZpbGU8L29wdGlvbj4nXTtcblxuLyoqXG4gKiBnZXRGaWxlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICoqL1xuZnVuY3Rpb24gZ2V0RmlsZShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZURhdGFbZS50YXJnZXQudmFsdWVdKTtcbn1cblxuZnVuY3Rpb24gcmVhZEZpbGVzKHNvbWVGaWxlcykge1xuICBjb25zdCBzaGFsbG93RmlsZXMgPSBbLi4uc29tZUZpbGVzXTtcbiAgaWYgKHNoYWxsb3dGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlsZSA9IHNoYWxsb3dGaWxlcy5zaGlmdCgpO1xuICAgIHJlYWRlcjIub25sb2FkZW5kID0gZnVuY3Rpb24gKGxvYWRFdmVudCkge1xuICAgICAgY29uc29sZS5sb2cobG9hZEV2ZW50LnRhcmdldC5yZXN1bHQsICdyZXN1bHRzJyk7XG4gICAgICBjb25zdCBmaWxlQ29udGVudCA9IEpTT04ucGFyc2UobG9hZEV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZUNvbnRlbnQpICYmIGZpbGVDb250ZW50Lmxlbmd0aCAmJlxuICAgICAgICBmaWxlQ29udGVudFswXS5oYXNPd25Qcm9wZXJ0eSgndGl0bGUnKSAmJlxuICAgICAgICBmaWxlQ29udGVudFswXS5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpKSB7XG4gICAgICAgIGZpbGVBcnJheS5wdXNoKGA8b3B0aW9uIHZhbHVlPSR7ZmlsZS5uYW1lfT4ke2ZpbGUubmFtZX08L29wdGlvbj5gKTtcbiAgICAgIH1cbiAgICAgIHJlYWRGaWxlcyhzaGFsbG93RmlsZXMpO1xuICAgIH07XG4gICAgcmVhZGVyMi5yZWFkQXNUZXh0KGZpbGUpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RmaWxlJykuaW5uZXJIVE1MID0gZmlsZUFycmF5LmpvaW4oJyAnKTtcbiAgfVxufVxuXG4vKipcbiAqIGdldE9wdGlvbnMgZnVuY3Rpb25cbiAqIEByZXR1cm4ge09iamVjdH0gYWNjIHRvIHBvcHVsYXRlIHRoZSBzZWxlY3Qgb3B0aW9uc1xuICogKiovXG5mdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICBjb25zdCBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKS5maWxlcztcbiAgY29uc3Qgc29tZUZpbGVzID0gQXJyYXkuZnJvbShmaWxlcyk7XG4gIGZpbGVEYXRhID0gc29tZUZpbGVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICBhY2NbdmFsLm5hbWVdID0gdmFsO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgcmVhZEZpbGVzKGZpbGVzKTtcbiAgLy8gY29uc3Qgc29tZU9wdGlvbnMgPSBzb21lRmlsZXMubWFwKHggPT5cbiAgLy8gYDxvcHRpb24gdmFsdWU9JHt4Lm5hbWV9PiR7eC5uYW1lfTwvb3B0aW9uPmApO1xuICAvLyBjb25zdCByZXN1bHRBcnJheSA9IGZpbGVBcnJheS5jb25jYXQoc29tZU9wdGlvbnMpO1xufVxuXG5cbnJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiByZWFkRmlsZShldmVudCkge1xuICBjb25zdCBmaWxlQ29udGVudCA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gIGNvbnNvbGUubG9nKGZpbGVDb250ZW50LCAnZmlsZSBjb250bmV0Jyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVDb250ZW50KSAmJiBmaWxlQ29udGVudC5sZW5ndGggJiZcbiAgICBmaWxlQ29udGVudFtpXS5oYXNPd25Qcm9wZXJ0eSgndGl0bGUnKSAmJlxuICAgIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgIGNvbnN0IGNyZWF0ZSA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZUNvbnRlbnRbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgY29uc3QgaW5kZXhPYmplY3QgPSBpbnZlcnRlZEluZGV4LmdldEluZGV4KCk7XG5cbiAgICAgIGRpc3BsYXkgPVxuICAgICAgW2A8dHI+PHRkIGlkPVwid29yZHNcIj48Yj4gV29yZHMgVG9rZW4gPC9iPjwvdGQ+PHRkIGlkPVwiYm9vazFcIj48Yj4gQm9vayAxXG4gICAgICA8L2I+PHRkIGlkPVwiYm9vazJcIj48Yj4gQm9vayAyIDwvYj48L3RkPjwvdGQ+PC90cj5gXTtcbiAgICAgIE9iamVjdC5rZXlzKGluZGV4T2JqZWN0KS5tYXAoKGtleSkgPT4ge1xuICAgICAgICBkaXNwbGF5LnB1c2goYDx0cj48dGQgaWQ9XCJ3b3Jkc1wiICsga2V5ICsgPiR7a2V5fVxuICAgICAgICA8dGQ+JHtpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMCkgPiAtMSA/ICdtYXJrJyA6ICdjYW5jZWwnfTwvdGQ+YCArXG4gICAgICAgIGA8dGQ+JHtpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMSkgPiAtMSA/ICdtYXJrJyA6ICdjYW5jZWwnfTwvdGQ+YCArXG4gICAgICAgICc8L3RkPjwvdHI+Jyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUwgPSBkaXNwbGF5LmpvaW4oJyAnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IGZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKTtcbmNvbnN0IG9uU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGZpbGUnKTtcbm9uU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldEZpbGUpO1xuLy8gY29uc3QgbXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlJyk7XG4vLyBteUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldEZpbGUpO1xuZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldE9wdGlvbnMpO1xuIiwiLyoqXG4gKiBJbnZlcnRlZEluZGV4IGNsYXNzIHdpdGggY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgSW52ZXJ0ZWRJbmRleCB7XG4gIC8qKlxuICAgKiBjbGFzcyBjb25zdHJ1Y3RvclxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBpbmRleFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIE5hbWUgb2YgdGhlIGpzb24gaW5wdXQgZmlsZVxuICAgKiBAcGFyYW0ge0FycmF5fSBmaWxlQ29udGVudCBhcnJheSBjb250ZW50IG9mIGlucHV0IGZpbGVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNyZWF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudCkge1xuICAgIHRoaXMuZmlsZVtmaWxlTmFtZV0gPSBmaWxlQ29udGVudDtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gZmlsZUNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIHRva2VuaXplIGdldHMgYWxsIHdvcmRzIHdpdGhvdXQgc3ltYm9sc1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICogQHJldHVybiB7YXJyYXl9IGFycmF5IG9mIHdvcmRzIGluIGxvd2VyY2FzZSB3aXRob3V0IHN5bWJvbHNcbiAgICovXG4gIHN0YXRpYyB0b2tlbml6ZSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQubWFwKCh0b2tlbnMpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB3b3JkcyA9IHRva2VuLnJlcGxhY2UoL1xcVy9nLCAnICcpO1xuICAgICAgcmV0dXJuIHdvcmRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldEluZGV4XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHRva2VuT2JlY3RcbiAgICovXG4gIGdldEluZGV4KCkge1xuICAgIGNvbnN0IHRva2VuT2JlY3QgPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0LnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCB0b2tlbiA9IEFycmF5LmZyb20obmV3IFNldChJbnZlcnRlZEluZGV4LnRva2VuaXplKHRleHQpKSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdG9rZW5PYmVjdFt0b2tlbltpXV0pIHtcbiAgICAgICAgICB0b2tlbk9iZWN0W3Rva2VuW2ldXSA9IFtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdG9rZW5PYmVjdFt0b2tlbltpXV0gPSB0b2tlbk9iZWN0W3Rva2VuW2ldXS5jb25jYXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuT2JlY3Q7XG4gIH1cblxuICAvKipcbiAgICogc2VhcmNoSW5kZXhcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7YXJyYXl9IGFyciBpbnB1dCB0byBzZWFyY2hcbiAgICogQHJldHVybiB7T2JqZWN0fSBhY2Mgb2Ygc2VhcmNoIHRlcm0gd2l0aCBpbmRleCBhcyB2YWx1ZVxuICAgKi9cbiAgc2VhcmNoSW5kZXgoYXJyKSB7XG4gICAgY29uc3QgYWxsVGV4dCA9IHRoaXMuZ2V0SW5kZXgoKTtcbiAgICBjb25zdCBzZWFyY2hPYmogPSB7fTtcbiAgICBjb25zdCByZXN1bHQgPSBhcnIucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgaWYgKGFsbFRleHRbdmFsXSkge1xuICAgICAgICBhY2NbdmFsXSA9IGFsbFRleHRbdmFsXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2NbdmFsXSA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnZlcnRlZEluZGV4O1xuIl19
