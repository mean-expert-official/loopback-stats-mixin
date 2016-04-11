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
            var now = void 0;
            switch (this.ctx.params.range) {
                case 'hourly':
                case 'daily':
                case 'weekly':
                case 'monthly':
                case 'yearly':
                default:
                    now = (0, _moment2.default)();
                    break;
                case 'custom':
                    now = (0, _moment2.default)(this.ctx.params.custom.end);
                    break;
            }
            return now;
        }
    }]);
    return NowBuilder;
}(); /**
      * Stats Builder Dependencies
      */


exports.default = NowBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdy1idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7SUFJcUI7QUFFakIsYUFGaUIsVUFFakIsQ0FBWSxHQUFaLEVBQWlCOzRDQUZBLFlBRUE7QUFBRSxhQUFLLEdBQUwsR0FBVyxHQUFYLENBQUY7S0FBakI7OytCQUZpQjs7Z0NBSVQ7QUFDSixnQkFBSSxZQUFKLENBREk7QUFFSixvQkFBUSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0oscUJBQUssUUFBTCxDQURKO0FBRUkscUJBQUssT0FBTCxDQUZKO0FBR0kscUJBQUssUUFBTCxDQUhKO0FBSUkscUJBQUssU0FBTCxDQUpKO0FBS0kscUJBQUssUUFBTCxDQUxKO0FBTUk7QUFDSSwwQkFBTSx1QkFBTixDQURKO0FBRUEsMEJBRkE7QUFOSixxQkFTUyxRQUFMO0FBQ0ksMEJBQU0sc0JBQU8sS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QixHQUF2QixDQUFiLENBREo7QUFFQSwwQkFGQTtBQVRKLGFBRkk7QUFlSixtQkFBTyxHQUFQLENBZkk7OztXQUpTIiwiZmlsZSI6Im5vdy1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGF0cyBCdWlsZGVyIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG4vKipcbiAqIEJ1aWxkcyBOb3cgVGltZSBNb21lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm93QnVpbGRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cblxuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgbm93O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG5vdyA9IG1vbWVudCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICAgICAgICAgIG5vdyA9IG1vbWVudCh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLmVuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm93O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
