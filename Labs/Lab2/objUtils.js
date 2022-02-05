function makeArrays(objects) {
    if (objects === undefined) throw "Array does not exist";
    if (!Array.isArray(objects)) throw "Given Object is not an Array";
    if (objects.length === 0) throw "Array is empty!";
    if (objects.length < 2) throw "Array must have at least two elements";
    let newarr = [];
    for (let i = 0; i < objects.length; i++) {
        if (typeof objects[i] !== "object")
            throw "Array must be filled with objects";
        if (Object.keys(objects[i]).length === 0) throw "Object is empty!";
        newarr = newarr.concat(Object.entries(objects[i]));
    }
    return newarr;
}

function isDeepEqual(obj1, obj2, check) {
    if (obj1 === undefined || obj2 === undefined) throw "Object does not exist";
    if (typeof obj1 !== "object" || typeof obj2 !== "object")
        throw "Given type must be an object";
    if (check == true) if (typeof obj1 !== typeof obj2) return false;
    let bool = true;
    Object.keys(obj1).forEach((item) => {
        //console.log("Compare: ",obj1[item], obj2[item])
        if (typeof obj1[item] == "object")
            return isDeepEqual(obj1[item], obj2[item], true);
        //console.log(obj1[item], obj2[item])
        if (obj1[item] !== obj2[item]) bool = false;
    });
    return bool;
}

function computeObject(object, func) {
    if (object === undefined) throw "object does not exist";
    if (func === undefined) throw "object does not exist";
    if (typeof object !== "object" || typeof func !== "function")
        throw "Given must be an object and a function";
    Object.keys(object).forEach((item) => {
        if (typeof object[item] !== "number")
            throw "Object must be filled with number type values only!";
        object[item] = func(object[item]);
    });
    return object;
}

module.exports = { makeArrays, isDeepEqual, computeObject };
