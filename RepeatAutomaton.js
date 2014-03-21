var utils = require("utils");

var infiniteAutomatonError = {
    name: "Infinite Automaton Error",
    message: "RepeatAutomaton does not support annullable operands."
};

function RepeatAutomaton (descriptor) {
    this.descriptor = descriptor.operand;
    this.minimum = descriptor.minimum;
    this.maximum = descriptor.maximum;
    this.automata = {};
    launchAutomaton.call(this, 1);
    this.state = getState.call(this);
}

RepeatAutomaton.prototype.parse = function (symbol) {
    // make all automatons parse the symbol
    utils.forEachOwnProperty(this.automata, function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    // remove stopped automatons
    utils.forEachOwnProperty(this.automata, function (level, index) {
        this.automata[index] = level.filter(function (automaton) {
            return automaton.state !== "stopped";
        });
        if (this.automata[index].length === 0) {
            delete this.automata[index];
        }
    });
    // when level i accepts, launch automaton for level i+1
    utils.forEachOwnProperty(this.automata, function (level, index) {
        var accepting = this.automata[index].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting) {
            launchAutomaton.call(this, index + 1);
        }
    });
    this.state = getState.call(this);
};

function launchAutomaton (level) {
    var automaton = this.descriptor.newAutomaton();
    if (automaton.state === "accepting") {
        // TODO: this situation could be detected in descriptor time (annullable)
        throw infiniteAutomatonError;
    } else if (automaton.state === "parsing") {
        if (!this.automata[level]) { this.automata[level] = []; }
        this.automata[level].push(automaton);
    }
}

function getState () {
    var count = 0,
        accepting = false;
    utils.forEachOwnProperty(this.automata, function (level, index) {
        count += level.length;
        if (index >= this.minimum && index <= this.maximum) {
            accepting = accepting || level.some(function (automaton) {
                return automaton.state === "accepting";
            });
        }
    });
    if (accepting) { return "accepting"; }
    else if (count > 0) { return "parsing"; }
    else { return "stopped"; }
}

module.exports = RepeatAutomaton;
