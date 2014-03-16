var states = {
        PARSING: "parsing",
        ACCEPTING: "accepting",
        STOPPED: "stopped"
    };

function Automaton (descriptor) {
    this.states = states;
    this.descriptor = descriptor;
};

module.exports = Automaton;
