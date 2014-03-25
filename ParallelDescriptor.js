var ParallelAutomaton = require("./ParallelAutomaton");

function ParallelDescriptor () {
	var args = Array.prototype.slice.call(arguments);
    this.minimum = args.shift();
    this.maximum = args.shift();
    this.operands = args;
    this.callbacks = [];
}

ParallelDescriptor.prototype.newAutomaton = function () {
    return new ParallelAutomaton(this);
};

ParallelDescriptor.prototype.whenever = function (callback) {
    this.callback.push(callback);
};

module.exports = ParallelDescriptor;
