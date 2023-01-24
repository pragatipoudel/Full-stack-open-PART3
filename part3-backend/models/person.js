const mongoose = require('mongoose');

mongoose.set('strictQuery',false)


const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
  console.log('connected to Mongo DB')
})
.catch((error) => {
  console.log('error connecting to MongoDB', error.message)
})

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(value) {
        if(value.includes('-')) {
          const parts = value.split('-')
          if (parts.length !== 2) {
            return false
          }
          if (parts[0].length !== 2 && parts[0].length !== 3) {
            return false
          }
          if (isNaN(parts[0]) || isNaN(parts[1])) {
            return false
          }
          return true;
        }

        return (!isNaN(value))
      }
    }
  }
})

PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', PersonSchema)