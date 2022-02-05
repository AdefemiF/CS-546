function stringChecker(string) {
    if (string === undefined) throw "No input given!";
    if (typeof string !== "string") throw "Input must be a string!";
    if (string.length <= 0) throw "Give a string thats not empty!";
}

function camelCase(string) {
    stringChecker(string);
    let str = string.split(" ");
    let newstring = str.reduce(function (prev, curr) {
        curr = curr.charAt(0).toUpperCase() + curr.slice(1);
        return prev + curr;
    });
    return newstring.charAt(0).toLowerCase() + newstring.slice(1);
}

function replaceChar(string) {
    stringChecker(string);
    let count = 0;
    let startChar = string.charAt(0).toLowerCase();
    for (i = 1; i < string.length; i++) {
        if (string[i].toLowerCase() == startChar)
            if (count == 0) {
                string = string.substring(0, i) + "*" + string.substring(i + 1);
                count++;
            } else if (count == 1) {
                string = string.substring(0, i) + "$" + string.substring(i + 1);
                count = 0;
            }
    }
    return string;
}

function mashUp(string1, string2) {
    stringChecker(string1);
    stringChecker(string2);
    if (string1.length < 2 || string2.length < 2)
        throw "Strings must be at least 2 characters!";
    return (
        string2.substring(0, 2) +
        string1.substring(2) +
        " " +
        string1.substring(0, 2) +
        string2.substring(2)
    );
}

module.exports = { camelCase, replaceChar, mashUp };
