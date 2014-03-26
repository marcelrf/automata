var ParallelAutomaton = require("./ParallelAutomaton");

function ParallelDescriptor () {
	var args = Array.prototype.slice.call(arguments);
    this._minimum = args.shift();
    this._maximum = args.shift();
    this._operands = args;
    this._callbacks = [];
}

ParallelDescriptor.prototype.newAutomaton = function () {
    return new ParallelAutomaton(this);
};

ParallelDescriptor.prototype.whenever = function (callback) {
    this._callbacks.push(callback);
    return this;
};

module.exports = ParallelDescriptor;
