/** csv file
a,b,c
1,2,3
4,5,6
*/


const csvToJson = async function (root, jsonFile) {
    const fs = require('fs');
    const csvFilePath = root
    const csv = require('csvtojson')
   
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            //console.log(jsonObj);
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */
        })

    // Async / await usage
    const jsonArray = await csv().fromFile(csvFilePath);
    const jsonContent = await JSON.stringify(jsonArray);
    fs.writeFile(jsonFile, jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
        
    });

    return jsonContent
}



module.exports = {
    csvToJson
}