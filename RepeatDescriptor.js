var RepeatAutomaton = require("./RepeatAutomaton");

function RepeatDescriptor (minimum, maximum, descriptor) {
    this._minimum = minimum;
    this._maximum = maximum;
    this._operand = descriptor;
    this._callbacks = [];
}

RepeatDescriptor.prototype.newAutomaton = function () {
    return new RepeatAutomaton(this);
};

RepeatDescriptor.prototype.whenever = function (callback) {
    this._callbacks.push(callback);
    return this;
};

module.exports = RepeatDescriptor;
