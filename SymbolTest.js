var SymbolDescriptor = require("./SymbolDescriptor"),
    assert = require("assert");

function newSymbolAutomaton (pattern) {
    return new SymbolDescriptor(pattern).newAutomaton();
}

module.exports = [

    function testParsing () {
        var automaton = newSymbolAutomaton();
        assert(automaton.state === "parsing", "not parsing after init");
    },

    function testUndefined () {
        var automaton = newSymbolAutomaton(void 0);
        automaton.parse(void 0);
        assert(automaton.state === "accepting", "not accepting after undefined symbol");
    },

    function testUndefinedNegative () {
        var automaton = newSymbolAutomaton(void 0);
        automaton.parse("something");
        assert(automaton.state === "stopped", "not stopped after non-undefined symbol");
    },

    function testNull () {
        var automaton = newSymbolAutomaton(null);
        automaton.parse(null);
        assert(automaton.state === "accepting", "not accepting after null symbol");
    },

    function testNullNegative () {
        var automaton = newSymbolAutomaton(null);
        automaton.parse(void 0);
        assert(automaton.state === "stopped", "not stopped after non-null symbol");
    },

    function testFunction () {
        var automaton = newSymbolAutomaton(function (symbol) {
            return symbol === 1;
        });
        automaton.parse(1);
        assert(automaton.state === "accepting", "not accepting after expected symbol");
    },

    function testFunctionNegative () {
        var automaton = newSymbolAutomaton(function (symbol) {
            return symbol === 1;
        });
        automaton.parse(2);
        assert(automaton.state === "stopped", "not stopped after unexpected symbol");
    },

    function testObject1 () {
        var automaton = newSymbolAutomaton({property: true});
        automaton.parse({property: true, other: false});
        assert(automaton.state === "accepting", "not accepting after expected symbol");
    },

    function testObject2 () {
        var automaton = newSymbolAutomaton({property1: {property2: true}});
        automaton.parse({property1: {property2: true, other2: false}, other1: false});
        assert(automaton.state === "accepting", "not accepting after expected symbol");
    },

    function testStoppedAfterAccept () {
        var automaton = newSymbolAutomaton("symbol");
        automaton.parse("symbol");
        automaton.parse("symbol");
        assert(automaton.state === "stopped", "not stopped after accepting and receiving another symbol");
    },

    function testStoppedAfterStopped () {
        var automaton = newSymbolAutomaton("symbol");
        automaton.parse("wrong");
        automaton.parse("symbol");
        assert(automaton.state === "stopped", "not stopped after stopped and receiving another symbol");
    }

];
