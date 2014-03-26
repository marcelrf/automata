var NotAutomaton = require("./NotAutomaton");

function NotDescriptor (descriptor) {
    this._operand = descriptor;
    this._callbacks = [];
}

NotDescriptor.prototype.newAutomaton = function () {
    return new NotAutomaton(this);
};

NotDescriptor.prototype.whenever = function (callback) {
    this._callbacks.push(callback);
    return this;
};

module.exports = NotDescriptor;
