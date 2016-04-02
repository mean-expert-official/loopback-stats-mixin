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
      }],
      // End of Flow
      function (err, result) {
        if (typeof ctx.params.next === 'function') ctx.params.next(err, result);
        if (err) {
          reject(err);
        } else {
          resolve(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWNlLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZ0I7QUFDN0IsTUFBSSxLQUFKLEdBQVksS0FBWjs7QUFENkIsT0FHN0IsQ0FBTSxJQUFJLE1BQUosQ0FBTixHQUFvQixTQUFTLFVBQVQsR0FBc0I7O0FBRXhDLFFBQUksU0FBSixHQUFnQixTQUFoQixDQUZ3QztBQUd4QyxRQUFJLE1BQUosR0FBYSw0QkFBa0IsR0FBbEIsRUFBdUIsS0FBdkIsRUFBYjs7QUFId0MsV0FLakMsc0JBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxVQUFJLEdBQUosR0FBVSx5QkFBZSxHQUFmLEVBQW9CLEtBQXBCLEVBQVYsQ0FEc0M7QUFFdEMsVUFBSSxZQUFKLEdBQW1CLElBQUksR0FBSixDQUFRLFdBQVIsRUFBbkIsQ0FGc0M7QUFHdEMsVUFBSSxLQUFKLEdBQVksMkJBQWlCLEdBQWpCLENBQVo7O0FBSHNDLHFCQUt0QyxDQUFNLFNBQU4sQ0FBZ0I7OztBQUdkLHNCQUFRO0FBQ04sWUFBTSxVQUFVO0FBQ2QsZ0JBQU0sSUFBSSxJQUFKO0FBQ04saUJBQU8sSUFBSSxLQUFKO0FBQ1AsZUFBSyxJQUFJLEdBQUo7QUFDTCx3QkFBYyxJQUFJLFlBQUo7QUFDZCxrQkFBUTtBQUNOLGdCQUFJLE1BQU0sU0FBTixFQUFKO0FBQ0EsZ0JBQUksSUFBSSxNQUFKLENBQVcsRUFBWDtBQUNKLHNCQUFVLElBQUksTUFBSixDQUFXLFFBQVg7QUFDVixvQkFBUSxJQUFJLE1BQUosQ0FBVyxNQUFYO1dBSlY7U0FMSSxDQURBO0FBYU4sWUFBSSxJQUFJLElBQUosS0FBYSxPQUFiLEVBQXNCO0FBQ3hCLGtCQUFRLE1BQVIsQ0FBZSxLQUFmLEdBQXVCLElBQUksTUFBSixDQUFXLEtBQVgsQ0FEQztBQUV4QixrQkFBUSxNQUFSLENBQWUsS0FBZixHQUF1QixJQUFJLE1BQUosQ0FBVyxLQUFYLENBRkM7U0FBMUI7QUFJQSxtQ0FBaUIsT0FBakIsRUFBMEIsVUFBMUIsQ0FBcUMsSUFBckMsRUFBMkMsS0FBM0MsR0FqQk07T0FBUjs7QUFvQkEsZ0JBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDZixnQkFBUSxJQUFJLElBQUo7QUFDUixlQUFLLE9BQUw7QUFDRSxrQkFBTSxJQUFOLENBQVcsS0FBWCxFQUFrQixJQUFsQixFQURGO0FBRUUsa0JBRkY7QUFEQSxlQUlLLFVBQUw7QUFDRSxrQkFBTSxPQUFOLENBQWMsS0FBZCxFQUFxQixVQUFDLEdBQUQsRUFBTSxRQUFOLEVBQW1CO0FBQ3RDLGtCQUFJLEdBQUosRUFBUyxPQUFPLEtBQUssR0FBTCxDQUFQLENBQVQ7QUFDQSxrQkFBTSxVQUFVLDJCQUFpQjtBQUMvQixzQkFBTSxJQUFJLElBQUo7QUFDTix1QkFBTyxJQUFJLEtBQUo7QUFDUCxxQkFBSyxJQUFJLEdBQUo7QUFDTCw4QkFBYyxJQUFJLFlBQUo7QUFDZCx3QkFBUTtBQUNOLHlCQUFPLElBQUksTUFBSixDQUFXLEtBQVg7QUFDUCx5QkFBTyxJQUFJLE1BQUosQ0FBVyxLQUFYO0FBQ1AsMEJBQVEsSUFBSSxNQUFKLENBQVcsTUFBWDtpQkFIVjtlQUxjLENBQVYsQ0FGZ0M7QUFhdEMsc0JBQVEsVUFBUixDQUFtQixVQUFDLElBQUQsRUFBTyxNQUFQLEVBQWtCO0FBQ25DLG9CQUFJLElBQUosRUFBVSxPQUFPLEtBQUssSUFBTCxDQUFQLENBQVY7QUFDQSx5QkFBUyxJQUFJLFFBQUosSUFBZ0IsSUFBSSxNQUFKLENBQVcsUUFBWCxDQUF6QixDQUE4QyxNQUE5QyxFQUFzRCxJQUF0RCxFQUZtQztlQUFsQixDQUFuQixDQWJzQztBQWlCdEMsc0JBQVEsS0FBUixHQWpCc0M7YUFBbkIsQ0FBckIsQ0FERjtBQW9CRSxrQkFwQkY7QUFKQSxlQXlCSyxRQUFMO0FBQ0Usa0JBQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsVUFBQyxHQUFELEVBQU0sUUFBTjtxQkFBbUIsS0FBSyxHQUFMLEVBQVUsU0FBUyxJQUFJLE1BQUosQ0FBbkI7YUFBbkIsQ0FBckIsQ0FERjtBQUVFLGtCQUZGO0FBekJBO0FBNEJTLGlCQUFLLElBQUwsRUFBVyxFQUFYLEVBQVQ7QUE1QkEsU0FEZTtPQUFqQjs7QUFpQ0EsZ0JBQUMsSUFBRCxFQUFPLElBQVA7ZUFBZ0IsS0FBSyxJQUFMLEVBQVcsSUFBSSxLQUFKLENBQVUsT0FBVixDQUFrQixJQUFsQixDQUFYO09BQWhCLENBeERGOztBQTBERyxnQkFBQyxHQUFELEVBQU0sTUFBTixFQUFpQjtBQUNsQixZQUFJLE9BQU8sSUFBSSxNQUFKLENBQVcsSUFBWCxLQUFvQixVQUEzQixFQUF1QyxJQUFJLE1BQUosQ0FBVyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLE1BQXJCLEVBQTNDO0FBQ0EsWUFBSSxHQUFKLEVBQVM7QUFDUCxpQkFBTyxHQUFQLEVBRE87U0FBVCxNQUVPO0FBQ0wsa0JBQVEsTUFBUixFQURLO1NBRlA7T0FGQyxDQTFESCxDQUxzQztLQUFyQixDQUFuQixDQUx3QztHQUF0Qjs7OztBQUhTLE9Bb0Y3QixDQUFNLFlBQU4sQ0FBbUIsSUFBSSxNQUFKLEVBQVk7QUFDN0IsVUFBTSxFQUFFLE1BQU0sSUFBSSxRQUFKLEVBQWMsTUFBTSxLQUFOLEVBQTVCO0FBQ0EsYUFBUyw0QkFBa0IsR0FBbEIsRUFBdUIsS0FBdkIsRUFBVDtBQUNBLGFBQVMsRUFBRSxNQUFNLE9BQU4sRUFBZSxNQUFNLElBQU4sRUFBMUI7QUFDQSxpQkFBYSxJQUFJLFdBQUo7R0FKZixFQXBGNkI7Q0FBaEIiLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0YXRzIE1peGluIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IEFjY2VwdEJ1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9hY2NlcHQtYnVpbGRlcic7XG5pbXBvcnQgUGFyYW1zQnVpbGRlciBmcm9tICcuL2J1aWxkZXJzL3BhcmFtcy1idWlsZGVyJztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9xdWVyeS1idWlsZGVyJztcbmltcG9ydCBTdGF0c0J1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9zdGF0cy1idWlsZGVyJztcbmltcG9ydCBOb3dCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvbm93LWJ1aWxkZXInO1xuLyoqXG4gICogU3RhdHMgTWl4aW5cbiAgKiBAQXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQFNlZSA8aHR0cHM6Ly90d2l0dGVyLmNvbS9qb2huY2FzYXJydWJpYXM+XG4gICogQFNlZSA8aHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvbG9vcGJhY2stc3RhdHMtbWl4aW4+XG4gICogQFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuLWNhc2FycnViaWFzL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICAqIEBEZXNjcmlwdGlvblxuICAqXG4gICogVGhlIGZvbGxvd2luZyBtaXhpbiB3aWxsIGFkZCBzdGF0aXN0aWNzIGZ1bmN0aW9uYWxsaXR5IHRvIG1vZGVscyB3aGljaCBpbmNsdWRlc1xuICAqIHRoaXMgbW9kdWxlLlxuICAqXG4gICogSXQgY2FuIGNyZWF0ZSBzdGF0aXN0aWNzIGZyb20gdGhlIGdpdmVuIG1vZGVsLCBhIG1vZGVsIHJlbGF0aW9uc2hpcCBvciBhbiBuZXN0ZWQgb2JqZWN0XG4gICoqL1xuZXhwb3J0IGRlZmF1bHQgKE1vZGVsLCBjdHgpID0+IHtcbiAgY3R4Lk1vZGVsID0gTW9kZWw7XG4gIC8vIENyZWF0ZSBkeW5hbWljIHN0YXRpc3RpYyBtZXRob2RcbiAgTW9kZWxbY3R4Lm1ldGhvZF0gPSBmdW5jdGlvbiBTdGF0TWV0aG9kKCkge1xuICAgIC8vIENhY2hlIGJsb2NrIGFyZ3VtZW50c1xuICAgIGN0eC5hcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgY3R4LnBhcmFtcyA9IG5ldyBQYXJhbXNCdWlsZGVyKGN0eCkuYnVpbGQoKTtcbiAgICAvLyBDcmVhdGUgUHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjdHgubm93ID0gbmV3IE5vd0J1aWxkZXIoY3R4KS5idWlsZCgpO1xuICAgICAgY3R4Lm5vd0lTT1N0cmluZyA9IGN0eC5ub3cudG9JU09TdHJpbmcoKTtcbiAgICAgIGN0eC5zdGF0cyA9IG5ldyBTdGF0c0J1aWxkZXIoY3R4KTtcbiAgICAgIC8vIERhdGEgV29ya2Zsb3dcbiAgICAgIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICAgIC8vIENyZWF0ZSBTY29wZSBRdWVyeVxuICAgICAgICAvLyBXZSBkb250IHBhc3MgY29tcGxldGUgY29udGV4dCBiZWNhdXNlIHdlIGV4cGVjdCBzcGVjaWZpYyBiZWhhdmlvdXJcbiAgICAgICAgbmV4dCA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHR5cGU6IGN0eC50eXBlLFxuICAgICAgICAgICAgY291bnQ6IGN0eC5jb3VudCxcbiAgICAgICAgICAgIG5vdzogY3R4Lm5vdyxcbiAgICAgICAgICAgIG5vd0lTT1N0cmluZzogY3R4Lm5vd0lTT1N0cmluZyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBwazogTW9kZWwuZ2V0SWROYW1lKCksXG4gICAgICAgICAgICAgIGlkOiBjdHgucGFyYW1zLmlkLFxuICAgICAgICAgICAgICByZWxhdGlvbjogY3R4LnBhcmFtcy5yZWxhdGlvbixcbiAgICAgICAgICAgICAgY3VzdG9tOiBjdHgucGFyYW1zLmN1c3RvbSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoY3R4LnR5cGUgPT09ICdtb2RlbCcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1zLndoZXJlID0gY3R4LnBhcmFtcy53aGVyZTtcbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1zLnJhbmdlID0gY3R4LnBhcmFtcy5yYW5nZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3IFF1ZXJ5QnVpbGRlcihvcHRpb25zKS5vbkNvbXBsZXRlKG5leHQpLmJ1aWxkKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIEdldCBMaXN0IG9mIEl0ZW1zXG4gICAgICAgIChxdWVyeSwgbmV4dCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY3R4LnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdtb2RlbCc6XG4gICAgICAgICAgICBNb2RlbC5maW5kKHF1ZXJ5LCBuZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JlbGF0aW9uJzpcbiAgICAgICAgICAgIE1vZGVsLmZpbmRPbmUocXVlcnksIChlcnIsIGluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgUXVlcnlCdWlsZGVyKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBjdHgudHlwZSxcbiAgICAgICAgICAgICAgICBjb3VudDogY3R4LmNvdW50LFxuICAgICAgICAgICAgICAgIG5vdzogY3R4Lm5vdyxcbiAgICAgICAgICAgICAgICBub3dJU09TdHJpbmc6IGN0eC5ub3dJU09TdHJpbmcsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICByYW5nZTogY3R4LnBhcmFtcy5yYW5nZSxcbiAgICAgICAgICAgICAgICAgIHdoZXJlOiBjdHgucGFyYW1zLndoZXJlLFxuICAgICAgICAgICAgICAgICAgY3VzdG9tOiBjdHgucGFyYW1zLmN1c3RvbSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnVpbGRlci5vbkNvbXBsZXRlKChfZXJyLCBfcXVlcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoX2VycikgcmV0dXJuIG5leHQoX2Vycik7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY3R4LnJlbGF0aW9uIHx8IGN0eC5wYXJhbXMucmVsYXRpb25dKF9xdWVyeSwgbmV4dCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBidWlsZGVyLmJ1aWxkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25lc3RlZCc6XG4gICAgICAgICAgICBNb2RlbC5maW5kT25lKHF1ZXJ5LCAoZXJyLCBpbnN0YW5jZSkgPT4gbmV4dChlcnIsIGluc3RhbmNlW2N0eC5uZXN0ZWRdKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBuZXh0KG51bGwsIFtdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFByb2Nlc3MgTGlzdCBvZiByZXN1bHRzXG4gICAgICAgIChsaXN0LCBuZXh0KSA9PiBuZXh0KG51bGwsIGN0eC5zdGF0cy5wcm9jZXNzKGxpc3QpKSxcbiAgICAgICAgLy8gRW5kIG9mIEZsb3dcbiAgICAgIF0sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGN0eC5wYXJhbXMubmV4dCA9PT0gJ2Z1bmN0aW9uJykgY3R4LnBhcmFtcy5uZXh0KGVyciwgcmVzdWx0KTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIC8qKlxuICAgKiBEeW5hbWljYWxseSBSZWdpc3RlciBFbmRwb2ludFxuICAgKi9cbiAgTW9kZWwucmVtb3RlTWV0aG9kKGN0eC5tZXRob2QsIHtcbiAgICBodHRwOiB7IHBhdGg6IGN0eC5lbmRwb2ludCwgdmVyYjogJ2dldCcgfSxcbiAgICBhY2NlcHRzOiBuZXcgQWNjZXB0QnVpbGRlcihjdHgpLmJ1aWxkKCksXG4gICAgcmV0dXJuczogeyB0eXBlOiAnYXJyYXknLCByb290OiB0cnVlIH0sXG4gICAgZGVzY3JpcHRpb246IGN0eC5kZXNjcmlwdGlvbixcbiAgfSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
