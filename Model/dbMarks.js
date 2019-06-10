var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var marks = new Schema({
    correct:{
      type:  String,
      required:true
    },
    incorrect : {
      type:  String,
      required:true
    },
});

module.exports = mongoose.model('signupData', signupData);