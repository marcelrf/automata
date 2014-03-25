var SequenceAutomaton = require("./SequenceAutomaton");

function SequenceDescriptor () {
    this.operands = Array.prototype.slice.call(arguments);
    this.callbacks = [];
}

SequenceDescriptor.prototype.newAutomaton = function () {
    return new SequenceAutomaton(this);
};

SequenceDescriptor.prototype.whenever = function (callback) {
    this.callbacks.push(callback);
};

module.exports = SequenceDescriptor;
