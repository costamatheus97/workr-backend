const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
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
  profile_picture: {
    type: String,
  },
  interest_location: {
    type: Array
  },
  resume: [
    {
      work_experience: [
        {
          title: {
            type: String,
          },
          company: {
            type: String,
          },
          start_date: {
            type: Date,
          },
          end_date: { 
            type: String || Date,
          },
          description: {
            type: String,
          },
          related_skills: [String]
        }
      ],
      education: [
        {
          school: {
            type: String,
          },
          degree: {
            type: String,
          },
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          start_date: {
            type: Date,
          },
          end_date: {
            type: String || Date,
          },
        }
      ],
      skills: [
        {
          tech_name: {
            type: String,
          },
          experience: {
            type: String,
          },
          notify_me: {
            type: Boolean,
          }
        }
      ]
    }
  ],
  is_company: {
    type: Boolean,
    required: true,
  },
  is_premium: {
    type: Boolean,
    required: true,
  },
  is_verified: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
})

module.exports = Mongoose.model('user', UserSchema)