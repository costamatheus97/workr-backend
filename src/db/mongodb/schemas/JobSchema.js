const Mongoose = require('mongoose')

const JobSchema = new Mongoose.Schema({
  company_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pay_range: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      tech_name: {
        type: String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      }
    }
  ]
})

module.exports = Mongoose.model('jobs', JobSchema)