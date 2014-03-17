function NotAutomaton (descriptor) {
    this.automaton = this.descriptor.operand.newAutomaton();
    this.state = getState(this.automaton.state);
}

NotAutomaton.prototype.parse = function (symbol) {
    this.automaton.parse(symbol);
    this.state = getState(this.automaton.state);
};

function getState (state) {
    if (state === "accepting") { return "parsing"; }
    else { return "accepting"; }
}

module.exports = NotAutomaton;
