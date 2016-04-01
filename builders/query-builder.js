'use strict';
/**
 * Query Builder Dependencies
 */
var moment = require('moment');
/**
 * Builds Loopback Query
 */
module.exports = class QueryBuilder {
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
        if ((this.ctx.type === 'relation' || this.ctx.type === 'nested') && this.ctx.params.id)
            query.where[this.ctx.params.pk] = this.ctx.params.id;
        // query.where[this.ctx.Model.settings.relations[this.ctx.params.relation].] = this.ctx.params.id;
        // If stat type is relation, then we set the root id
        if (this.ctx.type === 'relation' && this.ctx.params.relation)
            query.include = this.ctx.params.relation;
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