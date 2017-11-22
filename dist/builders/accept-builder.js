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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2VwdC1idWlsZGVyLmpzIl0sIm5hbWVzIjpbIkFjY2VwdEJ1aWxkZXIiLCJjdHgiLCJhY2NlcHRzIiwidHlwZSIsInB1c2giLCJhcmciLCJyZXF1aXJlZCIsImRlc2NyaXB0aW9uIiwiTW9kZWwiLCJkZWZpbml0aW9uIiwibmFtZSIsInJlbGF0aW9uIiwibmVzdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztJQUdxQkEsYTtBQUNqQjs7O0FBR0EsMkJBQVlDLEdBQVosRUFBaUI7QUFBQTtBQUFFLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUFpQjtBQUNwQzs7Ozs7OztnQ0FHUTtBQUNKLGdCQUFJQyxVQUFVLEVBQWQ7QUFDQSxnQkFBSSxLQUFLRCxHQUFMLENBQVNFLElBQVQsS0FBa0IsVUFBbEIsSUFBZ0MsS0FBS0YsR0FBTCxDQUFTRSxJQUFULEtBQWtCLFFBQXRELEVBQ0lELFFBQVFFLElBQVIsQ0FBYSxFQUFFQyxLQUFLLElBQVAsRUFBYUYsTUFBTSxRQUFuQixFQUE2QkcsVUFBVSxJQUF2QyxFQUE2Q0MsYUFBYSxLQUFLTixHQUFMLENBQVNPLEtBQVQsQ0FBZUMsVUFBZixDQUEwQkMsSUFBMUIsR0FBaUMsS0FBM0YsRUFBYjtBQUNKLGdCQUFJLEtBQUtULEdBQUwsQ0FBU0UsSUFBVCxLQUFrQixVQUFsQixJQUFnQyxDQUFDLEtBQUtGLEdBQUwsQ0FBU1UsUUFBOUMsRUFDSVQsUUFBUUUsSUFBUixDQUFhLEVBQUVDLEtBQUssVUFBUCxFQUFtQkYsTUFBTSxRQUF6QixFQUFtQ0csVUFBVSxJQUE3QyxFQUFtREMsYUFBYSxtQkFBaEUsRUFBYjtBQUNKLGdCQUFJLEtBQUtOLEdBQUwsQ0FBU0UsSUFBVCxLQUFrQixRQUF0QixFQUNJRCxRQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxRQUFQLEVBQWlCRixNQUFNLFFBQXZCLEVBQWlDRyxVQUFVLElBQTNDLEVBQWlEQyxhQUFhLDRCQUE5RCxFQUFiO0FBQ0pMLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxPQUFQLEVBQWdCRixNQUFNLFFBQXRCLEVBQWdDRyxVQUFVLElBQTFDLEVBQWdEQyxhQUFhLGdEQUE3RCxFQUFiO0FBQ0FMLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxRQUFQLEVBQWlCRixNQUFNLFFBQXZCLEVBQWlDRyxVQUFVLEtBQTNDLEVBQWtEQyxhQUFhLCtCQUEvRCxFQUFiO0FBQ0FMLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxPQUFQLEVBQWdCRixNQUFNLFFBQXRCLEVBQWdDSSxhQUFhLG1CQUFtQixLQUFLTixHQUFMLENBQVNVLFFBQVQsSUFBcUIsS0FBS1YsR0FBTCxDQUFTVyxNQUE5QixJQUF3QyxFQUEzRCxDQUE3QyxFQUFiO0FBQ0FWLG9CQUFRRSxJQUFSLENBQWEsRUFBRUMsS0FBSyxTQUFQLEVBQWtCRixNQUFNLFFBQXhCLEVBQWtDSSxhQUFhLGtCQUEvQyxFQUFiO0FBQ0EsbUJBQU9MLE9BQVA7QUFDSDs7Ozs7a0JBckJnQkYsYSIsImZpbGUiOiJhY2NlcHQtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQnVpbGRzIFBhcmFtZXRlcnMgb2JqZWN0IGZvciBkeW5hbWljIHJlbW90ZSBtZXRob2RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjZXB0QnVpbGRlciB7XG4gICAgLyoqXG4gICAgICogU2V0dGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGN0eCkgeyB0aGlzLmN0eCA9IGN0eDsgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIHBhcmFtcyBhY2NvcmRpbmcgY3R4IHR5cGVcbiAgICAgKi9cbiAgICBidWlsZCgpIHtcbiAgICAgICAgbGV0IGFjY2VwdHMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwicmVsYXRpb25cIiB8fCB0aGlzLmN0eC50eXBlID09PSBcIm5lc3RlZFwiKVxuICAgICAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnaWQnLCB0eXBlOiAnc3RyaW5nJywgcmVxdWlyZWQ6IHRydWUsIGRlc2NyaXB0aW9uOiB0aGlzLmN0eC5Nb2RlbC5kZWZpbml0aW9uLm5hbWUgKyAnIElEJyB9KTtcbiAgICAgICAgaWYgKHRoaXMuY3R4LnR5cGUgPT09IFwicmVsYXRpb25cIiAmJiAhdGhpcy5jdHgucmVsYXRpb24pXG4gICAgICAgICAgICBhY2NlcHRzLnB1c2goeyBhcmc6ICdyZWxhdGlvbicsIHR5cGU6ICdzdHJpbmcnLCByZXF1aXJlZDogdHJ1ZSwgZGVzY3JpcHRpb246ICdSZWxhdGlvbnNoaXAgbmFtZScgfSk7XG4gICAgICAgIGlmICh0aGlzLmN0eC50eXBlID09PSBcIm5lc3RlZFwiKVxuICAgICAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnbmVzdGVkJywgdHlwZTogJ3N0cmluZycsIHJlcXVpcmVkOiB0cnVlLCBkZXNjcmlwdGlvbjogJ05lc3RlZCBhcnJheSBwcm9wZXJ0eSBuYW1lJyB9KTtcbiAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAncmFuZ2UnLCB0eXBlOiAnc3RyaW5nJywgcmVxdWlyZWQ6IHRydWUsIGRlc2NyaXB0aW9uOiAnaG91cmx5LCBkYWlseSwgd2Vla2x5LCBtb250aGx5LCB5ZWFybHksIGN1c3RvbScgfSk7XG4gICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ2N1c3RvbScsIHR5cGU6ICdvYmplY3QnLCByZXF1aXJlZDogZmFsc2UsIGRlc2NyaXB0aW9uOiAne1wic3RhcnRcIjogZGF0ZSwgXCJlbmRcIjogZGF0ZSB9JyB9KTtcbiAgICAgICAgYWNjZXB0cy5wdXNoKHsgYXJnOiAnd2hlcmUnLCB0eXBlOiAnb2JqZWN0JywgZGVzY3JpcHRpb246ICd3aGVyZSBmaWx0ZXIgJyArICh0aGlzLmN0eC5yZWxhdGlvbiB8fMKgdGhpcy5jdHgubmVzdGVkIHx8wqAnJykgfSk7XG4gICAgICAgIGFjY2VwdHMucHVzaCh7IGFyZzogJ2dyb3VwQnknLCB0eXBlOiAnc3RyaW5nJywgZGVzY3JpcHRpb246ICdncm91cCBieSBmaWx0ZXIgJyB9KTtcbiAgICAgICAgcmV0dXJuIGFjY2VwdHM7XG4gICAgfVxufSJdfQ==
