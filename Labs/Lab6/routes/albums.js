const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const data = require('../data');
const albumCollections = data.albums

router.get('/:id', async (req, res) => {
    try{        
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "id must be a valid object id"});
        let results = await albumCollections.getAll(req.params.id)
        res.status(200).json(results);
    }
    catch(err){
        console.log(err);
    	res.status(404).json({ error: err });
    }
})

router.post('/:id', async (req, res) => {
    try{        
        if (!req.body.title || !req.body.releaseDate|| !req.body.tracks || !req.body.bandId || !req.body.rating) return res.status(400).json({ error: "Fill all fields!" });
        let results = await albumCollections.create(
            req.params.id,
            req.body.title,
            req.body.releaseDate,
            req.body.tracks,
            req.body.rating,
        );
        res.status(200).json(results);
    }
    catch(err){
        console.log(err);
    	res.status(400).json({ error: err });
    }
})

router.get('/album/:id', async (req, res) => {
    try{        
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "id must be a valid object id"});
        let results = await albumCollections.get(req.params.id)
        res.status(200).json(results);
    }
    catch(err){
        console.log(err);
    	res.status(404).json({ error: err });
    }
})


router.delete('/:id', async (req, res) => {
    try{        
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "id must be a valid object id"});
        await albumCollections.remove(req.params.id)
        res.status(200).json({albumId:req.params.id, "deleted":true});
    }
    catch(err){
        console.log(err);
    	res.status(404).json({ error: err });
    }
})


module.exports = router