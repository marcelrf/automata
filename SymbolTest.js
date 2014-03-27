var SymbolDescriptor = require("./SymbolDescriptor"),
    assert = require("assert");

function newSymbolAutomaton (pattern) {
    return new SymbolDescriptor(pattern).newAutomaton();
}

module.exports = [

    function testUndefined () {
        var automaton = newSymbolAutomaton(void 0);
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse(void 0);
        assert(automaton.state === "accepting", "not accepting after undefined symbol");
        automaton.parse(void 0);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testUndefinedNegative () {
        var automaton = newSymbolAutomaton(void 0);
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse("something");
        assert(automaton.state === "stopped", "not stopped after non-undefined symbol");
        automaton.parse(void 0);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testNull () {
        var automaton = newSymbolAutomaton(null);
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse(null);
        assert(automaton.state === "accepting", "not accepting after null symbol");
        automaton.parse(null);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testNullNegative () {
        var automaton = newSymbolAutomaton(null);
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse(void 0);
        assert(automaton.state === "stopped", "not stopped after non-null symbol");
        automaton.parse(null);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testFunction () {
        var automaton = newSymbolAutomaton(function (symbol) {
            return symbol === 1;
        });
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse(1);
        assert(automaton.state === "accepting", "not accepting after expected symbol");
        automaton.parse(1);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testFunctionNegative () {
        var automaton = newSymbolAutomaton(function (symbol) {
            return symbol === 1;
        });
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse(2);
        assert(automaton.state === "stopped", "not stopped after unexpected symbol");
        automaton.parse(2);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testObject1 () {
        var automaton = newSymbolAutomaton({property: true});
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse({property: true, other: false});
        assert(automaton.state === "accepting", "not accepting after expected symbol");
        automaton.parse({property: true, other: false});
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

    function testObject2 () {
        var automaton = newSymbolAutomaton({property1: {property2: true}});
        assert(automaton.state === "parsing", "not parsing after init");
        automaton.parse({property1: {property2: true, other2: false}, other1: false});
        assert(automaton.state === "accepting", "not accepting after expected symbol");
        automaton.parse(2);
        assert(automaton.state === "stopped", "not stopped after second symbol");
    },

];
