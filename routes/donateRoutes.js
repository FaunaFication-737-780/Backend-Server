const Express = require('express')
const donatedPeople = require('../model/donatedPeopleModel')

let router = Express.Router()

router.get('/', (req, res) => {

    let name = decodeURI(req.query.name)
    let email = encodeURI(req.query.email)
    console.log(name);
    console.log(email);
    var newPeople = new donatedPeople({
        name: name,
        email: email,
        date: Date.now()
       
    });
    console.log(newPeople.date.getDate());
    newPeople.save(function (err, newCat) {
        if (err) return console.error(err);

    });
    

    res.send("got you")
})

//export the file
module.exports = {
    router
}