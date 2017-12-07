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
      var type = this.ctx.params.range;
      if (this.ctx.params.range === 'custom') {
        var start = _moment2.default.utc(this.ctx.params.custom.start);
        var end = _moment2.default.utc(this.ctx.params.custom.end);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGUtYnVpbGRlci5qcyJdLCJuYW1lcyI6WyJOb3dCdWlsZGVyIiwiY3R4IiwidHlwZSIsInBhcmFtcyIsInJhbmdlIiwic3RhcnQiLCJ1dGMiLCJjdXN0b20iLCJlbmQiLCJmb3JFYWNoIiwicGx1cmFsIiwiaXRlbSIsImpvaW4iLCJkaWZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7QUFDQTs7O0lBR3FCQSxVO0FBRW5CLHNCQUFZQyxHQUFaLEVBQWlCO0FBQUE7QUFBRSxTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFBaUI7Ozs7NEJBRTVCO0FBQ04sVUFBSUMsT0FBTyxLQUFLRCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLEtBQTNCO0FBQ0EsVUFBSSxLQUFLSCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLEtBQWhCLEtBQTBCLFFBQTlCLEVBQXdDO0FBQ3RDLFlBQUlDLFFBQVEsaUJBQU9DLEdBQVAsQ0FBVyxLQUFLTCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JJLE1BQWhCLENBQXVCRixLQUFsQyxDQUFaO0FBQ0EsWUFBSUcsTUFBTSxpQkFBT0YsR0FBUCxDQUFXLEtBQUtMLEdBQUwsQ0FBU0UsTUFBVCxDQUFnQkksTUFBaEIsQ0FBdUJDLEdBQWxDLENBQVY7QUFDQSxTQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLE1BQWhCLEVBQXdCLE9BQXhCLEVBQWlDLE1BQWpDLEVBQXlDQyxPQUF6QyxDQUFpRCxnQkFBUTtBQUN2RCxjQUFJQyxTQUFTLENBQUNDLElBQUQsRUFBTyxHQUFQLEVBQVlDLElBQVosQ0FBaUIsRUFBakIsQ0FBYjtBQUNBLGNBQUlDLE9BQU9MLElBQUlLLElBQUosQ0FBU1IsS0FBVCxFQUFnQkssTUFBaEIsQ0FBWDtBQUNBLGNBQUlHLE9BQU8sQ0FBUCxJQUFZQSxPQUFPLEVBQXZCLEVBQTJCO0FBQ3pCWCxtQkFBT1MsU0FBUyxNQUFULEdBQWtCSCxJQUFJSyxJQUFKLENBQVNSLEtBQVQsRUFBZ0IsTUFBaEIsQ0FBbEIsR0FBNENRLElBQW5EO0FBQ0Esb0JBQVFGLElBQVI7QUFDRSxtQkFBSyxNQUFMO0FBQWFULHVCQUFPLFFBQVAsQ0FBaUI7QUFDOUIsbUJBQUssS0FBTDtBQUFZQSx1QkFBTyxPQUFQLENBQWdCO0FBQzVCLG1CQUFLLE1BQUw7QUFBYUEsdUJBQU8sUUFBUCxDQUFpQjtBQUM5QixtQkFBSyxPQUFMO0FBQWNBLHVCQUFPLFNBQVAsQ0FBa0I7QUFDaEMsbUJBQUssTUFBTDtBQUFhQSx1QkFBTyxRQUFQLENBQWlCO0FBTGhDO0FBT0Q7QUFDRixTQWJEO0FBY0Q7QUFDRCxhQUFPQSxJQUFQO0FBQ0Q7OztLQWhDSDs7Ozs7a0JBT3FCRixVIiwiZmlsZSI6InR5cGUtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhdHMgQnVpbGRlciBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuLyoqXG4gKiBCdWlsZHMgTm93IFRpbWUgTW9tZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vd0J1aWxkZXIge1xuXG4gIGNvbnN0cnVjdG9yKGN0eCkgeyB0aGlzLmN0eCA9IGN0eDsgfVxuXG4gIGJ1aWxkKCkge1xuICAgIGxldCB0eXBlID0gdGhpcy5jdHgucGFyYW1zLnJhbmdlO1xuICAgIGlmICh0aGlzLmN0eC5wYXJhbXMucmFuZ2UgPT09ICdjdXN0b20nKSB7XG4gICAgICBsZXQgc3RhcnQgPSBtb21lbnQudXRjKHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uc3RhcnQpO1xuICAgICAgbGV0IGVuZCA9IG1vbWVudC51dGModGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xuICAgICAgWydob3VyJywgJ2RheScsICd3ZWVrJywgJ21vbnRoJywgJ3llYXInXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XG4gICAgICAgIGxldCBkaWZmID0gZW5kLmRpZmYoc3RhcnQsIHBsdXJhbCk7XG4gICAgICAgIGlmIChkaWZmID4gMSAmJiBkaWZmIDwgMjUpIHtcbiAgICAgICAgICB0eXBlID0gaXRlbSA9PT0gJ3dlZWsnID8gZW5kLmRpZmYoc3RhcnQsICdkYXlzJykgOiBkaWZmO1xuICAgICAgICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cic6IHR5cGUgPSAnaG91cmx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOiB0eXBlID0gJ2RhaWx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzogdHlwZSA9ICd3ZWVrbHknOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzogdHlwZSA9ICdtb250aGx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzogdHlwZSA9ICd5ZWFybHknOyBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuIl19
