const {
    model
} = require('mongoose')

const charities = model('charities', {
    Name: String,
    Description: String,
    Website: String,
    Image: String,
    Phone: String,
})

module.exports = charities