var utils = require("./utils");

function SequenceAutomaton (descriptor) {
    this._descriptors = descriptor._operands;
    this._automata = this._descriptors.map(function () {
        return [];
    });
    this._callbacks = descriptor._callbacks.slice();
    this._parsed = [];
    this._launchAutomaton(0);
    this.state = this._getState();
}

SequenceAutomaton.prototype._launchAutomaton = function (level) {
    var automaton = this._descriptors[level].newAutomaton();
    if (automaton.state !== "stopped") {
        this._automata[level].push(automaton);
        if (automaton.state === "accepting" && level + 1 < this._automata.length) {
            this._launchAutomaton(level + 1);
        }
    }
};

SequenceAutomaton.prototype._getState = function () {
    var count = 0;
    this._automata.forEach(function (level) {
        count += level.length;
    });
    if (count === 0) {
        return "stopped";
    }
    var lastLevel = this._automata[this._automata.length - 1];
    for (var i = 0; i < lastLevel.length; i++) {
        if (lastLevel[i].state === "accepting") {
            return "accepting";
        }
    }
    return "parsing";
};

SequenceAutomaton.prototype.parse = function (symbol) {
    // make all automatons parse the symbol
    this._automata.forEach(function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    this._parsed.push(symbol);
    // remove stopped automatons
    for (var level = 0; level < this._automata.length; level++) {
        this._automata[level] = this._automata[level].filter(function (automaton) {
            return automaton.state !== "stopped";
        });
    }
    // when level i accepts, launch automaton for level i+1
    for (var level = 0; level < this._automata.length; level++) {
        var accepting = this._automata[level].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting && level + 1 < this._automata.length) {
            this._launchAutomaton(level + 1);
        }
    }
    this.state = this._getState();
    if (this.state === "accepting") {
        utils.executeFunctions(this._callbacks, [this._parsed]);
    }
};

module.exports = SequenceAutomaton;
