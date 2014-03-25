var utils = require("./utils");

function NotAutomaton (descriptor) {
    this.automaton = descriptor.operand.newAutomaton();
    this.state = getState.call(this);
    this.callbacks = descriptor.callbacks.slice();
    this.parsed = [];
}

NotAutomaton.prototype.parse = function (symbol) {
    this.automaton.parse(symbol);
    this.parsed.push(symbol);
    this.state = getState.call(this);
    if (this.state === "accepting") {
        utils.executeFunctions(this.callbacks, [this.parsed]);
    }
};

function getState () {
    if (this.automaton.state === "accepting") {
    	return "parsing";
    } else {
    	return "accepting";
    }
}

module.exports = NotAutomaton;
