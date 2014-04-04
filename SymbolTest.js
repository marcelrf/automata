var SymbolDescriptor = require("./SymbolDescriptor"),
    assert = require("assert");

function newSymbolAutomaton (pattern) {
    return new SymbolDescriptor(pattern).newAutomaton();
}

module.exports = [

    function testParsing () {
        var automaton = newSymbolAutomaton();
        assert(automaton.state === "parsing");
    },

    function testUndefined () {
        var automaton = newSymbolAutomaton(void 0);
        automaton.parse(void 0);
        assert(automaton.state === "accepting");
    },

    function testUndefinedNegative () {
        var automaton = newSymbolAutomaton(void 0);
        automaton.parse("something");
        assert(automaton.state === "stopped");
    },

    function testNull () {
        var automaton = newSymbolAutomaton(null);
        automaton.parse(null);
        assert(automaton.state === "accepting");
    },

    function testNullNegative () {
        var automaton = newSymbolAutomaton(null);
        automaton.parse(void 0);
        assert(automaton.state === "stopped");
    },

    function testBoolean () {
        var automaton = newSymbolAutomaton(true);
        automaton.parse(true);
        assert(automaton.state === "accepting");
    },

    function testBooleanNegative () {
        var automaton = newSymbolAutomaton(true);
        automaton.parse(false);
        assert(automaton.state === "stopped");
    },

    function testBooleanNotEquivalent () {
        var automaton = newSymbolAutomaton(true);
        automaton.parse(1);
        assert(automaton.state === "stopped");
    },

    function testNumber () {
        var automaton = newSymbolAutomaton(1);
        automaton.parse(1);
        assert(automaton.state === "accepting");
    },

    function testNumberNegative () {
        var automaton = newSymbolAutomaton(1);
        automaton.parse(-1);
        assert(automaton.state === "stopped");
    },

    function testString () {
        var automaton = newSymbolAutomaton("symbol");
        automaton.parse("symbol");
        assert(automaton.state === "accepting");
    },

    function testStringNegative () {
        var automaton = newSymbolAutomaton("symbol");
        automaton.parse("wrong");
        assert(automaton.state === "stopped");
    },

    function testRegExp () {
        var automaton = newSymbolAutomaton(/a.c/);
        automaton.parse("abc");
        assert(automaton.state === "accepting");
    },

    function testRegExpNegative () {
        var automaton = newSymbolAutomaton(/a.c/);
        automaton.parse("wrong");
        assert(automaton.state === "stopped");
    },

    function testDate () {
        var automaton = newSymbolAutomaton(new Date(2000, 0, 1));
        automaton.parse(new Date(2000, 0, 1));
        assert(automaton.state === "accepting");
    },

    function testDateNegative () {
        var automaton = newSymbolAutomaton(new Date(2000, 0, 1));
        automaton.parse(new Date(2000, 0, 2));
        assert(automaton.state === "stopped");
    },

    function testFunction () {
        var automaton = newSymbolAutomaton(function (symbol) {
            return symbol === 1;
        });
        automaton.parse(1);
        assert(automaton.state === "accepting");
    },

    function testFunctionNegative () {
        var automaton = newSymbolAutomaton(function (symbol) {
            return symbol === 1;
        });
        automaton.parse(2);
        assert(automaton.state === "stopped");
    },

    function testObject () {
        var automaton = newSymbolAutomaton({property: true});
        automaton.parse({property: true});
        assert(automaton.state === "accepting");
    },

    function testObjectNegative () {
        var automaton = newSymbolAutomaton({property: true});
        automaton.parse({property: false});
        assert(automaton.state === "stopped");
    },

    function testObjectUndefined () {
        var automaton = newSymbolAutomaton({property: true});
        automaton.parse({});
        assert(automaton.state === "stopped");
    },

    function testObjectRecursive () {
        var automaton = newSymbolAutomaton({property1: {property2: true}});
        automaton.parse({property1: {property2: true, other2: false}, other1: false});
        assert(automaton.state === "accepting");
    },

    function testArray () {
        var automaton = newSymbolAutomaton([1, 2, 3]);
        automaton.parse([1, 2, 3]);
        assert(automaton.state === "accepting");
    },

    function testArrayNegativeLess () {
        var automaton = newSymbolAutomaton([1, 2, 3]);
        automaton.parse([1, 2]);
        assert(automaton.state === "stopped");
    },

    function testArrayNegativeMore () {
        var automaton = newSymbolAutomaton([1, 2, 3]);
        automaton.parse([1, 2, 3, 4]);
        assert(automaton.state === "stopped");
    },

    function testArrayRecursive () {
        var automaton = newSymbolAutomaton([[1, 2], [3, 4]]);
        automaton.parse([[1, 2], [3, 4]]);
        assert(automaton.state === "accepting");
    },

    function testArrayAndObjectRecursive () {
        var automaton = newSymbolAutomaton([{property: [1, 2, 3]}, [{property: false}, 4], 5]);
        automaton.parse([{property: [1, 2, 3], other: false}, [{property: false, other: true}, 4], 5]);
        assert(automaton.state === "accepting");
    },

    function testStoppedAfterAccept () {
        var automaton = newSymbolAutomaton("symbol");
        automaton.parse("symbol");
        automaton.parse("symbol");
        assert(automaton.state === "stopped");
    },

    function testStoppedAfterStopped () {
        var automaton = newSymbolAutomaton("symbol");
        automaton.parse("wrong");
        automaton.parse("symbol");
        assert(automaton.state === "stopped");
    }

];
