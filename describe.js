var SymbolDescriptor = require("SymbolDescriptor"),
    SequenceDescriptor = require("SequenceDescriptor"),
    ParallelDescriptor = require("ParallelDescriptor"),
    RepeatDescriptor = require("RepeatDescriptor"),
    NotDescriptor = require("NotDescriptor");
    
function describe () {
    // any object fields?
}

describe.prototype.SYM = createDescriptor(SymbolDescriptor);
describe.prototype.SEQ = createDescriptor(SequenceDescriptor);
describe.prototype.PAR = createDescriptor(ParallelDescriptor);
describe.prototype.REP = createDescriptor(RepeatDescriptor);
describe.prototype.NOT = createDescriptor(NotDescriptor);

// here come the composed definitions
describe.prototype.AND = function () {
    var args = Array.prototype.slice.call(arguments);
    // TODO: explode args
    return new ParallelDescriptor(args.length, args.length, args);
};

function createDescriptor (Descriptor) {
    return function () {
        return new Descriptor(arguments);
    };
}
