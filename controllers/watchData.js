const speciesModel = require('../model/speciesInfoModel')
const request = require('request');

const watchData = (app) => {
    speciesModel.watch().on('change', data => {
        //if the data change, send a post request to the front end server
        //so the data is always alive

        //if the new data income
        if (data.operationType == 'insert') {
            console.log('the new data is: ');
            console.log(data);
            //convert bson type into string, so we can display in the frontend
            data.fullDocument._id = data.fullDocument._id.toString()
            var payload = {
                //set the payload as the data
                data: data.fullDocument,
                type: 'insert'
            }
        }
        //if the data is updated
        if (data.operationType == 'update') {

            //set the payload with id and updated field
            var payload = {
                _id: data.documentKey._id.toString(),
                data: data.updateDescription.updatedFields,
                type: 'update'
            }
            console.log('the updated/removed document is ');
            console.log(data.documentKey._id.toString());
        }




        //Custom Header pass
        var headersOpt = {
            "content-type": "application/json",
        };
        request({
            method: 'post',
            //should change the endpoint
            //url: 'http://localhost:3000/updateData',
            url: "https://whydidyoubreaktoday-sleepy-eland.mybluemix.net/updateData",
            form: payload,
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {
            //Print the Response
            console.log(body);
        });




    });

    //this end point for add data into database 
    //for test the watch function
    app.get('/addCat', (req, res) => {
        var newCat = new speciesModel({
            name: 'Strdfding',
            popTrend: 'Stridfdfng',
            status: 'Strindfdg',
            threats: 'Strifdfdng',
            conservActions: 'fdfString',
            image: 'dfdString'
        });
        newCat.save(function (err, newCat) {
            if (err) return console.error(err);

        });
        res.send('add cat done');

    })
}

module.exports = {
    watchData
}