var SequenceAutomaton = require("SequenceAutomaton");

function SequenceDescriptor () {
    this.operands = Array.prototype.slice.call(arguments);
}

SequenceDescriptor.prototype.newAutomaton = function () {
    return new SequenceAutomaton(this);
};

module.exports = SequenceDescriptor;
