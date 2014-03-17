var SymbolAutomaton = require("SymbolAutomaton");

function SymbolDescriptor (pattern) {
    this.pattern = pattern;
}

SymbolDescriptor.prototype.newAutomaton = function () {
    return new SymbolAutomaton(this);
};

module.exports = SymbolDescriptor;
