/*
This server is only for testing 
When the data is generated 
This method would be in the front end to refresh the data.
*/




const express = require('express');

const app = express()
const PORT = process.env.PORT || 3004
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));




app.post('/', (req,res)=>{
    console.log(req.body);
    res.json(req.body)
    if (req.body.fullDocument == null) {
        console.log('this is not a insert');
    } 
    if( req.body.updateDescription == null){
        console.log('this is not a update');
        
    }

})

app.listen(PORT,()=>{
    console.log('server started on port '+PORT)
})