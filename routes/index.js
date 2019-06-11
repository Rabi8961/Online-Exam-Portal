var express = require('express');
var router = express.Router();
var signup = require('../Model/dbadmin');
var Adminlogin = require('../Model/dbadminLogin');
var Questions=require('../Model/dbQuestions');
var session = require('express-session');
const bcrypt = require('bcrypt');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('startPage', { title: 'Express' });
});
router.get('/proceed', function(req, res) {
  res.render('signup');
});
router.post('/signup', function(req, res) {
  // console.log(req.body);
  var signupData={
    username:req.body.username,
    email:req.body.email,
    candidate_id:req.body.id
  };
  signup.findOne({"email":signupData.email,"candidate_id":signupData.candidate_id},(err,resonse) => {
if(resonse){
  res.render('instruction');
}else{
  res.send('Candidate Not Exist');
}
  });
 
});
router.get('/startExam', function(req, res) {
  // console.log("hit");
  Questions.find({question_no : "1"}).exec(function(err, result){
    if(err)
    {
      // console.log("err block");
      console.log(err);
    }
    else{
      // console.log(result);
      res.render('./questionsPage', {"question" : result[0]} );
    }
  });
});
router.post('/finalMarks', function(req, res) {
  if(req){
    var finalMarks={
      "total_correct" :req.params.correct,
      "total_incorrect" : req.params.wrong
    }
    // console.log("finalMarks = ", finalMarks);
    res.render('./seeResult',{"marks" : finalMarks});
  }
  
  
  
});
router.post('/selectedData', function(req, res) {
  Questions.find({question_no : req.body.question_number},{_id: 0, correct_option :1}).exec(function(err, result){
    if(err)
    {
      console.log(err);
    }
    else{
      if(result[0].correct_option == req.body.answer)
      {
        res.send("true");
      }
      else
      {
        res.send("false");
      }
    }
  });
});
router.post('/ExamData', function(req, res) {
  var number = Number(req.body.number) + 1;
  Questions.find().exec(function(err, result){
    if(err)
    {
      console.log(err);
    }
    else{
      var queData = {};
      for(var i=0;i<result.length;i++)
      {
        if(result[i].question_no == String(number))
        {
          queData = result[i];
        }
      }
      res.send(queData);
    }
  });
});
router.post('/adminLogin', function(req, res) {
      var email = req.body.email;
      var password = req.body.password;
      Adminlogin.findOne({ 'email':email }, (err, response) => {
      // console.log(res.password);
      if (response) {
        bcrypt.compare(password, response.hash, function (err, isMatch) {
          if (err && !isMatch) {
            res.send(`there is an error`);
          };
  
          if (!isMatch) {
            res.send(`UserName/password is wrong`);
          } else {
            // req.session.user=isMatch;
            console.log(`login success`);
            // req.session.a = 1;
            res.render('dashboard');
          }
        });
      }
  
});
});
router.get('/ModifyQuestion', function(req, res) {
  Questions.find().exec(function(err, result){
          if(err)
          {
            console.log(err);
          }
          else{
            console.log(result);
            res.render('./modifyQuestions',{"questions" : result});
          }
        });
});

router.post('/updateQuestions', function (req, res) {
  var question = req.body.question;
  var questionNo = req.body.questionNo;
  Questions.updateOne({ question_no: questionNo }, { $set: question }, function (err, result) {
    if (err)
    {
      console.log(err);
      res.send({ 'err': err });
    }
    else
    {
      res.send({ 'success': result });
    }
  });
});

router.post('/deleteQuestions', function (req, res) {
  var questionNo = req.body.questionNo;
  Questions.remove({ question_no: questionNo }, function (err, result) {
    if (err) {
      console.log(err);
      res.send({ 'err': err });
    }
    else {
      res.send({ 'success': result });
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err){
   if(err){
     console.log(err);
   }
   
  });
  res.render("/");
});
router.get('/delete', function(req, res) {
  var q_nummber={
    "question_no" :req.query.q_no
  }
  console.log(q_nummber.question_no);
  res.render("/modifyQuestions");
});
router.get('/modify', function(req, res) {
  res.render("/");
});
router.post('/AddQuestion', function(req, res) {
  var questions={
    question_no:req.body.question_no,
    question:req.body.question,
    option1:req.body.option1,
    option2:req.body.option2,
    option3:req.body.option3,
    option4:req.body.option4,
    correct_option:req.body.correct_option

  }
Questions.create(questions,(err,response)=>{
if(err){
console.log(err);
}else{
  console.log('Questions SuccessFully Added');
  res.render('SetQuestions');
}
});
 
});
router.get('/addStudent', function(req, res) {
  // if(!req.session.user){
  //   res.send('You are not Logged In')
  // }else{
    res.render('AddStudent');
  // } 
});

router.post('/addStudent', function (req, res) {
  // console.log(req.body);
  var signupData = {
    username: req.body.username,
    email: req.body.email,
    candidate_id: req.body.id
  }
  var studentData = new signup(signupData);
  studentData.save(function (err, result) {
    if (err)
    {
      console.log(err);
    }
    else
    {
      res.render('AddStudent');
      }
  });
});


router.get('/setExamQuestions', function (req, res) {
  Questions.find({}, { _id: 0, question_no:1},function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      // console.log(result);
      var question_no = 0;
      if (result.length > 0)
      {
        for (var i = 0; i < result.length; i++)
        {
          if (Number(result[i].question_no) > question_no)
          {
            question_no = Number(result[i].question_no);
          }
        }
        question_no += 1;
        res.render('SetQuestions', { 'lastQuestionNo': question_no});
      }
      else
      {
        question_no += 1;
        res.render('SetQuestions', { 'lastQuestionNo': question_no });
        }
    }
  });
});

router.get('/seeResult', function(req, res) {
  res.render('seeResult');
});


// var BCRYPT_SALT_ROUNDS = 12;
// router.post('/adminLogin', function (req, res) {
//   console.log(req.body);
//   var userData = {
//     username : req.body.username,
//     email : req.body.email,
//   };
//   bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
//     .then(function(hashedPassword) {
//       userData.salt =BCRYPT_SALT_ROUNDS;
//       userData.hash = hashedPassword;
//       var adminData = new Adminlogin(userData);
//       adminData.save(function (err, adminResult) {
//         if (err)
//         {
//           console.log(err);
//           }
//         else
//         {
//           console.log(adminResult);
//           }
//       });
//     //   console.log('Hashcode is:'+ hashedPassword);
//     //   Adminlogin.create(userData);
//     //  console.log('Successfully inserted');
//     //  signup1.find().exec(function(err, result){
//     //   if(err)
//     //   {
//     //     console.log(err);
//     //   }
//     //   else{
//     //     console.log(result);
//     //     res.render('./profile',{"user" : result});
//     //   }
//     // });
//     })
//     res.render('AdminPage');
//   });
  
module.exports = router;
