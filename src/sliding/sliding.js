$(document).ready(function() {
    var slidingBox = $("#sliding-box");

    $('#overflow').on('click', function() {
        $('.sliding-background').toggleClass('blocking');
    });

    $('#slider').on('change mousemove', function () {
        var value = $(this).val();
        slidingBox.attr('style', `top: ${value}px`);
    });
});