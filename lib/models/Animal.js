const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  animal: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  
},
{
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
}
);

module.exports = mongoose.model('Animals', animalSchema);
