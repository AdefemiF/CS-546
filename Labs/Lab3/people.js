const axios = require('axios')


async function getPeople(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
  return data // this will be the array of people objects
}

async function getPersonById(id){
    if (id==undefined) throw "id does not exist"
    if (typeof(id)!=="string") throw "id must be a string!"
    if (id.replace(/\s/g, '')=="") throw "cannot be empty string/full of spaces"
    const json = await getPeople()
    for (index = 0; index < json.length; index++){
        if (json[index].id===id) return json[index]
    }
    throw "person not found"
}

async function sameEmail(emailDomain){
    if (emailDomain==undefined) throw "email domain doesnt exist"
    if (typeof(emailDomain)!=="string") throw "email domain must be a string!"
    if (emailDomain.replace(/\s/g, '')=="") throw "cannot be empty string/full of spaces"
    if (emailDomain.indexOf('.')==-1) throw "email domain must contain a dot!"
    if (emailDomain==".com") throw "email domain must contain domain"
    //if (emailDomain.indexOf('@')==-1) throw "email must contain a domain!"

    const json = await getPeople()
    let checkDots = function(string, index){
        return string.substring(index,index+3).length>=2
    }
    let emailHolder = []
    for (index = 0; index < json.length; index++){
        let email = json[index].email
        if (email.toLowerCase().indexOf(emailDomain) !=-1){
            let firstOccurrence = email.indexOf('.') 
            let secondOccurrence = email.indexOf('.', firstOccurrence)
            if (!checkDots(email, firstOccurrence)) throw "Email must have 2 characters after a ."
            if (secondOccurrence!=-1 && !checkDots(email, secondOccurrence)) throw "Email must have 2 characters after a ."
            emailHolder.push(json[index])
        }    
    }
    if (emailHolder.length<2) throw "Email must have at least 2 people with the same domain"
    return emailHolder
}


async function manipulateIp(){
    const json = await getPeople()
    let peopleHolder = []
    for (index = 0; index < json.length; index++){
        let IP = json[index].ip_address
        IP = IP.split('.').join("").split("")
        IP = Number(IP.sort().join(""))
        peopleHolder.push({IP:IP, firstName:json[index].first_name, lastName:json[index].last_name})
    }
    peopleHolder.sort(function(a, b){return b.IP-a.IP})
    let result = {average:0};
    let smallestPerson = peopleHolder[0];
    let greatestPerson = peopleHolder[peopleHolder.length-1]
    for (index=0; index<peopleHolder.length; index++){
        result.average+=peopleHolder[index].IP
    }
    delete smallestPerson.IP
    delete greatestPerson.IP
    result.highest = greatestPerson
    result.lowest = smallestPerson
    result.average = Math.floor(result.average/peopleHolder.length)
    return result
}

async function sameBirthday(month, day){
    if (month == undefined) throw "month is undefined"
    if (day == undefined) throw "day is undefined"
    if (!Number(month)) throw "month must be a number"
    if (!Number(day)) throw "day must be a number"
    if (month<1 || month>12) throw "month must between 1-12"
    const dates = [31,28,31,30,31,30,31,31,30,31,30,31]
    if (day>dates[month-1] || day<1) throw "incorrect number of days for that given month"

    const json = await getPeople()

    let allBirthdays = []
    for (index = 0; index < json.length; index++){
        let birthday = json[index].date_of_birth
        birthday = new Date(birthday)
        if (birthday.getDate()==day && birthday.getMonth()+1 == month){
            allBirthdays.push(json[index].first_name + " " + json[index].last_name)
        }
    }
    if (allBirthdays.length==0) throw "No person with that birthday"

    return allBirthdays
    
}
/*
const main = async () =>{
    const result = await sameBirthday(13,24)

    console.log(result)
}
main()
*/
module.exports ={sameBirthday, sameEmail, manipulateIp, getPersonById}