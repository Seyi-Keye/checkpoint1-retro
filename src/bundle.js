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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0QjtBQUNBLElBQU0sU0FBUyxJQUFJLFVBQUosRUFBZjtBQUNBLElBQUksY0FBSjtBQUNBLElBQUksaUJBQUo7QUFDQSxJQUFNLFlBQVksQ0FBQywrQ0FBRCxDQUFsQjs7QUFFQTs7Ozs7QUFLQSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsVUFBUSxHQUFSLENBQVksRUFBRSxNQUFGLENBQVMsS0FBckIsRUFBNEIsT0FBNUI7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsU0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFsQixDQUFsQjtBQUNEOztBQUVEOzs7OztBQUtBLFNBQVMsVUFBVCxHQUFzQjtBQUNwQixVQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQyxLQUExQztBQUNBLE1BQU0sWUFBWSxNQUFNLElBQU4sQ0FBVyxLQUFYLENBQWxCO0FBQ0EsVUFBUSxHQUFSLENBQVksU0FBWixFQUF1QixXQUF2QjtBQUNBLGFBQVcsVUFBVSxNQUFWLENBQWlCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN4QyxZQUFRLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLElBQUksSUFBdkI7QUFDQSxRQUFJLElBQUksSUFBUixJQUFnQixHQUFoQjtBQUNBLFlBQVEsR0FBUixDQUFZLEtBQVosRUFBbUIsR0FBbkI7QUFDQSxXQUFPLEdBQVA7QUFDRCxHQUxVLEVBS1IsRUFMUSxDQUFYO0FBTUEsTUFBTSxjQUFjLE1BQU0sSUFBTixDQUFXLEtBQVgsRUFBa0IsR0FBbEIsQ0FBc0I7QUFBQSw4QkFDekIsRUFBRSxJQUR1QixTQUNmLEVBQUUsSUFEYTtBQUFB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LE1BQXJCLENBQTRCLEtBQTVCLENBQXZCO0FBQ0Q7QUFDRjtBQUNGLE9BWEQ7QUFZQSxhQUFPLFVBQVA7QUFDRDs7O2dDQUVXLEcsRUFBSztBQUNmLFVBQU0sVUFBVSxLQUFLLFFBQUwsRUFBaEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0EsVUFBTSxZQUFZLEVBQWxCO0FBQ0EsVUFBTSxTQUFTLElBQUksTUFBSixDQUFXLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN0QyxZQUFJLFFBQVEsR0FBUixDQUFKLEVBQWtCO0FBQ2hCLGNBQUksR0FBSixJQUFXLFFBQVEsR0FBUixDQUFYO0FBQ0QsU0FGRCxNQUdLO0FBQ0gsY0FBSSxHQUFKLElBQVcsRUFBWDtBQUNEO0FBQ0QsZUFBTyxHQUFQO0FBQ0QsT0FSYyxFQVFaLEVBUlksQ0FBZjs7QUFVQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFVBQXBCO0FBQ0Q7Ozs2QkF6Q2UsSSxFQUFNO0FBQ3BCLGFBQU8sS0FBSyxHQUFMLENBQVMsVUFBQyxNQUFELEVBQVk7QUFDMUIsWUFBTSxRQUFRLE9BQU8sV0FBUCxFQUFkO0FBQ0EsWUFBTSxRQUFRLE1BQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBZDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7QUFzQ0gsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IEludmVydGVkSW5kZXggPSByZXF1aXJlKCcuL2ludmVydGVkLWluZGV4LmpzJyk7XG5cbmNvbnN0IGludmVydGVkSW5kZXggPSBuZXcgSW52ZXJ0ZWRJbmRleCgpO1xuY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbmxldCBmaWxlcztcbmxldCBmaWxlRGF0YTtcbmNvbnN0IGZpbGVBcnJheSA9IFsnPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGU+U2VsZWN0IEZpbGU8L29wdGlvbj4nXTtcblxuLyoqXG4gKiBnZXRGaWxlIGZ1bmN0aW9uXG4gKlxuICogQHJldHVyblxuICogKiovXG5mdW5jdGlvbiBnZXRGaWxlKGUpIHtcbiAgY29uc29sZS5sb2coZS50YXJnZXQudmFsdWUsICd2YWx1ZScpO1xuICByZWFkZXIucmVhZEFzVGV4dChmaWxlRGF0YVtlLnRhcmdldC52YWx1ZV0pO1xufVxuXG4vKipcbiAqIGdldE9wdGlvbnMgZnVuY3Rpb25cbiAqXG4gKiBAcmV0dXJuXG4gKiAqKi9cbmZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gIGZpbGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZCcpLmZpbGVzO1xuICBjb25zdCBzb21lRmlsZXMgPSBBcnJheS5mcm9tKGZpbGVzKTtcbiAgY29uc29sZS5sb2coc29tZUZpbGVzLCAnc29tZWZpbGVzJyk7XG4gIGZpbGVEYXRhID0gc29tZUZpbGVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICBjb25zb2xlLmxvZygndmFsJywgdmFsLm5hbWUpO1xuICAgIGFjY1t2YWwubmFtZV0gPSB2YWw7XG4gICAgY29uc29sZS5sb2coJ2FjYycsIGFjYyk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICBjb25zdCBzb21lT3B0aW9ucyA9IEFycmF5LmZyb20oZmlsZXMpLm1hcCh4ID0+XG4gIGA8b3B0aW9uIHZhbHVlPSR7eC5uYW1lfT4ke3gubmFtZX08L29wdGlvbj5gKTtcbiAgY29uc3QgcmVzdWx0QXJyYXkgPSBmaWxlQXJyYXkuY29uY2F0KHNvbWVPcHRpb25zKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGZpbGUnKS5pbm5lckhUTUwgPSByZXN1bHRBcnJheS5qb2luKCcnKTtcbn1cblxucmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCBmaWxlQ29udGVudCA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zb2xlLmxvZyhmaWxlQ29udGVudFtpXS5uYW1lKTtcblxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZUNvbnRlbnQpICYmIGZpbGVDb250ZW50Lmxlbmd0aCAmJlxuICAgIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0aXRsZScpICYmXG4gICAgZmlsZUNvbnRlbnRbaV0uaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xuICAgICAgY29uc3QgZmZmZiA9IGludmVydGVkSW5kZXguY3JlYXRlSW5kZXgoZmlsZUNvbnRlbnRbaV0ubmFtZSwgZmlsZUNvbnRlbnQpO1xuICAgICAgY29uc3QgaW5kZXhPYmplY3QgPSBpbnZlcnRlZEluZGV4LmdldEluZGV4KCk7XG5cblxuICAgICAgY29uc3QgZGlzcGxheSA9XG4gICAgICAgIFtgPHRyPjx0ZCBpZD1cIndvcmRzXCI+PGI+IFdvcmRzIFRva2VuIDwvYj48L3RkPjx0ZCBpZD1cImJvb2sxXCI+PGI+IEJvb2sgMVxuICAgICAgPC9iPjx0ZCBpZD1cImJvb2syXCI+PGI+IEJvb2sgMiA8L2I+PC90ZD48L3RkPjwvdHI+YF07XG4gICAgICBPYmplY3Qua2V5cyhpbmRleE9iamVjdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgZGlzcGxheS5wdXNoKGA8dHI+PHRkIGlkPVwid29yZHNcIiArIGtleSArID4ke2tleX1cbiAgICAgICAgPHRkPiR7aW5kZXhPYmplY3Rba2V5XS5pbmRleE9mKDApID4gLTEgPyAnbWFyaycgOiAnY2FuY2VsJ308L3RkPmAgK1xuICAgICAgICBgPHRkPiR7aW5kZXhPYmplY3Rba2V5XS5pbmRleE9mKDEpID4gLTEgPyAnbWFyaycgOiAnY2FuY2VsJ308L3RkPmAgK1xuICAgICAgICAnPC90ZD48L3RyPicpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0JykuaW5uZXJIVE1MID0gZGlzcGxheS5qb2luKCcgJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCBmaWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJyk7XG5jb25zdCBvblNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RmaWxlJyk7XG5vblNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBnZXRGaWxlKTtcbmZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBnZXRPcHRpb25zKTtcbiIsImNsYXNzIEludmVydGVkSW5kZXgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpbGUgPSB7fTtcbiAgfVxuXG4gIGNyZWF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudCkge1xuICAgIHRoaXMuZmlsZVtmaWxlTmFtZV0gPSBmaWxlQ29udGVudDtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gZmlsZUNvbnRlbnQ7XG4gIH1cblxuICBzdGF0aWMgdG9rZW5pemUodGV4dCkge1xuICAgIHJldHVybiB0ZXh0Lm1hcCgodG9rZW5zKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vucy50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgd29yZHMgPSB0b2tlbi5yZXBsYWNlKC9cXFcvZywgJyAnKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIGNvbnN0IHRva2VuQXJyYXkgPSB7fTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudEZGRkZpbGUnLCB0aGlzLmN1cnJlbnRGaWxlKTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0LnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCB0b2tlbiA9IEFycmF5LmZyb20obmV3IFNldChJbnZlcnRlZEluZGV4LnRva2VuaXplKHRleHQpKSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdG9rZW5BcnJheVt0b2tlbltpXV0pIHtcbiAgICAgICAgICB0b2tlbkFycmF5W3Rva2VuW2ldXSA9IFtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdG9rZW5BcnJheVt0b2tlbltpXV0gPSB0b2tlbkFycmF5W3Rva2VuW2ldXS5jb25jYXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuQXJyYXk7XG4gIH1cblxuICBzZWFyY2hJbmRleChhcnIpIHtcbiAgICBjb25zdCBhbGxUZXh0ID0gdGhpcy5nZXRJbmRleCgpO1xuICAgIGNvbnNvbGUubG9nKGFsbFRleHQpO1xuICAgIGNvbnN0IHNlYXJjaE9iaiA9IHt9O1xuICAgIGNvbnN0IHJlc3VsdCA9IGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZiAoYWxsVGV4dFt2YWxdKSB7XG4gICAgICAgIGFjY1t2YWxdID0gYWxsVGV4dFt2YWxdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjY1t2YWxdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnNvbGUubG9nKHJlc3VsdCwgJ3doYXRldmVyJyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnZlcnRlZEluZGV4OyJdfQ==
