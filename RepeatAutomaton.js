var utils = require("./utils");

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
    var that = this;
    // make all automatons parse the symbol
    utils.forEachOwnProperty(this.automata, function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    // remove stopped automatons
    utils.forEachOwnProperty(this.automata, function (level, index) {
        that.automata[index] = level.filter(function (automaton) {
            return automaton.state !== "stopped";
        });
        if (that.automata[index].length === 0) {
            delete that.automata[index];
        }
    });
    // when level i accepts, launch automaton for level i+1
    utils.forEachOwnProperty(this.automata, function (level, index) {
        var accepting = that.automata[index].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting) {
            launchAutomaton.call(that, index + 1);
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
        accepting = false,
        that = this;
    utils.forEachOwnProperty(this.automata, function (level, index) {
        count += level.length;
        if (index >= that.minimum && index <= that.maximum) {
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
