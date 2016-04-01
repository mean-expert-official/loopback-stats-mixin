'use strict';
/**
 * Builds the primary key name depending on model configurations
 */
module.exports = class PrimaryKeyBuilder {
    constructor(Model) { this.Model = Model; }
    build() {
        let pk = 'id';
        if (!this.Model.settings.idInjection)
        for (let key in this.Model.rawProperties)
        if (this.Model.rawProperties[key].id) pk = key;
        return pk;
    }
}