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
            case 'daily':
            case 'weekly':
            case 'monthly':
            case 'annual':
            default:
                now = moment();
            break;
            case 'custom':
                now = moment(this.ctx.params.custom.end);
            break;
        }
        return now;
    }
}
