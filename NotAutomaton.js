function NotAutomaton (descriptor) {
    this.automaton = descriptor.operand.newAutomaton();
    this.state = getState.call(this);
}

NotAutomaton.prototype.parse = function (symbol) {
    this.automaton.parse(symbol);
    this.state = getState.call(this);
};

function getState () {
    if (this.automaton.state === "accepting") {
    	return "parsing";
    } else {
    	return "accepting";
    }
}

module.exports = NotAutomaton;
