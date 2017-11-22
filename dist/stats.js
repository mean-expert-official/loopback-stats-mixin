'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _acceptBuilder = require('./builders/accept-builder');

var _acceptBuilder2 = _interopRequireDefault(_acceptBuilder);

var _paramsBuilder = require('./builders/params-builder');

var _paramsBuilder2 = _interopRequireDefault(_paramsBuilder);

var _queryBuilder = require('./builders/query-builder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

var _statsBuilder = require('./builders/stats-builder');

var _statsBuilder2 = _interopRequireDefault(_statsBuilder);

var _nowBuilder = require('./builders/now-builder');

var _nowBuilder2 = _interopRequireDefault(_nowBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * Stats Mixin
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
 * Stats Mixin Dependencies
 */
exports.default = function (Model, ctx) {
  ctx.Model = Model;
  // Create dynamic statistic method
  Model[ctx.method] = function StatMethod() {
    // Cache block arguments
    ctx.arguments = arguments;
    ctx.params = new _paramsBuilder2.default(ctx).build();
    // Create Promise
    return new _promise2.default(function (resolve, reject) {
      ctx.now = new _nowBuilder2.default(ctx).build();
      ctx.nowISOString = ctx.now.toISOString();
      ctx.stats = new _statsBuilder2.default(ctx);
      // Data Workflow
      _async2.default.waterfall([
      // Create Scope Query
      // We dont pass complete context because we expect specific behaviour
      function (next) {
        var options = {
          type: ctx.type,
          count: ctx.count,
          now: ctx.now,
          nowISOString: ctx.nowISOString,
          params: {
            pk: Model.getIdName(),
            id: ctx.params.id,
            relation: ctx.params.relation,
            custom: ctx.params.custom
          }
        };
        if (ctx.type === 'model') {
          options.params.where = ctx.params.where;
          options.params.range = ctx.params.range;
        }
        new _queryBuilder2.default(options).onComplete(next).build();
      },
      // Get List of Items
      function (query, next) {
        switch (ctx.type) {
          case 'model':
            Model.find(query, next);
            break;
          case 'relation':
            Model.findOne(query, function (err, instance) {
              if (err) return next(err);
              var builder = new _queryBuilder2.default({
                type: ctx.type,
                count: ctx.count,
                now: ctx.now,
                nowISOString: ctx.nowISOString,
                params: {
                  range: ctx.params.range,
                  where: ctx.params.where,
                  custom: ctx.params.custom
                }
              });
              builder.onComplete(function (_err, _query) {
                if (_err) return next(_err);
                instance[ctx.relation || ctx.params.relation](_query, next);
              });
              builder.build();
            });
            break;
          case 'nested':
            Model.findOne(query, function (err, instance) {
              return next(err, instance[ctx.nested]);
            });
            break;
          default:
            next(null, []);
        }
      },
      // Process List of results
      function (list, next) {
        return next(null, ctx.stats.process(list));
      }], function (err, result) {
        if (typeof ctx.params.next === 'function') {
          ctx.params.next(err, result);
        } else {
          if (err) {
            reject(err);
          } else {
            resolve(result);
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
    returns: { type: 'array', root: true },
    description: ctx.description
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLmpzIl0sIm5hbWVzIjpbIk1vZGVsIiwiY3R4IiwibWV0aG9kIiwiU3RhdE1ldGhvZCIsImFyZ3VtZW50cyIsInBhcmFtcyIsImJ1aWxkIiwicmVzb2x2ZSIsInJlamVjdCIsIm5vdyIsIm5vd0lTT1N0cmluZyIsInRvSVNPU3RyaW5nIiwic3RhdHMiLCJ3YXRlcmZhbGwiLCJvcHRpb25zIiwidHlwZSIsImNvdW50IiwicGsiLCJnZXRJZE5hbWUiLCJpZCIsInJlbGF0aW9uIiwiY3VzdG9tIiwid2hlcmUiLCJyYW5nZSIsIm9uQ29tcGxldGUiLCJuZXh0IiwicXVlcnkiLCJmaW5kIiwiZmluZE9uZSIsImVyciIsImluc3RhbmNlIiwiYnVpbGRlciIsIl9lcnIiLCJfcXVlcnkiLCJuZXN0ZWQiLCJsaXN0IiwicHJvY2VzcyIsInJlc3VsdCIsInJlbW90ZU1ldGhvZCIsImh0dHAiLCJwYXRoIiwiZW5kcG9pbnQiLCJ2ZXJiIiwiYWNjZXB0cyIsInJldHVybnMiLCJyb290IiwiZGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBVEE7OztrQkFzQmUsVUFBQ0EsS0FBRCxFQUFRQyxHQUFSLEVBQWdCO0FBQzdCQSxNQUFJRCxLQUFKLEdBQVlBLEtBQVo7QUFDQTtBQUNBQSxRQUFNQyxJQUFJQyxNQUFWLElBQW9CLFNBQVNDLFVBQVQsR0FBc0I7QUFDeEM7QUFDQUYsUUFBSUcsU0FBSixHQUFnQkEsU0FBaEI7QUFDQUgsUUFBSUksTUFBSixHQUFhLDRCQUFrQkosR0FBbEIsRUFBdUJLLEtBQXZCLEVBQWI7QUFDQTtBQUNBLFdBQU8sc0JBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDUCxVQUFJUSxHQUFKLEdBQVUseUJBQWVSLEdBQWYsRUFBb0JLLEtBQXBCLEVBQVY7QUFDQUwsVUFBSVMsWUFBSixH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QixFQUEyQztBQUN6Q3hCLGNBQUlJLE1BQUosQ0FBV29CLElBQVgsQ0FBZ0JJLEdBQWhCLEVBQXFCUSxNQUFyQjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlSLEdBQUosRUFBUztBQUNQckIsbUJBQU9xQixHQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0x0QixvQkFBUThCLE1BQVI7QUFDRDtBQUNGO0FBQ0YsT0FwRUQ7QUFxRUQsS0ExRU0sQ0FBUDtBQTJFRCxHQWhGRDtBQWlGQTs7O0FBR0FyQyxRQUFNc0MsWUFBTixDQUFtQnJDLElBQUlDLE1BQXZCLEVBQStCO0FBQzdCcUMsVUFBTSxFQUFFQyxNQUFNdkMsSUFBSXdDLFFBQVosRUFBc0JDLE1BQU0sS0FBNUIsRUFEdUI7QUFFN0JDLGFBQVMsNEJBQWtCMUMsR0FBbEIsRUFBdUJLLEtBQXZCLEVBRm9CO0FBRzdCc0MsYUFBUyxFQUFFN0IsTUFBTSxPQUFSLEVBQWlCOEIsTUFBTSxJQUF2QixFQUhvQjtBQUk3QkMsaUJBQWE3QyxJQUFJNkM7QUFKWSxHQUEvQjtBQU1ELEMiLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0YXRzIE1peGluIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IEFjY2VwdEJ1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9hY2NlcHQtYnVpbGRlcic7XG5pbXBvcnQgUGFyYW1zQnVpbGRlciBmcm9tICcuL2J1aWxkZXJzL3BhcmFtcy1idWlsZGVyJztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9xdWVyeS1idWlsZGVyJztcbmltcG9ydCBTdGF0c0J1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9zdGF0cy1idWlsZGVyJztcbmltcG9ydCBOb3dCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvbm93LWJ1aWxkZXInO1xuLyoqXG4gICogU3RhdHMgTWl4aW5cbiAgKiBAQXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQFNlZSA8aHR0cHM6Ly90d2l0dGVyLmNvbS9qb2huY2FzYXJydWJpYXM+XG4gICogQFNlZSA8aHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvbG9vcGJhY2stc3RhdHMtbWl4aW4+XG4gICogQFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuLWNhc2FycnViaWFzL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICAqIEBEZXNjcmlwdGlvblxuICAqXG4gICogVGhlIGZvbGxvd2luZyBtaXhpbiB3aWxsIGFkZCBzdGF0aXN0aWNzIGZ1bmN0aW9uYWxsaXR5IHRvIG1vZGVscyB3aGljaCBpbmNsdWRlc1xuICAqIHRoaXMgbW9kdWxlLlxuICAqXG4gICogSXQgY2FuIGNyZWF0ZSBzdGF0aXN0aWNzIGZyb20gdGhlIGdpdmVuIG1vZGVsLCBhIG1vZGVsIHJlbGF0aW9uc2hpcCBvciBhbiBuZXN0ZWQgb2JqZWN0XG4gICoqL1xuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBjdHgpID0+IHtcbiAgY3R4Lk1vZGVsID0gTW9kZWw7XG4gIC8vIENyZWF0ZSBkeW5hbWljIHN0YXRpc3RpYyBtZXRob2RcbiAgTW9kZWxbY3R4Lm1ldGhvZF0gPSBmdW5jdGlvbiBTdGF0TWV0aG9kKCkge1xuICAgIC8vIENhY2hlIGJsb2NrIGFyZ3VtZW50c1xuICAgIGN0eC5hcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgY3R4LnBhcmFtcyA9IG5ldyBQYXJhbXNCdWlsZGVyKGN0eCkuYnVpbGQoKTtcbiAgICAvLyBDcmVhdGUgUHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjdHgubm93ID0gbmV3IE5vd0J1aWxkZXIoY3R4KS5idWlsZCgpO1xuICAgICAgY3R4Lm5vd0lTT1N0cmluZyA9IGN0eC5ub3cudG9JU09TdHJpbmcoKTtcbiAgICAgIGN0eC5zdGF0cyA9IG5ldyBTdGF0c0J1aWxkZXIoY3R4KTtcbiAgICAgIC8vIERhdGEgV29ya2Zsb3dcbiAgICAgIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICAgIC8vIENyZWF0ZSBTY29wZSBRdWVyeVxuICAgICAgICAvLyBXZSBkb250IHBhc3MgY29tcGxldGUgY29udGV4dCBiZWNhdXNlIHdlIGV4cGVjdCBzcGVjaWZpYyBiZWhhdmlvdXJcbiAgICAgICAgbmV4dCA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHR5cGU6IGN0eC50eXBlLFxuICAgICAgICAgICAgY291bnQ6IGN0eC5jb3VudCxcbiAgICAgICAgICAgIG5vdzogY3R4Lm5vdyxcbiAgICAgICAgICAgIG5vd0lTT1N0cmluZzogY3R4Lm5vd0lTT1N0cmluZyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBwazogTW9kZWwuZ2V0SWROYW1lKCksXG4gICAgICAgICAgICAgIGlkOiBjdHgucGFyYW1zLmlkLFxuICAgICAgICAgICAgICByZWxhdGlvbjogY3R4LnBhcmFtcy5yZWxhdGlvbixcbiAgICAgICAgICAgICAgY3VzdG9tOiBjdHgucGFyYW1zLmN1c3RvbSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoY3R4LnR5cGUgPT09ICdtb2RlbCcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1zLndoZXJlID0gY3R4LnBhcmFtcy53aGVyZTtcbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1zLnJhbmdlID0gY3R4LnBhcmFtcy5yYW5nZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3IFF1ZXJ5QnVpbGRlcihvcHRpb25zKS5vbkNvbXBsZXRlKG5leHQpLmJ1aWxkKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIEdldCBMaXN0IG9mIEl0ZW1zXG4gICAgICAgIChxdWVyeSwgbmV4dCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY3R4LnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdtb2RlbCc6XG4gICAgICAgICAgICBNb2RlbC5maW5kKHF1ZXJ5LCBuZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JlbGF0aW9uJzpcbiAgICAgICAgICAgIE1vZGVsLmZpbmRPbmUocXVlcnksIChlcnIsIGluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgUXVlcnlCdWlsZGVyKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBjdHgudHlwZSxcbiAgICAgICAgICAgICAgICBjb3VudDogY3R4LmNvdW50LFxuICAgICAgICAgICAgICAgIG5vdzogY3R4Lm5vdyxcbiAgICAgICAgICAgICAgICBub3dJU09TdHJpbmc6IGN0eC5ub3dJU09TdHJpbmcsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICByYW5nZTogY3R4LnBhcmFtcy5yYW5nZSxcbiAgICAgICAgICAgICAgICAgIHdoZXJlOiBjdHgucGFyYW1zLndoZXJlLFxuICAgICAgICAgICAgICAgICAgY3VzdG9tOiBjdHgucGFyYW1zLmN1c3RvbSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnVpbGRlci5vbkNvbXBsZXRlKChfZXJyLCBfcXVlcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoX2VycikgcmV0dXJuIG5leHQoX2Vycik7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY3R4LnJlbGF0aW9uIHx8IGN0eC5wYXJhbXMucmVsYXRpb25dKF9xdWVyeSwgbmV4dCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBidWlsZGVyLmJ1aWxkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25lc3RlZCc6XG4gICAgICAgICAgICBNb2RlbC5maW5kT25lKHF1ZXJ5LCAoZXJyLCBpbnN0YW5jZSkgPT4gbmV4dChlcnIsIGluc3RhbmNlW2N0eC5uZXN0ZWRdKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBuZXh0KG51bGwsIFtdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFByb2Nlc3MgTGlzdCBvZiByZXN1bHRzXG4gICAgICAgIChsaXN0LCBuZXh0KSA9PiBuZXh0KG51bGwsIGN0eC5zdGF0cy5wcm9jZXNzKGxpc3QpKSxcbiAgICAgICAgLy8gRW5kIG9mIEZsb3dcbiAgICAgIF0sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGN0eC5wYXJhbXMubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGN0eC5wYXJhbXMubmV4dChlcnIsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICAvKipcbiAgICogRHluYW1pY2FsbHkgUmVnaXN0ZXIgRW5kcG9pbnRcbiAgICovXG4gIE1vZGVsLnJlbW90ZU1ldGhvZChjdHgubWV0aG9kLCB7XG4gICAgaHR0cDogeyBwYXRoOiBjdHguZW5kcG9pbnQsIHZlcmI6ICdnZXQnIH0sXG4gICAgYWNjZXB0czogbmV3IEFjY2VwdEJ1aWxkZXIoY3R4KS5idWlsZCgpLFxuICAgIHJldHVybnM6IHsgdHlwZTogJ2FycmF5Jywgcm9vdDogdHJ1ZSB9LFxuICAgIGRlc2NyaXB0aW9uOiBjdHguZGVzY3JpcHRpb24sXG4gIH0pO1xufTtcbiJdfQ==
