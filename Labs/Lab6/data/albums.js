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
    if (genre.filter(x=> typeof(x)=="string" && x.replace(/\s/g, '')=="" ).length>=3) throw "genre and bandMembers must include a string in the array!";
    
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
    if (albumInsertInfo.insertedCount===0) throw "Could not add album to band";


    let bandCollection = await bands();
    let specifiedBand = await bandCollection.findOne({_id:ObjectId(bandId)})
    if (specifiedBand ===null) throw "No band with that specific id"

    //specifiedBand.albums.push(newAlbum)
    //specifiedBand.overallRating = ((specifiedBand.overallRating + newAlbum.rating)/specifiedBand.albums.length).toFixed(1)
    newAlbum._id = albumInsertInfo._id
    return newAlbum;
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
    let bandCollection = await bands();
    let specifiedBand = await bandCollection.findOne({"albums._id": ObjectId(albumId)})
    if (specifiedBand ===null) throw "No band with that specific id"
    for (album in specifiedBand.albums){
        if (album._id.toString() === albumId.toString()) return specifiedBand;
    }
    throw "No Album with that specific id was found"
}

async function remove(albumId){
    if (albumId ==undefined) throw "albumId does not exist";
    if (typeof(albumId)!=="string") throw "albumId must be a string";
    if (!ObjectId.isValid(albumId)) throw "albumId must be a valid object id";
    if (id.replace(/\s/g, '')=="") throw "albumId cannot be an empty string";
    let albumCollection = await albums();
    let specifiedBand = await albumCollection.deleteOne({_id: ObjectId(albumId)})
    if (specifiedBand===null||deleteInfo.deletedCount===0) throw "couldnt delete band with given id";

    specifiedBand.albums = specifiedBand.albums.filter(x=>{
        if (x._id)
    })
    specifiedBand.overallRating = ((specifiedBand.overallRating + newAlbum.rating)/specifiedBand.albums.length).toFixed(1)

    return get(albumId)
}


module.exports ={remove, get, getAll,create}