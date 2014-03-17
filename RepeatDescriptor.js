var RepeatAutomaton = require("RepeatAutomaton");

function RepeatDescriptor (minimum, maximum, descriptor) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.operand = descriptor;
}

RepeatDescriptor.prototype.newAutomaton = function () {
    return new RepeatAutomaton(this);
};

module.exports = RepeatDescriptor;
