var SequenceDescriptor = require("./SequenceDescriptor"),
    assert = require("assert");

function newFakeDescriptor (states) {
    return {
        newAutomaton: function () {
            var statesCopy = states.slice(),
                automaton = {
                    parse: function () {
                        if (states.length > 0) {
                            automaton.state = statesCopy.shift();
                        }
                    },
                    state: statesCopy.shift()
                };
            return automaton;
        }
    };
}

module.exports = [

    function testSimpleOperands () {
        var operand = newFakeDescriptor(["parsing", "accepting", "stopped"]),
            automaton = new SequenceDescriptor(operand, operand).newAutomaton();
        assert(automaton.state === "parsing");
        automaton.parse();
        assert(automaton.state === "parsing");
        automaton.parse();
        assert(automaton.state === "accepting");
        automaton.parse();
        assert(automaton.state === "stopped");
    },

    function testAnnulableOperands () {
        var operand = newFakeDescriptor(["accepting", "stopped"]),
            automaton = new SequenceDescriptor(operand, operand).newAutomaton();
        assert(automaton.state === "accepting");
        automaton.parse();
        assert(automaton.state === "stopped");
    },

    function testMultiAcceptOperands () {
        var operand = newFakeDescriptor(["parsing", "accepting", "parsing", "accepting", "stopped"]),
            automaton = new SequenceDescriptor(operand, operand).newAutomaton();
        assert(automaton.state === "parsing");
        automaton.parse();
        assert(automaton.state === "parsing");
        automaton.parse();
        assert(automaton.state === "accepting");
        automaton.parse();
        assert(automaton.state === "parsing");
        automaton.parse();
        assert(automaton.state === "accepting");
        automaton.parse();
        assert(automaton.state === "parsing");
        automaton.parse();
        assert(automaton.state === "accepting");
        automaton.parse();
        assert(automaton.state === "stopped");
    }

];
