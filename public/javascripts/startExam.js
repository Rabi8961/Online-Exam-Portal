$(document).ready(function(){
var marks =0;
var wrong =0;
$(document).on("click","#btnStart",function(){
if($("#chk_agree").is(":checked")){
window.location.href= "/startExam";
     }
     else{
         alert('Please read the instruction and check I agree');
     }
   });


   $(document).on("click","#btnNext",function(){
    var question_no= $("#q_no").text();
    // console.log(question_no);
    var selected_Option=$('input[name=optradio]:checked').val();
    var ans = $('#opt'+selected_Option).text();
    Selected_data = {
     "answer" : selected_Option,
     "question_number" : question_no
 };
//  console.log(Selected_data);
    $.ajax(
     {
         type:"post",
        data: Selected_data,
        url:"/selectedData",
        datatype:"JSON"
     }
 ).done(function(res){
     console.log(res);
     if(res == "true")
     {
         marks = marks +1;
     }
     else 
     {
         wrong +=1;
     }
     data = {
         "number" :question_no
     };
     $.ajax(
         {
              type:"POST",
            data: data,
            url:"/ExamData",
            datatype:"JSON"
         }
     ).done(function(res){
         console.log(res);
         $("#q_no").html("");
          $("#question").html("");
          $("#opt1").html("");
          $("#opt2").html("");
          $("#opt3").html("");
          $("#opt4").html("");

          if(isEmpty(res)) {
              $('#displayQuestions').hide();
              $('#qhead').hide();
              $('#correct').html("Total correct: "+marks);
              $('#incorrect').html("Total Incorrect: "+wrong);
            console.log('not getting data');
            // window.location="/finalMarks?correct="+marks+"&wrong="+wrong;
        } 
        else
        {
          $("#q_no").html(res.question_no);
          $("#question").html(res.question);
          $("#opt1").html(res.option1);
          $("#opt2").html(res.option2);
          $("#opt3").html(res.option3);
          $("#opt4").html(res.option4);
        }
     }).catch(function(err){
      console.log(err);
     });
 }).catch(function(err){
  console.log(err);
 });
    $( "input[name=optradio]" ).prop( "checked", false );
    var ans={
        "correct":marks,
        "wrong":wrong
    }
 //    window.location.href="/finalMarks?correct="+marks+"&wrong="+wrong;
 //    $.ajax(
 //     {
 //         type:"post",
 //        data: ans,
 //        url:"/finalResult",
 //        datatype:"JSON"
 //     }
 //    ).success(function(res){
 //      console.log(res);
 //    });
});

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


// $('#tblResult').DataTable();
});