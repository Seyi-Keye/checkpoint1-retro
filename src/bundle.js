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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0QjtBQUNBLElBQU0sU0FBUyxJQUFJLFVBQUosRUFBZjtBQUNBLElBQUksY0FBSjtBQUNBLElBQUksaUJBQUo7QUFDQSxJQUFNLFlBQVksQ0FBQywrQ0FBRCxDQUFsQjs7QUFFQTs7Ozs7QUFLQSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsU0FBTyxVQUFQLENBQWtCLFNBQVMsRUFBRSxNQUFGLENBQVMsS0FBbEIsQ0FBbEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxTQUFTLFVBQVQsR0FBc0I7QUFDcEIsVUFBUSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBMUM7QUFDQSxNQUFNLFlBQVksTUFBTSxJQUFOLENBQVcsS0FBWCxDQUFsQjtBQUNBLGFBQVcsVUFBVSxNQUFWLENBQWlCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN4QyxRQUFJLElBQUksSUFBUixJQUFnQixHQUFoQjtBQUNBLFdBQU8sR0FBUDtBQUNELEdBSFUsRUFHUixFQUhRLENBQVg7QUFJQSxNQUFNLGNBQWMsVUFBVSxHQUFWLENBQWM7QUFBQSw4QkFDakIsRUFBRSxJQURlLFNBQ1AsRUFBRSxJQURLO0FBQUEsR0FBZCxDQUFwQjtBQUVBLE1BQU0sY0FBYyxVQUFVLE1BQVYsQ0FBaUIsV0FBakIsQ0FBcEI7QUFDQSxXQUFTLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0MsU0FBdEMsR0FBa0QsWUFBWSxJQUFaLENBQWlCLEVBQWpCLENBQWxEO0FBQ0Q7O0FBR0QsT0FBTyxNQUFQLEdBQWdCLFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUN2QyxNQUFN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QUFRLEdBQVIsQ0FBSixFQUFrQjtBQUNoQixjQUFJLEdBQUosSUFBVyxRQUFRLEdBQVIsQ0FBWDtBQUNELFNBRkQsTUFHSztBQUNILGNBQUksR0FBSixJQUFXLEVBQVg7QUFDRDtBQUNELGVBQU8sR0FBUDtBQUNELE9BUmMsRUFRWixFQVJZLENBQWY7O0FBVUEsY0FBUSxHQUFSLENBQVksTUFBWixFQUFvQixVQUFwQjtBQUNEOzs7NkJBekNlLEksRUFBTTtBQUNwQixhQUFPLEtBQUssR0FBTCxDQUFTLFVBQUMsTUFBRCxFQUFZO0FBQzFCLFlBQU0sUUFBUSxPQUFPLFdBQVAsRUFBZDtBQUNBLFlBQU0sUUFBUSxNQUFNLE9BQU4sQ0FBYyxLQUFkLEVBQXFCLEdBQXJCLENBQWQ7QUFDQSxlQUFPLEtBQVA7QUFDRCxPQUpNLENBQVA7QUFLRDs7Ozs7O0FBc0NILE9BQU8sT0FBUCxHQUFpQixhQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBJbnZlcnRlZEluZGV4ID0gcmVxdWlyZSgnLi9pbnZlcnRlZC1pbmRleC5qcycpO1xuXG5jb25zdCBpbnZlcnRlZEluZGV4ID0gbmV3IEludmVydGVkSW5kZXgoKTtcbmNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5sZXQgZmlsZXM7XG5sZXQgZmlsZURhdGE7XG5jb25zdCBmaWxlQXJyYXkgPSBbJzxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlPlNlbGVjdCBGaWxlPC9vcHRpb24+J107XG5cbi8qKlxuICogZ2V0RmlsZSBmdW5jdGlvblxuICpcbiAqIEByZXR1cm5cbiAqICoqL1xuZnVuY3Rpb24gZ2V0RmlsZShlKSB7XG4gIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVEYXRhW2UudGFyZ2V0LnZhbHVlXSk7XG59XG5cbi8qKlxuICogZ2V0T3B0aW9ucyBmdW5jdGlvblxuICpcbiAqIEByZXR1cm5cbiAqICoqL1xuZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJykuZmlsZXM7XG4gIGNvbnN0IHNvbWVGaWxlcyA9IEFycmF5LmZyb20oZmlsZXMpO1xuICBmaWxlRGF0YSA9IHNvbWVGaWxlcy5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgYWNjW3ZhbC5uYW1lXSA9IHZhbDtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIGNvbnN0IHNvbWVPcHRpb25zID0gc29tZUZpbGVzLm1hcCh4ID0+XG4gIGA8b3B0aW9uIHZhbHVlPSR7eC5uYW1lfT4ke3gubmFtZX08L29wdGlvbj5gKTtcbiAgY29uc3QgcmVzdWx0QXJyYXkgPSBmaWxlQXJyYXkuY29uY2F0KHNvbWVPcHRpb25zKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGZpbGUnKS5pbm5lckhUTUwgPSByZXN1bHRBcnJheS5qb2luKCcnKTtcbn1cblxuXG5yZWFkZXIub25sb2FkID0gZnVuY3Rpb24gcmVhZEZpbGUoZXZlbnQpIHtcbiAgY29uc3QgZmlsZUNvbnRlbnQgPSBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZUNvbnRlbnQpICYmIGZpbGVDb250ZW50Lmxlbmd0aCAmJlxuICAgIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0aXRsZScpICYmXG4gICAgZmlsZUNvbnRlbnRbaV0uaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xuICAgICAgY29uc3QgY3JlYXRlID0gaW52ZXJ0ZWRJbmRleC5jcmVhdGVJbmRleChmaWxlQ29udGVudFtpXS5uYW1lLCBmaWxlQ29udGVudCk7XG4gICAgICBjb25zdCBpbmRleE9iamVjdCA9IGludmVydGVkSW5kZXguZ2V0SW5kZXgoKTtcblxuICAgICAgY29uc3QgZGlzcGxheSA9XG4gICAgICAgIFtgPHRyPjx0ZCBpZD1cIndvcmRzXCI+PGI+IFdvcmRzIFRva2VuIDwvYj48L3RkPjx0ZCBpZD1cImJvb2sxXCI+PGI+IEJvb2sgMVxuICAgICAgPC9iPjx0ZCBpZD1cImJvb2syXCI+PGI+IEJvb2sgMiA8L2I+PC90ZD48L3RkPjwvdHI+YF07XG4gICAgICBPYmplY3Qua2V5cyhpbmRleE9iamVjdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgZGlzcGxheS5wdXNoKGA8dHI+PHRkIGlkPVwid29yZHNcIiArIGtleSArID4ke2tleX1cbiAgICAgICAgPHRkPiR7aW5kZXhPYmplY3Rba2V5XS5pbmRleE9mKDApID4gLTEgPyAnbWFyaycgOiAnY2FuY2VsJ308L3RkPmAgK1xuICAgICAgICBgPHRkPiR7aW5kZXhPYmplY3Rba2V5XS5pbmRleE9mKDEpID4gLTEgPyAnbWFyaycgOiAnY2FuY2VsJ308L3RkPmAgK1xuICAgICAgICAnPC90ZD48L3RyPicpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0JykuaW5uZXJIVE1MID0gZGlzcGxheS5qb2luKCcgJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCBmaWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJyk7XG5jb25zdCBvblNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RmaWxlJyk7XG5vblNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBnZXRGaWxlKTtcbmZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBnZXRPcHRpb25zKTtcbiIsImNsYXNzIEludmVydGVkSW5kZXgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpbGUgPSB7fTtcbiAgfVxuXG4gIGNyZWF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudCkge1xuICAgIHRoaXMuZmlsZVtmaWxlTmFtZV0gPSBmaWxlQ29udGVudDtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gZmlsZUNvbnRlbnQ7XG4gIH1cblxuICBzdGF0aWMgdG9rZW5pemUodGV4dCkge1xuICAgIHJldHVybiB0ZXh0Lm1hcCgodG9rZW5zKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vucy50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgd29yZHMgPSB0b2tlbi5yZXBsYWNlKC9cXFcvZywgJyAnKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIGNvbnN0IHRva2VuQXJyYXkgPSB7fTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudEZGRkZpbGUnLCB0aGlzLmN1cnJlbnRGaWxlKTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0LnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCB0b2tlbiA9IEFycmF5LmZyb20obmV3IFNldChJbnZlcnRlZEluZGV4LnRva2VuaXplKHRleHQpKSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdG9rZW5BcnJheVt0b2tlbltpXV0pIHtcbiAgICAgICAgICB0b2tlbkFycmF5W3Rva2VuW2ldXSA9IFtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdG9rZW5BcnJheVt0b2tlbltpXV0gPSB0b2tlbkFycmF5W3Rva2VuW2ldXS5jb25jYXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuQXJyYXk7XG4gIH1cblxuICBzZWFyY2hJbmRleChhcnIpIHtcbiAgICBjb25zdCBhbGxUZXh0ID0gdGhpcy5nZXRJbmRleCgpO1xuICAgIGNvbnNvbGUubG9nKGFsbFRleHQpO1xuICAgIGNvbnN0IHNlYXJjaE9iaiA9IHt9O1xuICAgIGNvbnN0IHJlc3VsdCA9IGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZiAoYWxsVGV4dFt2YWxdKSB7XG4gICAgICAgIGFjY1t2YWxdID0gYWxsVGV4dFt2YWxdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjY1t2YWxdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnNvbGUubG9nKHJlc3VsdCwgJ3doYXRldmVyJyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnZlcnRlZEluZGV4OyJdfQ==
