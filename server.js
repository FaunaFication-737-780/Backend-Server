const express = require('express');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose")



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
//create a new schema
var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name ?
        "Meow name is " + this.name :
        "I don't have a name";
    console.log(greeting);
}
//create a model kitten in database
var Kitten = mongoose.model('Kitten', kittySchema);


const addCat = (name) => {

    var newCat = new Kitten({
        name: name
    });
    newCat.speak(); // "Meow name is inputValue"

    newCat.save(function (err, newCat) {
        if (err) return console.error(err);
        newCat.speak();
    });
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    })
}
const watchData = () => {
    Kitten.watch().on('change', data => {
        //if the data change, send a post request to the front end server
        //so the data is always alive

        //Custom Header pass
        var headersOpt = {
            "content-type": "application/json",
        };
        request({
            method: 'post',
            url: 'http://localhost:3004/',
            form: data,
            headers: headersOpt,
            json: true,
        }, function (error, response, body) {
            //Print the Response
            console.log(body);
        });



        if (data.operationType == 'insert') {
            console.log('the new data is: ');
            console.log(data.fullDocument);
        } else {
            console.log('the updated/removed document is ');
            console.log(data.updateDescription);
        }
    });
}

watchData()

app.use(express.static('public'))

//this end point for add data into database 
//for test the watch function
app.get('/addCat', (req, res) => {
    let name = encodeURI(req.query.name)
    addCat(name)
    res.send('add cat done');

})





app.listen(PORT, () => {
    console.log('server started on port ' + PORT)
})