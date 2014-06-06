patternal
=========

Recognize patterns in sequences of JavaScript objects.
Execute your custom code whenever that happens.

---------

This project is still under construction, but the main functionalities are already working.
Some examples follow:

1. Extract the sentences that contain the name Treebeard from a text.

```
var text = "Treebeard is the oldest of three remaining original Ents . He is said to have once roamed all of the forests in Middle-earth , which included the Misty Mountains , Mirkwood , Mordor , and the Blue Mountains . After the loss of the Entwives by the end of the Third Age , he and the remaining Ents dwelt in the Forest of Fangorn . This led the remaining Ents into isolation and all information from the outside world was cut off . The arrival of Merry and Pippin shifted Treebeard's attention to take action against Saruman for hacking down his trees . He led the Ents to war against Saruman and his Orcs . Treebeard later realised that while Saruman had learned much from him , the Wizard had shared no useful information of his own .";

var p = require("./patternal.js"),
	dot = p.Sym("."),
	noDot = p.And(p.ANY, p.Not(dot)),
	repeatNoDot = p.Rep(0, Infinity, noDot),
	treebeardSentence = p.Seq(repeatNoDot, p.Sym("Treebeard"), repeatNoDot, dot);

treebeardSentence.whenever(function (parsed) {
	console.log(parsed.join(" "));
});

var parser = p.Seq(p.Rep(0, Infinity, p.ANY), treebeardSentence).newAutomaton();

text.split(" ").forEach(function (token) {
	parser.parse(token);
});
```
This will output the following:
```
Treebeard is the oldest of three remaining original Ents .
Treebeard later realised that while Saruman had learned much from him , the Wizard had shared no useful information of his own .
```
