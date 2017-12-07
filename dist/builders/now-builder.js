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
                    now = _moment2.default.utc();
                    break;
                case 'custom':
                    now = _moment2.default.utc(this.ctx.params.custom.end);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdy1idWlsZGVyLmpzIl0sIm5hbWVzIjpbIk5vd0J1aWxkZXIiLCJjdHgiLCJub3ciLCJwYXJhbXMiLCJyYW5nZSIsInV0YyIsImN1c3RvbSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7Ozs7O0FBQ0E7OztJQUdxQkEsVTtBQUVqQix3QkFBWUMsR0FBWixFQUFpQjtBQUFBO0FBQUUsYUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQWlCOzs7O2dDQUU1QjtBQUNKLGdCQUFJQyxZQUFKO0FBQ0Esb0JBQVEsS0FBS0QsR0FBTCxDQUFTRSxNQUFULENBQWdCQyxLQUF4QjtBQUNJLHFCQUFLLFFBQUw7QUFDQSxxQkFBSyxPQUFMO0FBQ0EscUJBQUssUUFBTDtBQUNBLHFCQUFLLFNBQUw7QUFDQSxxQkFBSyxRQUFMO0FBQ0E7QUFDSUYsMEJBQU0saUJBQU9HLEdBQVAsRUFBTjtBQUNKO0FBQ0EscUJBQUssUUFBTDtBQUNJSCwwQkFBTSxpQkFBT0csR0FBUCxDQUFXLEtBQUtKLEdBQUwsQ0FBU0UsTUFBVCxDQUFnQkcsTUFBaEIsQ0FBdUJDLEdBQWxDLENBQU47QUFDSjtBQVhKO0FBYUEsbUJBQU9MLEdBQVA7QUFDSDs7O0tBM0JMOzs7OztrQkFPcUJGLFUiLCJmaWxlIjoibm93LWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0YXRzIEJ1aWxkZXIgRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50Jztcbi8qKlxuICogQnVpbGRzIE5vdyBUaW1lIE1vbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3dCdWlsZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGN0eCkgeyB0aGlzLmN0eCA9IGN0eDsgfVxuXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBub3c7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbm93ID0gbW9tZW50LnV0YygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICAgICAgICAgIG5vdyA9IG1vbWVudC51dGModGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vdztcbiAgICB9XG59XG4iXX0=
