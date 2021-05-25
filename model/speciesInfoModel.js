const { model } = require('mongoose')

const SpeciesInfo = model('species-info', {
    name: String,
    popTrend: String,
    status: String,
    threats: String,
    conservActions: String,
    image: String

})

module.exports = SpeciesInfo