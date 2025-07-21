const mongoose = require('mongoose');

const NexusSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('Nexus', NexusSchema);
