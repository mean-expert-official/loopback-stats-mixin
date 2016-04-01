'use strict';
/**
 * Stats Mixin Dependencies
 */
var async = require('async');
var moment = require('moment');
var AcceptBuilder = require('./builders/accept-builder');
var ParamsBuilder = require('./builders/params-builder');
var QueryBuilder = require('./builders/query-builder');
var PrimaryKeyBuilder = require('./builders/pk-builder');
var StatsBuilder = require('./builders/stats-builder');
var NowBuilder = require('./builders/now-builder');
/**
 *  Stats Mixin
 *  @Author Jonathan Casarrubias
 *  @See <https://twitter.com/johncasarrubias>
 *  @See <https://www.npmjs.com/package/loopback-stats-mixin>
 *  @See <https://github.com/jonathan-casarrubias/loopback-stats-mixin>
 *  @Description
 * 
 *  The following mixin will add statistics functionallity to models which includes
 *  this module.
 * 
 *  It can create statistics from the given model, a model relationship or an nested object 
 **/
module.exports = function(Model, ctx) {
    ctx.Model = Model;
    // Create dynamic statistic method
    Model[ctx.method] = function() {
        // Cache block arguments
        ctx.arguments = arguments;
        ctx.params = new ParamsBuilder(ctx).build();
        // Create instance of stats class
        ctx.now = new NowBuilder(ctx).build();
        ctx.nowISOString = ctx.now.toISOString();
        ctx.stats = new StatsBuilder(ctx);
        // Data Workflow
        async.waterfall([
            // Create Scope Query
            // We dont pass complete context because we expect specific behaviour
            next => {
                let options = {
                    type: ctx.type,
                    count: ctx.count,
                    now: ctx.now,
                    nowISOString: ctx.nowISOString,
                    params: {
                        pk: new PrimaryKeyBuilder(Model).build(),
                        id: ctx.params.id,
                        relation: ctx.params.relation,
                        custom: ctx.params.custom
                    }
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
                            if (err) return(err);
                            let builder = new QueryBuilder({
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
                            builder.onComplete((err, query) => {
                                if (err) return next(err);
                                instance[ctx.relation || ctx.params.relation](query, next);
                            });
                            builder.build()
                        });
                        break;
                    case 'nested':
                        Model.findOne(query, (err, instance) => next(err, instance[ctx.nested]));
                        break;
                }
            },
            // Process List of results
            (list, next) => next(null, ctx.stats.process(list))
            // End of Flow
        ], ctx.params.next);
    };
    /**
     * Dynamically Register Endpoint
     */
    Model.remoteMethod(ctx.method, {
        http: { path: ctx.endpoint, verb: 'get' },
        accepts: new AcceptBuilder(ctx).build(),
        returns: { type: 'array', root: true },
        description: ctx.description
    });
};
