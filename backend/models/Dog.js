const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  temperament: {
    type: String,
    required: true,
  },
  life_span: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Dog', DogSchema);
