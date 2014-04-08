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

    function testParsing () {
        var operand1 = newFakeDescriptor(["parsing"]),
            operand2 = newFakeDescriptor(["parsing"]),
            descriptor = new SequenceDescriptor(operand1, operand2),
            automaton = descriptor.newAutomaton();
        assert(automaton.state === "parsing");
    },

    function testStoppedAfterAccept () {
        var operand = newFakeDescriptor(["parsing", "accepting", "stopped"]),
            descriptor = new SequenceDescriptor(operand, operand),
            automaton = descriptor.newAutomaton();
        automaton.parse();
        automaton.parse();
        automaton.parse();
        assert(automaton.state === "stopped");
    },

    function testStoppedAfterStopped () {
        var operand = newFakeDescriptor(["parsing", "stopped"]),
            descriptor = new SequenceDescriptor(operand, operand),
            automaton = descriptor.newAutomaton();
        automaton.parse();
        automaton.parse();
        assert(automaton.state === "stopped");
    }

];
