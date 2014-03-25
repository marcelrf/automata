var SymbolAutomaton = require("./SymbolAutomaton");

function SymbolDescriptor (pattern) {
    this.pattern = pattern;
    this.callbacks = [];
}

SymbolDescriptor.prototype.newAutomaton = function () {
    return new SymbolAutomaton(this);
};

SymbolDescriptor.prototype.whenever = function (callback) {
    this.callbacks.push(callback);
};

module.exports = SymbolDescriptor;
