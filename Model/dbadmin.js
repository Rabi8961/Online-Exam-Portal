var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var signupData = new Schema({
    username:{
      type:  String,
      required:true
    },
    email : {
      type:  String,
      unique:true,
      required:true
    },
 candidate_id :{
        type:String,
        unique:true,
        required:true
 }
});

module.exports = mongoose.model('signupData', signupData);