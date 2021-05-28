const test = require('../data/csvToJson')

var jsonfile
async function abc(){
     
    jsonfile = await test.csvToJson('../data/charities.csv', "../data/charities.json")
    console.log('the json is ');
    console.log( JSON.parse(jsonfile));    

}


abc()
    



