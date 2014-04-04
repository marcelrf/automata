var utils = require("./utils");

function SymbolAutomaton (descriptor) {
    this._pattern = descriptor._pattern;
    this._callbacks = descriptor._callbacks.slice();
    this._parsed = [];
    this.state = "parsing";
}

SymbolAutomaton.prototype.parse = function (symbol) {
    this._parsed.push(symbol);
    if (this.state === "parsing" && match(this._pattern, symbol)) {
        this.state = "accepting";
    } else {
        this.state = "stopped";
    }
    if (this.state === "accepting") {
        utils.executeFunctions(this._callbacks, [this._parsed]);
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
        // calls the pattern function with the data as only parameter
        // and matches when the returned value evaluates to true
        return !!pattern(data);
    }
    else if (patternType === "Date") {
        if (dataType === "Date") {
            // matches when both timestamps are equal
            return pattern.getTime() === data.getTime();
        } else {
            return false;
        }
    }
    else if (patternType === "RegExp") {
        if (dataType === "String") {
            // matches when the data string matches the pattern
            return !!data.match(pattern);
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
