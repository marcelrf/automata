var ParallelAutomaton = require("ParallelAutomaton");

function ParallelDescriptor () {
	var args = Array.prototype.slice.call(arguments);
    this.minimum = args.shift();
    this.maximum = args.shift();
    this.operands = args;
}

ParallelDescriptor.prototype.newAutomaton = function () {
    return new ParallelAutomaton(this);
};

module.exports = ParallelDescriptor;
