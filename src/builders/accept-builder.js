/**
 * Builds Parameters object for dynamic remote method
 */
export default class AcceptBuilder {
    /**
     * Setters
     */
    constructor(ctx) { this.ctx = ctx; }
    /**
     * Parse params according ctx type
     */
    build() {
        let accepts = [];
        if (this.ctx.type === "relation" || this.ctx.type === "nested")
            accepts.push({ arg: 'id', type: 'string', required: true, description: this.ctx.Model.definition.name + ' ID' });
        if (this.ctx.type === "relation" && !this.ctx.relation)
            accepts.push({ arg: 'relation', type: 'string', required: true, description: 'Relationship name' });
        if (this.ctx.type === "nested")
            accepts.push({ arg: 'nested', type: 'string', required: true, description: 'Nested array property name' });
        accepts.push({ arg: 'range', type: 'string', required: true, description: 'hourly, daily, weekly, monthly, yearly, custom' });
        accepts.push({ arg: 'custom', type: 'object', required: false, description: '{"start": date, "end": date }' });
        accepts.push({ arg: 'where', type: 'object', description: 'where filter ' + (this.ctx.relation || this.ctx.nested || '') });
        accepts.push({ arg: 'groupBy', type: 'string', description: 'group by filter ' });
        return accepts;
    }
}