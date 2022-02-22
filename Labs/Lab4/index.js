const { ClientSession } = require('mongodb');
const bands = require('./bands');
const connection = require('./mongoConnection');

const main = async() =>{
    
    var newBand,newBand2,newBand3
    try{    
        newBand = await bands.create("TOP",["Alternative", "Rock"],"http://www.twentyonepilots.com", "UMG Record Label",["Tyler Jospeh", "Josh Dun"], 1991);
        console.log(newBand);
    }
    catch (err) {
        console.error(err);
    }
    try{ 
        newBand2 = await bands.create("Skrillex",["Dubstep", "Electronic"],"http://www.skrillex.com", "OWLSA",["Sonny"], 2003);
    }
    catch (err) {
        console.error(err);
    }
    try{
        const getall = await bands.getAll()
        console.log(getall)
    }
    catch(err){
        console.log(err)
    }
    try{ 
        newBand3 = await bands.create("blckwalk.",["Electronic", "Future Bass", "Future Pop"],"http://www.blckwalk.com", "Independent",["Femi"], 2022);
        console.log(newBand3);
    }
    catch (err){
        console.log(err)
    }
    try{ 
        newBand = await bands.rename(newBand._id, "TWENTY ONE PILOTS");
        console.log(newBand)
    }
    catch (err){
        console.log(err)
    }
    try{
        newBand2 = await bands.remove(newBand2._id)
    }
    catch(err){
        console.log(err)
    }
    try{
        const getall = await bands.getAll()
        console.log(getall)
    }
    catch(err){
        console.log(err)
    } 
    try{ 
        let badBand = await bands.create("swagmoney",["Rap"],"http://www.letsgoo.com", "Independent",["john"], 2023);
        console.log(badBand)
    }
    catch (err){
        console.log(err)
    }
    try{ 
        let badBand = await bands.remove("00337646hhfs73", "Sounds like you");
        console.log(badBand)
    }
    catch (err){
        console.log(err)
    }
    try{ 
        let badBand = await bands.rename("00337646hhfs73", "Sounds like you");
        console.log(badBand)
    }
    catch (err){
        console.log(err)
    }
    try{ 
        let badBand = await bands.rename(newBand._id, "");
        console.log(badBand)
    }
    catch (err){
        console.log(err)
    }
    try{ 
        let badBand = await bands.get("616273656e6365576f726b73");
        console.log(badBand)
    }
    catch (err){
        console.log(err)
    }
    


    const db = await connection.connectToDb();
    await connection.closeConnection();
    //console.log('Done!');

}

main().catch((err) =>{console.log(err)})