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

function AndConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [args.length, args.length].concat(args);
    return construct(ParallelDescriptor, descriptorParams);
}

function OrConstructor () {
    var args = Array.prototype.slice.call(arguments),
        descriptorParams = [1, args.length].concat(args);
    return construct(ParallelDescriptor, descriptorParams);
}

var ANY = new SymbolDescriptor(function () { return true; });

module.exports = {
    Sym: DescriptorConstructor(SymbolDescriptor),
    Seq: DescriptorConstructor(SequenceDescriptor),
    Par: DescriptorConstructor(ParallelDescriptor),
    Rep: DescriptorConstructor(RepeatDescriptor),
    Not: DescriptorConstructor(NotDescriptor),
    And: AndConstructor,
    Or: OrConstructor,
    ANY: ANY
};
