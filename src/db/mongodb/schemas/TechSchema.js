const Mongoose = require('mongoose')

const TechSchema = new Mongoose.Schema({
    tech_name: {
        type: String,
        required: true
    },
})

module.exports = Mongoose.model('techs', TechSchema)