'use strict';
var async = require('async');
/**
 *  Wrapper JS Mixin
 *  @Author Jonathan Casarrubias
 *  @Description
 * 
 *  The following mixin will add statistics functionallity to models which includes
 *  this module.
 * 
 *  It can create statistics from the given model, a model relationship or an nested object 
 **/
module.exports = function(Model, ctx) {
    // Create dynamic statistic method
    Model[ctx.method] = function() {
        ctx.result = {};
        ctx.args   = arguments;
        ctx.next   = ctx.args[arguments.length - 1];
        async.each(ctx.wraps, (item, next) => {
            ctx.args[ctx.args.length - 1] = (err, dataset) => {
                if (err) return next(err);
                ctx.result[item] = dataset;
                next();
            };
            Model[item].apply(Model, Array.from(ctx.args));
        }, err => ctx.next(err, ctx.result));
    };
    /**
     * Dynamically Register Endpoint
     */
    Model.remoteMethod(ctx.method, {
        http: { path: ctx.endpoint, verb: 'get' },
        accepts: new AcceptBuilder(ctx).build(),
        returns: { type: 'object', root: true },
        description: ctx.description
    });
};
/**
 * Builds Parameters object for dynamic remote method
 */
class AcceptBuilder {
    /**
     * Setters
     */
    constructor(ctx) { this.ctx = ctx; }
    /**
     * Parse params according ctx type
     */
    build() {
        let accepts = [];
        if (this.ctx.type === "relation" || this.ctx.type === "nested")
            accepts.push({ arg: 'id', type: 'string', required: true, description: 'Model id' });
        if (this.ctx.type === "relation" && !this.ctx.relation)
            accepts.push({ arg: 'relation', type: 'string', required: true, description: 'Relationship name' });
        if (this.ctx.type === "nested")
            accepts.push({ arg: 'nested', type: 'string', required: true, description: 'Nested array property name' });
        accepts.push({ arg: 'range', type: 'string', required: true, description: 'Scale range (daily, weekly, monthly, annual)' });
        accepts.push({ arg: 'where', type: 'object', description: 'Statement to filter list of items to be processed' });
        return accepts;
    }
}
