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

var _typeBuilder = require('./type-builder');

var _typeBuilder2 = _interopRequireDefault(_typeBuilder);

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
                var range = new _typeBuilder2.default(this.ctx).build();
                switch (range) {
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
//# sourceMappingURL=data:application/json;base64,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QUwsQ0FBUyxLQUFULENBQWUsRUFBZixDQUFaLENBQStCLEVBQS9CLEdBQW9DLHNCQUFPLEtBQUssR0FBTCxDQUFTLFlBQVQsQ0FBUCxDQUE4QixRQUE5QixDQUF1QyxDQUF2QyxFQUEwQyxPQUExQyxFQUFtRCxNQUFuRCxFQUFwQyxDQURKO0FBRUksOEJBRko7QUFiSixpQkFINEM7YUFBaEQ7O0FBYkksZ0JBbUNKLENBQUssTUFBTCxDQUFZLElBQVosRUFBa0IsS0FBbEIsRUFuQ0k7OztXQVRTIiwiZmlsZSI6InF1ZXJ5LWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKipcbiAqIFF1ZXJ5IEJ1aWxkZXIgRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBUeXBlQnVpbGRlciBmcm9tICcuL3R5cGUtYnVpbGRlcic7XG4vKipcbiAqIEJ1aWxkcyBMb29wYmFjayBRdWVyeVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIFNldHRlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cbiAgICBvbkNvbXBsZXRlKG5leHQpIHsgdGhpcy5maW5pc2ggPSBuZXh0OyByZXR1cm4gdGhpczsgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIFF1ZXJ5XG4gICAgICovXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIC8vIEJ1aWxkIHF1ZXJ5IG9iamVjdCBpbiBzY29wZVxuICAgICAgICBsZXQgcXVlcnkgPSB7fTtcbiAgICAgICAgLy8gbGV0cyBhZGQgYSB3aGVyZSBzdGF0ZW1lbnRcbiAgICAgICAgcXVlcnkud2hlcmUgPSB0aGlzLmN0eC5wYXJhbXMud2hlcmUgfHwge307XG4gICAgICAgIC8vIElmIHN0YXQgdHlwZSBpcyByZWxhdGlvbiwgdGhlbiB3ZSBzZXQgdGhlIHJvb3QgaWRcbiAgICAgICAgaWYgKCh0aGlzLmN0eC50eXBlID09PSAncmVsYXRpb24nIHx8IHRoaXMuY3R4LnR5cGUgPT09ICduZXN0ZWQnKSAmJiB0aGlzLmN0eC5wYXJhbXMuaWQpXG4gICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5wYXJhbXMucGtdID0gdGhpcy5jdHgucGFyYW1zLmlkO1xuICAgICAgICAvLyBxdWVyeS53aGVyZVt0aGlzLmN0eC5Nb2RlbC5zZXR0aW5ncy5yZWxhdGlvbnNbdGhpcy5jdHgucGFyYW1zLnJlbGF0aW9uXS5dID0gdGhpcy5jdHgucGFyYW1zLmlkO1xuICAgICAgICAvLyBJZiBzdGF0IHR5cGUgaXMgcmVsYXRpb24sIHRoZW4gd2Ugc2V0IHRoZSByb290IGlkXG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSAncmVsYXRpb24nICYmIHRoaXMuY3R4LnBhcmFtcy5yZWxhdGlvbilcbiAgICAgICAgICAgIHF1ZXJ5LmluY2x1ZGUgPSB0aGlzLmN0eC5wYXJhbXMucmVsYXRpb247XG4gICAgICAgIC8vIFNldCBSYW5nZVxuICAgICAgICBpZiAodGhpcy5jdHgucGFyYW1zLnJhbmdlICYmIHRoaXMuY3R4LmNvdW50Lm9uKSB7XG4gICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0gPSB7fTtcbiAgICAgICAgICAgIGxldCByYW5nZSA9IG5ldyBUeXBlQnVpbGRlcih0aGlzLmN0eCkuYnVpbGQoKTtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdob3VybHknOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCgyNCwgJ2hvdXJzJykudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmd0ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoNywgJ2RheXMnKS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkud2hlcmVbdGhpcy5jdHguY291bnQub25dLmd0ID0gbW9tZW50KHRoaXMuY3R4Lm5vd0lTT1N0cmluZykuc3VidHJhY3QoNCwgJ3dlZWtzJykudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCgxMiwgJ21vbnRocycpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeS53aGVyZVt0aGlzLmN0eC5jb3VudC5vbl0uZ3QgPSBtb21lbnQodGhpcy5jdHgubm93SVNPU3RyaW5nKS5zdWJ0cmFjdCg1LCAneWVhcnMnKS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIHJlc3VsdCBxdWVyeVxuICAgICAgICB0aGlzLmZpbmlzaChudWxsLCBxdWVyeSk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
