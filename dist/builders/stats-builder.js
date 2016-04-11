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
                    universal: current.format('x'),
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
//# sourceMappingURL=data:application/json;base64,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QURnRDtBQUVwRCw0QkFBSSxPQUFTLElBQUksSUFBSixDQUFTLEtBQVQsRUFBZ0IsTUFBaEIsQ0FBVCxDQUZnRDtBQUdwRCw0QkFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLEVBQVAsRUFBVztBQUN2Qix1Q0FBVyxJQUFYLENBRHVCO0FBRXZCLG1DQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhCLEdBQXdCLDBCQUFnQixPQUFLLEdBQUwsQ0FBaEIsQ0FBMEIsS0FBMUIsRUFBeEIsQ0FGdUI7eUJBQTNCO3FCQUg0QyxDQUFoRCxDQUpKO0FBWUEsMEJBWkE7QUFoQkosYUFGZTtBQWdDZixtQkFBTyxRQUFQLENBaENlOzs7V0E3RkYiLCJmaWxlIjoic3RhdHMtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhdHMgQnVpbGRlciBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IFR5cGVCdWlsZGVyIGZyb20gJy4vdHlwZS1idWlsZGVyJztcbi8qKlxuICogQnVpbGRzIFN0YXRpc3RpYyBBcnJheSBmcm9tIExpc3Qgb2YgUmVzdWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQnVpbGRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cblxuICAgIHByb2Nlc3MobGlzdCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgICBsZXQgZGF0YXNldCA9IFtdO1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmdldEl0ZXJhdG9yQ291bnQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGRhdGVJbmRleCA9IGl0ZXJhdG9yOyBpIDw9IGl0ZXJhdG9yOyBpKysgLCBkYXRlSW5kZXgtLSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLmdldEN1cnJlbnRNb21lbnQoZGF0ZUluZGV4KTtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0Q3VycmVudENvdW50KGN1cnJlbnQpO1xuICAgICAgICAgICAgZGF0YXNldC5wdXNoKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBjdXJyZW50LnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdW5pdmVyc2FsOiBjdXJyZW50LmZvcm1hdCgneCcpLFxuICAgICAgICAgICAgICAgIGNvdW50OiBjb3VudCA9PT0gMCA/IDAgOiB0aGlzLmN0eC5jb3VudC5hdmcgPyAoY291bnQgLyBsaXN0Lmxlbmd0aCkgOiBjb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudENvdW50KGN1cnJlbnQpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbURhdGUgPSBtb21lbnQoaXRlbVt0aGlzLmN0eC5jb3VudC5vbl0pO1xuICAgICAgICAgICAgbGV0IGl0ZW1GYWN0b3IgPSB0aGlzLmdldEZhY3RvcihpdGVtKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAnaG91cicpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICdkYXknKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmlzU2FtZShpdGVtRGF0ZSwgJ3dlZWsnKSkgY291bnQgPSBjb3VudCArIGl0ZW1GYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoaXRlbURhdGUsICdtb250aCcpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcmx5JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGl0ZW1EYXRlLCAneWVhcicpKSBjb3VudCA9IGNvdW50ICsgaXRlbUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgZ2V0RmFjdG9yKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAvLyBXaGVuIGNvdW50IGJ5IGluZGV4LCB0aGUgZmFjdG9yIHdpbGwgYWx3YXlzIGJlIDFcbiAgICAgICAgaWYgKHRoaXMuY3R4LmNvdW50LmJ5ID09PSAnaW5kZXgnKSDCoHtcbiAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgcHJvcGVydHksIGNhbiBiZSBudW1iZXIgb3IgYm9vbGVhblxuICAgICAgICAgICAgLy8gV2hlbiBudW1iZXIgd2Ugc2V0IHRoYXQgdmFsdWUgYXMgZmFjdG9yLCBlbHNlIHdlIGV2YWx1YXRlXG4gICAgICAgICAgICAvLyB0aGUgdmFsdWUgZGVwZW5kaW5nIG9uIHRydWUvZmFsc2UgdmFsdWUgYW5kIHRoaXMuY3R4LmNvdW50LmFzIHZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy5jdHguY291bnQuYnkubWF0Y2goL1xcLi8pKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmN0eC5jb3VudC5ieS5zcGxpdCgnLicpLnJlZHVjZSgoYSwgYikgPT4gYVtiXSA/IGFbYl0gOiAwLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtW3RoaXMuY3R4LmNvdW50LmJ5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdoZW4gdmFsdWUgaXMgYm9vbGVhbiB3ZSBzZXQgMCwgMSBvciB0aGlzLmN0eC5jb3VudC5hcyB0byBzZXQgYSB2YWx1ZSB3aGVuIHRydWVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jdHguY291bnQuYXMgPyB0aGlzLmN0eC5jb3VudC5hcyA6IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBNYWtlIHN1cmUgd2Ugc2VuZCBiYWNrIGEgbnVtYmVyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgOiBwYXJzZUludCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudE1vbWVudChpbmRleCkge1xuICAgICAgICBsZXQgY3VycmVudDtcbiAgICAgICAgc3dpdGNoICh0aGlzLmN0eC5wYXJhbXMucmFuZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAnaG91cnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICdkYXlzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdChpbmRleCwgJ3dlZWtzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoaW5kZXgsICdtb250aHMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KGluZGV4LCAneWVhcnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG5cbiAgICBnZXRJdGVyYXRvckNvdW50KCkge1xuICAgICAgICBsZXQgaXRlcmF0b3I7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jdHgucGFyYW1zLnJhbmdlKSB7XG4gICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gMjQ7IC8vIDI0IGhvdXJzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSA3OyAvLyBzZXZlbiBkYXlzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNDsgLy8gNCB3ZWVrc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSAxMjsgLy8gMTIgbW9udGhzXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gNTsgLy8gNSB5ZWFyc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBtb21lbnQodGhpcy5jdHgucGFyYW1zLmN1c3RvbS5zdGFydCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IG1vbWVudCh0aGlzLmN0eC5wYXJhbXMuY3VzdG9tLmVuZCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSAwO1xuICAgICAgICAgICAgICAgIFsnaG91cicsICdkYXknLCAnd2VlaycsICdtb250aCcsJ3llYXInXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGx1cmFsID0gW2l0ZW0sICdzJ10uam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZmICAgPSBlbmQuZGlmZihzdGFydCwgcGx1cmFsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAxICYmIGRpZmYgPCAyNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBkaWZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgucGFyYW1zLnJhbmdlID0gbmV3IFR5cGVCdWlsZGVyKHRoaXMuY3R4KS5idWlsZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
