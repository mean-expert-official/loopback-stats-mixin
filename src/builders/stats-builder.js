/**
 * Stats Builder Dependencies
 */
import moment from 'moment';
import TypeBuilder from './type-builder';
/**
 * Builds Statistic Array from List of Resuls
 */
export default class StatsBuilder {

    constructor(ctx) { this.ctx = ctx; }
    
    process(list) {
      this.list = list;
      if (this.ctx.params.groupBy && this.ctx.params.groupBy.length > 0) {
        let result = {};
        this.list.forEach(item => (result[item[this.ctx.params.groupBy]] = this.calculate(item[this.ctx.params.groupBy])));
        return result;
      } else {
        return this.calculate();
      }
    }

    calculate(group) {
        let dataset = [];
        let iterator = this.getIteratorCount();
        for (let i = 0, dateIndex = iterator; i <= iterator; i++ , dateIndex--) {
            let current = this.getCurrentMoment(dateIndex);
            let count = this.getCurrentCount(current, group);
            dataset.push({
                date: current.toISOString(),
                universal: parseInt(current.format('x')),
                count: count === 0 ? 0 : this.ctx.count.avg ? (count / this.list.length) : count
            });
        }
        return dataset;
    }

    getCurrentCount(current, group) {
        let count = 0;
        this.list.forEach(item => {
            if (group && item[this.ctx.params.groupBy] !== group) return;
            let itemDate = moment(item[this.ctx.count.on]);
            let itemFactor = this.getFactor(item);
            switch (this.ctx.params.range) {
                case 'hourly':
                    if (current.isSame(itemDate, 'hour')) count = count + itemFactor;
                    break;
                case 'daily':
                    if (current.isSame(itemDate, 'day')) count = count + itemFactor;
                    break;
                case 'weekly':
                    if (current.isSame(itemDate, 'week')) count = count + itemFactor;
                    break;
                case 'monthly':
                    if (current.isSame(itemDate, 'month')) count = count + itemFactor;
                    break;
                case 'yearly':
                    if (current.isSame(itemDate, 'year')) count = count + itemFactor;
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
            case 'hourly':
                current = moment(this.ctx.nowISOString).subtract(index, 'hours');
                break;
            case 'daily':
                current = moment(this.ctx.nowISOString).subtract(index, 'days');
                break;
            case 'weekly':
                current = moment(this.ctx.nowISOString).subtract(index, 'weeks');
                break;
            case 'monthly':
                current = moment(this.ctx.nowISOString).subtract(index, 'months');
                break;
            case 'yearly':
                current = moment(this.ctx.nowISOString).subtract(index, 'years');
                break;
        }
        return current;
    }

    getIteratorCount() {
        let iterator;
        switch (this.ctx.params.range) {
            case 'hourly':
                iterator = 24; // 24 hours
                break;
            case 'daily':
                iterator = 7; // seven days
                break;
            case 'weekly':
                iterator = 4; // 4 weeks
                break;
            case 'monthly':
                iterator = 12; // 12 months
                break;
            case 'yearly':
                iterator = 5; // 5 years
                break;
            case 'custom':
                let start = moment(this.ctx.params.custom.start);
                let end = moment(this.ctx.params.custom.end);
                iterator = 0;
                ['hour', 'day', 'week', 'month','year'].forEach(item => {
                    let plural = [item, 's'].join('');
                    let diff   = end.diff(start, plural);
                    if (diff > 1 && diff < 25) {
                        iterator = diff;
                        this.ctx.params.range = new TypeBuilder(this.ctx).build();
                    }
                });
            break;
        }
        return iterator;
    }
}
