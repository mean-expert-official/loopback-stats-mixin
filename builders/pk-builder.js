'use strict';
/**
 * Builds the primary key name depending on model configurations
 */
module.exports = class PrimaryKeyBuilder {
    constructor(Model) { this.Model = Model; }
    build() {
        return  this.Model.getIdName();
    }
}
