const Mongoose = require('mongoose')

const CompanySchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  description: {
    type: String,
  },
  cep: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  employees: {
    type: String,
  },
  field: {
    type: String,
  },
  is_company: {
    type: Boolean,
    required: true,
  },
  is_premium: {
    type: Boolean,
    required: true,
  },
  followers: {
    type: Number,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
})

module.exports = Mongoose.model('company', CompanySchema)