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
    var patternType = getType(pattern),
        dataType = getType(data);

    if (patternType === "Object") {
        if (dataType === "Object") {
            return everyOwnProperty(pattern, function (value, prop) {
                return match(value, data[prop]);
            });
        } else {
            return false;
        }
    }
    else if (patternType === "Array") {
        if (dataType === "Array" && pattern.length === data.length) {
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
            return "" + pattern === "" + data;
        } else {
            return false;
        }
    }
    else if (patternType === "RegExp") {
        if (dataType === "String") {
            return !!data.match(pattern);
        } else {
            return false;
        }
    }
    else {
        return pattern === data;
    }
}

function getType (value) {
    var valueType = Object.prototype.toString.call(value);
    return valueType.split(" ")[1].slice(0, -1);
}

function everyOwnProperty (obj, fn) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (!fn(obj[prop], prop)) {
                return false;
            }
        }
    }
    return true;
}

module.exports = SymbolAutomaton;
