'use strict';
/**
 * Query Builder Dependencies
 */
import moment from 'moment';
import TypeBuilder from './type-builder';
/**
 * Builds Loopback Query
 */
export default class QueryBuilder {
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
            let range = new TypeBuilder(this.ctx).build();
            switch (range) {
                case 'hourly':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(24, 'hours').toDate();
                    break;
                case 'daily':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(7, 'days').toDate();
                    break;
                case 'weekly':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(4, 'weeks').toDate();
                    break;
                case 'monthly':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(12, 'months').toDate();
                    break;
                case 'yearly':
                    query.where[this.ctx.count.on].gt = moment(this.ctx.nowISOString).subtract(5, 'years').toDate();
                    break;
            }
        }
        // Return result query
        this.finish(null, query);
    }
}