var utils = require("./utils");

function ParallelAutomaton (descriptor) {
    this._automata = descriptor._operands.map(function (operand) {
        return operand.newAutomaton();
    });
    this._minimum = descriptor._minimum;
    this._maximum = descriptor._maximum;
    this._callbacks = descriptor._callbacks.slice();
    this._parsed = [];
    this.state = this._getState();
}

ParallelAutomaton.prototype._getState = function () {
    var count = {
        "accepting": 0,
        "parsing": 0,
        "stopped": 0
    };
    this._automata.forEach(function (automaton) {
        count[automaton.state] = count[automaton.state] + 1 || 1;
    });
    if (count["accepting"] >= this._minimum &&
        count["accepting"] <= this._maximum) {
        return "accepting";
    } else if (count["accepting"] + count["parsing"] >= this._minimum) {
        return "parsing";
    } else {
        return "stopped";
    }
};

ParallelAutomaton.prototype.parse = function (symbol) {
    this._automata.forEach(function (automaton) {
        automaton.parse(symbol);
    });
    this._parsed.push(symbol);
    this.state = this._getState();
    if (this.state === "accepting") {
        utils.executeFunctions(this._callbacks, [this._parsed]);
    }
};

module.exports = ParallelAutomaton;
