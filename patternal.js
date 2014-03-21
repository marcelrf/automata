var SymbolDescriptor = require("SymbolDescriptor"),
    SequenceDescriptor = require("SequenceDescriptor"),
    ParallelDescriptor = require("ParallelDescriptor"),
    RepeatDescriptor = require("RepeatDescriptor"),
    NotDescriptor = require("NotDescriptor");

function descriptorConstructor (Descriptor) {
    return function () {
        return new Descriptor(arguments);
    };
}

function construct(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}

function andConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [args.length, args.length, args];
    return construct(ParallelDescriptor, descriptorParams);
}

function orConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [1, args.length, args];
    return construct(ParallelDescriptor, descriptorParams);
}

function xorConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [1, 1, args];
    return construct(ParallelDescriptor, descriptorParams);
}

function rep0Constructor (descriptor) {
    var descriptorParams = [0, Infinity, descriptor];
    return construct(RepeatDescriptor, descriptorParams);
}

function rep1Constructor (descriptor) {
    var descriptorParams = [1, Infinity, descriptor];
    return construct(RepeatDescriptor, descriptorParams);
}

var any = new SymbolDescriptor(
        function () {
            return true;
        }
    ),
    rany0 = new RepeatDescriptor(0, Infinity, any),
    rany1 = new RepeatDescriptor(1, Infinity, any);

module.exports = {
    SYM: descriptorConstructor(SymbolDescriptor),
    SEQ: descriptorConstructor(SequenceDescriptor),
    PAR: descriptorConstructor(ParallelDescriptor),
    REP: descriptorConstructor(RepeatDescriptor),
    NOT: descriptorConstructor(NotDescriptor),
    AND: andConstructor,
    XOR: xorConstructor,
    OR: orConstructor,
    REP0: rep0Constructor,
    REP1: rep1Constructor,
    RANY0: rany0,
    RANY1: rany1,
    ANY: any
};
