var utils = require("./utils");

function SymbolAutomaton (descriptor) {
    this.pattern = descriptor.pattern;
    this.state = "parsing";
}

SymbolAutomaton.prototype.parse = function (symbol) {
    if (this.state === "parsing" && match(this.pattern, symbol)) {
        this.state = "accepting";
    } else {
        this.state = "stopped";
    }
};

function match (pattern, data) {
    var patternType = utils.getType(pattern),
        dataType = utils.getType(data);

    if (patternType === "Object") {
        if (dataType === "Object") {
            // matches when all pattern own properties
            // match with the corresponding data properties
            return utils.everyOwnProperty(pattern, function (value, prop) {
                return match(value, data[prop]);
            });
        } else {
            return false;
        }
    }
    else if (patternType === "Array") {
        if (dataType === "Array" && pattern.length === data.length) {
            // matches when pattern and data have the same length
            // and all pattern elements match the corresponding data elements
            for (var i = 0; i < pattern.length; i++) {
                if (!match(pattern[i], data[i])) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    else if (patternType === "Function") {
        if (dataType === "Function") {
            // calls the pattern function with the data as only parameter
            // and matches when the returned value evaluates to true
            return !!pattern(data);
        } else {
            return false;
        }
    }
    else if (patternType === "RegExp") {
        if (dataType === "String") {
            // matches when the data string matches the pattern
            return !!data.match(pattern);
        } else if (dataType == "RegExp") {
            // matches when the regexps are equal
            return pattern === data;
        } else {
            return false;
        }
    }
    else {
        // matches when the elements are equal
        return pattern === data;
    }
}

module.exports = SymbolAutomaton;
