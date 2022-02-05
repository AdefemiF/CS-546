const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

/*
console.log(arrayUtils.mean([1,2,3]))
console.log(arrayUtils.mean([]))
console.log(arrayUtils.mean("nigga"))
console.log(arrayUtils.mean([1,"sd",2,3]))
console.log(arrayUtils.mean([1,2,3]))

console.log(arrayUtils.medianSquared([4, 1, 2]))
console.log(arrayUtils.maxElement(5,6,7))
console.log(arrayUtils.fill([5,6,7]))

console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]))
console.log(arrayUtils.countRepeating("foobar"));
console.log(arrayUtils.countRepeating())
console.log(arrayUtils.countRepeating({a:1,b:2,c:"fuck"}))

console.log(arrayUtils.isEqual([1, 2, 3], [3, 1, 2]))

console.log(arrayUtils.isEqual([1, 2, 3], [3, 1, 2]))

console.log(arrayUtils.isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z']))

console.log(arrayUtils.isEqual([1, 2, 3], [4, 5, 6]))

console.log(arrayUtils.isEqual([1, 3, 2], [1, 2, 3, 4]))

console.log(arrayUtils.isEqual([1, 2], [1, 2, 3]))



console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]))

console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]))

console.log(camelCase("Mansf I dont give a shiz 3"))
console.log(camelCase(""))
console.log(replaceChar("babbbbble"))

console.log(mashUp())
console.log(mashUp("hello", "ew"))
console.log(mashUp("Patrick", "Hill"))



const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

const firstSecondThird =objUtils.makeArrays([first, second, third]);
const secondThird = objUtils.makeArrays([second, third]);
const thirdFirstSecond = objUtils.makeArrays([third, first, second]);

console.log(objUtils.makeArrays([{x:2, gf:34}, {we:23, x:34}]))


const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

console.log(isDeepEqual(first, second)); // false
console.log(isDeepEqual(forth, fifth)); // true
console.log(isDeepEqual(forth, third)); // false
console.log(isDeepEqual({}, {})); // true
console.log(isDeepEqual([1,2,3], [1,2,3])); // throws error 
console.log(isDeepEqual("foo", "bar")); // throws error



console.log(computeObject({ a:1-7, b: -5, c: Math.E^0.222 }, n => n * n))

*/

/////////////////////TEST 1
try {
    //pass the test
    arrayUtils.mean([1, 2, 3]);
    console.log("Mean passed the test case successfully");
} catch (e) {
    console.error("Mean failed the test case");
}

try {
    //fail the test
    arrayUtils.mean([1, "sd", 2, 3]);
    console.error("Mean did not fail the test case");
} catch (e) {
    console.log("Mean failed the test case successfully");
}

/////////////////////TEST 2
try {
    //pass the test
    arrayUtils.medianSquared([4, 1, 2]);
    console.log("medianSquared passed the test case successfully");
} catch (e) {
    console.error("medianSquared failed the test case");
}

try {
    //fail the test
    arrayUtils.medianSquared("banana"); // throws an error
    console.error("medianSquared did not fail the test case");
} catch (e) {
    console.log("medianSquared failed the test case successfully");
}

/////////////////////TEST 3
try {
    //pass the test
    arrayUtils.maxElement([5, 6, 7]); // Returns: {'7': 2}
    console.log("maxElement passed the test case successfully");
} catch (e) {
    console.error("maxElement failed the test case");
}

try {
    //fail the test
    arrayUtils.maxElement([]); // throws error
    console.error("maxElement did not fail the test case");
} catch (e) {
    console.log("maxElement failed the test case successfully");
}

/////////////////////TEST 4
try {
    //pass the test
    arrayUtils.fill(6, "test");
    console.log("fill passed the test case successfully");
} catch (e) {
    console.error("fill failed the test case");
}

try {
    //fail the test
    arrayUtils.fill("test"); // Throws error
    console.error("fill did not fail the test case");
} catch (e) {
    console.log("fill failed the test case successfully");
}

/////////////////////TEST 5
try {
    //pass the test
    arrayUtils.countRepeating([
        7,
        "7",
        13,
        true,
        true,
        true,
        "Hello",
        "Hello",
        "hello",
    ]);
    console.log("countRepeating passed the test case successfully");
} catch (e) {
    console.error("countRepeating failed the test case");
}

try {
    //fail the test
    arrayUtils.countRepeating({ a: 1, b: 2, c: "Patrick" }); //throws an error
    console.error("countRepeating did not fail the test case");
} catch (e) {
    console.log("countRepeating failed the test case successfully");
}

/////////////////////TEST 6
try {
    //pass the test
    arrayUtils.isEqual([1, 2, 3], [3, 1, 2]); // Returns: true
    console.log("isEqual passed the test case successfully");
} catch (e) {
    console.error("isEqual failed the test case");
}

try {
    //fail the test
    arrayUtils.isEqual({}, [3, 1, 2]); // Returns: error
    console.error("isEqual did not fail the test case");
} catch (e) {
    console.log("isEqual failed the test case successfully");
}

/////////////////////TEST 7
try {
    //pass the test
    stringUtils.camelCase("my function rocks"); // Returns: "myFunctionRocks"
    console.log("camelCase passed the test case successfully");
} catch (e) {
    console.error("camelCase failed the test case");
}

try {
    //fail the test
    stringUtils.camelCase(""); // Throws Error
    console.error("camelCase did not fail the test case");
} catch (e) {
    console.log("camelCase failed the test case successfully");
}

/////////////////////TEST 8
try {
    //pass the test
    stringUtils.replaceChar("Daddy"); // Returns: "Da*$y"
    console.log("replaceChar passed the test case successfully");
} catch (e) {
    console.error("replaceChar failed the test case");
}

try {
    //fail the test
    stringUtils.replaceChar(""); // Throws Error
    console.error("replaceChar did not fail the test case");
} catch (e) {
    console.log("replaceChar failed the test case successfully");
}

/////////////////////TEST 9
try {
    //pass the test
    stringUtils.mashUp("Patrick", "Hill"); //Returns "Hitrick Pall"
    console.log("mashUp passed the test case successfully");
} catch (e) {
    console.error("mashUp failed the test case");
}

try {
    //fail the test
    stringUtils.mashUp("Patrick", ""); //Throws error
    console.error("mashUp did not fail the test case");
} catch (e) {
    console.log("mashUp failed the test case successfully");
}

/////////////////////TEST 10
try {
    //pass the test
    const first = { x: 2, y: 3 };
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    objUtils.makeArrays([first, second, third]);
    console.log("makeArrays passed the test case successfully");
} catch (e) {
    console.error("makeArrays failed the test case");
}

try {
    //fail the test
    objUtils.makeArrays([{}, "", ""]);
    console.error("makeArrays did not fail the test case");
} catch (e) {
    console.log("makeArrays failed the test case successfully");
}

/////////////////////TEST 11
try {
    //pass the test
    const forth = {
        a: { sA: "Hello", sB: "There", sC: "Class" },
        b: 7,
        c: true,
        d: "Test",
    };
    const fifth = {
        c: true,
        b: 7,
        d: "Test",
        a: { sB: "There", sC: "Class", sA: "Hello" },
    };
    objUtils.isDeepEqual(forth, fifth); // true
    console.log("isDeepEqual passed the test case successfully");
} catch (e) {
    console.error("isDeepEqual failed the test case");
}

try {
    //fail the test
    objUtils.isDeepEqual([], 4); // true
    console.error("isDeepEqual did not fail the test case");
} catch (e) {
    console.log("isDeepEqual failed the test case successfully");
}

/////////////////////TEST 12
try {
    //pass the test
    objUtils.computeObject({ a: 3, b: 7, c: 5 }, (n) => n * 2);
    console.log("computeObject passed the test case successfully");
} catch (e) {
    console.error("computeObject failed the test case");
}

try {
    //fail the test
    objUtils.computeObject("{ a: 3, b: 7, c: 5 }", 100);
    console.error("computeObject did not fail the test case");
} catch (e) {
    console.log("computeObject failed the test case successfully");
}
