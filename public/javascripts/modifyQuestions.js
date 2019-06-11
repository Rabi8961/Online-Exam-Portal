$(document).ready(function () {
    $(document).on('click', '.modify', function () {
        $(this).addClass('hide');
        var curTd = $(this).closest('tr').find('.question');
        var question = curTd.text().trim();
        var htmlCon = '<span class="questionSpan hide">' + question + '</span><textarea class="questionInput"></textarea>'; 
        curTd.html(htmlCon);
        $(this).closest('tr').find('.questionInput').val(question);
        curTd = $(this).closest('tr').find('.option1');
        var option1 = curTd.text().trim();
        htmlCon = '<span class="option1Span hide">' + option1 + '</span><input type="text" class="option1Input option" value="' + option1 + '">';
        curTd.html(htmlCon);
        curTd = $(this).closest('tr').find('.option2');
        var option2 = curTd.text().trim();
        htmlCon = '<span class="option2Span hide">' + option2 + '</span><input type="text" class="option2Input option" value="' + option2 + '">';
        curTd.html(htmlCon);
        curTd = $(this).closest('tr').find('.option3');
        var option3 = curTd.text().trim();
        htmlCon = '<span class="option3Span hide">' + option3 + '</span><input type="text" class="option3Input option" value="' + option3 + '">';
        curTd.html(htmlCon);
        curTd = $(this).closest('tr').find('.option4');
        var option4 = curTd.text().trim();
        htmlCon = '<span class="option4Span hide">' + option4 + '</span><input type="text" class="option4Input option" value="' + option4 + '">';
        curTd.html(htmlCon);
        curTd = $(this).closest('tr').find('.correctOption');
        var correctOption = curTd.text().trim();
        htmlCon = '<span class="correctOptionSpan hide">' + correctOption + '</span><select class="correctOptionSelect"><option value="1">1</option>';
        htmlCon += '<option value="2">2</option>';
        htmlCon += '<option value="3">3</option>';
        htmlCon += '<option value="4">4</option></select>';
        curTd.html(htmlCon);
        $(this).closest('tr').find('.correctOptionSelect').val(correctOption).trigger('change');
        $(this).closest('tr').find('.update').removeClass('hide');
    });


    $(document).on('click', '.update', function () {
        $(this).addClass('hide');
        var self = $(this);
        var questionNo = self.closest('tr').find('.questionNo').text().trim();
        var question = self.closest('tr').find('.questionInput').val();
        var option1 = self.closest('tr').find('.option1Input').val();
        var option2 = self.closest('tr').find('.option2Input').val();
        var option3 = self.closest('tr').find('.option3Input').val();
        var option4 = self.closest('tr').find('.option4Input').val();
        var correctOption = self.closest('tr').find('.correctOptionSelect').val();
        var data = {
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correct_option: correctOption
        };
        $.ajax({
            type: 'post',
            data: { 'question': data, 'questionNo': questionNo },
            url: '/updateQuestions'
        }).done(function (res) {
            if (res.success) {
                alert('Question is Successfully Modified');
                self.closest('tr').find('.question').html('').text(question);
                self.closest('tr').find('.option1').html('').text(option1);
                self.closest('tr').find('.option2').html('').text(option2);
                self.closest('tr').find('.option3').html('').text(option3);
                self.closest('tr').find('.option4').html('').text(option4);
                self.closest('tr').find('.correctOption').html('').text(correctOption);
                self.closest('tr').find('.modify').removeClass('hide');
            }
        }).catch(function (err) {
            alert('opps! There is some Error...'); 
        });
    });

    $(document).on('click', '.delete', function () {
        var self = $(this);
        var questionNo = self.closest('tr').find('.questionNo').text().trim();
        $.ajax({
            type: 'post',
            data: { 'questionNo': questionNo },
            url: '/deleteQuestions'
        }).done(function (res) {
            if (res.success) {
                alert('Question is Successfully Deleted');
                self.closest('tr').addClass('hide');
            }
        }).catch(function (err) {
            alert('opps! There is some Error...');
        });
    });
});