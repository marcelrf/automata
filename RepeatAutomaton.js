var infiniteAutomatonError = {
    name: "Infinite Automaton Error",
    message: "RepeatAutomaton does not support operands with accepting initial states."
}

function RepeatAutomaton (descriptor) {
    this.descriptor = descriptor.operand;
    this.minimum = descriptor.minimum;
    this.maximum = descriptor.maximum;
    this.automata = {};
    launchAutomaton(this.automata, this.descriptor, 1);
    this.state = getState(this.automata, this.minimum, this.maximum);
}

RepeatAutomaton.prototype.parse = function (symbol) {
    // make all automatons parse the symbol
    forEachOwnProperty(this.automata, function (level) {
        level.forEach(function (automaton) {
            automaton.parse(symbol);
        });
    });
    // remove stopped automatons
    forEachOwnProperty(this.automata, function (level, index) {
        this.automata[index] = level.filter(function (automaton) {
            return automaton.state !== "stopped";
        });
        if (this.automata[index].length === 0) {
            delete this.automata[index];
        }
    });
    // when level i accepts, launch automaton for level i+1
    forEachOwnProperty(this.automata, function (level, index) {
        var accepting = this.automata[index].some(function (automaton) {
            return automaton.state === "accepting";
        });
        if (accepting) {
            launchAutomaton(this.automata, this.descriptors, index + 1);
        }
    });
    this.state = getState(this.automata, this.minimum, this.maximum);
};

function launchAutomaton (automata, descriptor, level) {
    var automaton = descriptor.newAutomaton();
    if (automaton.state !== "stopped") {
        if (!automata[level]) { automata[level] = []; }
        automata[level].push(automaton);
        if (automaton.state === "accepting") {
            throw infiniteAutomatonError;
        }
    }
}

function getState (automata, minimum, maximum) {
    var count = 0,
        accepting = false;
    forEachOwnProperty(automata, function (level, index) {
        count += level.length;
        if (index >= minimum && index <= maximum) {
            accepting = accepting || level.some(function (automaton) {
                return automaton.state === "accepting";
            });
        }
    });
    if (accepting) { return "accepting"; }
    else if (count > 0) { return "parsing"; }
    else { return "stopped"; }
}

function forEachOwnProperty (obj, fn) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            fn(obj[prop], prop);
        }
    }
}

module.exports = RepeatAutomaton;
