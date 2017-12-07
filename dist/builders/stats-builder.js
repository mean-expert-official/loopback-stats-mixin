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
                var itemDate = _moment2.default.utc(item[_this2.ctx.count.on]);
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
                    current = _moment2.default.utc(this.ctx.nowISOString).subtract(index, 'hours');
                    break;
                case 'daily':
                    current = _moment2.default.utc(this.ctx.nowISOString).subtract(index, 'days');
                    break;
                case 'weekly':
                    current = _moment2.default.utc(this.ctx.nowISOString).subtract(index, 'weeks');
                    break;
                case 'monthly':
                    current = _moment2.default.utc(this.ctx.nowISOString).subtract(index, 'months');
                    break;
                case 'yearly':
                    current = _moment2.default.utc(this.ctx.nowISOString).subtract(index, 'years');
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
                    var start = _moment2.default.utc(this.ctx.params.custom.start);
                    var end = _moment2.default.utc(this.ctx.params.custom.end);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLWJ1aWxkZXIuanMiXSwibmFtZXMiOlsiU3RhdHNCdWlsZGVyIiwiY3R4IiwibGlzdCIsInBhcmFtcyIsImdyb3VwQnkiLCJsZW5ndGgiLCJyZXN1bHQiLCJmb3JFYWNoIiwiaXRlbSIsImNhbGN1bGF0ZSIsImdyb3VwIiwiZGF0YXNldCIsIml0ZXJhdG9yIiwiZ2V0SXRlcmF0b3JDb3VudCIsImkiLCJkYXRlSW5kZXgiLCJjdXJyZW50IiwiZ2V0Q3VycmVudE1vbWVudCIsImNvdW50IiwiZ2V0Q3VycmVudENvdW50IiwicHVzaCIsImRhdGUiLCJ0b0lTT1N0cmluZyIsInVuaXZlcnNhbCIsInBhcnNlSW50IiwiZm9ybWF0IiwiYXZnIiwiaXRlbURhdGUiLCJ1dGMiLCJvbiIsIml0ZW1GYWN0b3IiLCJnZXRGYWN0b3IiLCJyYW5nZSIsImlzU2FtZSIsInZhbHVlIiwiYnkiLCJtYXRjaCIsInNwbGl0IiwicmVkdWNlIiwiYSIsImIiLCJhcyIsImluZGV4Iiwibm93SVNPU3RyaW5nIiwic3VidHJhY3QiLCJzdGFydCIsImN1c3RvbSIsImVuZCIsInBsdXJhbCIsImpvaW4iLCJkaWZmIiwiYnVpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7OztBQUxBOzs7SUFRcUJBLFk7QUFFakIsMEJBQVlDLEdBQVosRUFBaUI7QUFBQTtBQUFFLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUFpQjs7OztnQ0FFNUJDLEksRUFBTTtBQUFBOztBQUNaLGlCQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxnQkFBSSxLQUFLRCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0JDLE9BQWhCLElBQTJCLEtBQUtILEdBQUwsQ0FBU0UsTUFBVCxDQUFnQkMsT0FBaEIsQ0FBd0JDLE1BQXhCLEdBQWlDLENBQWhFLEVBQW1FO0FBQ2pFLG9CQUFJQyxTQUFTLEVBQWI7QUFDQSxxQkFBS0osSUFBTCxDQUFVSyxPQUFWLENBQWtCO0FBQUEsMkJB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Z0IyQyxNQUFoQixDQUF1QkQsS0FBbEMsQ0FBWjtBQUNBLHdCQUFJRSxNQUFNLGlCQUFPbkIsR0FBUCxDQUFXLEtBQUszQixHQUFMLENBQVNFLE1BQVQsQ0FBZ0IyQyxNQUFoQixDQUF1QkMsR0FBbEMsQ0FBVjtBQUNBbkMsK0JBQVcsQ0FBWDtBQUNBLHFCQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLE1BQWhCLEVBQXdCLE9BQXhCLEVBQWdDLE1BQWhDLEVBQXdDTCxPQUF4QyxDQUFnRCxnQkFBUTtBQUNwRCw0QkFBSXlDLFNBQVMsQ0FBQ3hDLElBQUQsRUFBTyxHQUFQLEVBQVl5QyxJQUFaLENBQWlCLEVBQWpCLENBQWI7QUFDQSw0QkFBSUMsT0FBU0gsSUFBSUcsSUFBSixDQUFTTCxLQUFULEVBQWdCRyxNQUFoQixDQUFiO0FBQ0EsNEJBQUlFLE9BQU8sQ0FBUCxJQUFZQSxPQUFPLEVBQXZCLEVBQTJCO0FBQ3ZCdEMsdUNBQVdzQyxJQUFYO0FBQ0EsbUNBQUtqRCxHQUFMLENBQVNFLE1BQVQsQ0FBZ0I2QixLQUFoQixHQUF3QiwwQkFBZ0IsT0FBSy9CLEdBQXJCLEVBQTBCa0QsS0FBMUIsRUFBeEI7QUFDSDtBQUNKLHFCQVBEO0FBUUo7QUE1Qko7QUE4QkEsbUJBQU92QyxRQUFQO0FBQ0g7Ozs7O2tCQXpJZ0JaLFkiLCJmaWxlIjoic3RhdHMtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhdHMgQnVpbGRlciBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IFR5cGVCdWlsZGVyIGZyb20gJy4vdHlwZS1idWlsZGVyJztcbi8qKlxuICogQnVpbGRzIFN0YXRpc3RpYyBBcnJheSBmcm9tIExpc3Qgb2YgUmVzdWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQnVpbGRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cblxuICAgIHByb2Nlc3MobGlzdCkge1xuICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICAgIGlmICh0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeSAmJiB0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goaXRlbSA9PiAocmVzdWx0W2l0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldXSA9IHRoaXMuY2FsY3VsYXRlKGl0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldKSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlKGdyb3VwKSB7XG4gICAgICAgIGxldCBkYXRhc2V0ID0gW107XG4gICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMuZ2V0SXRlcmF0b3JDb3VudCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgZGF0ZUluZGV4ID0gaXRlcmF0b3I7IGkgPD0gaXRlcmF0b3I7IGkrKyAsIGRhdGVJbmRleC0tKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0Q3VycmVudE1vbWVudChkYXRlSW5kZXgpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5nZXRDdXJyZW50Q291bnQoY3VycmVudCwgZ3JvdXApO1xuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBjdXJyZW50LnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdW5pdmVyc2FsOiBwYXJzZUludChjdXJyZW50LmZvcm1hdCgneCcpKSxcbiAgICAgICAgICAgICAgICBjb3VudDogY291bnQgPT09IDAgPyAwIDogdGhpcy5jdHguY291bnQuYXZnID8gKGNvdW50IC8gdGhpcy5saXN0Lmxlbmd0aCkgOiBjb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudENvdW50KGN1cnJlbnQsIGdyb3VwKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGdyb3VwICYmIGl0ZW1bdGhpcy5jdHgucGFyYW1zLmdyb3VwQnldICE9PSBncm91cCkgcmV0dXJuO1xuICAgICAgICAgICAgbGV0IGl0ZW1EYXRlID0gbW9tZW50LnV0YyhpdGVtW3RoaXMuY3R4LmNvdW50Lm9uXSk7XG4gICAgICAgICAgICBsZXQgaXRlbUZhY3RvciA9IHRoaXMuZ2V0RmFjdG9yKGl0ZW0pO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmN0eC5wYXJhbXMucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICdob3VyJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ2RheScpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnd2VlaycpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ21vbnRoJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICd5ZWFyJykpIGNvdW50ID0gY291bnQgKyBpdGVtRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG5cbiAgICBnZXRGYWN0b3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIC8vIFdoZW4gY291bnQgYnkgaW5kZXgsIHRoZSBmYWN0b3Igd2lsbCBhbHdheXMgYmUgMVxuICAgICAgICBpZiAodGhpcy5jdHguY291bnQuYnkgPT09ICdpbmRleCcpIMKge1xuICAgICAgICAgICAgdmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBwcm9wZXJ0eSwgY2FuIGJlIG51bWJlciBvciBib29sZWFuXG4gICAgICAgICAgICAvLyBXaGVuIG51bWJlciB3ZSBzZXQgdGhhdCB2YWx1ZSBhcyBmYWN0b3IsIGVsc2Ugd2UgZXZhbHVhdGVcbiAgICAgICAgICAgIC8vIHRoZSB2YWx1ZSBkZXBlbmRpbmcgb24gdHJ1ZS9mYWxzZSB2YWx1ZSBhbmQgdGhpcy5jdHguY291bnQuYXMgdmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLmN0eC5jb3VudC5ieS5tYXRjaCgvXFwuLykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY3R4LmNvdW50LmJ5LnNwbGl0KCcuJykucmVkdWNlKChhLCBiKSA9PiBhW2JdID8gYVtiXSA6IDAsIGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy5jdHguY291bnQuYnldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2hlbiB2YWx1ZSBpcyBib29sZWFuIHdlIHNldCAwLCAxIG9yIHRoaXMuY3R4LmNvdW50LmFzIHRvIHNldCBhIHZhbHVlIHdoZW4gdHJ1ZVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmN0eC5jb3VudC5hcyA/IHRoaXMuY3R4LmNvdW50LmFzIDogMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBzZW5kIGJhY2sgYSBudW1iZXJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyB2YWx1ZSA6IHBhcnNlSW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50TW9tZW50KGluZGV4KSB7XG4gICAgICAgIGxldCBjdXJyZW50O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50LnV0Yyh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnaG91cnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50LnV0Yyh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnZGF5cycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50LnV0Yyh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnd2Vla3MnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQudXRjKHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICdtb250aHMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudC51dGModGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ3llYXJzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlcmF0b3JDb3VudCgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDI0OyAvLyAyNCBob3Vyc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNzsgLy8gc2V2ZW4gZGF5c1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDQ7IC8vIDQgd2Vla3NcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMTI7IC8vIDEyIG1vbnRoc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IDU7IC8vIDUgeWVhcnNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbW9tZW50LnV0Yyh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gbW9tZW50LnV0Yyh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLmVuZCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSAwO1xuICAgICAgICAgICAgICAgIFsnaG91cicsICdkYXknLCAnd2VlaycsICdtb250aCcsJ3llYXInXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZmICAgPSBlbmQuZGlmZihzdGFydCwgcGx1cmFsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAxICYmIGRpZmYgPCAyNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBkaWZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgucGFyYW1zLnJhbmdlID0gbmV3IFR5cGVCdWlsZGVyKHRoaXMuY3R4KS5idWlsZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxufVxuIl19
