/**
 * Stats Wrapper Mixin Dependencies
 */
import async from 'async';
import AcceptBuilder from './builders/accept-builder';
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
export default (Model, ctx) => {
  ctx.Model = Model;
  // Create dynamic statistic method
  Model[ctx.method] = function StatWrapperMethod() {
    ctx.result = {};
    ctx.args = arguments;
    ctx.next = ctx.args[arguments.length - 1];
    // Create Promise
    return new Promise((resolve, reject) => {
      async.each(ctx.wraps, (item, next) => {
        ctx.args[ctx.args.length - 1] = (err, dataset) => {
          if (err) return next(err);
          ctx.result[item] = dataset;
          next();
        };
        if (Model[item]) {
          Model[item].apply(Model, Array.from(ctx.args)).then(next);
        } else {
          next(new Error(Model.definition.name + '.' + item + ' does not exist, verify your configuration.'));
        }
      }, err => {
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
    accepts: new AcceptBuilder(ctx).build(),
    returns: { type: 'object', root: true },
    description: ctx.description,
  });
};
