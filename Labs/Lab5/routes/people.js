const express = require('express');
const router = express.Router();
const axios = require('axios');

const peopleJsonLink = "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"

async function getPeople(){
    const { data } = await axios.get(peopleJsonLink)
    return data // this will be the dictionary of people objects
}

async function getPeopleByID(id){
    if (id === undefined) throw "ID is undefined"
    if (!Number(id)) throw "Id must be a number"
    if (Number(id)<=0 || !Number.isInteger(id)==false) throw "ID must be a positive whole number" //https://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
    const { data } = await axios.get(peopleJsonLink)
    let result = data.find(x => x.id == id)
    if (!result) throw "No Person found"
    return result // this will be the dictionary of work objects
}

router.get('/', async (req, res) => {
    try {
      const peopleList = await getPeople();
      res.json(peopleList);
    } catch (e) {
      res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
      const person = await getPeopleByID(req.params.id);
      res.json(person);
    } catch (e) {
      res.status(404).json({ message: e});
    }
});

//console.log(getPeopleByID(12))
module.exports =router