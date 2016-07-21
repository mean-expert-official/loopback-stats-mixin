/**
 * Stats Mixin Dependencies
 */
import async from 'async';
import AcceptBuilder from './builders/accept-builder';
import ParamsBuilder from './builders/params-builder';
import QueryBuilder from './builders/query-builder';
import StatsBuilder from './builders/stats-builder';
import NowBuilder from './builders/now-builder';
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
export default (Model, ctx) => {
  ctx.Model = Model;
  // Create dynamic statistic method
  Model[ctx.method] = function StatMethod() {
    // Cache block arguments
    ctx.arguments = arguments;
    ctx.params = new ParamsBuilder(ctx).build();
    // Create Promise
    return new Promise((resolve, reject) => {
      ctx.now = new NowBuilder(ctx).build();
      ctx.nowISOString = ctx.now.toISOString();
      ctx.stats = new StatsBuilder(ctx);
      // Data Workflow
      async.waterfall([
        // Create Scope Query
        // We dont pass complete context because we expect specific behaviour
        next => {
          const options = {
            type: ctx.type,
            count: ctx.count,
            now: ctx.now,
            nowISOString: ctx.nowISOString,
            params: {
              pk: Model.getIdName(),
              id: ctx.params.id,
              relation: ctx.params.relation,
              custom: ctx.params.custom,
            },
          };
          if (ctx.type === 'model') {
            options.params.where = ctx.params.where;
            options.params.range = ctx.params.range;
          }
          new QueryBuilder(options).onComplete(next).build();
        },
        // Get List of Items
        (query, next) => {
          switch (ctx.type) {
          case 'model':
            Model.find(query, next);
            break;
          case 'relation':
            Model.findOne(query, (err, instance) => {
              if (err) return next(err);
              const builder = new QueryBuilder({
                type: ctx.type,
                count: ctx.count,
                now: ctx.now,
                nowISOString: ctx.nowISOString,
                params: {
                  range: ctx.params.range,
                  where: ctx.params.where,
                  custom: ctx.params.custom,
                },
              });
              builder.onComplete((_err, _query) => {
                if (_err) return next(_err);
                instance[ctx.relation || ctx.params.relation](_query, next);
              });
              builder.build();
            });
            break;
          case 'nested':
            Model.findOne(query, (err, instance) => next(err, instance[ctx.nested]));
            break;
          default: next(null, []);
          }
        },
        // Process List of results
        (list, next) => next(null, ctx.stats.process(list)),
        // End of Flow
      ], (err, result) => {
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
    accepts: new AcceptBuilder(ctx).build(),
    returns: { type: 'array', root: true },
    description: ctx.description,
  });
};
