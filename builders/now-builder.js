'use strict';
/**
 * Stats Builder Dependencies
 */
var moment = require('moment');
/**
 * Builds Now Time Moment
 */
module.exports = class NowBuilder {

    constructor(ctx) { this.ctx = ctx; }

    build() {
        let now;
        switch (this.ctx.params.range) {
            case 'daily':
            case 'weekly':
            case 'monthly':
            case 'annual':
                now = moment();
            break;
            case 'custom':
                now = moment(this.ctx.params.custom.end);
            break;
        }
        return now;
    }
}
