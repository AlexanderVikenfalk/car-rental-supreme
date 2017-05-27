$(function() {
    // Calendar for booking date
    $(".datepicker").datepicker();

    // Making radio buttons submit form automatically
    $('input[name=trans]').change(function() {
        $('form').submit();

    });


});