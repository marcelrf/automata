var utils = require("./utils");

function NotAutomaton (descriptor) {
    this._automaton = descriptor._operand.newAutomaton();
    this._callbacks = descriptor._callbacks.slice();
    this._parsed = [];
    this.state = this._getState();
}

NotAutomaton.prototype._getState = function () {
    return this._automaton.state === "accepting" ? "parsing" : "accepting";
};

NotAutomaton.prototype.parse = function (symbol) {
    this._automaton.parse(symbol);
    this._parsed.push(symbol);
    this.state = this._getState();
    if (this.state === "accepting") {
        utils.executeFunctions(this._callbacks, [this._parsed]);
    }
};

module.exports = NotAutomaton;
