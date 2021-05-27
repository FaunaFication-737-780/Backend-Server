const { model } = require('mongoose')

const donatedPeople = model('donatedPeople', {
    name: String,
    email:String
})

module.exports = donatedPeople