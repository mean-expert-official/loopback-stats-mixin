'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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
                var _ret = function () {
                    var result = {};
                    _this.list.forEach(function (item) {
                        return result[item[_this.ctx.params.groupBy]] = _this.calculate(item[_this.ctx.params.groupBy]);
                    });
                    return {
                        v: result
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
//# sourceMappingURL=data:application/json;base64,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QUFMO0FBQ0ksK0JBQVcsRUFBWDtBQURKO0FBREoscUJBSVMsT0FBTDtBQUNJLCtCQUFXLENBQVg7QUFESjtBQUpKLHFCQU9TLFFBQUw7QUFDSSwrQkFBVyxDQUFYO0FBREo7QUFQSixxQkFVUyxTQUFMO0FBQ0ksK0JBQVcsRUFBWDtBQURKO0FBVkoscUJBYVMsUUFBTDtBQUNJLCtCQUFXLENBQVg7QUFESjtBQWJKLHFCQWdCUyxRQUFMO0FBQ0ksd0JBQUksUUFBUSxzQkFBTyxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLE1BQWhCLENBQXVCLEtBQXZCLENBQWYsQ0FEUjtBQUVJLHdCQUFJLE1BQU0sc0JBQU8sS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QixHQUF2QixDQUFiLENBRlI7QUFHSSwrQkFBVyxDQUFYLENBSEo7QUFJSSxxQkFBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixNQUFoQixFQUF3QixPQUF4QixFQUFnQyxNQUFoQyxFQUF3QyxPQUF4QyxDQUFnRCxnQkFBUTtBQUNwRCw0QkFBSSxTQUFTLENBQUMsSUFBRCxFQUFPLEdBQVAsRUFBWSxJQUFaLENBQWlCLEVBQWpCLENBQVQsQ0FEZ0Q7QUFFcEQsNEJBQUksT0FBUyxJQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLE1BQWhCLENBQVQsQ0FGZ0Q7QUFHcEQsNEJBQUksT0FBTyxDQUFQLElBQVksT0FBTyxFQUFQLEVBQVc7QUFDdkIsdUNBQVcsSUFBWCxDQUR1QjtBQUV2QixtQ0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixLQUFoQixHQUF3QiwwQkFBZ0IsT0FBSyxHQUFMLENBQWhCLENBQTBCLEtBQTFCLEVBQXhCLENBRnVCO3lCQUEzQjtxQkFINEMsQ0FBaEQsQ0FKSjtBQVlBLDBCQVpBO0FBaEJKLGFBRmU7QUFnQ2YsbUJBQU8sUUFBUCxDQWhDZTs7O1dBeEdGIiwiZmlsZSI6InN0YXRzLWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0YXRzIEJ1aWxkZXIgRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBUeXBlQnVpbGRlciBmcm9tICcuL3R5cGUtYnVpbGRlcic7XG4vKipcbiAqIEJ1aWxkcyBTdGF0aXN0aWMgQXJyYXkgZnJvbSBMaXN0IG9mIFJlc3Vsc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0J1aWxkZXIge1xuXG4gICAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XG4gICAgXG4gICAgcHJvY2VzcyhsaXN0KSB7XG4gICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgaWYgKHRoaXMuY3R4LnBhcmFtcy5ncm91cEJ5ICYmIHRoaXMuY3R4LnBhcmFtcy5ncm91cEJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChpdGVtID0+IChyZXN1bHRbaXRlbVt0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeV1dID0gdGhpcy5jYWxjdWxhdGUoaXRlbVt0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeV0pKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGUoZ3JvdXApIHtcbiAgICAgICAgbGV0IGRhdGFzZXQgPSBbXTtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5nZXRJdGVyYXRvckNvdW50KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBkYXRlSW5kZXggPSBpdGVyYXRvcjsgaSA8PSBpdGVyYXRvcjsgaSsrICwgZGF0ZUluZGV4LS0pIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRDdXJyZW50TW9tZW50KGRhdGVJbmRleCk7XG4gICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLmdldEN1cnJlbnRDb3VudChjdXJyZW50LCBncm91cCk7XG4gICAgICAgICAgICBkYXRhc2V0LnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGU6IGN1cnJlbnQudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB1bml2ZXJzYWw6IHBhcnNlSW50KGN1cnJlbnQuZm9ybWF0KCd4JykpLFxuICAgICAgICAgICAgICAgIGNvdW50OiBjb3VudCA9PT0gMCA/IDAgOiB0aGlzLmN0eC5jb3VudC5hdmcgPyAoY291bnQgLyB0aGlzLmxpc3QubGVuZ3RoKSA6IGNvdW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50Q291bnQoY3VycmVudCwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3JvdXAgJiYgaXRlbVt0aGlzLmN0eC5wYXJhbXMuZ3JvdXBCeV0gIT09IGdyb3VwKSByZXR1cm47XG4gICAgICAgICAgICBsZXQgaXRlbURhdGUgPSBtb21lbnQoaXRlbVt0aGlzLmN0eC5jb3VudC5vbl0pO1xuICAgICAgICAgICAgbGV0IGl0ZW1GYWN0b3IgPSB0aGlzLmdldEZhY3RvcihpdGVtKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnaG91cicpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICdkYXknKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ3dlZWsnKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICdtb250aCcpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAneWVhcicpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgZ2V0RmFjdG9yKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAvLyBXaGVuIGNvdW50IGJ5IGluZGV4LCB0aGUgZmFjdG9yIHdpbGwgYWx3YXlzIGJlIDFcbiAgICAgICAgaWYgKHRoaXMuY3R4LmNvdW50LmJ5ID09PSAnaW5kZXgnKSDCoHtcbiAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgcHJvcGVydHksIGNhbiBiZSBudW1iZXIgb3IgYm9vbGVhblxuICAgICAgICAgICAgLy8gV2hlbiBudW1iZXIgd2Ugc2V0IHRoYXQgdmFsdWUgYXMgZmFjdG9yLCBlbHNlIHdlIGV2YWx1YXRlXG4gICAgICAgICAgICAvLyB0aGUgdmFsdWUgZGVwZW5kaW5nIG9uIHRydWUvZmFsc2UgdmFsdWUgYW5kIHRoaXMuY3R4LmNvdW50LmFzIHZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy5jdHguY291bnQuYnkubWF0Y2goL1xcLi8pKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmN0eC5jb3VudC5ieS5zcGxpdCgnLicpLnJlZHVjZSgoYSwgYikgPT4gYVtiXSA/IGFbYl0gOiAwLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtW3RoaXMuY3R4LmNvdW50LmJ5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdoZW4gdmFsdWUgaXMgYm9vbGVhbiB3ZSBzZXQgMCwgMSBvciB0aGlzLmN0eC5jb3VudC5hcyB0byBzZXQgYSB2YWx1ZSB3aGVuIHRydWVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jdHguY291bnQuYXMgPyB0aGlzLmN0eC5jb3VudC5hcyA6IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBNYWtlIHN1cmUgd2Ugc2VuZCBiYWNrIGEgbnVtYmVyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgOiBwYXJzZUludCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudE1vbWVudChpbmRleCkge1xuICAgICAgICBsZXQgY3VycmVudDtcbiAgICAgICAgc3dpdGNoICh0aGlzLmN0eC5wYXJhbXMucmFuZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnaG91cnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICdkYXlzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ3dlZWtzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICdtb250aHMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAneWVhcnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG5cbiAgICBnZXRJdGVyYXRvckNvdW50KCkge1xuICAgICAgICBsZXQgaXRlcmF0b3I7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMjQ7IC8vIDI0IGhvdXJzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSA3OyAvLyBzZXZlbiBkYXlzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNDsgLy8gNCB3ZWVrc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSAxMjsgLy8gMTIgbW9udGhzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNTsgLy8gNSB5ZWFyc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5zdGFydCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IG1vbWVudCh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLmVuZCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSAwO1xuICAgICAgICAgICAgICAgIFsnaG91cicsICdkYXknLCAnd2VlaycsICdtb250aCcsJ3llYXInXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZmICAgPSBlbmQuZGlmZihzdGFydCwgcGx1cmFsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAxICYmIGRpZmYgPCAyNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBkaWZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgucGFyYW1zLnJhbmdlID0gbmV3IFR5cGVCdWlsZGVyKHRoaXMuY3R4KS5idWlsZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
