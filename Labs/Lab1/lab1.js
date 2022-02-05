const questionOne = function questionOne(arr) {
    // Implement question 1 here
    //if typeof(arr) !== 'object' then 
    return arr.reduce( (totalnum, currentnum) => { 
        return (currentnum * currentnum) + totalnum; 
    },0)
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if (num <= 0) 
        return 0
    else if (num == 1)
        return 1;
    else
        return questionTwo(num-1) + questionTwo(num-2)

}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    //Uses .match from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    return text.toLowerCase().match(/[aeiou]/gi).length

}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num <0)
        return NaN
    else if (num == 0 || num == 1) 
        return 1
    else
        return num * questionFour(num-1)
}

module.exports = {
    firstName: "Adefemi", 
    lastName: "Fagbewesa", 
    studentId: "10439840",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};

