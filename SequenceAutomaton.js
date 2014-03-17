function SequenceAutomaton (descriptor) {
    this.descriptors = descriptor.operands;
    this.automata = this.descriptors.map(function () {
        return [];
    });
    launchAutomaton(this.automata, this.descriptors, 0);
    this.state = getState(this.automata);
}

SequenceAutomaton.prototype.parse = function (symbol) {
    // make all automatons parse the symbol
    this.automata.forEach(function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    // remove stopped automatons
    for (var level = 0; level < this.automata.length; level++) {
        this.automata[level] = this.automata[level].filter(function (automaton) {
            return automaton.state !== "stopped";
        });
    }
    // when level i accepts, launch automaton for level i+1
    for (var level = 0; level < this.automata.length; level++) {
        var accepting = this.automata[level].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting && level + 1 < this.automata.length) {
            launchAutomaton(this.automata, this.descriptors, level + 1);
        }
    }
    this.state = getState(this.automata);
};

function launchAutomaton (automata, descriptors, level) {
    var automaton = descriptors[level].newAutomaton();
    if (automaton.state !== "stopped") {
        automata[level].push(automaton);
        if (automaton.state === "accepting" && level + 1 < automata.length) {
            launchAutomaton(automata, descriptors, level + 1);
        }
    }
}

function getState (automata) {
    var count = 0;
    automata.forEach(function (level) {
        count += level.length;
    });
    if (count === 0) {
        return "stopped";
    }
    var lastLevel = automata[automata.length - 1];
    for (var i = 0; i < lastLevel.length; i++) {
        if (lastLevel[i].state === "accepting") {
            return "accepting";
        }
    }
    return "parsing";
}

module.exports = SequenceAutomaton;
