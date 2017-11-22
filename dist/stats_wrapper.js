'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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
    _async2.default.each(ctx.wraps, function (item, next) {
      ctx.args[ctx.args.length - 1] = function (err, dataset) {
        if (err) return next(err);
        ctx.result[item] = dataset;
        next();
      };
      if (Model[item]) {
        Model[item].apply(Model, (0, _from2.default)(ctx.args));
      } else {
        next(new Error(Model.definition.name + '.' + item + ' does not exist, verify your configuration.'));
      }
    }, function (err) {
      if (typeof ctx.next === 'function') {
        ctx.next(err, ctx.result);
      }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzX3dyYXBwZXIuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJjdHgiLCJtZXRob2QiLCJTdGF0V3JhcHBlck1ldGhvZCIsInJlc3VsdCIsImFyZ3MiLCJhcmd1bWVudHMiLCJuZXh0IiwibGVuZ3RoIiwiZWFjaCIsIndyYXBzIiwiaXRlbSIsImVyciIsImRhdGFzZXQiLCJhcHBseSIsIkVycm9yIiwiZGVmaW5pdGlvbiIsIm5hbWUiLCJyZW1vdGVNZXRob2QiLCJodHRwIiwicGF0aCIsImVuZHBvaW50IiwidmVyYiIsImFjY2VwdHMiLCJidWlsZCIsInJldHVybnMiLCJ0eXBlIiwicm9vdCIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFMQTs7O2tCQWtCZSxVQUFDQSxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDN0JBLE1BQUlELEtBQUosR0FBWUEsS0FBWjtBQUNBO0FBQ0FBLFFBQU1DLElBQUlDLE1BQVYsSUFBb0IsU0FBU0MsaUJBQVQsR0FBNkI7QUFDL0NGLFFBQUlHLE1BQUosR0FBYSxFQUFiO0FBQ0FILFFBQUlJLElBQUosR0FBV0MsU0FBWDtBQUNBTCxRQUFJTSxJQUFKLEdBQVdOLElBQUlJLElBQUosQ0FBU0MsVUFBVUUsTUFBVixHQUFtQixDQUE1QixDQUFYO0FBQ0E7QUFDQSxvQkFBTUMsSUFBTixDQUFXUixJQUFJUyxLQUFmLEVBQXNCLFVBQUNDLElBQUQsRUFBT0osSUFBUCxFQUFnQjtBQUNwQ04sVUFBSUksSUFBSixDQUFTSixJQUFJSSxJQUFKLENBQVNHLE1BQVQsR0FBa0IsQ0FBM0IsSUFBZ0MsVUFBQ0ksR0FBRCxFQUFNQyxPQUFOLEVBQWtCO0FBQ2hELFlBQUlELEdBQUosRUFBUyxPQUFPTCxLQUFLSyxHQUFMLENBQVA7QUFDVFgsWUFBSUcsTUFBSixDQUFXTyxJQUFYLElBQW1CRSxPQUFuQjtBQUNBTjtBQUNELE9BSkQ7QUFLQSxVQUFJUCxNQUFNVyxJQUFOLENBQUosRUFBaUI7QUFDZlgsY0FBTVcsSUFBTixFQUFZRyxLQUFaLENBQWtCZCxLQUFsQixFQUF5QixvQkFBV0MsSUFBSUksSUFBZixDQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMRSxhQUFLLElBQUlRLEtBQUosQ0FBVWYsTUFBTWdCLFVBQU4sQ0FBaUJDLElBQWpCLEdBQXdCLEdBQXhCLEdBQThCTixJQUE5QixHQUFxQyw2Q0FBL0MsQ0FBTDtBQUNEO0FBQ0YsS0FYRCxFQVdHLGVBQU87QUFDUixVQUFJLE9BQU9WLElBQUlNLElBQVgsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbENOLFlBQUlNLElBQUosQ0FBU0ssR0FBVCxFQUFjWCxJQUFJRyxNQUFsQjtBQUNEO0FBQ0YsS0FmRDtBQWdCRCxHQXJCRDtBQXNCQTs7O0FBR0FKLFFBQU1rQixZQUFOLENBQW1CakIsSUFBSUMsTUFBdkIsRUFBK0I7QUFDN0JpQixVQUFNLEVBQUVDLE1BQU1uQixJQUFJb0IsUUFBWixFQUFzQkMsTUFBTSxLQUE1QixFQUR1QjtBQUU3QkMsYUFBUyw0QkFBa0J0QixHQUFsQixFQUF1QnVCLEtBQXZCLEVBRm9CO0FBRzdCQyxhQUFTLEVBQUVDLE1BQU0sUUFBUixFQUFrQkMsTUFBTSxJQUF4QixFQUhvQjtBQUk3QkMsaUJBQWEzQixJQUFJMkI7QUFKWSxHQUEvQjtBQU1ELEMiLCJmaWxlIjoic3RhdHNfd3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhdHMgV3JhcHBlciBNaXhpbiBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCBBY2NlcHRCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvYWNjZXB0LWJ1aWxkZXInO1xuLyoqXG4gKiBXcmFwcGVyIEpTIE1peGluXG4gKiBAQXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gKiBAU2VlIDxodHRwczovL3R3aXR0ZXIuY29tL2pvaG5jYXNhcnJ1Ymlhcz5cbiAqIEBTZWUgPGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICogQFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuLWNhc2FycnViaWFzL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICogQERlc2NyaXB0aW9uXG4gKlxuICogVGhlIGZvbGxvd2luZyBtaXhpbiB3aWxsIGFkZCBzdGF0aXN0aWNzIGZ1bmN0aW9uYWxsaXR5IHRvIG1vZGVscyB3aGljaCBpbmNsdWRlc1xuICogdGhpcyBtb2R1bGUuXG4gKlxuICogSXQgY2FuIGNyZWF0ZSBzdGF0aXN0aWNzIGZyb20gdGhlIGdpdmVuIG1vZGVsLCBhIG1vZGVsIHJlbGF0aW9uc2hpcCBvciBhbiBuZXN0ZWQgb2JqZWN0XG4gKiovXG5leHBvcnQgZGVmYXVsdCAoTW9kZWwsIGN0eCkgPT4ge1xuICBjdHguTW9kZWwgPSBNb2RlbDtcbiAgLy8gQ3JlYXRlIGR5bmFtaWMgc3RhdGlzdGljIG1ldGhvZFxuICBNb2RlbFtjdHgubWV0aG9kXSA9IGZ1bmN0aW9uIFN0YXRXcmFwcGVyTWV0aG9kKCkge1xuICAgIGN0eC5yZXN1bHQgPSB7fTtcbiAgICBjdHguYXJncyA9IGFyZ3VtZW50cztcbiAgICBjdHgubmV4dCA9IGN0eC5hcmdzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICAvLyBDcmVhdGUgUHJvbWlzZVxuICAgIGFzeW5jLmVhY2goY3R4LndyYXBzLCAoaXRlbSwgbmV4dCkgPT4ge1xuICAgICAgY3R4LmFyZ3NbY3R4LmFyZ3MubGVuZ3RoIC0gMV0gPSAoZXJyLCBkYXRhc2V0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgIGN0eC5yZXN1bHRbaXRlbV0gPSBkYXRhc2V0O1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9O1xuICAgICAgaWYgKE1vZGVsW2l0ZW1dKSB7XG4gICAgICAgIE1vZGVsW2l0ZW1dLmFwcGx5KE1vZGVsLCBBcnJheS5mcm9tKGN0eC5hcmdzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0KG5ldyBFcnJvcihNb2RlbC5kZWZpbml0aW9uLm5hbWUgKyAnLicgKyBpdGVtICsgJyBkb2VzIG5vdCBleGlzdCwgdmVyaWZ5IHlvdXIgY29uZmlndXJhdGlvbi4nKSk7XG4gICAgICB9XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY3R4Lm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY3R4Lm5leHQoZXJyLCBjdHgucmVzdWx0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgLyoqXG4gICAqIER5bmFtaWNhbGx5IFJlZ2lzdGVyIEVuZHBvaW50XG4gICAqL1xuICBNb2RlbC5yZW1vdGVNZXRob2QoY3R4Lm1ldGhvZCwge1xuICAgIGh0dHA6IHsgcGF0aDogY3R4LmVuZHBvaW50LCB2ZXJiOiAnZ2V0JyB9LFxuICAgIGFjY2VwdHM6IG5ldyBBY2NlcHRCdWlsZGVyKGN0eCkuYnVpbGQoKSxcbiAgICByZXR1cm5zOiB7IHR5cGU6ICdvYmplY3QnLCByb290OiB0cnVlIH0sXG4gICAgZGVzY3JpcHRpb246IGN0eC5kZXNjcmlwdGlvbixcbiAgfSk7XG59O1xuIl19
