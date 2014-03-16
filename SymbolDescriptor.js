var Descriptor = require("Descriptor"),
	SymbolAutomaton = require("SymbolAutomaton");

function SymbolDescriptor (pattern) {
    Descriptor.apply(this, []);
    this.pattern = pattern;
}

SymbolDescriptor.prototype.newAutomaton = function () {
    return new SymbolAutomaton(this);
};

module.exports = SymbolDescriptor;
