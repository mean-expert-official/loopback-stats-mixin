[![NPM](https://nodei.co/npm/loopback-stats-mixin.png?stars&downloads)](https://nodei.co/npm/loopback-stats-mixin/) [![NPM](https://nodei.co/npm-dl/loopback-stats-mixin.png)](https://nodei.co/npm/loopback-stats-mixin/)

Loopback Stats Mixin
=============
This module is designed for the [Strongloop Loopback](https://github.com/strongloop/loopback) framework.  It provides statistical functionallity to any Model, Relation or Nested Dataset.

The **loopback-stats-mixin** module provides the following mixins and functionallity.

- **Stats Mixin**.- Provides statistical functionallity by the creation of micro-services.
- **Stats Wrapper**.- Provides a way to wrap micro-services into bundled services.

Thanks to these 2 mixins we can create a full set of services that can automatically handle statistical information for the Models in which the mixin is implemented.

#### INSTALL

```bash
  npm install loopback-stats-mixin --save
```
#### MIXINSOURCES

With [loopback-boot@v2.8.0](https://github.com/strongloop/loopback-boot/)  [mixinSources](https://github.com/strongloop/loopback-boot/pull/131) have been implemented in a way which allows for loading this mixin without changes to the `server.js` file previously required.

Add the `mixins` property to your `server/model-config.json` like the following:

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "../node_modules/loopback-stats-mixin/dist",
      "../common/mixins"
    ]
  }
}
```
STATS MIXIN
========

This mixin creates a [Remote Method](https://docs.strongloop.com/display/APIC/Remote+methods) for each configuration object provided within the mixin options, being possible to set configuration objects as needed.

#### EXAMPLE

The following is the most basic example of how to create a `stats` micro-service:

```json
"mixins": {
    "Stats": [
        {
            "method": "stats",
            "endpoint": "/stats",
            "description": "A Description for Loopback Explorer",
            "type": "model",
            "count": {
                "on": "createdAt",
                "by": "index"
            }
        }
    ]
}
```

The code defined above would create a `localhost:3000/api/model/stats` endpoint with the ability to fetch `hourly, daily, weekly, monthly, yearly and custom start and end` statistics with information related to the model.

In this example, the information will be processed upon the `createdAt` date property counted by `index` which means everytime the createdAt property matches within a timeframe, it will be counted as 1.

`HINT 1: "count.on" can be any date property within a model, e.g. created, createdAt, updated, deletedAt, etc.`

`HINT 2: "count.by" can be the constant word "index" or any numeric/boolean property within the model, e.g. count, amount, isMember.`

BOOT OPTIONS
=============

The following options are needed in order to create a micro-service to provide statistical information regarding a model, relation or nested dataset.

`HINT: you can create as many micro-services as you need.`

| Options       | Type       | Requried          | Possible Values | Examples
|:-------------:|:-------------:|:-------------:|:---------------:| :------------------------:
| method        | String      | Yes  | Any             |  stat, myStat, modelStat, etc
| endpoint      | String      | Yes  | URL Form        |  /stats, /:id/stats
| description   | String      | No  | Any             | Loopback Explorer Description
| type          | String      | Yes  | [model \| relation \| nested] |  model, relation, nested
| relation      | String      | No | Model relation name | accounts iff Organization.accounts
| nested      | String      | No | Model nested property | locations iff Organization.locations
| count         | Object      | Yes | [on \| by \| as \| avg] | SEE COUNT OPTIONS

Different configurations can be specified depending on the needs, since you can create statistical information over Models, Relations and Nested Datasets, different configurations will be needed.

Please refer to configuration examples.

COUNT OPTIONS
=============

The counting options are the statistical pieces that makes possible to count results over a timeframe according to indexal counts, sums or averages.

There are different ways to create statistical information and depending on the needs different configurations may be defined.

| Options       | Type       | Requried          | Possible Values | Examples
|:-------------:|:-------------:|:-------------:|:---------------:| :------------------------:
| on        | String      | Yes  | Model date property |  created, createdAt, updatedAt, etc
| by      | String      | Yes  | [index \| number property \| boolean property]     |  index, amount, isClosed
| as   | Number      | No  | Any numeric value (default: 1)             | 1, 5, 10
| avg         | Boolean      | No  | [true \| false] |  true, false

STATS WRAPPER MIXIN
========

This mixin creates a [Remote Method](https://docs.strongloop.com/display/APIC/Remote+methods) that wraps multiple micro-service into 1 service bundle. It provides a way to group micro-services but also bundled services by creating a statistics tree allowing to fetch a full set of data for multiple stats in just one call.

#### EXAMPLE

The following is an example of how to create a `stats` bundled-service:

```json
"mixins": {
    "StatsWrapper": [
        {
            "type": "model",
            "method": "bundledStats",
            "endpoint": "/bundled-stats",
            "description": "Loopback Explorer Description",
            "wraps": [
                "microServiceStats1",
                "microServiceStats2",
                "microServiceStats3",
                "microServiceStats4"
            ]
        }
    ]
}
```

The code defined above would create a `localhost:3000/api/model/bundled-stats` endpoint that will result in an object containing the result from all of the micro-services wrapped.

`HIN: Wrapping can be done in multiple levels, so you can wrap a set of micro-services, but also a set of bundled-services by creating a tree of services.`

BOOT OPTIONS
=============

The following options are needed in order to create a bundled-service to provide statistical information regarding multiple micro-services.

`HINT: you can create as many bundled-services as you need.`

| Options       | Type       | Requried          | Possible Values | Examples
|:-------------:|:-------------:|:-------------:|:---------------:| :------------------------:
| method        | String      | Yes  | Any             |  stat, myStat, modelStat, etc
| endpoint      | String      | Yes  | URL Form        |  /stats, /:id/stats
| description   | String      | No  | Any             | Loopback Explorer Description
| type          | String      | Yes  | [model \| relation \| nested] |  model, relation, nested
| relation      | String      | No | Model relation name | accounts iff Organization.accounts
| nested      | String      | No | Model nested property | locations iff Organization.locations
| wraps         | [String]    | Yes | Micro services name list | ['microService1', 'microService2', '..']


LICENSE
=============
[MTI](LICENSE.md)