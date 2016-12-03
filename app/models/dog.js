var mongoose = require('mongoose');
//create a schema table with mongoose
var Schema = mongoose.Schema;

var DogSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Dog', DogSchema);