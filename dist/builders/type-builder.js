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
        var start = (0, _moment2.default)(this.ctx.params.custom.start);
        var end = (0, _moment2.default)(this.ctx.params.custom.end);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGUtYnVpbGRlci5qcyJdLCJuYW1lcyI6WyJOb3dCdWlsZGVyIiwiY3R4IiwidHlwZSIsInBhcmFtcyIsInJhbmdlIiwic3RhcnQiLCJjdXN0b20iLCJlbmQiLCJmb3JFYWNoIiwicGx1cmFsIiwiaXRlbSIsImpvaW4iLCJkaWZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7QUFDQTs7O0lBR3FCQSxVO0FBRW5CLHNCQUFZQyxHQUFaLEVBQWlCO0FBQUE7QUFBRSxTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFBaUI7Ozs7NEJBRTVCO0FBQ04sVUFBSUMsT0FBTyxLQUFLRCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLEtBQTNCO0FBQ0EsVUFBSSxLQUFLSCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLEtBQWhCLEtBQTBCLFFBQTlCLEVBQXdDO0FBQ3RDLFlBQUlDLFFBQVEsc0JBQU8sS0FBS0osR0FBTCxDQUFTRSxNQUFULENBQWdCRyxNQUFoQixDQUF1QkQsS0FBOUIsQ0FBWjtBQUNBLFlBQUlFLE1BQU0sc0JBQU8sS0FBS04sR0FBTCxDQUFTRSxNQUFULENBQWdCRyxNQUFoQixDQUF1QkMsR0FBOUIsQ0FBVjtBQUNBLFNBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsRUFBaUMsTUFBakMsRUFBeUNDLE9BQXpDLENBQWlELGdCQUFRO0FBQ3ZELGNBQUlDLFNBQVMsQ0FBQ0MsSUFBRCxFQUFPLEdBQVAsRUFBWUMsSUFBWixDQUFpQixFQUFqQixDQUFiO0FBQ0EsY0FBSUMsT0FBT0wsSUFBSUssSUFBSixDQUFTUCxLQUFULEVBQWdCSSxNQUFoQixDQUFYO0FBQ0EsY0FBSUcsT0FBTyxDQUFQLElBQVlBLE9BQU8sRUFBdkIsRUFBMkI7QUFDekJWLG1CQUFPUSxTQUFTLE1BQVQsR0FBa0JILElBQUlLLElBQUosQ0FBU1AsS0FBVCxFQUFnQixNQUFoQixDQUFsQixHQUE0Q08sSUFBbkQ7QUFDQSxvQkFBUUYsSUFBUjtBQUNFLG1CQUFLLE1BQUw7QUFBYVIsdUJBQU8sUUFBUCxDQUFpQjtBQUM5QixtQkFBSyxLQUFMO0FBQVlBLHVCQUFPLE9BQVAsQ0FBZ0I7QUFDNUIsbUJBQUssTUFBTDtBQUFhQSx1QkFBTyxRQUFQLENBQWlCO0FBQzlCLG1CQUFLLE9BQUw7QUFBY0EsdUJBQU8sU0FBUCxDQUFrQjtBQUNoQyxtQkFBSyxNQUFMO0FBQWFBLHVCQUFPLFFBQVAsQ0FBaUI7QUFMaEM7QUFPRDtBQUNGLFNBYkQ7QUFjRDtBQUNELGFBQU9BLElBQVA7QUFDRDs7O0tBaENIOzs7OztrQkFPcUJGLFUiLCJmaWxlIjoidHlwZS1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGF0cyBCdWlsZGVyIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG4vKipcbiAqIEJ1aWxkcyBOb3cgVGltZSBNb21lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm93QnVpbGRlciB7XG5cbiAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XG5cbiAgYnVpbGQoKSB7XG4gICAgbGV0IHR5cGUgPSB0aGlzLmN0eC5wYXJhbXMucmFuZ2U7XG4gICAgaWYgKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSA9PT0gJ2N1c3RvbScpIHtcbiAgICAgIGxldCBzdGFydCA9IG1vbWVudCh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLnN0YXJ0KTtcbiAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xuICAgICAgWydob3VyJywgJ2RheScsICd3ZWVrJywgJ21vbnRoJywgJ3llYXInXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XG4gICAgICAgIGxldCBkaWZmID0gZW5kLmRpZmYoc3RhcnQsIHBsdXJhbCk7XG4gICAgICAgIGlmIChkaWZmID4gMSAmJiBkaWZmIDwgMjUpIHtcbiAgICAgICAgICB0eXBlID0gaXRlbSA9PT0gJ3dlZWsnID8gZW5kLmRpZmYoc3RhcnQsICdkYXlzJykgOiBkaWZmO1xuICAgICAgICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cic6IHR5cGUgPSAnaG91cmx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOiB0eXBlID0gJ2RhaWx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzogdHlwZSA9ICd3ZWVrbHknOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzogdHlwZSA9ICdtb250aGx5JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzogdHlwZSA9ICd5ZWFybHknOyBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuIl19
