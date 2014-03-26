var SequenceAutomaton = require("./SequenceAutomaton");

function SequenceDescriptor () {
    this._operands = Array.prototype.slice.call(arguments);
    this._callbacks = [];
}

SequenceDescriptor.prototype.newAutomaton = function () {
    return new SequenceAutomaton(this);
};

SequenceDescriptor.prototype.whenever = function (callback) {
    this._callbacks.push(callback);
};

module.exports = SequenceDescriptor;
