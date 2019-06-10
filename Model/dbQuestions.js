var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var questions = new Schema({
    question_no:{
      unique:true,
      type:  String,
      required:true
    },
    question : {
        type:  String,
        required:true
      },
      option1 : {
        type:  String,
        required:true
      },
      option2 : {
        type:  String,
        required:true
      },
      option3 : {
        type:  String,
        required:true
      },
      option4 : {
      type:  String,
      required:true
    },
    correct_option : {
        type:  String,
        required:true
      },
});

module.exports = mongoose.model('questions', questions);