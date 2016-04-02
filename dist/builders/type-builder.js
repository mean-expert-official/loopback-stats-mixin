'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds Now Time Moment
 */

var NowBuilder = function () {
  function NowBuilder(ctx) {
    (0, _classCallCheck3.default)(this, NowBuilder);
    this.ctx = ctx;
  }

  (0, _createClass3.default)(NowBuilder, [{
    key: 'build',
    value: function build() {
      var _this = this;

      var type = this.ctx.params.range;
      if (this.ctx.params.range === 'custom') {
        (function () {
          var start = (0, _moment2.default)(_this.ctx.params.custom.start);
          var end = (0, _moment2.default)(_this.ctx.params.custom.end);
          ['hour', 'day', 'week', 'month', 'year'].forEach(function (item) {
            var plural = [item, 's'].join('');
            var diff = end.diff(start, plural);
            if (diff > 1 && diff < 25) {
              type = item === 'week' ? end.diff(start, 'days') : diff;
              switch (item) {
                case 'hour':
                  type = 'hourly';break;
                case 'day':
                  type = 'daily';break;
                case 'week':
                  type = 'weekly';break;
                case 'month':
                  type = 'monthly';break;
                case 'year':
                  type = 'yearly';break;
              }
            }
          });
        })();
      }
      return type;
    }
  }]);
  return NowBuilder;
}(); /**
      * Stats Builder Dependencies
      */


exports.default = NowBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGUtYnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7Ozs7O0lBSXFCO0FBRW5CLFdBRm1CLFVBRW5CLENBQVksR0FBWixFQUFpQjt3Q0FGRSxZQUVGO0FBQUUsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQUFGO0dBQWpCOzs2QkFGbUI7OzRCQUlYOzs7QUFDTixVQUFJLE9BQU8sS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixLQUFoQixDQURMO0FBRU4sVUFBSSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhCLEtBQTBCLFFBQTFCLEVBQW9DOztBQUN0QyxjQUFJLFFBQVEsc0JBQU8sTUFBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QixLQUF2QixDQUFmO0FBQ0osY0FBSSxNQUFNLHNCQUFPLE1BQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsTUFBaEIsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNKLFdBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsRUFBaUMsTUFBakMsRUFBeUMsT0FBekMsQ0FBaUQsZ0JBQVE7QUFDdkQsZ0JBQUksU0FBUyxDQUFDLElBQUQsRUFBTyxHQUFQLEVBQVksSUFBWixDQUFpQixFQUFqQixDQUFULENBRG1EO0FBRXZELGdCQUFJLE9BQU8sSUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixNQUFoQixDQUFQLENBRm1EO0FBR3ZELGdCQUFJLE9BQU8sQ0FBUCxJQUFZLE9BQU8sRUFBUCxFQUFXO0FBQ3pCLHFCQUFPLFNBQVMsTUFBVCxHQUFrQixJQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLE1BQWhCLENBQWxCLEdBQTRDLElBQTVDLENBRGtCO0FBRXpCLHNCQUFRLElBQVI7QUFDRSxxQkFBSyxNQUFMO0FBQWEseUJBQU8sUUFBUCxDQUFiO0FBREYscUJBRU8sS0FBTDtBQUFZLHlCQUFPLE9BQVAsQ0FBWjtBQUZGLHFCQUdPLE1BQUw7QUFBYSx5QkFBTyxRQUFQLENBQWI7QUFIRixxQkFJTyxPQUFMO0FBQWMseUJBQU8sU0FBUCxDQUFkO0FBSkYscUJBS08sTUFBTDtBQUFhLHlCQUFPLFFBQVAsQ0FBYjtBQUxGLGVBRnlCO2FBQTNCO1dBSCtDLENBQWpEO2FBSHNDO09BQXhDO0FBa0JBLGFBQU8sSUFBUCxDQXBCTTs7O1NBSlciLCJmaWxlIjoidHlwZS1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGF0cyBCdWlsZGVyIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG4vKipcbiAqIEJ1aWxkcyBOb3cgVGltZSBNb21lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm93QnVpbGRlciB7XG5cbiAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XG5cbiAgYnVpbGQoKSB7XG4gICAgbGV0IHR5cGUgPSB0aGlzLmN0eC5wYXJhbXMucmFuZ2U7XG4gICAgaWYgKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSA9PT0gJ2N1c3RvbScpIHtcbiAgICAgIGxldCBzdGFydCA9IG1vbWVudCh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLnN0YXJ0KTtcbiAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xuICAgICAgWydob3VyJywgJ2RheScsICd3ZWVrJywgJ21vbnRoJywgJ3llYXInXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XG4gICAgICAgIGxldCBkaWZmID0gZW5kLmRpZmYoc3RhcnQsIHBsdXJhbCk7XG4gICAgICAgIGlmIChkaWZmID4gMSAmJiBkaWZmIDwgMjUpIHtcbiAgICAgICAgICB0eXBlID0gaXRlbSA9PT0gJ3dlZWsnID8gZW5kLmRpZmYoc3RhcnQsICdkYXlzJykgOiBkaWZmO1xuICAgICAgICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cic6IHR5cGUgPSAnaG91cmx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOiB0eXBlID0gJ2RhaWx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzogdHlwZSA9ICd3ZWVrbHknOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzogdHlwZSA9ICdtb250aGx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzogdHlwZSA9ICd5ZWFybHknOyBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
