var p = require("./patternal"),

    RANY0 = p.Rep0(p.ANY),
    withMarcel = p.Seq(RANY0, p.Sym(/[Mm]arcel/), RANY0),
    automaton = withMarcel.newAutomaton();

console.log("Initial", automaton.state);
automaton.parse("Olá");
console.log("After Olá", automaton.state);
automaton.parse(",");
console.log("After ,", automaton.state);
automaton.parse("como");
console.log("After como", automaton.state);
automaton.parse("você");
console.log("After você", automaton.state);
automaton.parse("está");
console.log("After você", automaton.state);
automaton.parse(",");
console.log("After ,", automaton.state);
automaton.parse("Marcel");
console.log("After Marcel", automaton.state);
automaton.parse("?");
console.log("After ?", automaton.state);
