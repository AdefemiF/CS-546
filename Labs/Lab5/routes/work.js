
const workJsonLink = "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
const express = require('express');
const router = express.Router();
const axios = require('axios');



async function getWork(){
    const { data } = await axios.get(workJsonLink)
    return data // this will be the dictionary of work objects
}

async function getWorkById(id){
    if (id === undefined) throw "ID is undefined"
    if (!Number(id)) throw "Id must be a number"
    if (Number(id)<=0 || !Number.isInteger(id)==false) throw "ID must be a positive whole number" //https://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
    const { data } = await axios.get(workJsonLink)
    let result = data.find(x => x.id == id)
    if (!result) throw "No work found"
    return result // this will be the dictionary of work objects
}

router.get('/', async (req, res) => {
    try {
      const workList = await getWork();
      res.json(workList);
    } catch (e) {
      res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
      const work = await getWorkById(req.params.id);
      res.json(work);
    } catch (e) {
      res.status(404).json({ message: e });
    }
});


module.exports = router