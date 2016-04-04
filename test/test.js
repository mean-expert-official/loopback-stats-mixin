/**
 * Dependencies
 */
import {assert} from 'chai';
import moment from 'moment';
import loopback from 'loopback';
import mixin from '../src';
/**
 * Lets define a loopback application
 */
const app = loopback;
app.loopback = loopback;
mixin(app);
/**
 * Create Data Source and Models
 **/
const DataSource = app.createDataSource({ connector: app.Memory });
const Order = DataSource.createModel('Order',
  {
    id: { type: Number, generated: true, id: true },
    name: String,
    type: String,
    created: Date,
  },
  {
    mixins: {
      Stats: [
        {
          method: 'stats',
          endpoint: '/stats',
          type: 'model',
          count: {
            on: 'created',
            by: 'index'
          }
        },
        {
          method: 'stats2',
          endpoint: '/stats2',
          type: 'model',
          count: {
            on: 'created',
            by: 'index'
          }
        }
      ],
      StatsWrapper: [
        {
          method: 'wrapper',
          endpoint: '/wrapper',
          type: 'model',
          wraps: [
            'stats',
            'stats2'
          ]
        }
      ]
    }
  }
);
/**
 * Populate
 * TODO, HARDCODE DATES ON CREATION; OTHERWISE IS TOO DYNAMIC MAKING DIFFICULT TO TEST
 * Tests that previously passed now fails, it depends on day of week and month
 */
const now = moment();
Order.create([
  { name: 'order 1', type: 'national', created: now.toISOString() },
  { name: 'order 2', type: 'national', created: moment(now.toISOString()).subtract(5, 'day').toISOString() },
  { name: 'order 3', type: 'international', created: moment(now.toISOString()).subtract(3, 'day').toISOString() },
  { name: 'order 4', type: 'international', created: moment(now.toISOString()).subtract(2, 'month').toISOString() },
]);
/**
 * Start Tests
 */
describe('Loopback Stats Mixin (Model Mode)', () => {
  // It verifies the orders are created
  it('verifies if orders where created successfully', () => Order.find().then(orders => assert.lengthOf(orders, 4)));
  // It verifies the stast structure in the past 12 months and current
  it('verifies for monthly stats structure length and results', () => Order.stats('monthly').then(stats => {
    assert.equal(stats.length, 13);
    assert.equal(stats.pop().count, 2);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop(), undefined);
  }));
  // It verifies the stast structure in the past 4 weeks and current
  it('verifies for weekly stats structure length and results', () => Order.stats('weekly').then(stats => {
    assert.equal(stats.length, 5);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 2);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop(), undefined);
  }))

  // It verifies the stast structure in the past 7 days and current
  it('verifies for daily stats structure length and results', () => Order.stats('daily').then(stats => {
    assert.equal(stats.length, 8);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.length, 0);
  }));
  // It verifies the stast structure in custom range
  it('verifies for custom stats structure length and results', () => Order.stats('custom', {
    start: moment(now.toISOString()).subtract(2, 'days').toISOString(),
    end: now.toISOString()
  }).then(stats => {
    assert.equal(stats.length, 3);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.length, 0);
  }));
  // It verifies the where statement works correctly
  it('verifies for custom stats with where statement 1', () => Order.stats('custom', {
    start: moment(now.toISOString()).subtract(2, 'days').toISOString(),
    end: now.toISOString()
  }, { type : 'international' }).then(stats => {
    assert.equal(stats.length, 3);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.length, 0);
  }));

  // It verifies the where statement works correctly
  it('verifies for daily stats with where statement', () => Order.stats('daily', null, { type : 'national' }).then(stats => {
    assert.equal(stats.length, 8);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 1);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.pop().count, 0);
    assert.equal(stats.length, 0);
  }));
});

describe('Loopback Stats Wrapper Mixin (Model Mode)', () => {
  // It verifies the orders are created
  it('verifies if wrapper get wrapped stats', () => Order.wrapper('daily', null, null, null).then(stats => {
    assert.equal(stats.stats.length, 8);
    assert.equal(stats.stats2.length, 8);
  }));
});