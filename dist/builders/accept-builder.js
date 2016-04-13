"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds Parameters object for dynamic remote method
 */

var AcceptBuilder = function () {
    /**
     * Setters
     */

    function AcceptBuilder(ctx) {
        (0, _classCallCheck3.default)(this, AcceptBuilder);
        this.ctx = ctx;
    }
    /**
     * Parse params according ctx type
     */


    (0, _createClass3.default)(AcceptBuilder, [{
        key: "build",
        value: function build() {
            var accepts = [];
            if (this.ctx.type === "relation" || this.ctx.type === "nested") accepts.push({ arg: 'id', type: 'string', required: true, description: this.ctx.Model.definition.name + ' ID' });
            if (this.ctx.type === "relation" && !this.ctx.relation) accepts.push({ arg: 'relation', type: 'string', required: true, description: 'Relationship name' });
            if (this.ctx.type === "nested") accepts.push({ arg: 'nested', type: 'string', required: true, description: 'Nested array property name' });
            accepts.push({ arg: 'range', type: 'string', required: true, description: 'hourly, daily, weekly, monthly, yearly, custom' });
            accepts.push({ arg: 'custom', type: 'object', required: false, description: '{"start": date, "end": date }' });
            accepts.push({ arg: 'where', type: 'object', description: 'where filter ' + (this.ctx.relation || this.ctx.nested || '') });
            accepts.push({ arg: 'groupBy', type: 'string', description: 'group by filter ' });
            return accepts;
        }
    }]);
    return AcceptBuilder;
}();

exports.default = AcceptBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2VwdC1idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR3FCOzs7OztBQUlqQixhQUppQixhQUlqQixDQUFZLEdBQVosRUFBaUI7NENBSkEsZUFJQTtBQUFFLGFBQUssR0FBTCxHQUFXLEdBQVgsQ0FBRjtLQUFqQjs7Ozs7OytCQUppQjs7Z0NBUVQ7QUFDSixnQkFBSSxVQUFVLEVBQVYsQ0FEQTtBQUVKLGdCQUFJLEtBQUssR0FBTCxDQUFTLElBQVQsS0FBa0IsVUFBbEIsSUFBZ0MsS0FBSyxHQUFMLENBQVMsSUFBVCxLQUFrQixRQUFsQixFQUNoQyxRQUFRLElBQVIsQ0FBYSxFQUFFLEtBQUssSUFBTCxFQUFXLE1BQU0sUUFBTixFQUFnQixVQUFVLElBQVYsRUFBZ0IsYUFBYSxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsVUFBZixDQUEwQixJQUExQixHQUFpQyxLQUFqQyxFQUF2RSxFQURKO0FBRUEsZ0JBQUksS0FBSyxHQUFMLENBQVMsSUFBVCxLQUFrQixVQUFsQixJQUFnQyxDQUFDLEtBQUssR0FBTCxDQUFTLFFBQVQsRUFDakMsUUFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLFVBQUwsRUFBaUIsTUFBTSxRQUFOLEVBQWdCLFVBQVUsSUFBVixFQUFnQixhQUFhLG1CQUFiLEVBQWhFLEVBREo7QUFFQSxnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLFFBQWxCLEVBQ0EsUUFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLFFBQUwsRUFBZSxNQUFNLFFBQU4sRUFBZ0IsVUFBVSxJQUFWLEVBQWdCLGFBQWEsNEJBQWIsRUFBOUQsRUFESjtBQUVBLG9CQUFRLElBQVIsQ0FBYSxFQUFFLEtBQUssT0FBTCxFQUFjLE1BQU0sUUFBTixFQUFnQixVQUFVLElBQVYsRUFBZ0IsYUFBYSxnREFBYixFQUE3RCxFQVJJO0FBU0osb0JBQVEsSUFBUixDQUFhLEVBQUUsS0FBSyxRQUFMLEVBQWUsTUFBTSxRQUFOLEVBQWdCLFVBQVUsS0FBVixFQUFpQixhQUFhLCtCQUFiLEVBQS9ELEVBVEk7QUFVSixvQkFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLE9BQUwsRUFBYyxNQUFNLFFBQU4sRUFBZ0IsYUFBYSxtQkFBbUIsS0FBSyxHQUFMLENBQVMsUUFBVCxJQUFxQixLQUFLLEdBQUwsQ0FBUyxNQUFULElBQW1CLEVBQXhDLENBQW5CLEVBQTFELEVBVkk7QUFXSixvQkFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLFNBQUwsRUFBZ0IsTUFBTSxRQUFOLEVBQWdCLGFBQWEsa0JBQWIsRUFBL0MsRUFYSTtBQVlKLG1CQUFPLE9BQVAsQ0FaSTs7O1dBUlMiLCJmaWxlIjoiYWNjZXB0LWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1aWxkcyBQYXJhbWV0ZXJzIG9iamVjdCBmb3IgZHluYW1pYyByZW1vdGUgbWV0aG9kXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY2VwdEJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIFNldHRlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBwYXJhbXMgYWNjb3JkaW5nIGN0eCB0eXBlXG4gICAgICovXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBhY2NlcHRzID0gW107XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcInJlbGF0aW9uXCIgfHwgdGhpcy5jdHgudHlwZSA9PT0gXCJuZXN0ZWRcIilcbiAgICAgICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ2lkJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogdGhpcy5jdHguTW9kZWwuZGVmaW5pdGlvbi5uYW1lICsgJyBJRCcgfSk7XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcInJlbGF0aW9uXCIgJiYgIXRoaXMuY3R4LnJlbGF0aW9uKVxuICAgICAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAncmVsYXRpb24nLCB0eXBlOiAnc3RyaW5nJywgcmVxdWlyZWQ6IHRydWUsIGRlc2NyaXB0aW9uOiAnUmVsYXRpb25zaGlwIG5hbWUnIH0pO1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJuZXN0ZWRcIilcbiAgICAgICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ25lc3RlZCcsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSwgZGVzY3JpcHRpb246ICdOZXN0ZWQgYXJyYXkgcHJvcGVydHkgbmFtZScgfSk7XG4gICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ3JhbmdlJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogJ2hvdXJseSwgZGFpbHksIHdlZWtseSwgbW9udGhseSwgeWVhcmx5LCBjdXN0b20nIH0pO1xuICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdjdXN0b20nLCB0eXBlOiAnb2JqZWN0JywgcmVxdWlyZWQ6IGZhbHNlLCBkZXNjcmlwdGlvbjogJ3tcInN0YXJ0XCI6IGRhdGUsIFwiZW5kXCI6IGRhdGUgfScgfSk7XG4gICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ3doZXJlJywgdHlwZTogJ29iamVjdCcsIGRlc2NyaXB0aW9uOiAnd2hlcmUgZmlsdGVyICcgKyAodGhpcy5jdHgucmVsYXRpb24gfHzCoHRoaXMuY3R4Lm5lc3RlZCB8fMKgJycpIH0pO1xuICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdncm91cEJ5JywgdHlwZTogJ3N0cmluZycsIGRlc2NyaXB0aW9uOiAnZ3JvdXAgYnkgZmlsdGVyICcgfSk7XG4gICAgICAgIHJldHVybiBhY2NlcHRzO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
