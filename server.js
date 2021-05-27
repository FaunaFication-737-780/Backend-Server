const express = require('express');
const app = express()
const mongoose = require("mongoose")
const watchData = require('./controllers/watchData')
const routers = require('./routes/donateRoutes')





const PORT = process.env.PORT || 3002

//const uri ='mongodb+srv://admin:admin@cluster0.5cdt0.mongodb.net/geodata'
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


watchData.watchData(app)


app.use(express.static('public'))

app.use('/donate', routers.router)






app.listen(PORT, () => {
    console.log('server started on port ' + PORT)
})