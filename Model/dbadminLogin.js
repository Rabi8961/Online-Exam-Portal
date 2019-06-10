var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var adminLogin = new Schema({
    username:{
      type:  String,
      required:true
    },
    email : {
      type:  String,
      unique:true,
      required:true
    },
hash :String,
salt:String
});

module.exports = mongoose.model('adminLogin', adminLogin);