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
 * Builds Parameters object from dynamic arguments
 */

var ParamsBuilder = function () {
    /**
     * Setters
     */

    function ParamsBuilder(ctx) {
        (0, _classCallCheck3.default)(this, ParamsBuilder);
        this.ctx = ctx;
    }
    /**
     * Parse params according ctx type
     */


    (0, _createClass3.default)(ParamsBuilder, [{
        key: "build",
        value: function build() {
            if (this.ctx.type === "model") return { range: this.ctx.arguments[0], custom: this.ctx.arguments[1], where: this.ctx.arguments[2], next: this.ctx.arguments[3] };
            if (this.ctx.type === "relation" && this.ctx.relation) return { id: this.ctx.arguments[0], range: this.ctx.arguments[1], custom: this.ctx.arguments[2], where: this.ctx.arguments[3], next: this.ctx.arguments[4] };
            if (this.ctx.type === "relation" && !this.ctx.relation) return { id: this.ctx.arguments[0], relation: this.ctx.arguments[1], range: this.ctx.arguments[2], custom: this.ctx.arguments[3], where: this.ctx.arguments[4], next: this.ctx.arguments[5] };
            if (this.ctx.type === "nested") return { id: this.ctx.arguments[0], nested: this.ctx.arguments[1], range: this.ctx.arguments[2], custom: this.ctx.arguments[3], where: this.ctx.arguments[4], next: this.ctx.arguments[5] };
        }
    }]);
    return ParamsBuilder;
}();

exports.default = ParamsBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmFtcy1idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR3FCOzs7OztBQUlqQixhQUppQixhQUlqQixDQUFZLEdBQVosRUFBaUI7NENBSkEsZUFJQTtBQUFFLGFBQUssR0FBTCxHQUFXLEdBQVgsQ0FBRjtLQUFqQjs7Ozs7OytCQUppQjs7Z0NBUVQ7QUFDSixnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLE9BQWxCLEVBQ0EsT0FBTyxFQUFFLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLFFBQVEsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFSLEVBQStCLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLE1BQU0sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFOLEVBQXBHLENBREo7QUFFQSxnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLFVBQWxCLElBQWdDLEtBQUssR0FBTCxDQUFTLFFBQVQsRUFDaEMsT0FBTyxFQUFFLElBQUksS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFKLEVBQTJCLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLFFBQVEsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFSLEVBQStCLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLE1BQU0sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFOLEVBQS9ILENBREo7QUFFQSxnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLFVBQWxCLElBQWdDLENBQUMsS0FBSyxHQUFMLENBQVMsUUFBVCxFQUNqQyxPQUFPLEVBQUUsSUFBSSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQUosRUFBMkIsVUFBVSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVYsRUFBaUMsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsUUFBUSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVIsRUFBK0IsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsTUFBTSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQU4sRUFBaEssQ0FESjtBQUVBLGdCQUFJLEtBQUssR0FBTCxDQUFTLElBQVQsS0FBa0IsUUFBbEIsRUFDQSxPQUFPLEVBQUUsSUFBSSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQUosRUFBMkIsUUFBUSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVIsRUFBK0IsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsUUFBUSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVIsRUFBK0IsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsTUFBTSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQU4sRUFBOUosQ0FESjs7O1dBZmEiLCJmaWxlIjoicGFyYW1zLWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1aWxkcyBQYXJhbWV0ZXJzIG9iamVjdCBmcm9tIGR5bmFtaWMgYXJndW1lbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFtc0J1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIFNldHRlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBwYXJhbXMgYWNjb3JkaW5nIGN0eCB0eXBlXG4gICAgICovXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcIm1vZGVsXCIpXG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzBdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1sxXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1syXSwgbmV4dDogdGhpcy5jdHguYXJndW1lbnRzWzNdIH07XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcInJlbGF0aW9uXCIgJiYgdGhpcy5jdHgucmVsYXRpb24pXG4gICAgICAgICAgICByZXR1cm4geyBpZDogdGhpcy5jdHguYXJndW1lbnRzWzBdLCByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzFdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1syXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1szXSwgbmV4dDogdGhpcy5jdHguYXJndW1lbnRzWzRdIH07XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcInJlbGF0aW9uXCIgJiYgIXRoaXMuY3R4LnJlbGF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IHRoaXMuY3R4LmFyZ3VtZW50c1swXSwgcmVsYXRpb246IHRoaXMuY3R4LmFyZ3VtZW50c1sxXSwgcmFuZ2U6IHRoaXMuY3R4LmFyZ3VtZW50c1syXSwgY3VzdG9tOiB0aGlzLmN0eC5hcmd1bWVudHNbM10sIHdoZXJlOiB0aGlzLmN0eC5hcmd1bWVudHNbNF0sIG5leHQ6IHRoaXMuY3R4LmFyZ3VtZW50c1s1XSB9O1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJuZXN0ZWRcIilcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiB0aGlzLmN0eC5hcmd1bWVudHNbMF0sIG5lc3RlZDogdGhpcy5jdHguYXJndW1lbnRzWzFdLCByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzJdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1szXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1s0XSwgbmV4dDogdGhpcy5jdHguYXJndW1lbnRzWzVdIH07XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
