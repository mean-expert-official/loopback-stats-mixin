'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _acceptBuilder = require('./builders/accept-builder');

var _acceptBuilder2 = _interopRequireDefault(_acceptBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrapper JS Mixin
 * @Author Jonathan Casarrubias
 * @See <https://twitter.com/johncasarrubias>
 * @See <https://www.npmjs.com/package/loopback-stats-mixin>
 * @See <https://github.com/jonathan-casarrubias/loopback-stats-mixin>
 * @Description
 *
 * The following mixin will add statistics functionallity to models which includes
 * this module.
 *
 * It can create statistics from the given model, a model relationship or an nested object
 **/
/**
 * Stats Wrapper Mixin Dependencies
 */

exports.default = function (Model, ctx) {
  ctx.Model = Model;
  // Create dynamic statistic method
  Model[ctx.method] = function StatWrapperMethod() {
    ctx.result = {};
    ctx.args = arguments;
    ctx.next = ctx.args[arguments.length - 1];
    // Create Promise
    return new _promise2.default(function (resolve, reject) {
      _async2.default.each(ctx.wraps, function (item, next) {
        ctx.args[ctx.args.length - 1] = function (err, dataset) {
          if (err) return next(err);
          ctx.result[item] = dataset;
          next();
        };
        if (Model[item]) {
          Model[item].apply(Model, (0, _from2.default)(ctx.args)).then(next);
        } else {
          next(new Error(Model.definition.name + '.' + item + ' does not exist, verify your configuration.'));
        }
      }, function (err) {
        if (typeof ctx.next === 'function') ctx.next(err, ctx.result);
        if (err) {
          reject(err);
        } else {
          resolve(ctx.result);
        }
      });
    });
  };
  /**
   * Dynamically Register Endpoint
   */
  Model.remoteMethod(ctx.method, {
    http: { path: ctx.endpoint, verb: 'get' },
    accepts: new _acceptBuilder2.default(ctx).build(),
    returns: { type: 'object', root: true },
    description: ctx.description
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzX3dyYXBwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFjZSxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQzdCLE1BQUksS0FBSixHQUFZLEtBQVo7O0FBRDZCLE9BRzdCLENBQU0sSUFBSSxNQUFKLENBQU4sR0FBb0IsU0FBUyxpQkFBVCxHQUE2QjtBQUMvQyxRQUFJLE1BQUosR0FBYSxFQUFiLENBRCtDO0FBRS9DLFFBQUksSUFBSixHQUFXLFNBQVgsQ0FGK0M7QUFHL0MsUUFBSSxJQUFKLEdBQVcsSUFBSSxJQUFKLENBQVMsVUFBVSxNQUFWLEdBQW1CLENBQW5CLENBQXBCOztBQUgrQyxXQUt4QyxzQkFBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLHNCQUFNLElBQU4sQ0FBVyxJQUFJLEtBQUosRUFBVyxVQUFDLElBQUQsRUFBTyxJQUFQLEVBQWdCO0FBQ3BDLFlBQUksSUFBSixDQUFTLElBQUksSUFBSixDQUFTLE1BQVQsR0FBa0IsQ0FBbEIsQ0FBVCxHQUFnQyxVQUFDLEdBQUQsRUFBTSxPQUFOLEVBQWtCO0FBQ2hELGNBQUksR0FBSixFQUFTLE9BQU8sS0FBSyxHQUFMLENBQVAsQ0FBVDtBQUNBLGNBQUksTUFBSixDQUFXLElBQVgsSUFBbUIsT0FBbkIsQ0FGZ0Q7QUFHaEQsaUJBSGdEO1NBQWxCLENBREk7QUFNcEMsWUFBSSxNQUFNLElBQU4sQ0FBSixFQUFpQjtBQUNmLGdCQUFNLElBQU4sRUFBWSxLQUFaLENBQWtCLEtBQWxCLEVBQXlCLG9CQUFXLElBQUksSUFBSixDQUFwQyxFQUErQyxJQUEvQyxDQUFvRCxJQUFwRCxFQURlO1NBQWpCLE1BRU87QUFDTCxlQUFLLElBQUksS0FBSixDQUFVLE1BQU0sVUFBTixDQUFpQixJQUFqQixHQUF3QixHQUF4QixHQUE4QixJQUE5QixHQUFxQyw2Q0FBckMsQ0FBZixFQURLO1NBRlA7T0FOb0IsRUFXbkIsZUFBTztBQUNSLFlBQUksT0FBTyxJQUFJLElBQUosS0FBYSxVQUFwQixFQUFnQyxJQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsSUFBSSxNQUFKLENBQWQsQ0FBcEM7QUFDQSxZQUFJLEdBQUosRUFBUztBQUNQLGlCQUFPLEdBQVAsRUFETztTQUFULE1BRU87QUFDTCxrQkFBUSxJQUFJLE1BQUosQ0FBUixDQURLO1NBRlA7T0FGQyxDQVhILENBRHNDO0tBQXJCLENBQW5CLENBTCtDO0dBQTdCOzs7O0FBSFMsT0FpQzdCLENBQU0sWUFBTixDQUFtQixJQUFJLE1BQUosRUFBWTtBQUM3QixVQUFNLEVBQUUsTUFBTSxJQUFJLFFBQUosRUFBYyxNQUFNLEtBQU4sRUFBNUI7QUFDQSxhQUFTLDRCQUFrQixHQUFsQixFQUF1QixLQUF2QixFQUFUO0FBQ0EsYUFBUyxFQUFFLE1BQU0sUUFBTixFQUFnQixNQUFNLElBQU4sRUFBM0I7QUFDQSxpQkFBYSxJQUFJLFdBQUo7R0FKZixFQWpDNkI7Q0FBaEIiLCJmaWxlIjoic3RhdHNfd3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhdHMgV3JhcHBlciBNaXhpbiBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCBBY2NlcHRCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvYWNjZXB0LWJ1aWxkZXInO1xuLyoqXG4gKiBXcmFwcGVyIEpTIE1peGluXG4gKiBAQXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gKiBAU2VlIDxodHRwczovL3R3aXR0ZXIuY29tL2pvaG5jYXNhcnJ1Ymlhcz5cbiAqIEBTZWUgPGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICogQFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuLWNhc2FycnViaWFzL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICogQERlc2NyaXB0aW9uXG4gKlxuICogVGhlIGZvbGxvd2luZyBtaXhpbiB3aWxsIGFkZCBzdGF0aXN0aWNzIGZ1bmN0aW9uYWxsaXR5IHRvIG1vZGVscyB3aGljaCBpbmNsdWRlc1xuICogdGhpcyBtb2R1bGUuXG4gKlxuICogSXQgY2FuIGNyZWF0ZSBzdGF0aXN0aWNzIGZyb20gdGhlIGdpdmVuIG1vZGVsLCBhIG1vZGVsIHJlbGF0aW9uc2hpcCBvciBhbiBuZXN0ZWQgb2JqZWN0XG4gKiovXG5leHBvcnQgZGVmYXVsdCAoTW9kZWwsIGN0eCkgPT4ge1xuICBjdHguTW9kZWwgPSBNb2RlbDtcbiAgLy8gQ3JlYXRlIGR5bmFtaWMgc3RhdGlzdGljIG1ldGhvZFxuICBNb2RlbFtjdHgubWV0aG9kXSA9IGZ1bmN0aW9uIFN0YXRXcmFwcGVyTWV0aG9kKCkge1xuICAgIGN0eC5yZXN1bHQgPSB7fTtcbiAgICBjdHguYXJncyA9IGFyZ3VtZW50cztcbiAgICBjdHgubmV4dCA9IGN0eC5hcmdzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICAvLyBDcmVhdGUgUHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhc3luYy5lYWNoKGN0eC53cmFwcywgKGl0ZW0sIG5leHQpID0+IHtcbiAgICAgICAgY3R4LmFyZ3NbY3R4LmFyZ3MubGVuZ3RoIC0gMV0gPSAoZXJyLCBkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgICBjdHgucmVzdWx0W2l0ZW1dID0gZGF0YXNldDtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChNb2RlbFtpdGVtXSkge1xuICAgICAgICAgIE1vZGVsW2l0ZW1dLmFwcGx5KE1vZGVsLCBBcnJheS5mcm9tKGN0eC5hcmdzKSkudGhlbihuZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0KG5ldyBFcnJvcihNb2RlbC5kZWZpbml0aW9uLm5hbWUgKyAnLicgKyBpdGVtICsgJyBkb2VzIG5vdCBleGlzdCwgdmVyaWZ5IHlvdXIgY29uZmlndXJhdGlvbi4nKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgY3R4Lm5leHQgPT09ICdmdW5jdGlvbicpIGN0eC5uZXh0KGVyciwgY3R4LnJlc3VsdCk7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGN0eC5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgLyoqXG4gICAqIER5bmFtaWNhbGx5IFJlZ2lzdGVyIEVuZHBvaW50XG4gICAqL1xuICBNb2RlbC5yZW1vdGVNZXRob2QoY3R4Lm1ldGhvZCwge1xuICAgIGh0dHA6IHsgcGF0aDogY3R4LmVuZHBvaW50LCB2ZXJiOiAnZ2V0JyB9LFxuICAgIGFjY2VwdHM6IG5ldyBBY2NlcHRCdWlsZGVyKGN0eCkuYnVpbGQoKSxcbiAgICByZXR1cm5zOiB7IHR5cGU6ICdvYmplY3QnLCByb290OiB0cnVlIH0sXG4gICAgZGVzY3JpcHRpb246IGN0eC5kZXNjcmlwdGlvbixcbiAgfSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
