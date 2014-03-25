var utils = require("./utils");

function SequenceAutomaton (descriptor) {
    this.descriptors = descriptor.operands;
    this.automata = this.descriptors.map(function () {
        return [];
    });
    launchAutomaton.call(this, 0);
    this.state = getState.call(this);
    this.callbacks = descriptor.callbacks.slice();
    this.parsed = [];
}

SequenceAutomaton.prototype.parse = function (symbol) {
    // make all automatons parse the symbol
    this.automata.forEach(function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    this.parsed.push(symbol);
    // remove stopped automatons
    for (var level = 0; level < this.automata.length; level++) {
        this.automata[level] = this.automata[level].filter(function (automaton) {
            return automaton.state !== "stopped";
        });
    }
    // when level i accepts, launch automaton for level i+1
    for (var level = 0; level < this.automata.length; level++) {
        var accepting = this.automata[level].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting && level + 1 < this.automata.length) {
            launchAutomaton.call(this, level + 1);
        }
    }
    this.state = getState.call(this);
    if (this.state === "accepting") {
        utils.executeFunctions(this.callbacks, [this.parsed]);
    }
};

function launchAutomaton (level) {
    var automaton = this.descriptors[level].newAutomaton();
    if (automaton.state !== "stopped") {
        this.automata[level].push(automaton);
        if (automaton.state === "accepting" && level + 1 < this.automata.length) {
            launchAutomaton.call(this, level + 1);
        }
    }
}

function getState () {
    var count = 0;
    this.automata.forEach(function (level) {
        count += level.length;
    });
    if (count === 0) {
        return "stopped";
    }
    var lastLevel = this.automata[this.automata.length - 1];
    for (var i = 0; i < lastLevel.length; i++) {
        if (lastLevel[i].state === "accepting") {
            return "accepting";
        }
    }
    return "parsing";
}

module.exports = SequenceAutomaton;
