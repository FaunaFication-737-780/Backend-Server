const { model } = require('mongoose')

const SpeciesInfo = model('speciesInfo', {
    name: String,
    popTrend: String,
    status: String,
    threats: String,
    conservActions: String,
    image: String

})

module.exports = SpeciesInfo