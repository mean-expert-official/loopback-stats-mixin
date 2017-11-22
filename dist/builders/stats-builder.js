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
            var _this = this;

            this.list = list;
            if (this.ctx.params.groupBy && this.ctx.params.groupBy.length > 0) {
                var result = {};
                this.list.forEach(function (item) {
                    return result[item[_this.ctx.params.groupBy]] = _this.calculate(item[_this.ctx.params.groupBy]);
                });
                return result;
            } else {
                return this.calculate();
            }
        }
    }, {
        key: 'calculate',
        value: function calculate(group) {
            var dataset = [];
            var iterator = this.getIteratorCount();
            for (var i = 0, dateIndex = iterator; i <= iterator; i++, dateIndex--) {
                var current = this.getCurrentMoment(dateIndex);
                var count = this.getCurrentCount(current, group);
                dataset.push({
                    date: current.toISOString(),
                    universal: parseInt(current.format('x')),
                    count: count === 0 ? 0 : this.ctx.count.avg ? count / this.list.length : count
                });
            }
            return dataset;
        }
    }, {
        key: 'getCurrentCount',
        value: function getCurrentCount(current, group) {
            var _this2 = this;

            var count = 0;
            this.list.forEach(function (item) {
                if (group && item[_this2.ctx.params.groupBy] !== group) return;
                var itemDate = (0, _moment2.default)(item[_this2.ctx.count.on]);
                var itemFactor = _this2.getFactor(item);
                switch (_this2.ctx.params.range) {
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
            var _this3 = this;

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
                            _this3.ctx.params.range = new _typeBuilder2.default(_this3.ctx).build();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLWJ1aWxkZXIuanMiXSwibmFtZXMiOlsiU3RhdHNCdWlsZGVyIiwiY3R4IiwibGlzdCIsInBhcmFtcyIsImdyb3VwQnkiLCJsZW5ndGgiLCJyZXN1bHQiLCJmb3JFYWNoIiwiaXRlbSIsImNhbGN1bGF0ZSIsImdyb3VwIiwiZGF0YXNldCIsIml0ZXJhdG9yIiwiZ2V0SXRlcmF0b3JDb3VudCIsImkiLCJkYXRlSW5kZXgiLCJjdXJyZW50IiwiZ2V0Q3VycmVudE1vbWVudCIsImNvdW50IiwiZ2V0Q3VycmVudENvdW50IiwicHVzaCIsImRhdGUiLCJ0b0lTT1N0cmluZyIsInVuaXZlcnNhbCIsInBhcnNlSW50IiwiZm9ybWF0IiwiYXZnIiwiaXRlbURhdGUiLCJvbiIsIml0ZW1GYWN0b3IiLCJnZXRGYWN0b3IiLCJyYW5nZSIsImlzU2FtZSIsInZhbHVlIiwiYnkiLCJtYXRjaCIsInNwbGl0IiwicmVkdWNlIiwiYSIsImIiLCJhcyIsImluZGV4Iiwibm93SVNPU3RyaW5nIiwic3VidHJhY3QiLCJzdGFydCIsImN1c3RvbSIsImVuZCIsInBsdXJhbCIsImpvaW4iLCJkaWZmIiwiYnVpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7OztBQUxBOzs7SUFRcUJBLFk7QUFFakIsMEJBQVlDLEdBQVosRUFBaUI7QUFBQTtBQUFFLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUFpQjs7OztnQ0FFNUJDLEksRUFBTTtBQUFBOztBQUNaLGlCQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxnQkFBSSxLQUFLRCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLE9BQWhCLElBQTJCLEtBQUtILEdBQUwsQ0FBU0UsTUFBVCxDQUFnQkMsT0FBaEIsQ0FBd0JDLE1BQXhCLEdBQWlDLENBQWhFLEVBQW1FO0FBQ2pFLG9CQUFJQyxTQUFTLEVBQWI7QUFDQSxxQkFBS0osSUFBTCxDQUFVSyxPQUFWLENBQWtCO0FBQUEsMkJBQVNELE9B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QXVCQyxHQUE5QixDQUFWO0FBQ0FsQywrQkFBVyxDQUFYO0FBQ0EscUJBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsRUFBZ0MsTUFBaEMsRUFBd0NMLE9BQXhDLENBQWdELGdCQUFRO0FBQ3BELDRCQUFJd0MsU0FBUyxDQUFDdkMsSUFBRCxFQUFPLEdBQVAsRUFBWXdDLElBQVosQ0FBaUIsRUFBakIsQ0FBYjtBQUNBLDRCQUFJQyxPQUFTSCxJQUFJRyxJQUFKLENBQVNMLEtBQVQsRUFBZ0JHLE1BQWhCLENBQWI7QUFDQSw0QkFBSUUsT0FBTyxDQUFQLElBQVlBLE9BQU8sRUFBdkIsRUFBMkI7QUFDdkJyQyx1Q0FBV3FDLElBQVg7QUFDQSxtQ0FBS2hELEdBQUwsQ0FBU0UsTUFBVCxDQUFnQjRCLEtBQWhCLEdBQXdCLDBCQUFnQixPQUFLOUIsR0FBckIsRUFBMEJpRCxLQUExQixFQUF4QjtBQUNIO0FBQ0oscUJBUEQ7QUFRSjtBQTVCSjtBQThCQSxtQkFBT3RDLFFBQVA7QUFDSDs7Ozs7a0JBeklnQlosWSIsImZpbGUiOiJzdGF0cy1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGF0cyBCdWlsZGVyIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgVHlwZUJ1aWxkZXIgZnJvbSAnLi90eXBlLWJ1aWxkZXInO1xuLyoqXG4gKiBCdWlsZHMgU3RhdGlzdGljIEFycmF5IGZyb20gTGlzdCBvZiBSZXN1bHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNCdWlsZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGN0eCkgeyB0aGlzLmN0eCA9IGN0eDsgfVxuICAgIFxuICAgIHByb2Nlc3MobGlzdCkge1xuICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgIGlmICh0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeSAmJiB0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goaXRlbSA9PiAocmVzdWx0W2l0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldXSA9IHRoaXMuY2FsY3VsYXRlKGl0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldKSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlKGdyb3VwKSB7XG4gICAgICAgIGxldCBkYXRhc2V0ID0gW107XG4gICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMuZ2V0SXRlcmF0b3JDb3VudCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgZGF0ZUluZGV4ID0gaXRlcmF0b3I7IGkgPD0gaXRlcmF0b3I7IGkrKyAsIGRhdGVJbmRleC0tKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0Q3VycmVudE1vbWVudChkYXRlSW5kZXgpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5nZXRDdXJyZW50Q291bnQoY3VycmVudCwgZ3JvdXApO1xuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBjdXJyZW50LnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdW5pdmVyc2FsOiBwYXJzZUludChjdXJyZW50LmZvcm1hdCgneCcpKSxcbiAgICAgICAgICAgICAgICBjb3VudDogY291bnQgPT09IDAgPyAwIDogdGhpcy5jdHguY291bnQuYXZnID8gKGNvdW50IC8gdGhpcy5saXN0Lmxlbmd0aCkgOiBjb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudENvdW50KGN1cnJlbnQsIGdyb3VwKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGdyb3VwICYmIGl0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldICE9PSBncm91cCkgcmV0dXJuO1xuICAgICAgICAgICAgbGV0IGl0ZW1EYXRlID0gbW9tZW50KGl0ZW1bdGhpcy5jdHguY291bnQub25dKTtcbiAgICAgICAgICAgIGxldCBpdGVtRmFjdG9yID0gdGhpcy5nZXRGYWN0b3IoaXRlbSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ2hvdXInKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnZGF5JykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICd3ZWVrJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnbW9udGgnKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ3llYXInKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cblxuICAgIGdldEZhY3RvcihpdGVtKSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgLy8gV2hlbiBjb3VudCBieSBpbmRleCwgdGhlIGZhY3RvciB3aWxsIGFsd2F5cyBiZSAxXG4gICAgICAgIGlmICh0aGlzLmN0eC5jb3VudC5ieSA9PT0gJ2luZGV4JykgwqB7XG4gICAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHByb3BlcnR5LCBjYW4gYmUgbnVtYmVyIG9yIGJvb2xlYW5cbiAgICAgICAgICAgIC8vIFdoZW4gbnVtYmVyIHdlIHNldCB0aGF0IHZhbHVlIGFzIGZhY3RvciwgZWxzZSB3ZSBldmFsdWF0ZVxuICAgICAgICAgICAgLy8gdGhlIHZhbHVlIGRlcGVuZGluZyBvbiB0cnVlL2ZhbHNlIHZhbHVlIGFuZCB0aGlzLmN0eC5jb3VudC5hcyB2YWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMuY3R4LmNvdW50LmJ5Lm1hdGNoKC9cXC4vKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jdHguY291bnQuYnkuc3BsaXQoJy4nKS5yZWR1Y2UoKGEsIGIpID0+IGFbYl0gPyBhW2JdIDogMCwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLmN0eC5jb3VudC5ieV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXaGVuIHZhbHVlIGlzIGJvb2xlYW4gd2Ugc2V0IDAsIDEgb3IgdGhpcy5jdHguY291bnQuYXMgdG8gc2V0IGEgdmFsdWUgd2hlbiB0cnVlXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY3R4LmNvdW50LmFzID8gdGhpcy5jdHguY291bnQuYXMgOiAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHNlbmQgYmFjayBhIG51bWJlclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlIDogcGFyc2VJbnQodmFsdWUpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRNb21lbnQoaW5kZXgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ2hvdXJzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnZGF5cycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICd3ZWVrcycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnbW9udGhzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ3llYXJzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlcmF0b3JDb3VudCgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDI0OyAvLyAyNCBob3Vyc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNzsgLy8gc2V2ZW4gZGF5c1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDQ7IC8vIDQgd2Vla3NcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMTI7IC8vIDEyIG1vbnRoc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDU7IC8vIDUgeWVhcnNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbW9tZW50KHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5lbmQpO1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMDtcbiAgICAgICAgICAgICAgICBbJ2hvdXInLCAnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCd5ZWFyJ10uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsdXJhbCA9IFtpdGVtLCAncyddLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZiAgID0gZW5kLmRpZmYoc3RhcnQsIHBsdXJhbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWZmID4gMSAmJiBkaWZmIDwgMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LnBhcmFtcy5yYW5nZSA9IG5ldyBUeXBlQnVpbGRlcih0aGlzLmN0eCkuYnVpbGQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgIH1cbn1cbiJdfQ==
