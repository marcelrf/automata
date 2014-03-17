var NotAutomaton = require("NotAutomaton");

function NotDescriptor (descriptor) {
    this.operand = descriptor;
}

NotDescriptor.prototype.newAutomaton = function () {
    return new NotAutomaton(this);
};

module.exports = NotDescriptor;
