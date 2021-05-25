const express = require('express');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose")
const speciesModel = require('./model/speciesInfoModel')


const request = require('request');


const PORT = process.env.PORT || 3002


const uri = "mongodb://ray:1998@cluster0-shard-00-00.ho33k.mongodb.net:27017,cluster0-shard-00-01.ho33k.mongodb.net:27017,cluster0-shard-00-02.ho33k.mongodb.net:27017/test?ssl=true&replicaSet=atlas-k8w5gq-shard-0&authSource=admin&retryWrites=true&w=majority";
//mongoose.connect('mongodb+srv://admin:admin@cluster0.5cdt0.mongodb.net/geodata', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', function () {
    // we're connected!
    console.log("database connected")

});




const watchData = () => {
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
        if(data.operationType == 'update') {

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
            url: 'http://localhost:3000/updateData',
            form: payload,
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {
            //Print the Response
            console.log(body);
        });



        
    });
}

watchData()

app.use(express.static('public'))

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





app.listen(PORT, () => {
    console.log('server started on port ' + PORT)
})