const Express = require('express')
const charities = require('../model/charitiesModel')
const jsonData = require('../data/csvToJson')

let router = Express.Router()
async function getJsonData() {
    const source = './data/charities.csv'  
    const saveFileTo = "./data/charities.json"
    const jsonfile = await jsonData.csvToJson(source, saveFileTo)
    const jsonParsed = await JSON.parse(jsonfile)
    //console.log('the json is ');
    //console.log(jsonParsed);
    //return jsonParsed
    // Function call
    await charities.insertMany(jsonParsed).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error) // Failure
    });
}



router.get('/insert', (req, res) => {
    const password = 'sdsdfsdfegsdgegse3434sdgwesf'
    const userPassword =encodeURI(req.query.password) 

    if(password == userPassword){
        getJsonData()
        res.send('insert in progress')
    }
    else{
        res.send('Your password is wrong ')
    }

})

//export the file
module.exports = {
    router
}