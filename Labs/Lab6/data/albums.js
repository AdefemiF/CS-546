const mongoCollections = require('../configs/mongoCollections');
const albums = mongoCollections.albums;
const bands = mongoCollections.bands;

let ObjectId = require('mongodb').ObjectId;
let moment = require("moment")


async function create(bandId,title,releaseDate,tracks,rating){
    if (!bandId || !title || !releaseDate || !tracks || !rating) throw "All Parameters must be provided!";
    if (typeof(bandId) !== "string" || typeof(title) !== "string"|| typeof(releaseDate) !== "string") throw "bandId, Title, and ReleaseDate must be a String!";
    if (bandId=="" || title=="" || releaseDate=="" ) throw "bandId, Title, and ReleaseDate must not be empty strings!";
    if (!ObjectId.isValid(bandId)) throw "bandid must be a valid object id";
    if (bandId.replace(/\s/g, '')=="" || title.replace(/\s/g, '')=="" || releaseDate.replace(/\s/g, '')=="") throw "bandId, Title, and ReleaseDate cannot be empty string/full of spaces";
    if (!Array.isArray(tracks)) throw "tracks must be an array!";
    if (tracks.filter(x=> typeof(x)=="string" && x.replace(/\s/g, '')!="" ).length<3) throw "tracks must include at least 3 strings in the array!";
    if (tracks.filter(x=> typeof(x)!="string").length>0) throw "Only strings inside the tracks array are allowed!"
    let testDate = moment(releaseDate, 'MM-DD-YYYY' )
    if (!testDate.isValid() || testDate.get('year')>2023 || testDate.get('year')<1900) throw "releaseDate must be a valid date between 1900 and 2023!";

    if (typeof(rating) != "number" || rating<1 || rating>5) throw "rating must be a number and must be between 1 and 5!";

    let albumCollection = await albums();
    let newAlbum = {
        title:title, 
        releaseDate:releaseDate,
        tracks:tracks, 
        rating:rating
    } 
    let albumInsertInfo = await albumCollection.insertOne(newAlbum)
    if (albumInsertInfo.insertedCount===0) throw "Could not add album";
    newAlbum = await get(albumInsertInfo.insertedId.toString())
    let bandCollection = await bands();
    let specifiedBand = await bandCollection.findOne({_id:ObjectId(bandId)})
    if (specifiedBand ===null) throw "No band with that specific id "
    specifiedBand.albums.push(newAlbum)
    if (specifiedBand.overallRating!=0)
        specifiedBand.overallRating = ((specifiedBand.overallRating + newAlbum.rating)/specifiedBand.albums.length).toFixed(1)
    else
    specifiedBand.overallRating = newAlbum.rating
    let updateBand = {
        albums:specifiedBand.albums,
        overallRating: Number(specifiedBand.overallRating)
    }
    let updatedInfo = await bandCollection.updateOne({ _id:ObjectId(bandId)}, {$set: updateBand})
    if (updatedInfo.modifiedCount === 0) throw "could not update band succssfully"
    return newAlbum
}

async function getAll(bandId){
    if (!bandId || typeof(bandId) !== "string" || bandId.replace(/\s/g, '')=="" ) throw "BandId must exist and be a Non-empty string."
    if (!ObjectId.isValid(bandId)) throw "bandid must be a valid object id";
    let bandCollection = await bands();
    let specifiedBand = await bandCollection.findOne({_id:ObjectId(bandId)})
    if (specifiedBand ===null) throw "No band with that specific id"
    return specifiedBand.albums
}

async function get(albumId){
    if (albumId==undefined) throw "please enter a album id";
    if (typeof(albumId)!="string") throw "albumId must be a string";
    if (albumId.replace(/\s/g, '')=="") throw "albumId cannot be an empty string";
    if (!ObjectId.isValid(albumId)) throw "albumId must be a valid object id";
    let albumCollection = await albums();
    let albumspecificed = await albumCollection.findOne({_id: ObjectId(albumId)})
    if (albumspecificed===null) throw "No Album with that specific id was found"
    return albumspecificed
}

async function remove(albumId){
    if (albumId ==undefined) throw "albumId does not exist";
    if (typeof(albumId)!=="string") throw "albumId must be a string";
    if (!ObjectId.isValid(albumId)) throw "albumId must be a valid object id";
    if (albumId.replace(/\s/g, '')=="") throw "albumId cannot be an empty string";
    let albumCollection = await albums();
    let oldAlbum = await albumCollection.findOne({_id: ObjectId(albumId)});
    if (oldAlbum===null) throw "No Album with that specific id was found"


    let bandCollection = await bands();
    let specifiedBand = await bandCollection.findOne({albums:{$elemMatch:{_id:ObjectId(albumId)}}})
    
    let albumfilter= specifiedBand.albums.filter(x=>(x._id.toString()!=albumId.toString()))
    if (specifiedBand.albums.length-1<1){
        specifiedBand.overallRating=0;
    }
    else{
        let totalRating = specifiedBand.albums.reduce((prev,current)=>prev+current)
        specifiedBand.overallRating = ((totalRating)/specifiedBand.albums.length).toFixed(1)
        if (specifiedBand.albums.length-1<1){
            specifiedBand.overallRating=0;
        } 
    }
    let updateBand = {
        albums:albumfilter,
        overallRating: Number(specifiedBand.overallRating)
    }
    console.log(specifiedBand, updateBand)
    let updatedInfo = await bandCollection.updateOne({ _id:ObjectId(specifiedBand._id.toString())}, {$set: updateBand})
    if (updatedInfo.modifiedCount === 0) throw "could not update band succssfully"

    let albumspecificed = await albumCollection.deleteOne({_id: ObjectId(albumId)})
    if (albumspecificed===null) throw "couldnt delete band with given id";

    return specifiedBand
}


module.exports ={remove, get, getAll,create}