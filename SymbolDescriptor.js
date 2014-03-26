var SymbolAutomaton = require("./SymbolAutomaton");

function SymbolDescriptor (pattern) {
    this._pattern = pattern;
    this._callbacks = [];
}

SymbolDescriptor.prototype.newAutomaton = function () {
    return new SymbolAutomaton(this);
};

SymbolDescriptor.prototype.whenever = function (callback) {
    this._callbacks.push(callback);
};

module.exports = SymbolDescriptor;
