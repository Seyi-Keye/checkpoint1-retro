(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var InvertedIndex = require('./inverted-index.js');

var invertedIndex = new InvertedIndex();
var reader = new FileReader();
var files = void 0;
var fileArray = ['<option value="" disable>Select File</option>'];

function getFile(e) {
  reader.readAsText(files[0]);
  // Object.keys(files).reduce((acc, val) => {
  //   const fileObject = {};
  //   fileObject[files[val].name] = fileObject[files][val][0];
  // }, {});
}
function getOptions() {
  files = document.getElementById('upload').files;
  var someOptions = Array.from(files).map(function (x) {
    return '<option value=' + x.name + '>' + x.name + '</option>';
  });
  var resultArray = fileArray.concat(someOptions);
  document.getElementById('selectfile').innerHTML = resultArray.join('');
}

reader.onload = function (event) {
  var fileContent = JSON.parse(event.target.result);
  for (var i = 0; i < files.length; i++) {
    console.log(files[i].name);

    if (Array.isArray(fileContent) && fileContent.length && fileContent[i].hasOwnProperty('title') && fileContent[i].hasOwnProperty('text')) {
      (function () {
        var ffff = invertedIndex.createIndex(files[i].name, fileContent);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2ludmVydGVkLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGdCQUFnQixRQUFRLHFCQUFSLENBQXRCOztBQUVBLElBQU0sZ0JBQWdCLElBQUksYUFBSixFQUF0QjtBQUNBLElBQU0sU0FBUyxJQUFJLFVBQUosRUFBZjtBQUNBLElBQUksY0FBSjtBQUNBLElBQU0sWUFBWSxDQUFDLCtDQUFELENBQWxCOztBQUVBLFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFvQjtBQUNsQixTQUFPLFVBQVAsQ0FBa0IsTUFBTSxDQUFOLENBQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUNELFNBQVMsVUFBVCxHQUFzQjtBQUNwQixVQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQyxLQUExQztBQUNBLE1BQU0sY0FBYyxNQUFNLElBQU4sQ0FBVyxLQUFYLEVBQWtCLEdBQWxCLENBQXNCO0FBQUEsOEJBQXNCLEVBQUUsSUFBeEIsU0FBZ0MsRUFBRSxJQUFsQztBQUFBLEdBQXRCLENBQXBCO0FBQ0EsTUFBTSxjQUFjLFVBQVUsTUFBVixDQUFpQixXQUFqQixDQUFwQjtBQUNBLFdBQVMsY0FBVCxDQUF3QixZQUF4QixFQUFzQyxTQUF0QyxHQUFrRCxZQUFZLElBQVosQ0FBaUIsRUFBakIsQ0FBbEQ7QUFDRDs7QUFFRCxPQUFPLE1BQVAsR0FBZ0IsVUFBVSxLQUFWLEVBQWlCO0FBQy9CLE1BQU0sY0FBYyxLQUFLLEtBQUwsQ0FBVyxNQUFNLE1BQU4sQ0FBYSxNQUF4QixDQUFwQjtBQUNBLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ3JDLFlBQVEsR0FBUixDQUFZLE1BQU0sQ0FBTixFQUFTLElBQXJCOztBQUdBLFFBQUksTUFBTSxPQUFOLENBQWMs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T0FSYyxFQVFaLEVBUlksQ0FBZjs7QUFVQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFVBQXBCO0FBQ0Q7Ozs2QkF6Q2UsSSxFQUFNO0FBQ3BCLGFBQU8sS0FBSyxHQUFMLENBQVMsVUFBQyxNQUFELEVBQVk7QUFDMUIsWUFBTSxRQUFRLE9BQU8sV0FBUCxFQUFkO0FBQ0EsWUFBTSxRQUFRLE1BQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBZDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7QUFzQ0gsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IEludmVydGVkSW5kZXggPSByZXF1aXJlKCcuL2ludmVydGVkLWluZGV4LmpzJyk7XG5cbmNvbnN0IGludmVydGVkSW5kZXggPSBuZXcgSW52ZXJ0ZWRJbmRleCgpO1xuY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbmxldCBmaWxlcztcbmNvbnN0IGZpbGVBcnJheSA9IFsnPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGU+U2VsZWN0IEZpbGU8L29wdGlvbj4nXTtcblxuZnVuY3Rpb24gZ2V0RmlsZShlKSB7XG4gIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVzWzBdKTtcbiAgLy8gT2JqZWN0LmtleXMoZmlsZXMpLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgLy8gICBjb25zdCBmaWxlT2JqZWN0ID0ge307XG4gIC8vICAgZmlsZU9iamVjdFtmaWxlc1t2YWxdLm5hbWVdID0gZmlsZU9iamVjdFtmaWxlc11bdmFsXVswXTtcbiAgLy8gfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJykuZmlsZXM7XG4gIGNvbnN0IHNvbWVPcHRpb25zID0gQXJyYXkuZnJvbShmaWxlcykubWFwKHggPT4gYDxvcHRpb24gdmFsdWU9JHt4Lm5hbWV9PiR7eC5uYW1lfTwvb3B0aW9uPmApO1xuICBjb25zdCByZXN1bHRBcnJheSA9IGZpbGVBcnJheS5jb25jYXQoc29tZU9wdGlvbnMpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZmlsZScpLmlubmVySFRNTCA9IHJlc3VsdEFycmF5LmpvaW4oJycpO1xufVxuXG5yZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGNvbnN0IGZpbGVDb250ZW50ID0gSlNPTi5wYXJzZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGZpbGVzW2ldLm5hbWUpO1xuXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlQ29udGVudCkgJiYgZmlsZUNvbnRlbnQubGVuZ3RoICYmIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0aXRsZScpICYmIGZpbGVDb250ZW50W2ldLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgIGNvbnN0IGZmZmYgPSBpbnZlcnRlZEluZGV4LmNyZWF0ZUluZGV4KGZpbGVzW2ldLm5hbWUsIGZpbGVDb250ZW50KTtcbiAgICAgIGNvbnN0IGluZGV4T2JqZWN0ID0gaW52ZXJ0ZWRJbmRleC5nZXRJbmRleCgpO1xuXG5cbiAgICAgIGNvbnN0IGRpc3BsYXkgPSBbJzx0cj48dGQgaWQ9XCJ3b3Jkc1wiPjxiPiBXb3JkcyBUb2tlbiA8L2I+PC90ZD48dGQgaWQ9XCJib29rMVwiPjxiPiBCb29rIDEgPC9iPjx0ZCBpZD1cImJvb2syXCI+PGI+IEJvb2sgMiA8L2I+PC90ZD48L3RkPjwvdHI+J107XG4gICAgICBPYmplY3Qua2V5cyhpbmRleE9iamVjdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgZGlzcGxheS5wdXNoKGA8dHI+PHRkIGlkPVwid29yZHNcIiArIGtleSArID4ke2tleX08dGQ+JHtpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMCkgPiAtMSA/ICdtYXJrJyA6ICdjYW5jZWwnfTwvdGQ+YCArIGA8dGQ+JHtpbmRleE9iamVjdFtrZXldLmluZGV4T2YoMSkgPiAtMSA/ICdtYXJrJyA6ICdjYW5jZWwnfTwvdGQ+YCArICc8L3RkPjwvdHI+Jyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKS5pbm5lckhUTUwgPSBkaXNwbGF5LmpvaW4oJyAnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IGZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQnKTtcbmNvbnN0IG9uU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGZpbGUnKTtcbm9uU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldEZpbGUpO1xuZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGdldE9wdGlvbnMpO1xuIiwiY2xhc3MgSW52ZXJ0ZWRJbmRleCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsZSA9IHt9O1xuICB9XG5cbiAgY3JlYXRlSW5kZXgoZmlsZU5hbWUsIGZpbGVDb250ZW50KSB7XG4gICAgdGhpcy5maWxlW2ZpbGVOYW1lXSA9IGZpbGVDb250ZW50O1xuICAgIHRoaXMuY3VycmVudEZpbGUgPSBmaWxlQ29udGVudDtcbiAgfVxuXG4gIHN0YXRpYyB0b2tlbml6ZSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQubWFwKCh0b2tlbnMpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB3b3JkcyA9IHRva2VuLnJlcGxhY2UoL1xcVy9nLCAnICcpO1xuICAgICAgcmV0dXJuIHdvcmRzO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SW5kZXgoKSB7XG4gICAgY29uc3QgdG9rZW5BcnJheSA9IHt9O1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50RkZGRmlsZScsIHRoaXMuY3VycmVudEZpbGUpO1xuICAgIHRoaXMuY3VycmVudEZpbGUuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LnRleHQuc3BsaXQoJyAnKTtcbiAgICAgIGNvbnN0IHRva2VuID0gQXJyYXkuZnJvbShuZXcgU2V0KEludmVydGVkSW5kZXgudG9rZW5pemUodGV4dCkpKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0b2tlbkFycmF5W3Rva2VuW2ldXSkge1xuICAgICAgICAgIHRva2VuQXJyYXlbdG9rZW5baV1dID0gW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0b2tlbkFycmF5W3Rva2VuW2ldXSA9IHRva2VuQXJyYXlbdG9rZW5baV1dLmNvbmNhdChpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW5BcnJheTtcbiAgfVxuXG4gIHNlYXJjaEluZGV4KGFycikge1xuICAgIGNvbnN0IGFsbFRleHQgPSB0aGlzLmdldEluZGV4KCk7XG4gICAgY29uc29sZS5sb2coYWxsVGV4dCk7XG4gICAgY29uc3Qgc2VhcmNoT2JqID0ge307XG4gICAgY29uc3QgcmVzdWx0ID0gYXJyLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgIGlmIChhbGxUZXh0W3ZhbF0pIHtcbiAgICAgICAgYWNjW3ZhbF0gPSBhbGxUZXh0W3ZhbF07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWNjW3ZhbF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuXG4gICAgY29uc29sZS5sb2cocmVzdWx0LCAnd2hhdGV2ZXInKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVydGVkSW5kZXg7Il19
