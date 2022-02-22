//not graded but used for testing purposes
let people = require('./people')
let stocks = require('./stocks')

async function main(){
    try{
        const peopledata = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.sameEmail("harvard.edu");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.sameEmail("foobar.123");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.sameEmail(".com");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.manipulateIp();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.sameBirthday(9, 25);;
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.sameBirthday(9, 31);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const peopledata = await people.sameBirthday("09", "25");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.listShareholders("Aeglea BioTherapeutics, Inc.");
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders("Powell Industries, Inc.") ;
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.listShareholders("foobar") ;
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.totalShares('Aeglea BioTherapeutics, Inc.');
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares('tytr Preferred and Income 2022 Term Fund');
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.totalShares('Powell Industries, Inc.');
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.totalShares(44);
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.listStocks("Grenville", "Pawelke" );
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.listStocks('Patrick', "Hill");
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.listStocks("",3);
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }try{
        const stockdata = await stocks.getStockById(1000);
        console.log (stockdata);
    }catch(e){
        console.log (e);
    }
}

//call main
main();