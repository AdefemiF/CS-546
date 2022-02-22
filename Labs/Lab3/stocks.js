const axios = require('axios')

const peopleModule = require('./people')

async function getStonks(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
  return data // this will be the array of stonks objects
}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }

async function listShareholders(stockName){
    if (stockName==undefined) throw "stockName does not exist"
    if (typeof(stockName)!=="string") throw "stockName must be a string!"
    if (stockName.replace(/\s/g, '')=="") throw "stockName cannot be empty string/full of spaces"
    var stockJson = await getStonks()
    let doesStockExist = stockJson.find(x => x.stock_name==stockName);
    if (doesStockExist==undefined) throw "stock does not exist"
    for (index = 0; index < stockJson.length; index++){
        if (stockJson[index].stock_name===stockName){
            let stock = stockJson[index]
            let shareHolderObject = stock.shareholders
            let result = async()=> { 
                for await( shareholder of shareHolderObject){
                    let person = await peopleModule.getPersonById(shareholder.userId) 
                    shareholder.first_name = person.first_name
                    shareholder.last_name = person.last_name    
                    delete shareholder.userId
                }      
                return stock 
            }      
            return result()
        } 
    }
}

async function totalShares(stockName){
    if (stockName==undefined) throw "stockName does not exist"
    if (typeof(stockName)!=="string") throw "stockName must be a string!"
    if (stockName.replace(/\s/g, '')=="") throw "stockName cannot be empty string/full of spaces"
    
    var stockJson = await getStonks()
    let doesStockExist = stockJson.find(x => x.stock_name==stockName);
    if (doesStockExist==undefined) throw "stock does not exist"
    
    for (index = 0; index < stockJson.length; index++){
        if (stockJson[index].stock_name===stockName){
            let stock = stockJson[index]
            if (stock.shareholders.length==1) return stockName +", has 1 shareholder that owns a total of "+stock.shareholders[0].number_of_shares+ " shares."
            if (stock.shareholders.length==0) return stockName +" currently has no shareholders."
            else{
                let totalShares = 0
                stock.shareholders.forEach((obj) => {
                    totalShares += obj.number_of_shares
                })
                return stockName + ", has "+stock.shareholders.length+ " shareholders that own a total of "+totalShares+ " shares."
            }
        }
    }

}

async function listStocks(firstName, lastName){
    if (firstName == undefined || lastName == undefined ) throw "The first or last name are undefined"
    if (typeof(firstName) !== "string" || typeof(lastName) !== "string") throw "The first or last name must be a string"
    var stockJson = await getStonks()
    var peopleJson = await getPeople()
    let ownedStock = []
    let personID = peopleJson.find(x => x.first_name === firstName && x.last_name === lastName);
    if (personID == undefined || personID == null || personID == NaN) throw firstName + " " + lastName + " does not exist as a shareholder"

    for (index = 0; index < stockJson.length; index++){
        let stock = stockJson[index]
        let shareHolderObject = stock.shareholders
        for (count in shareHolderObject){
            if (personID.id===shareHolderObject[count].userId){
                ownedStock.push({stock_name: stock.stock_name, number_of_shares:shareHolderObject[count].number_of_shares})
            }
        }
    }
    if (ownedStock.length==0) throw firstName + " " + lastName + " holds no stock!"
    return ownedStock
}

async function getStockById(id){
    if (id==undefined) throw "stockid does not exist"
    if (typeof(id)!=="string") throw "stockid must be a string!"
    if (id.replace(/\s/g, '')=="") throw "stockid cannot be empty string/full of spaces"
    var stockJson = await getStonks()
    for (index = 0; index < stockJson.length; index++){
        if (stockJson[index].id===id) return stockJson[index]
    }
    throw "stockid cannot be found"


}




module.exports = {getStockById, listShareholders, totalShares, listStocks}