const mongoCollections = require('./mongoCollections');
const bands = mongoCollections.bands;
let ObjectId = require('mongodb').ObjectId;

async function create(name, genre,website,recordLabel,bandMembers,yearFormed){
    if (!name || !genre || !website || !recordLabel || !bandMembers || !yearFormed) throw "All Parameters must be provided!";
    if (typeof(name) !== "string" || typeof(website) !== "string"|| typeof(recordLabel) !== "string") throw "Name, Website, and RecordLabel must be a String!";
    if (name=="" || website=="" || recordLabel=="" ) throw "Name, Website, and RecordLabel must not be empty strings!";
    if (name.replace(/\s/g, '')=="" || website.replace(/\s/g, '')=="" || recordLabel.replace(/\s/g, '')=="") throw "name, website, and recordlabel cannot be empty string/full of spaces";
    if (website.indexOf("http://www.")==-1 || website.substring(website.length-4)!=".com" || website.length <20) throw "not a valid website name! must be at least 5 characters inbetween .com and http://www";
    if (!Array.isArray(genre) || !Array.isArray(bandMembers)) throw "genre and bandMembers must be arrays!";
    if (genre.filter(x=> typeof(x)=="string").length==0 || bandMembers.filter(x=> typeof(x)=="string").length==0) throw "genre and bandMembers must include a string in the array!";
    if (typeof(yearFormed) != "number" || yearFormed<1900 || yearFormed>2022) throw "yearsFormed must be a number and must be between 1900 and 2022!";

    let bandCollection = await bands();
    let newBand = {
        name: name, 
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearsFormed: yearFormed
    }
    let bandInsertInfo = await bandCollection.insertOne(newBand)
    if (bandInsertInfo.insertedCount===0) throw "Could not add band";
    return await get(bandInsertInfo.insertedId.toString())
}

async function getAll(){
    let bandCollection = await bands();
    let allBands = await bandCollection.find({}).toArray();
    allBands.forEach(object => {
        object._id = object._id.toString();
    })
    return allBands
}

async function get(id){
    if (id==undefined) throw "please enter a band id";
    if (typeof(id)!="string") throw "id must be a string";
    if (id.replace(/\s/g, '')=="") throw "id cannot be an empty string";
    if (!ObjectId.isValid(id)) throw "id must be a valid object id";
    let bandCollection = await bands()
    let specifiedBand = await bandCollection.findOne({_id:ObjectId(id)})
    if (specifiedBand ===null) throw "No band with that specific id"
    specifiedBand._id = specifiedBand._id.toString()
    return specifiedBand
}

async function remove(id){
    if (id ==undefined) throw "id does not exist";
    if (typeof(id)!=="string") throw "id must be a string";
    if (!ObjectId.isValid(id)) throw "id must be a valid object id";
    if (id.replace(/\s/g, '')=="") throw "id cannot be an empty string";
    let bandCollection = await bands();
    let specifiedBand = await bandCollection.findOne({_id:ObjectId(id)})
    let deleteInfo = await bandCollection.deleteOne({_id: ObjectId(id)})
    if (specifiedBand===null||deleteInfo.deletedCount===0) throw "couldnt delete band with given id";
    return specifiedBand.name
}

async function rename(id, newName){ 
    if (id ==undefined || newName ==undefined) throw "id/newName does not exist";
    if (typeof(id)!=="string" || typeof(newName)!=="string") throw "id and newName must be a string";
    if (!ObjectId.isValid(id)) throw "id must be a valid object id";
    if (id.replace(/\s/g, '')=="" ||newName.replace(/\s/g, '')=="" ) throw "id and newName cannot be an empty string";
    let bandCollection = await bands()
    let specifiedBand = await bandCollection.findOne({_id:ObjectId(id)})
    if (specifiedBand ==null|| specifiedBand.name === newName) throw "Cannot rename with the same name!"
    let updateBand = {name:newName}
    let updatedInfo = await bandCollection.updateOne({ _id:ObjectId(id)}, {$set: updateBand})
    if (updatedInfo.modifiedCount === 0) throw "could not update band succssfully"
    return await get(id)
}

/*
async function main() {
    try{
        const newBand = await create("TOP",["Alternative", "Rock"],"http://www.twentyonepilots.com", "UMG Record Label",["Tyler Jospeh", "Josh Dun"], 1991);
        console.log(newBands);
    }
    catch(e){
        console.log(e)
    }
    
}
*/


module.exports ={create, get, getAll, rename, remove}