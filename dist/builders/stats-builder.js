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

var _typeBuilder = require('./type-builder');

var _typeBuilder2 = _interopRequireDefault(_typeBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds Statistic Array from List of Resuls
 */
/**
 * Stats Builder Dependencies
 */

var StatsBuilder = function () {
    function StatsBuilder(ctx) {
        (0, _classCallCheck3.default)(this, StatsBuilder);
        this.ctx = ctx;
    }

    (0, _createClass3.default)(StatsBuilder, [{
        key: 'process',
        value: function process(list) {
            this.list = list;
            var dataset = [];
            var iterator = this.getIteratorCount();
            for (var i = 0, dateIndex = iterator; i <= iterator; i++, dateIndex--) {
                var current = this.getCurrentMoment(dateIndex);
                var count = this.getCurrentCount(current);
                dataset.push({
                    date: current.toISOString(),
                    count: count === 0 ? 0 : this.ctx.count.avg ? count / list.length : count
                });
            }
            return dataset;
        }
    }, {
        key: 'getCurrentCount',
        value: function getCurrentCount(current) {
            var _this = this;

            var count = 0;
            this.list.forEach(function (item) {
                var itemDate = (0, _moment2.default)(item[_this.ctx.count.on]);
                var itemFactor = _this.getFactor(item);
                switch (_this.ctx.params.range) {
                    case 'hourly':
                        if (current.isSame(itemDate, 'hour')) count = count + itemFactor;
                        break;
                    case 'daily':
                        if (current.isSame(itemDate, 'day')) count = count + itemFactor;
                        break;
                    case 'weekly':
                        if (current.isSame(itemDate, 'week')) count = count + itemFactor;
                        break;
                    case 'monthly':
                        if (current.isSame(itemDate, 'month')) count = count + itemFactor;
                        break;
                    case 'yearly':
                        if (current.isSame(itemDate, 'year')) count = count + itemFactor;
                        break;
                }
            });
            return count;
        }
    }, {
        key: 'getFactor',
        value: function getFactor(item) {
            var value = void 0;
            // When count by index, the factor will always be 1
            if (this.ctx.count.by === 'index') {
                value = 1;
            } else {
                // We get the value from the property, can be number or boolean
                // When number we set that value as factor, else we evaluate
                // the value depending on true/false value and this.ctx.count.as value
                if (this.ctx.count.by.match(/\./)) {
                    value = this.ctx.count.by.split('.').reduce(function (a, b) {
                        return a[b] ? a[b] : 0;
                    }, item);
                } else {
                    value = item[this.ctx.count.by];
                }
                // When value is boolean we set 0, 1 or this.ctx.count.as to set a value when true
                if (typeof value === 'boolean' && value === true) {
                    value = this.ctx.count.as ? this.ctx.count.as : 1;
                } else if (typeof value === 'boolean' && value === false) {
                    value = 0;
                }
            }
            // Make sure we send back a number
            return typeof value === 'number' ? value : parseInt(value);
        }
    }, {
        key: 'getCurrentMoment',
        value: function getCurrentMoment(index) {
            var current = void 0;
            switch (this.ctx.params.range) {
                case 'hourly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'hours');
                    break;
                case 'daily':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'days');
                    break;
                case 'weekly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'weeks');
                    break;
                case 'monthly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'months');
                    break;
                case 'yearly':
                    current = (0, _moment2.default)(this.ctx.nowISOString).subtract(index, 'years');
                    break;
            }
            return current;
        }
    }, {
        key: 'getIteratorCount',
        value: function getIteratorCount() {
            var _this2 = this;

            var iterator = void 0;
            switch (this.ctx.params.range) {
                case 'hourly':
                    iterator = 24; // 24 hours
                    break;
                case 'daily':
                    iterator = 7; // seven days
                    break;
                case 'weekly':
                    iterator = 4; // 4 weeks
                    break;
                case 'monthly':
                    iterator = 12; // 12 months
                    break;
                case 'yearly':
                    iterator = 5; // 5 years
                    break;
                case 'custom':
                    var start = (0, _moment2.default)(this.ctx.params.custom.start);
                    var end = (0, _moment2.default)(this.ctx.params.custom.end);
                    iterator = 0;
                    ['hour', 'day', 'week', 'month', 'year'].forEach(function (item) {
                        var plural = [item, 's'].join('');
                        var diff = end.diff(start, plural);
                        if (diff > 1 && diff < 25) {
                            iterator = diff;
                            _this2.ctx.params.range = new _typeBuilder2.default(_this2.ctx).build();
                        }
                    });
                    break;
            }
            return iterator;
        }
    }]);
    return StatsBuilder;
}();

exports.default = StatsBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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S0FBVCxFQUFnQixNQUFoQixDQUFULENBRmdEO0FBR3BELDRCQUFJLE9BQU8sQ0FBUCxJQUFZLE9BQU8sRUFBUCxFQUFXO0FBQ3ZCLHVDQUFXLElBQVgsQ0FEdUI7QUFFdkIsbUNBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsR0FBd0IsMEJBQWdCLE9BQUssR0FBTCxDQUFoQixDQUEwQixLQUExQixFQUF4QixDQUZ1Qjt5QkFBM0I7cUJBSDRDLENBQWhELENBSko7QUFZQSwwQkFaQTtBQWhCSixhQUZlO0FBZ0NmLG1CQUFPLFFBQVAsQ0FoQ2U7OztXQTVGRiIsImZpbGUiOiJzdGF0cy1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGF0cyBCdWlsZGVyIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgVHlwZUJ1aWxkZXIgZnJvbSAnLi90eXBlLWJ1aWxkZXInO1xuLyoqXG4gKiBCdWlsZHMgU3RhdGlzdGljIEFycmF5IGZyb20gTGlzdCBvZiBSZXN1bHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNCdWlsZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGN0eCkgeyB0aGlzLmN0eCA9IGN0eDsgfVxuXG4gICAgcHJvY2VzcyhsaXN0KSB7XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG4gICAgICAgIGxldCBkYXRhc2V0ID0gW107XG4gICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMuZ2V0SXRlcmF0b3JDb3VudCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgZGF0ZUluZGV4ID0gaXRlcmF0b3I7IGkgPD0gaXRlcmF0b3I7IGkrKyAsIGRhdGVJbmRleC0tKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0Q3VycmVudE1vbWVudChkYXRlSW5kZXgpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5nZXRDdXJyZW50Q291bnQoY3VycmVudCk7XG4gICAgICAgICAgICBkYXRhc2V0LnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGU6IGN1cnJlbnQudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBjb3VudDogY291bnQgPT09IDAgPyAwIDogdGhpcy5jdHguY291bnQuYXZnID8gKGNvdW50IC8gbGlzdC5sZW5ndGgpIDogY291bnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRDb3VudChjdXJyZW50KSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW1EYXRlID0gbW9tZW50KGl0ZW1bdGhpcy5jdHguY291bnQub25dKTtcbiAgICAgICAgICAgIGxldCBpdGVtRmFjdG9yID0gdGhpcy5nZXRGYWN0b3IoaXRlbSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ2hvdXInKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnZGF5JykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICd3ZWVrJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnbW9udGgnKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ3llYXInKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cblxuICAgIGdldEZhY3RvcihpdGVtKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgLy8gV2hlbiBjb3VudCBieSBpbmRleCwgdGhlIGZhY3RvciB3aWxsIGFsd2F5cyBiZSAxXG4gICAgICAgIGlmICh0aGlzLmN0eC5jb3VudC5ieSA9PT0gJ2luZGV4JykgwqB7XG4gICAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHByb3BlcnR5LCBjYW4gYmUgbnVtYmVyIG9yIGJvb2xlYW5cbiAgICAgICAgICAgIC8vIFdoZW4gbnVtYmVyIHdlIHNldCB0aGF0IHZhbHVlIGFzIGZhY3RvciwgZWxzZSB3ZSBldmFsdWF0ZVxuICAgICAgICAgICAgLy8gdGhlIHZhbHVlIGRlcGVuZGluZyBvbiB0cnVlL2ZhbHNlIHZhbHVlIGFuZCB0aGlzLmN0eC5jb3VudC5hcyB2YWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMuY3R4LmNvdW50LmJ5Lm1hdGNoKC9cXC4vKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jdHguY291bnQuYnkuc3BsaXQoJy4nKS5yZWR1Y2UoKGEsIGIpID0+IGFbYl0gPyBhW2JdIDogMCwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLmN0eC5jb3VudC5ieV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXaGVuIHZhbHVlIGlzIGJvb2xlYW4gd2Ugc2V0IDAsIDEgb3IgdGhpcy5jdHguY291bnQuYXMgdG8gc2V0IGEgdmFsdWUgd2hlbiB0cnVlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY3R4LmNvdW50LmFzID8gdGhpcy5jdHguY291bnQuYXMgOiAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHNlbmQgYmFjayBhIG51bWJlclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlIDogcGFyc2VJbnQodmFsdWUpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRNb21lbnQoaW5kZXgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ2hvdXJzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnZGF5cycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICd3ZWVrcycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnbW9udGhzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ3llYXJzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlcmF0b3JDb3VudCgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDI0OyAvLyAyNCBob3Vyc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNzsgLy8gc2V2ZW4gZGF5c1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDQ7IC8vIDQgd2Vla3NcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMTI7IC8vIDEyIG1vbnRoc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDU7IC8vIDUgeWVhcnNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbW9tZW50KHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMDtcbiAgICAgICAgICAgICAgICBbJ2hvdXInLCAnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCd5ZWFyJ10uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsdXJhbCA9IFtpdGVtLCAncyddLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZiAgID0gZW5kLmRpZmYoc3RhcnQsIHBsdXJhbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWZmID4gMSAmJiBkaWZmIDwgMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LnBhcmFtcy5yYW5nZSA9IG5ldyBUeXBlQnVpbGRlcih0aGlzLmN0eCkuYnVpbGQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
