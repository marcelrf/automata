function forEachOwnProperty (obj, fn) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            fn(obj[prop], prop);
        }
    }
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

function executeFunctions (fnArray, params) {
    fnArray.forEach(function (fn) {
        fn.apply(null, params);
    });
}

function getType (value) {
    var valueType = Object.prototype.toString.call(value);
    return valueType.split(" ")[1].slice(0, -1);
}

module.exports = {
	forEachOwnProperty: forEachOwnProperty,
	everyOwnProperty: everyOwnProperty,
    getType: getType
};
