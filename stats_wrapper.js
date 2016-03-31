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
        ctx.params = new ParamsBuilder(arguments).build();
        ctx.items.forEach();
    };
    /**
     * Dynamically Register Endpoint
     */
    Model.remoteMethod(ctx.method, {
        http: { path: ctx.endpoint, verb: ctx.http.method || 'get' },
        accepts: ctx.http.accepts,
        returns: ctx.http.returns,
        description: ctx.description
    });
};
/**
 * Params Builder
 */
class 