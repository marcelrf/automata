var SymbolDescriptor = require("./SymbolDescriptor"),
    SequenceDescriptor = require("./SequenceDescriptor"),
    ParallelDescriptor = require("./ParallelDescriptor"),
    RepeatDescriptor = require("./RepeatDescriptor"),
    NotDescriptor = require("./NotDescriptor");

function construct(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}

function DescriptorConstructor (Descriptor) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return construct(Descriptor, args);
    };
}

var ANY = new SymbolDescriptor(function () { return true; }),
    RANY0 = new RepeatDescriptor(0, Infinity, ANY),
    RANY1 = new RepeatDescriptor(1, Infinity, ANY);

function AndConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [args.length, args.length, args];
    return construct(ParallelDescriptor, descriptorParams);
}

function OrConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [1, args.length, args];
    return construct(ParallelDescriptor, descriptorParams);
}

function XorConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [1, 1, args];
    return construct(ParallelDescriptor, descriptorParams);
}

function Rep0Constructor (descriptor) {
    var descriptorParams = [0, Infinity, descriptor];
    return construct(RepeatDescriptor, descriptorParams);
}

function Rep1Constructor (descriptor) {
    var descriptorParams = [1, Infinity, descriptor];
    return construct(RepeatDescriptor, descriptorParams);
}

module.exports = {
    Sym: DescriptorConstructor(SymbolDescriptor),
    Seq: DescriptorConstructor(SequenceDescriptor),
    Par: DescriptorConstructor(ParallelDescriptor),
    Rep: DescriptorConstructor(RepeatDescriptor),
    Not: DescriptorConstructor(NotDescriptor),
    And: AndConstructor,
    Or: OrConstructor,
    Xor: XorConstructor,
    Rep0: Rep0Constructor,
    Rep1: Rep1Constructor,
    ANY: ANY
};
