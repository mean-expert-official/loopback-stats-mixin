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
        if (typeof ctx.next === 'function') {
          ctx.next(err, ctx.result);
        } else {
          if (err) {
            reject(err);
          } else {
            resolve(ctx.result);
          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzX3dyYXBwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFjZSxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQzdCLE1BQUksS0FBSixHQUFZLEtBQVo7O0FBRDZCLE9BRzdCLENBQU0sSUFBSSxNQUFKLENBQU4sR0FBb0IsU0FBUyxpQkFBVCxHQUE2QjtBQUMvQyxRQUFJLE1BQUosR0FBYSxFQUFiLENBRCtDO0FBRS9DLFFBQUksSUFBSixHQUFXLFNBQVgsQ0FGK0M7QUFHL0MsUUFBSSxJQUFKLEdBQVcsSUFBSSxJQUFKLENBQVMsVUFBVSxNQUFWLEdBQW1CLENBQW5CLENBQXBCOztBQUgrQyxXQUt4QyxzQkFBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLHNCQUFNLElBQU4sQ0FBVyxJQUFJLEtBQUosRUFBVyxVQUFDLElBQUQsRUFBTyxJQUFQLEVBQWdCO0FBQ3BDLFlBQUksSUFBSixDQUFTLElBQUksSUFBSixDQUFTLE1BQVQsR0FBa0IsQ0FBbEIsQ0FBVCxHQUFnQyxVQUFDLEdBQUQsRUFBTSxPQUFOLEVBQWtCO0FBQ2hELGNBQUksR0FBSixFQUFTLE9BQU8sS0FBSyxHQUFMLENBQVAsQ0FBVDtBQUNBLGNBQUksTUFBSixDQUFXLElBQVgsSUFBbUIsT0FBbkIsQ0FGZ0Q7QUFHaEQsaUJBSGdEO1NBQWxCLENBREk7QUFNcEMsWUFBSSxNQUFNLElBQU4sQ0FBSixFQUFpQjtBQUNmLGdCQUFNLElBQU4sRUFBWSxLQUFaLENBQWtCLEtBQWxCLEVBQXlCLG9CQUFXLElBQUksSUFBSixDQUFwQyxFQUErQyxJQUEvQyxDQUFvRCxJQUFwRCxFQURlO1NBQWpCLE1BRU87QUFDTCxlQUFLLElBQUksS0FBSixDQUFVLE1BQU0sVUFBTixDQUFpQixJQUFqQixHQUF3QixHQUF4QixHQUE4QixJQUE5QixHQUFxQyw2Q0FBckMsQ0FBZixFQURLO1NBRlA7T0FOb0IsRUFXbkIsZUFBTztBQUNSLFlBQUksT0FBTyxJQUFJLElBQUosS0FBYSxVQUFwQixFQUFnQztBQUNsQyxjQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsSUFBSSxNQUFKLENBQWQsQ0FEa0M7U0FBcEMsTUFFTztBQUNMLGNBQUksR0FBSixFQUFTO0FBQ1AsbUJBQU8sR0FBUCxFQURPO1dBQVQsTUFFTztBQUNMLG9CQUFRLElBQUksTUFBSixDQUFSLENBREs7V0FGUDtTQUhGO09BREMsQ0FYSCxDQURzQztLQUFyQixDQUFuQixDQUwrQztHQUE3Qjs7OztBQUhTLE9Bb0M3QixDQUFNLFlBQU4sQ0FBbUIsSUFBSSxNQUFKLEVBQVk7QUFDN0IsVUFBTSxFQUFFLE1BQU0sSUFBSSxRQUFKLEVBQWMsTUFBTSxLQUFOLEVBQTVCO0FBQ0EsYUFBUyw0QkFBa0IsR0FBbEIsRUFBdUIsS0FBdkIsRUFBVDtBQUNBLGFBQVMsRUFBRSxNQUFNLFFBQU4sRUFBZ0IsTUFBTSxJQUFOLEVBQTNCO0FBQ0EsaUJBQWEsSUFBSSxXQUFKO0dBSmYsRUFwQzZCO0NBQWhCIiwiZmlsZSI6InN0YXRzX3dyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0YXRzIFdyYXBwZXIgTWl4aW4gRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5pbXBvcnQgQWNjZXB0QnVpbGRlciBmcm9tICcuL2J1aWxkZXJzL2FjY2VwdC1idWlsZGVyJztcbi8qKlxuICogV3JhcHBlciBKUyBNaXhpblxuICogQEF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICogQFNlZSA8aHR0cHM6Ly90d2l0dGVyLmNvbS9qb2huY2FzYXJydWJpYXM+XG4gKiBAU2VlIDxodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9sb29wYmFjay1zdGF0cy1taXhpbj5cbiAqIEBTZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25hdGhhbi1jYXNhcnJ1Ymlhcy9sb29wYmFjay1zdGF0cy1taXhpbj5cbiAqIEBEZXNjcmlwdGlvblxuICpcbiAqIFRoZSBmb2xsb3dpbmcgbWl4aW4gd2lsbCBhZGQgc3RhdGlzdGljcyBmdW5jdGlvbmFsbGl0eSB0byBtb2RlbHMgd2hpY2ggaW5jbHVkZXNcbiAqIHRoaXMgbW9kdWxlLlxuICpcbiAqIEl0IGNhbiBjcmVhdGUgc3RhdGlzdGljcyBmcm9tIHRoZSBnaXZlbiBtb2RlbCwgYSBtb2RlbCByZWxhdGlvbnNoaXAgb3IgYW4gbmVzdGVkIG9iamVjdFxuICoqL1xuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBjdHgpID0+IHtcbiAgY3R4Lk1vZGVsID0gTW9kZWw7XG4gIC8vIENyZWF0ZSBkeW5hbWljIHN0YXRpc3RpYyBtZXRob2RcbiAgTW9kZWxbY3R4Lm1ldGhvZF0gPSBmdW5jdGlvbiBTdGF0V3JhcHBlck1ldGhvZCgpIHtcbiAgICBjdHgucmVzdWx0ID0ge307XG4gICAgY3R4LmFyZ3MgPSBhcmd1bWVudHM7XG4gICAgY3R4Lm5leHQgPSBjdHguYXJnc1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgLy8gQ3JlYXRlIFByb21pc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXN5bmMuZWFjaChjdHgud3JhcHMsIChpdGVtLCBuZXh0KSA9PiB7XG4gICAgICAgIGN0eC5hcmdzW2N0eC5hcmdzLmxlbmd0aCAtIDFdID0gKGVyciwgZGF0YXNldCkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgICAgY3R4LnJlc3VsdFtpdGVtXSA9IGRhdGFzZXQ7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoTW9kZWxbaXRlbV0pIHtcbiAgICAgICAgICBNb2RlbFtpdGVtXS5hcHBseShNb2RlbCwgQXJyYXkuZnJvbShjdHguYXJncykpLnRoZW4obmV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dChuZXcgRXJyb3IoTW9kZWwuZGVmaW5pdGlvbi5uYW1lICsgJy4nICsgaXRlbSArICcgZG9lcyBub3QgZXhpc3QsIHZlcmlmeSB5b3VyIGNvbmZpZ3VyYXRpb24uJykpO1xuICAgICAgICB9XG4gICAgICB9LCBlcnIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGN0eC5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY3R4Lm5leHQoZXJyLCBjdHgucmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShjdHgucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICAvKipcbiAgICogRHluYW1pY2FsbHkgUmVnaXN0ZXIgRW5kcG9pbnRcbiAgICovXG4gIE1vZGVsLnJlbW90ZU1ldGhvZChjdHgubWV0aG9kLCB7XG4gICAgaHR0cDogeyBwYXRoOiBjdHguZW5kcG9pbnQsIHZlcmI6ICdnZXQnIH0sXG4gICAgYWNjZXB0czogbmV3IEFjY2VwdEJ1aWxkZXIoY3R4KS5idWlsZCgpLFxuICAgIHJldHVybnM6IHsgdHlwZTogJ29iamVjdCcsIHJvb3Q6IHRydWUgfSxcbiAgICBkZXNjcmlwdGlvbjogY3R4LmRlc2NyaXB0aW9uLFxuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
