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
            case 'hour': type = 'hourly'; break;
            case 'day': type = 'daily'; break;
            case 'week': type = 'weekly'; break;
            case 'month': type = 'monthly'; break;
            case 'year': type = 'yearly'; break;
          }
        }
      });
    }
    return type;
  }
}
