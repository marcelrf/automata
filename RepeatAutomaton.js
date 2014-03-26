var utils = require("./utils");

var infiniteAutomatonError = {
    name: "Infinite Automaton Error",
    message: "RepeatAutomaton does not support annullable operands."
};

function RepeatAutomaton (descriptor) {
    this._descriptor = descriptor._operand;
    this._minimum = descriptor._minimum;
    this._maximum = descriptor._maximum;
    this._automata = {};
    this._callbacks = descriptor._callbacks.slice();
    this._parsed = [];
    this._launchAutomaton(1);
    this.state = this._minimum === 0 ? "accepting" : this._getState();
}

RepeatAutomaton.prototype._launchAutomaton = function (level) {
    var automaton = this._descriptor.newAutomaton();
    if (automaton.state === "accepting") {
        // TODO: this situation could be detected in descriptor time (annullable)
        throw infiniteAutomatonError;
    } else if (automaton.state === "parsing") {
        if (!this._automata[level]) { this._automata[level] = []; }
        this._automata[level].push(automaton);
    }
};

RepeatAutomaton.prototype._getState = function () {
    var count = 0,
        accepting = false,
        that = this;
    utils.forEachOwnProperty(this._automata, function (level, index) {
        count += level.length;
        if (index >= that._minimum && index <= that._maximum) {
            accepting = accepting || level.some(function (automaton) {
                return automaton.state === "accepting";
            });
        }
    });
    if (accepting) { return "accepting"; }
    else if (count > 0) { return "parsing"; }
    else { return "stopped"; }
};

RepeatAutomaton.prototype.parse = function (symbol) {
    var that = this;
    // make all automatons parse the symbol
    utils.forEachOwnProperty(this._automata, function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    this._parsed.push(symbol);
    // remove stopped automatons
    utils.forEachOwnProperty(this._automata, function (level, index) {
        that._automata[index] = level.filter(function (automaton) {
            return automaton.state !== "stopped";
        });
        if (that._automata[index].length === 0) {
            delete that._automata[index];
        }
    });
    // when level i accepts, launch automaton for level i+1
    utils.forEachOwnProperty(this._automata, function (level, index) {
        var accepting = that._automata[index].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting) {
            that._launchAutomaton(index + 1);
        }
    });
    // update state
    this.state = this._getState();
    if (this.state === "accepting") {
        utils.executeFunctions(this._callbacks, [this._parsed]);
    }
};

module.exports = RepeatAutomaton;
