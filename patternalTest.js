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


    click = Sym({type: "click"}),
    specialClick= Sym({type: "click", special: true}),
    purchase = Sym({type: "purchase"}),
    threeClicksAndOnePurchase = Seq(RANY, click, click, click, purchase),
    containsSpecialClick = Seq(RANY, specialClick, RANY),
    oneAndTheOther = And(threeClicksAndOnePurchase, containsSpecialClick),
    automaton = Not(oneAndTheOther).newAutomaton();

console.log("Initial", automaton.state);
automaton.parse({type: "click", special: true});
console.log("After click 1", automaton.state);
automaton.parse({type: "click"});
console.log("After click 2", automaton.state);
automaton.parse({type: "click"});
console.log("After click 3", automaton.state);
automaton.parse({type: "purchase"});
console.log("After purchase", automaton.state);
automaton.parse({type: "purchase"});
console.log("After purchase", automaton.state);

