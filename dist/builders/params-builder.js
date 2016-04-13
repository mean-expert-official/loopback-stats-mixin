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
            if (this.ctx.type === "model") return { range: this.ctx.arguments[0], custom: this.ctx.arguments[1], where: this.ctx.arguments[2], groupBy: this.ctx.arguments[3], next: this.ctx.arguments[4] };
            if (this.ctx.type === "relation" && this.ctx.relation) return { id: this.ctx.arguments[0], range: this.ctx.arguments[1], custom: this.ctx.arguments[2], where: this.ctx.arguments[3], groupBy: this.ctx.arguments[4], next: this.ctx.arguments[5] };
            if (this.ctx.type === "relation" && !this.ctx.relation) return { id: this.ctx.arguments[0], relation: this.ctx.arguments[1], range: this.ctx.arguments[2], custom: this.ctx.arguments[3], where: this.ctx.arguments[4], groupBy: this.ctx.arguments[5], next: this.ctx.arguments[6] };
            if (this.ctx.type === "nested") return { id: this.ctx.arguments[0], nested: this.ctx.arguments[1], range: this.ctx.arguments[2], custom: this.ctx.arguments[3], where: this.ctx.arguments[4], groupBy: this.ctx.arguments[5], next: this.ctx.arguments[6] };
        }
    }]);
    return ParamsBuilder;
}();

exports.default = ParamsBuilder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmFtcy1idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR3FCOzs7OztBQUlqQixhQUppQixhQUlqQixDQUFZLEdBQVosRUFBaUI7NENBSkEsZUFJQTtBQUFFLGFBQUssR0FBTCxHQUFXLEdBQVgsQ0FBRjtLQUFqQjs7Ozs7OytCQUppQjs7Z0NBUVQ7QUFDSixnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLE9BQWxCLEVBQ0EsT0FBTyxFQUFFLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLFFBQVEsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFSLEVBQStCLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLFNBQVMsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFULEVBQWdDLE1BQU0sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFOLEVBQXBJLENBREo7QUFFQSxnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLFVBQWxCLElBQWdDLEtBQUssR0FBTCxDQUFTLFFBQVQsRUFDaEMsT0FBTyxFQUFFLElBQUksS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFKLEVBQTJCLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLFFBQVEsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFSLEVBQStCLE9BQU8sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFQLEVBQThCLFNBQVMsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFULEVBQWdDLE1BQU0sS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixDQUFuQixDQUFOLEVBQS9KLENBREo7QUFFQSxnQkFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWtCLFVBQWxCLElBQWdDLENBQUMsS0FBSyxHQUFMLENBQVMsUUFBVCxFQUNqQyxPQUFPLEVBQUUsSUFBSSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQUosRUFBMkIsVUFBVSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVYsRUFBaUMsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsUUFBUSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVIsRUFBK0IsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsU0FBUyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVQsRUFBZ0MsTUFBTSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQU4sRUFBaE0sQ0FESjtBQUVBLGdCQUFJLEtBQUssR0FBTCxDQUFTLElBQVQsS0FBa0IsUUFBbEIsRUFDQSxPQUFPLEVBQUUsSUFBSSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQUosRUFBMkIsUUFBUSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVIsRUFBK0IsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsUUFBUSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVIsRUFBK0IsT0FBTyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVAsRUFBOEIsU0FBUyxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQVQsRUFBZ0MsTUFBTSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLENBQW5CLENBQU4sRUFBOUwsQ0FESjs7O1dBZmEiLCJmaWxlIjoicGFyYW1zLWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1aWxkcyBQYXJhbWV0ZXJzIG9iamVjdCBmcm9tIGR5bmFtaWMgYXJndW1lbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFtc0J1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIFNldHRlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjdHgpIHsgdGhpcy5jdHggPSBjdHg7IH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBwYXJhbXMgYWNjb3JkaW5nIGN0eCB0eXBlXG4gICAgICovXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcIm1vZGVsXCIpXG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzBdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1sxXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1syXSwgZ3JvdXBCeTogdGhpcy5jdHguYXJndW1lbnRzWzNdLCBuZXh0OiB0aGlzLmN0eC5hcmd1bWVudHNbNF0gfTtcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwicmVsYXRpb25cIiAmJiB0aGlzLmN0eC5yZWxhdGlvbilcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiB0aGlzLmN0eC5hcmd1bWVudHNbMF0sIHJhbmdlOiB0aGlzLmN0eC5hcmd1bWVudHNbMV0sIGN1c3RvbTogdGhpcy5jdHguYXJndW1lbnRzWzJdLCB3aGVyZTogdGhpcy5jdHguYXJndW1lbnRzWzNdLCBncm91cEJ5OiB0aGlzLmN0eC5hcmd1bWVudHNbNF0sIG5leHQ6IHRoaXMuY3R4LmFyZ3VtZW50c1s1XSB9O1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJyZWxhdGlvblwiICYmICF0aGlzLmN0eC5yZWxhdGlvbilcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiB0aGlzLmN0eC5hcmd1bWVudHNbMF0sIHJlbGF0aW9uOiB0aGlzLmN0eC5hcmd1bWVudHNbMV0sIHJhbmdlOiB0aGlzLmN0eC5hcmd1bWVudHNbMl0sIGN1c3RvbTogdGhpcy5jdHguYXJndW1lbnRzWzNdLCB3aGVyZTogdGhpcy5jdHguYXJndW1lbnRzWzRdLCBncm91cEJ5OiB0aGlzLmN0eC5hcmd1bWVudHNbNV0sIG5leHQ6IHRoaXMuY3R4LmFyZ3VtZW50c1s2XSB9O1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJuZXN0ZWRcIilcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiB0aGlzLmN0eC5hcmd1bWVudHNbMF0sIG5lc3RlZDogdGhpcy5jdHguYXJndW1lbnRzWzFdLCByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzJdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1szXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1s0XSwgZ3JvdXBCeTogdGhpcy5jdHguYXJndW1lbnRzWzVdLCBuZXh0OiB0aGlzLmN0eC5hcmd1bWVudHNbNl0gfTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
