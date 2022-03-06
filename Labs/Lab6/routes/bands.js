const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const data = require('../data');
const BandCollection = data.bands

router.get('/', async (req, res) => {
    try{
        let allBands = await BandCollection.getAll();
        let results =[]
        allBands.forEach(band => {
            results.push({_id:band._id.toString(), name:band.name})
        })
        res.status(200).json(results);
    }
    catch(err){
        res.status(500).send();
    }
})

router.post('/', async (req, res) => {
    try{        
        if (!req.body.name || !req.body.genre|| !req.body.website || !req.body.recordLabel || !req.body.bandMembers || !req.body.yearFormed ) return res.status(400).json({ error: "Fill all fields!" });
        let results = await BandCollection.create(
            req.body.name,
            req.body.genre,
            req.body.website,
            req.body.recordLabel,
            req.body.bandMembers,
            req.body.yearFormed, 
        );
        res.status(200).json(results);
    }
    catch(err){
        console.log(err);
    	res.status(400).json({ error: err });
    }
})

router.get('/:id', async (req, res) => {
    try{        
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "id must be a valid object id"});
        let results = await BandCollection.get(req.params.id)
        res.status(200).json(results);
    }
    catch(err){
        console.log(err);
    	res.status(404).json({ error: err });
    }
})

router.put('/:id', async (req, res) => {
    try{        
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "id must be a valid object id"});
        let results = await BandCollection.get(req.params.id)
        let {name, genre,website,recordLabel,bandMembers,yearFormed} = req.body;
        let oldBandAlbums = results.albums 
        let oldbandRatings = results.overallRating

        let newband = await BandCollection.update(req.params.id,name, genre, website, recordLabel, bandMembers, yearFormed)
        newband.albums = oldBandAlbums
        newband.overallRating = oldbandRatings
        res.status(200).json(newband);
    }
    catch(err){
        console.log(err);
    	res.status(404).json({ error: err });
    }
})

router.delete('/:id', async (req, res) => {
    try{        
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "id must be a valid object id"});
        await BandCollection.remove(req.params.id)
        res.status(200).json({bandId:req.params.id, "deleted":true});
    }
    catch(err){
        console.log(err);
    	res.status(404).json({ error: err });
    }
})





module.exports = router

/**
   {"name": "Pink Floyd",     
    "genre": ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
    "website": "http://www.pinkfloyd.com",
    "recordLabel": "EMI",
    "bandMembers": ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ],
    "yearFormed": 1965,
    "albums": [],
    "overallRating": 0
 }

 {
    "title": "Wish You Were Here",
  "releaseDate": "09/12/1975",
  "tracks": [
        "Shine On You Crazy Diamond, Pts. 1-5",
        "Welcome to the Machine",
        "Have a Cigar (Ft. Roy Harper)",
        "Wish You Were Here",
        "Shine On You Crazy Diamond, Pts. 6-9"
    ],
  "rating": 5
}
 * 
 * 
 * 
 * 
 * 
 * 
 * */