'use strict';
/**
 * Query Builder Dependencies
 */

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
 * Builds Loopback Query
 */

var QueryBuilder = function () {
    /**
     * Setters
     */

    function QueryBuilder(ctx) {
        (0, _classCallCheck3.default)(this, QueryBuilder);
        this.ctx = ctx;
    }

    (0, _createClass3.default)(QueryBuilder, [{
        key: 'onComplete',
        value: function onComplete(next) {
            this.finish = next;return this;
        }
        /**
         * Build Query
         */

    }, {
        key: 'build',
        value: function build() {
            // Build query object in scope
            var query = {};
            // lets add a where statement
            query.where = this.ctx.params.where || {};
            // If stat type is relation, then we set the root id
            if ((this.ctx.type === 'relation' || this.ctx.type === 'nested') && this.ctx.params.id) query.where[this.ctx.params.pk] = this.ctx.params.id;
            // query.where[this.ctx.Model.settings.relations[this.ctx.params.relation].] = this.ctx.params.id;
            // If stat type is relation, then we set the root id
            if (this.ctx.type === 'relation' && this.ctx.params.relation) query.include = this.ctx.params.relation;
            // Set Range
            if (this.ctx.params.range && this.ctx.count.on) {
                query.where[this.ctx.count.on] = {};
                switch (this.ctx.params.range) {
                    case 'hourly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(24, 'hours').toDate();
                        break;
                    case 'daily':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(7, 'days').toDate();
                        break;
                    case 'weekly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(4, 'weeks').toDate();
                        break;
                    case 'monthly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(12, 'months').toDate();
                        break;
                    case 'yearly':
                        query.where[this.ctx.count.on].gt = (0, _moment2.default)(this.ctx.nowISOString).subtract(5, 'years').toDate();
                        break;
                    case 'custom':
                        query.where[this.ctx.count.on].gte = this.ctx.params.custom.start;
                        query.where[this.ctx.count.on].lte = this.ctx.params.custom.end;
                        break;
                }
            }
            // Return result query
            this.finish(null, query);
        }
    }]);
    return QueryBuilder;
}();

exports.default = QueryBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QyxzQkFBTyxLQUFLLEdBQUwsQ0FBUyxZQUFULENBQVAsQ0FBOEIsUUFBOUIsQ0FBdUMsQ0FBdkMsRUFBMEMsT0FBMUMsRUFBbUQsTUFBbkQsRUFBcEMsQ0FESjtBQUVJLDhCQUZKO0FBYkoseUJBZ0JTLFFBQUw7QUFDSSw4QkFBTSxLQUFOLENBQVksS0FBSyxHQUFMLENBQVMsS0FBVCxDQUFlLEVBQWYsQ0FBWixDQUErQixHQUEvQixHQUFxQyxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLE1BQWhCLENBQXVCLEtBQXZCLENBRHpDO0FBRUksOEJBQU0sS0FBTixDQUFZLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxFQUFmLENBQVosQ0FBK0IsR0FBL0IsR0FBcUMsS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QixHQUF2QixDQUZ6QztBQUdJLDhCQUhKO0FBaEJKLGlCQUY0QzthQUFoRDs7QUFiSSxnQkFzQ0osQ0FBSyxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQixFQXRDSTs7O1dBVFMiLCJmaWxlIjoicXVlcnktYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogUXVlcnkgQnVpbGRlciBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuLyoqXG4gKiBCdWlsZHMgTG9vcGJhY2sgUXVlcnlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlCdWlsZGVyIHtcbiAgICAvKipcbiAgICAgKiBTZXR0ZXJzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XG4gICAgb25Db21wbGV0ZShuZXh0KSB7IHRoaXMuZmluaXNoID0gbmV4dDsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCBRdWVyeVxuICAgICAqL1xuICAgIGJ1aWxkKCkge1xuICAgICAgICAvLyBCdWlsZCBxdWVyeSBvYmplY3QgaW4gc2NvcGVcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge307XG4gICAgICAgIC8vIGxldHMgYWRkIGEgd2hlcmUgc3RhdGVtZW50XG4gICAgICAgIHF1ZXJ5LndoZXJlID0gdGhpcy5jdHgucGFyYW1zLndoZXJlIHx8IHt9O1xuICAgICAgICAvLyBJZiBzdGF0IHR5cGUgaXMgcmVsYXRpb24sIHRoZW4gd2Ugc2V0IHRoZSByb290IGlkXG4gICAgICAgIGlmICgodGhpcy5jdHgudHlwZSA9PT0gJ3JlbGF0aW9uJyB8fCB0aGlzLmN0eC50eXBlID09PSAnbmVzdGVkJykgJiYgdGhpcy5jdHgucGFyYW1zLmlkKVxuICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHgucGFyYW1zLnBrXSA9IHRoaXMuY3R4LnBhcmFtcy5pZDtcbiAgICAgICAgLy8gcXVlcnkud2hlcmVbdGhpcy5jdHguTW9kZWwuc2V0dGluZ3MucmVsYXRpb25zW3RoaXMuY3R4LnBhcmFtcy5yZWxhdGlvbl0uXSA9IHRoaXMuY3R4LnBhcmFtcy5pZDtcbiAgICAgICAgLy8gSWYgc3RhdCB0eXBlIGlzIHJlbGF0aW9uLCB0aGVuIHdlIHNldCB0aGUgcm9vdCBpZFxuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gJ3JlbGF0aW9uJyAmJiB0aGlzLmN0eC5wYXJhbXMucmVsYXRpb24pXG4gICAgICAgICAgICBxdWVyeS5pbmNsdWRlID0gdGhpcy5jdHgucGFyYW1zLnJlbGF0aW9uO1xuICAgICAgICAvLyBTZXQgUmFuZ2VcbiAgICAgICAgaWYgKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSAmJiB0aGlzLmN0eC5jb3VudC5vbikge1xuICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dID0ge307XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3R4LnBhcmFtcy5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXJseSc6XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LndoZXJlW3RoaXMuY3R4LmNvdW50Lm9uXS5ndCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KDI0LCAnaG91cnMnKS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGFpbHknOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCg3LCAnZGF5cycpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCg0LCAnd2Vla3MnKS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LndoZXJlW3RoaXMuY3R4LmNvdW50Lm9uXS5ndCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KDEyLCAnbW9udGhzJykudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LndoZXJlW3RoaXMuY3R4LmNvdW50Lm9uXS5ndCA9IG1vbWVudCh0aGlzLmN0eC5ub3dJU09TdHJpbmcpLnN1YnRyYWN0KDUsICd5ZWFycycpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3RlID0gdGhpcy5jdHgucGFyYW1zLmN1c3RvbS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmx0ZSA9IHRoaXMuY3R4LnBhcmFtcy5jdXN0b20uZW5kO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gcmVzdWx0IHF1ZXJ5XG4gICAgICAgIHRoaXMuZmluaXNoKG51bGwsIHF1ZXJ5KTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
