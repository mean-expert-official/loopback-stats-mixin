/**
 * Stats Builder Dependencies
 */
import moment from 'moment';
/**
 * Builds Now Time Moment
 */
export default class NowBuilder {

    constructor(ctx) { this.ctx = ctx; }

    build() {
        let now;
        switch (this.ctx.params.range) {
            case 'hourly':
            case 'daily':
            case 'weekly':
            case 'monthly':
            case 'yearly':
            default:
                now = moment.utc();
            break;
            case 'custom':
                now = moment.utc(this.ctx.params.custom.end);
            break;
        }
        return now;
    }
}
