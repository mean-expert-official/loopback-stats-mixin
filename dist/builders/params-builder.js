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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmFtcy1idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlBhcmFtc0J1aWxkZXIiLCJjdHgiLCJ0eXBlIiwicmFuZ2UiLCJhcmd1bWVudHMiLCJjdXN0b20iLCJ3aGVyZSIsImdyb3VwQnkiLCJuZXh0IiwicmVsYXRpb24iLCJpZCIsIm5lc3RlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7SUFHcUJBLGE7QUFDakI7OztBQUdBLDJCQUFZQyxHQUFaLEVBQWlCO0FBQUE7QUFBRSxhQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFBaUI7QUFDcEM7Ozs7Ozs7Z0NBR1E7QUFDSixnQkFBSSxLQUFLQSxHQUFMLENBQVNDLElBQVQsS0FBa0IsT0FBdEIsRUFDSSxPQUFPLEVBQUVDLE9BQU8sS0FBS0YsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQVQsRUFBZ0NDLFFBQVEsS0FBS0osR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQXhDLEVBQStERSxPQUFPLEtBQUtMLEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUF0RSxFQUE2RkcsU0FBUyxLQUFLTixHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBdEcsRUFBNkhJLE1BQU0sS0FBS1AsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQW5JLEVBQVA7QUFDSixnQkFBSSxLQUFLSCxHQUFMLENBQVNDLElBQVQsS0FBa0IsVUFBbEIsSUFBZ0MsS0FBS0QsR0FBTCxDQUFTUSxRQUE3QyxFQUNJLE9BQU8sRUFBRUMsSUFBSSxLQUFLVCxHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBTixFQUE2QkQsT0FBTyxLQUFLRixHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBcEMsRUFBMkRDLFFBQVEsS0FBS0osR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQW5FLEVBQTBGRSxPQUFPLEtBQUtMLEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUFqRyxFQUF3SEcsU0FBUyxLQUFLTixHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBakksRUFBd0pJLE1BQU0sS0FBS1AsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQTlKLEVBQVA7QUFDSixnQkFBSSxLQUFLSCxHQUFMLENBQVNDLElBQVQsS0FBa0IsVUFBbEIsSUFBZ0MsQ0FBQyxLQUFLRCxHQUFMLENBQVNRLFFBQTlDLEVBQ0ksT0FBTyxFQUFFQyxJQUFJLEtBQUtULEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUFOLEVBQTZCSyxVQUFVLEtBQUtSLEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUF2QyxFQUE4REQsT0FBTyxLQUFLRixHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBckUsRUFBNEZDLFFBQVEsS0FBS0osR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQXBHLEVBQTJIRSxPQUFPLEtBQUtMLEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUFsSSxFQUF5SkcsU0FBUyxLQUFLTixHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBbEssRUFBeUxJLE1BQU0sS0FBS1AsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQS9MLEVBQVA7QUFDSixnQkFBSSxLQUFLSCxHQUFMLENBQVNDLElBQVQsS0FBa0IsUUFBdEIsRUFDSSxPQUFPLEVBQUVRLElBQUksS0FBS1QsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQU4sRUFBNkJPLFFBQVEsS0FBS1YsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQXJDLEVBQTRERCxPQUFPLEtBQUtGLEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUFuRSxFQUEwRkMsUUFBUSxLQUFLSixHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBbEcsRUFBeUhFLE9BQU8sS0FBS0wsR0FBTCxDQUFTRyxTQUFULENBQW1CLENBQW5CLENBQWhJLEVBQXVKRyxTQUFTLEtBQUtOLEdBQUwsQ0FBU0csU0FBVCxDQUFtQixDQUFuQixDQUFoSyxFQUF1TEksTUFBTSxLQUFLUCxHQUFMLENBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBN0wsRUFBUDtBQUNQOzs7OztrQkFqQmdCSixhIiwiZmlsZSI6InBhcmFtcy1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCdWlsZHMgUGFyYW1ldGVycyBvYmplY3QgZnJvbSBkeW5hbWljIGFyZ3VtZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbXNCdWlsZGVyIHtcbiAgICAvKipcbiAgICAgKiBTZXR0ZXJzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3R4KSB7IHRoaXMuY3R4ID0gY3R4OyB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgcGFyYW1zIGFjY29yZGluZyBjdHggdHlwZVxuICAgICAqL1xuICAgIGJ1aWxkKCkge1xuICAgICAgICBpZiAodGhpcy5jdHgudHlwZSA9PT0gXCJtb2RlbFwiKVxuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHRoaXMuY3R4LmFyZ3VtZW50c1swXSwgY3VzdG9tOiB0aGlzLmN0eC5hcmd1bWVudHNbMV0sIHdoZXJlOiB0aGlzLmN0eC5hcmd1bWVudHNbMl0sIGdyb3VwQnk6IHRoaXMuY3R4LmFyZ3VtZW50c1szXSwgbmV4dDogdGhpcy5jdHguYXJndW1lbnRzWzRdIH07XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcInJlbGF0aW9uXCIgJiYgdGhpcy5jdHgucmVsYXRpb24pXG4gICAgICAgICAgICByZXR1cm4geyBpZDogdGhpcy5jdHguYXJndW1lbnRzWzBdLCByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzFdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1syXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1szXSwgZ3JvdXBCeTogdGhpcy5jdHguYXJndW1lbnRzWzRdLCBuZXh0OiB0aGlzLmN0eC5hcmd1bWVudHNbNV0gfTtcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwicmVsYXRpb25cIiAmJiAhdGhpcy5jdHgucmVsYXRpb24pXG4gICAgICAgICAgICByZXR1cm4geyBpZDogdGhpcy5jdHguYXJndW1lbnRzWzBdLCByZWxhdGlvbjogdGhpcy5jdHguYXJndW1lbnRzWzFdLCByYW5nZTogdGhpcy5jdHguYXJndW1lbnRzWzJdLCBjdXN0b206IHRoaXMuY3R4LmFyZ3VtZW50c1szXSwgd2hlcmU6IHRoaXMuY3R4LmFyZ3VtZW50c1s0XSwgZ3JvdXBCeTogdGhpcy5jdHguYXJndW1lbnRzWzVdLCBuZXh0OiB0aGlzLmN0eC5hcmd1bWVudHNbNl0gfTtcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwibmVzdGVkXCIpXG4gICAgICAgICAgICByZXR1cm4geyBpZDogdGhpcy5jdHguYXJndW1lbnRzWzBdLCBuZXN0ZWQ6IHRoaXMuY3R4LmFyZ3VtZW50c1sxXSwgcmFuZ2U6IHRoaXMuY3R4LmFyZ3VtZW50c1syXSwgY3VzdG9tOiB0aGlzLmN0eC5hcmd1bWVudHNbM10sIHdoZXJlOiB0aGlzLmN0eC5hcmd1bWVudHNbNF0sIGdyb3VwQnk6IHRoaXMuY3R4LmFyZ3VtZW50c1s1XSwgbmV4dDogdGhpcy5jdHguYXJndW1lbnRzWzZdIH07XG4gICAgfVxufSJdfQ==
