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
            accepts.push({ arg: 'range', type: 'string', required: true, description: 'daily, weekly, monthly, annual, custom' });
            accepts.push({ arg: 'custom', type: 'object', required: false, description: '{"start": date, "end": date }' });
            accepts.push({ arg: 'where', type: 'object', description: 'Statement to filter ' + (this.ctx.relation || this.ctx.nested) });
            return accepts;
        }
    }]);
    return AcceptBuilder;
}();

exports.default = AcceptBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2VwdC1idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR3FCOzs7OztBQUlqQixhQUppQixhQUlqQixDQUFZLEdBQVosRUFBaUI7NENBSkEsZUFJQTtBQUFFLGFBQUssR0FBTCxHQUFXLEdBQVgsQ0FBRjtLQUFqQjs7Ozs7OytCQUppQjs7Z0NBUVQ7QUFDSixnQkFBSSxVQUFVLEVBQVYsQ0FEQTtBQUVKLGdCQUFJLEtBQUssR0FBTCxDQUFTLElBQVQsS0FBa0IsVUFBbEIsSUFBZ0MsS0FBSyxHQUFMLENBQVMsSUFBVCxLQUFrQixRQUFsQixFQUNoQyxRQUFRLElBQVIsQ0FBYSxFQUFFLEtBQUssSUFBTCxFQUFXLE1BQU0sUUFBTixFQUFnQixVQUFVLElBQVYsRUFBZ0IsYUFBYSxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsVUFBZixDQUEwQixJQUExQixHQUFpQyxLQUFqQyxFQUF2RSxFQURKO0FBRUEsZ0JBQUksS0FBSyxHQUFMLENBQVMsSUFBVCxLQUFrQixVQUFsQixJQUFnQyxDQUFDLEtBQUssR0FBTCxDQUFTLFFBQVQsRUFDakMsUUFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLFVBQUwsRUFBaUIsTUFBTSxRQUFOLEVBQWdCLFVBQVUsSUFBVixFQUFnQixhQUFhLG1CQUFiLEVBQWhFLEVBREo7QUFFQSxnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLFFBQWxCLEVBQ0EsUUFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLFFBQUwsRUFBZSxNQUFNLFFBQU4sRUFBZ0IsVUFBVSxJQUFWLEVBQWdCLGFBQWEsNEJBQWIsRUFBOUQsRUFESjtBQUVBLG9CQUFRLElBQVIsQ0FBYSxFQUFFLEtBQUssT0FBTCxFQUFjLE1BQU0sUUFBTixFQUFnQixVQUFVLElBQVYsRUFBZ0IsYUFBYSx3Q0FBYixFQUE3RCxFQVJJO0FBU0osb0JBQVEsSUFBUixDQUFhLEVBQUUsS0FBSyxRQUFMLEVBQWUsTUFBTSxRQUFOLEVBQWdCLFVBQVUsS0FBVixFQUFpQixhQUFhLCtCQUFiLEVBQS9ELEVBVEk7QUFVSixvQkFBUSxJQUFSLENBQWEsRUFBRSxLQUFLLE9BQUwsRUFBYyxNQUFNLFFBQU4sRUFBZ0IsYUFBYSwwQkFBMEIsS0FBSyxHQUFMLENBQVMsUUFBVCxJQUFxQixLQUFLLEdBQUwsQ0FBUyxNQUFULENBQS9DLEVBQTFELEVBVkk7QUFXSixtQkFBTyxPQUFQLENBWEk7OztXQVJTIiwiZmlsZSI6ImFjY2VwdC1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCdWlsZHMgUGFyYW1ldGVycyBvYmplY3QgZm9yIGR5bmFtaWMgcmVtb3RlIG1ldGhvZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NlcHRCdWlsZGVyIHtcbiAgICAvKipcbiAgICAgKiBTZXR0ZXJzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgcGFyYW1zIGFjY29yZGluZyBjdHggdHlwZVxuICAgICAqL1xuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgYWNjZXB0cyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJyZWxhdGlvblwiIHx8IHRoaXMuY3R4LnR5cGUgPT09IFwibmVzdGVkXCIpXG4gICAgICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdpZCcsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSwgZGVzY3JpcHRpb246IHRoaXMuY3R4Lk1vZGVsLmRlZmluaXRpb24ubmFtZSArICcgSUQnIH0pO1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJyZWxhdGlvblwiICYmICF0aGlzLmN0eC5yZWxhdGlvbilcbiAgICAgICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ3JlbGF0aW9uJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogJ1JlbGF0aW9uc2hpcCBuYW1lJyB9KTtcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwibmVzdGVkXCIpXG4gICAgICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICduZXN0ZWQnLCB0eXBlOiAnc3RyaW5nJywgcmVxdWlyZWQ6IHRydWUsIGRlc2NyaXB0aW9uOiAnTmVzdGVkIGFycmF5IHByb3BlcnR5IG5hbWUnIH0pO1xuICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdyYW5nZScsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSwgZGVzY3JpcHRpb246ICdkYWlseSwgd2Vla2x5LCBtb250aGx5LCBhbm51YWwsIGN1c3RvbScgfSk7XG4gICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ2N1c3RvbScsIHR5cGU6ICdvYmplY3QnLCByZXF1aXJlZDogZmFsc2UsIGRlc2NyaXB0aW9uOiAne1wic3RhcnRcIjogZGF0ZSwgXCJlbmRcIjogZGF0ZSB9JyB9KTtcbiAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnd2hlcmUnLCB0eXBlOiAnb2JqZWN0JywgZGVzY3JpcHRpb246ICdTdGF0ZW1lbnQgdG8gZmlsdGVyICcgKyAodGhpcy5jdHgucmVsYXRpb24gfHzCoHRoaXMuY3R4Lm5lc3RlZCkgfSk7XG4gICAgICAgIHJldHVybiBhY2NlcHRzO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
