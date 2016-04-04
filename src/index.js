import {deprecate} from 'util';
import Stats from './stats';
import StatsWrapper from './stats_wrapper';

export default deprecate(
  app => {
    app.loopback.modelBuilder.mixins.define('Stats', Stats);
    app.loopback.modelBuilder.mixins.define('StatsWrapper', StatsWrapper);
  },
  'DEPRECATED: Use mixinSources, see https://github.com/jonathan-casarrubias/loopback-stats-mixin#mixinsources'
);
