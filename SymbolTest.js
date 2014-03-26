var SymbolDescriptor = require("./SymbolDescriptor");

function newSymbolAutomaton (pattern) {
    return SymbolDescriptor(pattern).newAutomaton();
}

function errorTemplate (method) {
    return function (message) {
        return __filename + "[" + method + "]: " + message;
    };
}

exports.testEmpty = function () {
    var automaton = newSymbolAutomaton(),
        error = errorTemplate("testEmpty");
    assert(automaton.state !== "parsing", error("not parsing after init"));
    
};
