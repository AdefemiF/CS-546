function checkIfArrayValid(array) {
    //check array exists
    //check the array is an type array
    //check array is not empty and
    //each array element is a number
    if (array === undefined) throw "Array does not exist";
    if (!Array.isArray(array)) throw "Given Object is not an Array";
    if (array.length === 0) throw "Array is empty!";
    array.forEach(function (element) {
        if (typeof element !== "number")
            throw "Every Element inside array must be a number!";
    });
}

function mean(array) {
    checkIfArrayValid(array);
    let result = array.reduce((prev, curr) => prev + curr);
    return result / array.length;
}

function medianSquared(array) {
    checkIfArrayValid(array);
    array.sort((a, b) => b - a); //https://stackoverflow.com/questions/45309447/
    let half = Math.floor(array.length / 2);
    if (array.length % 2) return array[half] ** 2;
    else return ((array[half - 1] + array[half]) / 2.0) ** 2;
}

function maxElement(array) {
    checkIfArrayValid(array);
    let highest = array[0];
    array.forEach(function (elem) {
        if (elem > highest) highest = elem;
    });
    return { [highest]: array.indexOf(highest) };
}

function fill(end, Value) {
    if (end === undefined) throw "First parameter must be not empty";
    if (typeof end !== "number") throw "First parameter must be a number";
    if (end <= 0) throw "First parameter must be greater than 0";
    let fill = [];
    for (i = 0; i < end; i++) {
        if (Value !== undefined) fill.push(Value);
        else fill.push(i);
    }
    return fill;
}

function countRepeating(array) {
    if (array === undefined) throw "Array does not exist";
    if (!Array.isArray(array)) throw "Given Object is not an Array";
    if (array.length === 0) return {};

    let clone = {};
    array.forEach(function (elem) {
        clone[elem] = (clone[elem] || 0) + 1; //https://stackoverflow.com/questions/19395257/
    });
    return Object.fromEntries(
        Object.entries(clone).filter(([key, value]) => value != 1)
    ); //https://masteringjs.io/tutorials/fundamentals/filter-key
}

function isEqual(arrayOne, arrayTwo) {
    if (arrayOne === undefined || arrayTwo === undefined)
        throw "Array does not exist";
    if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo))
        throw "Given Object is not an Array";
    if (arrayOne.length === 0 || arrayTwo.length === 0) return {};
    if (arrayOne.length !== arrayTwo.length) return false;
    if (
        (!Array.isArray(arrayOne[0]) && Array.isArray(arrayTwo[0])) ||
        (Array.isArray(arrayOne[0]) && !Array.isArray(arrayTwo[0]))
    )
        return false;
    if (Array.isArray(arrayOne[0]) && Array.isArray(arrayTwo[0])) {
        for (i = 0; i < arrayOne.length; i++) {
            //console.log("first statement", arrayOne[i].sort().toString(),arrayTwo[i].sort().toString())
            if (arrayOne[i].sort() != arrayTwo[i].sort().toString())
                return false; //https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
        }
        return true;
    }
    //console.log("last statment",arrayOne.sort(),arrayTwo.sort(),arrayOne.sort().toString()==arrayTwo.sort().toString())
    else return arrayOne.sort() == arrayTwo.sort().toString();
}

module.exports = {
    mean,
    medianSquared,
    fill,
    maxElement,
    countRepeating,
    isEqual,
};
