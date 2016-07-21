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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWNlLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZ0I7QUFDN0IsTUFBSSxLQUFKLEdBQVksS0FBWjs7QUFENkIsT0FHN0IsQ0FBTSxJQUFJLE1BQUosQ0FBTixHQUFvQixTQUFTLFVBQVQsR0FBc0I7O0FBRXhDLFFBQUksU0FBSixHQUFnQixTQUFoQixDQUZ3QztBQUd4QyxRQUFJLE1BQUosR0FBYSw0QkFBa0IsR0FBbEIsRUFBdUIsS0FBdkIsRUFBYjs7QUFId0MsV0FLakMsc0JBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxVQUFJLEdBQUosR0FBVSx5QkFBZSxHQUFmLEVBQW9CLEtBQXBCLEVBQVYsQ0FEc0M7QUFFdEMsVUFBSSxZQUFKLEdBQW1CLElBQUksR0FBSixDQUFRLFdBQVIsRUFBbkIsQ0FGc0M7QUFHdEMsVUFBSSxLQUFKLEdBQVksMkJBQWlCLEdBQWpCLENBQVo7O0FBSHNDLHFCQUt0QyxDQUFNLFNBQU4sQ0FBZ0I7OztBQUdkLHNCQUFRO0FBQ04sWUFBTSxVQUFVO0FBQ2QsZ0JBQU0sSUFBSSxJQUFKO0FBQ04saUJBQU8sSUFBSSxLQUFKO0FBQ1AsZUFBSyxJQUFJLEdBQUo7QUFDTCx3QkFBYyxJQUFJLFlBQUo7QUFDZCxrQkFBUTtBQUNOLGdCQUFJLE1BQU0sU0FBTixFQUFKO0FBQ0EsZ0JBQUksSUFBSSxNQUFKLENBQVcsRUFBWDtBQUNKLHNCQUFVLElBQUksTUFBSixDQUFXLFFBQVg7QUFDVixvQkFBUSxJQUFJLE1BQUosQ0FBVyxNQUFYO1dBSlY7U0FMSSxDQURBO0FBYU4sWUFBSSxJQUFJLElBQUosS0FBYSxPQUFiLEVBQXNCO0FBQ3hCLGtCQUFRLE1BQVIsQ0FBZSxLQUFmLEdBQXVCLElBQUksTUFBSixDQUFXLEtBQVgsQ0FEQztBQUV4QixrQkFBUSxNQUFSLENBQWUsS0FBZixHQUF1QixJQUFJLE1BQUosQ0FBVyxLQUFYLENBRkM7U0FBMUI7QUFJQSxtQ0FBaUIsT0FBakIsRUFBMEIsVUFBMUIsQ0FBcUMsSUFBckMsRUFBMkMsS0FBM0MsR0FqQk07T0FBUjs7QUFvQkEsZ0JBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDZixnQkFBUSxJQUFJLElBQUo7QUFDUixlQUFLLE9BQUw7QUFDRSxrQkFBTSxJQUFOLENBQVcsS0FBWCxFQUFrQixJQUFsQixFQURGO0FBRUUsa0JBRkY7QUFEQSxlQUlLLFVBQUw7QUFDRSxrQkFBTSxPQUFOLENBQWMsS0FBZCxFQUFxQixVQUFDLEdBQUQsRUFBTSxRQUFOLEVBQW1CO0FBQ3RDLGtCQUFJLEdBQUosRUFBUyxPQUFPLEtBQUssR0FBTCxDQUFQLENBQVQ7QUFDQSxrQkFBTSxVQUFVLDJCQUFpQjtBQUMvQixzQkFBTSxJQUFJLElBQUo7QUFDTix1QkFBTyxJQUFJLEtBQUo7QUFDUCxxQkFBSyxJQUFJLEdBQUo7QUFDTCw4QkFBYyxJQUFJLFlBQUo7QUFDZCx3QkFBUTtBQUNOLHlCQUFPLElBQUksTUFBSixDQUFXLEtBQVg7QUFDUCx5QkFBTyxJQUFJLE1BQUosQ0FBVyxLQUFYO0FBQ1AsMEJBQVEsSUFBSSxNQUFKLENBQVcsTUFBWDtpQkFIVjtlQUxjLENBQVYsQ0FGZ0M7QUFhdEMsc0JBQVEsVUFBUixDQUFtQixVQUFDLElBQUQsRUFBTyxNQUFQLEVBQWtCO0FBQ25DLG9CQUFJLElBQUosRUFBVSxPQUFPLEtBQUssSUFBTCxDQUFQLENBQVY7QUFDQSx5QkFBUyxJQUFJLFFBQUosSUFBZ0IsSUFBSSxNQUFKLENBQVcsUUFBWCxDQUF6QixDQUE4QyxNQUE5QyxFQUFzRCxJQUF0RCxFQUZtQztlQUFsQixDQUFuQixDQWJzQztBQWlCdEMsc0JBQVEsS0FBUixHQWpCc0M7YUFBbkIsQ0FBckIsQ0FERjtBQW9CRSxrQkFwQkY7QUFKQSxlQXlCSyxRQUFMO0FBQ0Usa0JBQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsVUFBQyxHQUFELEVBQU0sUUFBTjtxQkFBbUIsS0FBSyxHQUFMLEVBQVUsU0FBUyxJQUFJLE1BQUosQ0FBbkI7YUFBbkIsQ0FBckIsQ0FERjtBQUVFLGtCQUZGO0FBekJBO0FBNEJTLGlCQUFLLElBQUwsRUFBVyxFQUFYLEVBQVQ7QUE1QkEsU0FEZTtPQUFqQjs7QUFpQ0EsZ0JBQUMsSUFBRCxFQUFPLElBQVA7ZUFBZ0IsS0FBSyxJQUFMLEVBQVcsSUFBSSxLQUFKLENBQVUsT0FBVixDQUFrQixJQUFsQixDQUFYO09BQWhCLENBeERGOztBQTBERyxnQkFBQyxHQUFELEVBQU0sTUFBTixFQUFpQjtBQUNsQixZQUFJLE9BQU8sSUFBSSxNQUFKLENBQVcsSUFBWCxLQUFvQixVQUEzQixFQUF1QztBQUN6QyxjQUFJLE1BQUosQ0FBVyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLE1BQXJCLEVBRHlDO1NBQTNDLE1BRU87QUFDTCxjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLEdBQVAsRUFETztXQUFULE1BRU87QUFDTCxvQkFBUSxNQUFSLEVBREs7V0FGUDtTQUhGO09BREMsQ0ExREgsQ0FMc0M7S0FBckIsQ0FBbkIsQ0FMd0M7R0FBdEI7Ozs7QUFIUyxPQXVGN0IsQ0FBTSxZQUFOLENBQW1CLElBQUksTUFBSixFQUFZO0FBQzdCLFVBQU0sRUFBRSxNQUFNLElBQUksUUFBSixFQUFjLE1BQU0sS0FBTixFQUE1QjtBQUNBLGFBQVMsNEJBQWtCLEdBQWxCLEVBQXVCLEtBQXZCLEVBQVQ7QUFDQSxhQUFTLEVBQUUsTUFBTSxPQUFOLEVBQWUsTUFBTSxJQUFOLEVBQTFCO0FBQ0EsaUJBQWEsSUFBSSxXQUFKO0dBSmYsRUF2RjZCO0NBQWhCIiwiZmlsZSI6InN0YXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGF0cyBNaXhpbiBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCBBY2NlcHRCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvYWNjZXB0LWJ1aWxkZXInO1xuaW1wb3J0IFBhcmFtc0J1aWxkZXIgZnJvbSAnLi9idWlsZGVycy9wYXJhbXMtYnVpbGRlcic7XG5pbXBvcnQgUXVlcnlCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvcXVlcnktYnVpbGRlcic7XG5pbXBvcnQgU3RhdHNCdWlsZGVyIGZyb20gJy4vYnVpbGRlcnMvc3RhdHMtYnVpbGRlcic7XG5pbXBvcnQgTm93QnVpbGRlciBmcm9tICcuL2J1aWxkZXJzL25vdy1idWlsZGVyJztcbi8qKlxuICAqIFN0YXRzIE1peGluXG4gICogQEF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBTZWUgPGh0dHBzOi8vdHdpdHRlci5jb20vam9obmNhc2FycnViaWFzPlxuICAqIEBTZWUgPGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2xvb3BiYWNrLXN0YXRzLW1peGluPlxuICAqIEBTZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25hdGhhbi1jYXNhcnJ1Ymlhcy9sb29wYmFjay1zdGF0cy1taXhpbj5cbiAgKiBARGVzY3JpcHRpb25cbiAgKlxuICAqIFRoZSBmb2xsb3dpbmcgbWl4aW4gd2lsbCBhZGQgc3RhdGlzdGljcyBmdW5jdGlvbmFsbGl0eSB0byBtb2RlbHMgd2hpY2ggaW5jbHVkZXNcbiAgKiB0aGlzIG1vZHVsZS5cbiAgKlxuICAqIEl0IGNhbiBjcmVhdGUgc3RhdGlzdGljcyBmcm9tIHRoZSBnaXZlbiBtb2RlbCwgYSBtb2RlbCByZWxhdGlvbnNoaXAgb3IgYW4gbmVzdGVkIG9iamVjdFxuICAqKi9cbmV4cG9ydCBkZWZhdWx0IChNb2RlbCwgY3R4KSA9PiB7XG4gIGN0eC5Nb2RlbCA9IE1vZGVsO1xuICAvLyBDcmVhdGUgZHluYW1pYyBzdGF0aXN0aWMgbWV0aG9kXG4gIE1vZGVsW2N0eC5tZXRob2RdID0gZnVuY3Rpb24gU3RhdE1ldGhvZCgpIHtcbiAgICAvLyBDYWNoZSBibG9jayBhcmd1bWVudHNcbiAgICBjdHguYXJndW1lbnRzID0gYXJndW1lbnRzO1xuICAgIGN0eC5wYXJhbXMgPSBuZXcgUGFyYW1zQnVpbGRlcihjdHgpLmJ1aWxkKCk7XG4gICAgLy8gQ3JlYXRlIFByb21pc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY3R4Lm5vdyA9IG5ldyBOb3dCdWlsZGVyKGN0eCkuYnVpbGQoKTtcbiAgICAgIGN0eC5ub3dJU09TdHJpbmcgPSBjdHgubm93LnRvSVNPU3RyaW5nKCk7XG4gICAgICBjdHguc3RhdHMgPSBuZXcgU3RhdHNCdWlsZGVyKGN0eCk7XG4gICAgICAvLyBEYXRhIFdvcmtmbG93XG4gICAgICBhc3luYy53YXRlcmZhbGwoW1xuICAgICAgICAvLyBDcmVhdGUgU2NvcGUgUXVlcnlcbiAgICAgICAgLy8gV2UgZG9udCBwYXNzIGNvbXBsZXRlIGNvbnRleHQgYmVjYXVzZSB3ZSBleHBlY3Qgc3BlY2lmaWMgYmVoYXZpb3VyXG4gICAgICAgIG5leHQgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiBjdHgudHlwZSxcbiAgICAgICAgICAgIGNvdW50OiBjdHguY291bnQsXG4gICAgICAgICAgICBub3c6IGN0eC5ub3csXG4gICAgICAgICAgICBub3dJU09TdHJpbmc6IGN0eC5ub3dJU09TdHJpbmcsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgcGs6IE1vZGVsLmdldElkTmFtZSgpLFxuICAgICAgICAgICAgICBpZDogY3R4LnBhcmFtcy5pZCxcbiAgICAgICAgICAgICAgcmVsYXRpb246IGN0eC5wYXJhbXMucmVsYXRpb24sXG4gICAgICAgICAgICAgIGN1c3RvbTogY3R4LnBhcmFtcy5jdXN0b20sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGN0eC50eXBlID09PSAnbW9kZWwnKSB7XG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcy53aGVyZSA9IGN0eC5wYXJhbXMud2hlcmU7XG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcy5yYW5nZSA9IGN0eC5wYXJhbXMucmFuZ2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5ldyBRdWVyeUJ1aWxkZXIob3B0aW9ucykub25Db21wbGV0ZShuZXh0KS5idWlsZCgpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBHZXQgTGlzdCBvZiBJdGVtc1xuICAgICAgICAocXVlcnksIG5leHQpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGN0eC50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgTW9kZWwuZmluZChxdWVyeSwgbmV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyZWxhdGlvbic6XG4gICAgICAgICAgICBNb2RlbC5maW5kT25lKHF1ZXJ5LCAoZXJyLCBpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICAgICAgICBjb25zdCBidWlsZGVyID0gbmV3IFF1ZXJ5QnVpbGRlcih7XG4gICAgICAgICAgICAgICAgdHlwZTogY3R4LnR5cGUsXG4gICAgICAgICAgICAgICAgY291bnQ6IGN0eC5jb3VudCxcbiAgICAgICAgICAgICAgICBub3c6IGN0eC5ub3csXG4gICAgICAgICAgICAgICAgbm93SVNPU3RyaW5nOiBjdHgubm93SVNPU3RyaW5nLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgcmFuZ2U6IGN0eC5wYXJhbXMucmFuZ2UsXG4gICAgICAgICAgICAgICAgICB3aGVyZTogY3R4LnBhcmFtcy53aGVyZSxcbiAgICAgICAgICAgICAgICAgIGN1c3RvbTogY3R4LnBhcmFtcy5jdXN0b20sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJ1aWxkZXIub25Db21wbGV0ZSgoX2VyciwgX3F1ZXJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKF9lcnIpIHJldHVybiBuZXh0KF9lcnIpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlW2N0eC5yZWxhdGlvbiB8fCBjdHgucGFyYW1zLnJlbGF0aW9uXShfcXVlcnksIG5leHQpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnVpbGRlci5idWlsZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduZXN0ZWQnOlxuICAgICAgICAgICAgTW9kZWwuZmluZE9uZShxdWVyeSwgKGVyciwgaW5zdGFuY2UpID0+IG5leHQoZXJyLCBpbnN0YW5jZVtjdHgubmVzdGVkXSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogbmV4dChudWxsLCBbXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBQcm9jZXNzIExpc3Qgb2YgcmVzdWx0c1xuICAgICAgICAobGlzdCwgbmV4dCkgPT4gbmV4dChudWxsLCBjdHguc3RhdHMucHJvY2VzcyhsaXN0KSksXG4gICAgICAgIC8vIEVuZCBvZiBGbG93XG4gICAgICBdLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjdHgucGFyYW1zLm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjdHgucGFyYW1zLm5leHQoZXJyLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgLyoqXG4gICAqIER5bmFtaWNhbGx5IFJlZ2lzdGVyIEVuZHBvaW50XG4gICAqL1xuICBNb2RlbC5yZW1vdGVNZXRob2QoY3R4Lm1ldGhvZCwge1xuICAgIGh0dHA6IHsgcGF0aDogY3R4LmVuZHBvaW50LCB2ZXJiOiAnZ2V0JyB9LFxuICAgIGFjY2VwdHM6IG5ldyBBY2NlcHRCdWlsZGVyKGN0eCkuYnVpbGQoKSxcbiAgICByZXR1cm5zOiB7IHR5cGU6ICdhcnJheScsIHJvb3Q6IHRydWUgfSxcbiAgICBkZXNjcmlwdGlvbjogY3R4LmRlc2NyaXB0aW9uLFxuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
