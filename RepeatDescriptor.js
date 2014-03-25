var RepeatAutomaton = require("./RepeatAutomaton");

function RepeatDescriptor (minimum, maximum, descriptor) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.operand = descriptor;
    this.callbacks = [];
}

RepeatDescriptor.prototype.newAutomaton = function () {
    return new RepeatAutomaton(this);
};

RepeatDescriptor.prototype.whenever = function (callback) {
    this.callbacks.push(callback);
};

module.exports = RepeatDescriptor;
