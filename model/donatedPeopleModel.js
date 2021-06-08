const { model } = require('mongoose')

const donatedPeople = model('donatedPeople', {
    name: String,
    email:String,
    date: Date
})

module.exports = donatedPeople