'use strict';
/**
 * Stats Mixin Dependencies
 */
var async = require('async');
var moment = require('moment');
/**
 *  Stats Mixin
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
        // Cache block arguments
        ctx.arguments = arguments;
        ctx.params = new ParamsBuilder(ctx).build();
        // Create instance of stats class
        ctx.now = moment();
        ctx.nowISOString = ctx.now.toISOString();
        ctx.stats = new Stats(ctx);

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
                        relation: ctx.params.relation
                    }
                };

                options.params[ctx.relation.fk] = ctx.params[ctx.relation.fk];

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
                            if(err) { return next(err); }
                            let builder = new QueryBuilder({
                                type: ctx.type,
                                count: ctx.count,
                                now: ctx.now,
                                nowISOString: ctx.nowISOString,
                                params: {
                                    range: ctx.params.range,
                                    where: ctx.params.where
                                }
                            });

                            builder.onComplete((err, query) => instance[ctx.params.relation.name](query, next));
                            builder.build()
                        });
                        break;
                    case 'nested':
                        Model.findOne(query, (err, instance) => next(err, instance[this.ctx.params.object]));
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
/**
 * Builds Statistic Array from List of Resuls
 */
class Stats {

    constructor(ctx) { this.ctx = ctx; }

    process(list) {
        this.list = list;
        let dataset = [];
        let iterator = this.getIteratorCount();
        for (let i = 1, dateIndex = iterator; i <= iterator; i++ , dateIndex--) {
            let current = this.getCurrentMoment(dateIndex);
            let count = this.getCurrentCount(current);
            dataset.push({
                date: current.toISOString(),
                count: this.ctx.count.avg ? (count / list.length) : count
            });
        }
        return dataset;
    }

    getCurrentCount(current) {
        let count = 0;
        this.list.forEach(item => {
            let itemDate = moment(item[this.ctx.count.on]);
            let itemFactor = this.getFactor(item);
            switch (this.ctx.params.range) {
                case 'weekly':
                case 'monthly':
                    if (current.isSame(itemDate, 'day')) count = count + itemFactor;
                    break;
                case 'annual':
                    if (current.isSame(itemDate, 'month')) count = count + itemFactor;
                    break;
                case 'daily':
                default:
                    if (current.isSame(itemDate, 'hour')) count = count + itemFactor;
                    break;
            }
        });
        return count;
    }

    getFactor(item) {
        let value;
        // When count by index, the factor will always be 1
        if (this.ctx.count.by === 'index')  {
            value = 1;
        } else {
            // We get the value from the property, can be number or boolean
            // When number we set that value as factor, else we evaluate
            // the value depending on true/false value and this.ctx.count.as value
            if (this.ctx.count.by.match(/\./)) {
                value = this.ctx.count.by.split('.').reduce((a, b) => a[b] ? a[b] : 0, item);
            } else {
                value = item[this.ctx.count.by];
            }
            // When value is boolean we set 0, 1 or this.ctx.count.as to set a value when true
            if (typeof value === 'boolean' && value === true) {
                value = this.ctx.count.as ? this.ctx.count.as : 1;
            } else if (typeof value === 'boolean' && value === false) {
                value = 0;
            }
        }
        // Make sure we send back a number
        return typeof value === 'number' ? value : parseInt(value);
    }

    getCurrentMoment(index) {
        let current;
        switch (this.ctx.params.range) {
            case 'weekly':
                current = moment(this.ctx.nowISOString).subtract(index - 1, 'days');
                break;
            case 'monthly':
                current = moment(this.ctx.nowISOString).subtract(index - 1, 'days');
                break;
            case 'annual':
                current = moment(this.ctx.nowISOString).subtract(index - 1, 'months');
                break;
            case 'daily':
            default:
                current = moment(this.ctx.nowISOString).subtract(index - 1, 'hours');
                break;
        }
        return current;
    }

    getIteratorCount() {
        let iterator;

        switch (this.ctx.params.range) {
            case 'weekly':
                iterator = 7;
                break;
            case 'monthly':
                iterator = this.ctx.now.daysInMonth();
                break;
            case 'annual':
                iterator = 12;
                break;
            case 'daily':
            default:
                iterator = 24;
                break;
        }

        return iterator;
    }
}
/**
 * Builds Loopback Query
 */
class QueryBuilder {
    /**
     * Setters
     */
    constructor(ctx) { this.ctx = ctx; }
    onComplete(next) { this.finish = next; return this; }
    /**
     * Build Query
     */
    build() {
        // Build query object in scope
        let query = {};
        // lets add a where statement
        query.where = this.ctx.params.where || {};
        // If stat type is relation, then we set the root id
        if ((this.ctx.type === 'relation' || this.ctx.type === 'nested') && this.ctx.params.relation && this.ctx.params[this.ctx.params.relation.fk])
            query.where[this.ctx.params.relation.fk] = this.ctx.params[this.ctx.params.relation.fk];
        // If stat type is relation, then we set the root id
        if (this.ctx.type === 'relation' && this.ctx.params.relation)
            query.include = this.ctx.params.relation.name;
        // Set Range
        if (this.ctx.params.range && this.ctx.count.on) {
            query.where[this.ctx.count.on] = {};
            switch (this.ctx.params.range) {
                case 'weekly':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(7, 'days').toDate();
                    break;
                case 'monthly':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(1, 'months').toDate();
                    break;
                case 'annual':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(1, 'years').toDate();
                    break;
                case 'daily':
                default:
                    query.where[this.ctx.count.on].gt = this.ctx.now.toDate();
                    break;
            }
        }
        // Return result query
        this.finish(null, query);
    }
}
/**
 * Builds Parameters object from dynamic arguments
 */
class ParamsBuilder {
    /**
     * Setters
     */
    constructor(ctx) { this.ctx = ctx; }
    /**
     * Parse params according ctx type
     */
    build() {
        if (this.ctx.type === "model")
            return { range: this.ctx.arguments[0], where: this.ctx.arguments[1], next: this.ctx.arguments[2] };
        if (this.ctx.type === "relation" && this.ctx.relation) {

            let params = { relation: this.ctx.relation, range: this.ctx.arguments[1], where: this.ctx.arguments[2], next: this.ctx.arguments[3] };
            params[this.ctx.relation.fk] = this.ctx.arguments[0];

            return params;
        }
        if (this.ctx.type === "relation" && !this.ctx.relation) {

            let params = { relation: this.ctx.arguments[1], range: this.ctx.arguments[2], where: this.ctx.arguments[3], next: this.ctx.arguments[4] };
            params[this.ctx.relation.fk] = this.ctx.arguments[0];

            return params;
        }
        if (this.ctx.type === "nested"){
            let params = { nested: this.ctx.arguments[1], range: this.ctx.arguments[2], where: this.ctx.arguments[3], next: this.ctx.arguments[4] };
            params[this.ctx.relation.fk] = this.ctx.arguments[0];

            return params;
        }
    }
}
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
            accepts.push({ arg: 'relation', type: 'object', required: true, description: 'Relationship name' });
        if (this.ctx.type === "nested")
            accepts.push({ arg: 'nested', type: 'string', required: true, description: 'Nested array property name' });
        accepts.push({ arg: 'range', type: 'string', required: true, description: 'Scale range (daily, weekly, monthly, annual)' });
        accepts.push({ arg: 'where', type: 'object', description: 'Statement to filter list of items to be processed' });
        return accepts;
    }
}
