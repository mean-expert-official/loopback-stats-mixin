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
        let type = this.ctx.params.range;
        if (this.ctx.params.range === 'custom') {
            let start = moment(this.ctx.params.custom.start);
            let end = moment(this.ctx.params.custom.end);
            ['hour', 'day', 'week', 'month', 'year'].forEach(item => {
                let plural = [item, 's'].join('');
                let diff = end.diff(start, plural);
                if (diff > 1 && diff < 25) {
                    type = item === 'week' ? end.diff(start, 'days') : diff;
                    switch (item) {
                        case 'hour': type = 'daily'; break;
                        case 'day': type = 'weekly'; break;
                        case 'week': type = 'monthly'; break;
                        case 'month': type = 'annual'; break;
                    }
                }
            });
        }

        return type;
    }
}
