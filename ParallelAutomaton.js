function ParallelAutomaton (descriptor) {
    this.automata = this.descriptor.operands.map(function (descriptor) {
        return descriptor.newAutomaton();
    });
    this.minimum = descriptor.minimum;
    this.maximum = descriptor.maximum;
    this.state = getState(this.automata, this.minimum, this.maximum);
}

ParallelAutomaton.prototype.parse = function (symbol) {
    this.automata.forEach(function (automaton) {
        automaton.parse(symbol);
    });
    this.state = getState(this.automata, this.minimum, this.maximum);
};

function getState (automata, minimum, maximum) {
    var count = {};
    automata.forEach(function (automaton) {
        count[automaton.state] = count[automaton.state] + 1 || 1;
    });
    if (count["accepting"] >= minimum &&
        count["accepting"] <= maximum) {
        return "accepting";
    } else if (count["accepting"] + count["parsing"] >= minimum) {
        return "parsing";
    } else {
        return "stopped";
    }
}

module.exports = ParallelAutomaton;
