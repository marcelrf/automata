function ParallelAutomaton (descriptor) {
    this.automata = this.descriptor.operands.map(function (descriptor) {
        return descriptor.newAutomaton();
    });
    this.minimum = descriptor.minimum;
    this.maximum = descriptor.maximum;
    this.state = getState.call(this);
}

ParallelAutomaton.prototype.parse = function (symbol) {
    this.automata.forEach(function (automaton) {
        automaton.parse(symbol);
    });
    this.state = getState.call(this);
};

function getState () {
    var count = {};
    this.automata.forEach(function (automaton) {
        count[automaton.state] = count[automaton.state] + 1 || 1;
    });
    if (count["accepting"] >= this.minimum &&
        count["accepting"] <= this.maximum) {
        return "accepting";
    } else if (count["accepting"] + count["parsing"] >= this.minimum) {
        return "parsing";
    } else {
        return "stopped";
    }
}

module.exports = ParallelAutomaton;
