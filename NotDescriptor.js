var NotAutomaton = require("./NotAutomaton");

function NotDescriptor (descriptor) {
    this.operand = descriptor;
    this.callbacks = [];
}

NotDescriptor.prototype.newAutomaton = function () {
    return new NotAutomaton(this);
};

NotDescriptor.prototype.whenever = function (callback) {
    this.callbacks.push(callback);
};

module.exports = NotDescriptor;
