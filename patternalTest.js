var p = require("./patternal"),

    Sym = p.Symbol,
    Seq = p.Sequence,
    Par = p.Parallel,
    Rep = p.Repeat,
    Not = p.Not,
    And = p.And,
    Or = p.Or,
    ANY = p.ANY,
    RANY = Rep(0, Infinity, ANY),

    marcelOrPablo = Or(Sym(/[Mm]arcel/), Sym(/[Pp]ablo/));
    withName = Not(Seq(RANY, marcelOrPablo)),
    automaton = withName.newAutomaton();

console.log("Initial", automaton.state);
automaton.parse("Marcel");
console.log("After Marcel", automaton.state);
automaton.parse(",");
console.log("After ,", automaton.state);
automaton.parse("como");
console.log("After como", automaton.state);
automaton.parse("você");
console.log("After você", automaton.state);
automaton.parse("está");
console.log("After está", automaton.state);
automaton.parse(",");
console.log("After ,", automaton.state);
automaton.parse("Pablo");
console.log("After Pablo", automaton.state);
automaton.parse("?");
console.log("After ?", automaton.state);
