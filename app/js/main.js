/* Main */
$(document).ready(function(e){
    $('input[type="checkbox"]').iCheck({checkboxClass: 'checkbox'});
    $('#theyFoundCarousel').carousel({
        // interval: 2000
    })
})
/* auth form placeholder */
.on('focus', 'input', function(e){
    regForm.placeholder(this);
})
/* auth form submit */
.on('submit', '.popupReg-wrapper form', function(e){
    var s = $(this).attr('data-validate') == 'true' ? true : false;
    if(typeof(s) == 'undefined' || !s){
        e.preventDefault();
        regForm.submit(this);
    }
})
/* auth form agree checkbox */
.on('ifClicked', '.popupReg-wrapper input[name="agree"]', function(e){
    regForm.agree();
})
/* auth form input typed */
.on('keyup', '.popupReg-wrapper input[type="text"]', function(e){
    var type = $(this).attr('name'),
        value = $(this).val(),
        form = $(this).parents('form');

    if(value.length > 3){
        clearTimeout(valid_time);
        var valid_time = setTimeout(function(){
            regForm.submit(form, type);
        }, 500);
    }
})
/* auth form input focusout */
.on('focusout', '.popupReg-wrapper input[type="text"]', function(e){
    var type = $(this).attr('name'),
        value = $(this).val(),
        form = $(this).parents('form');
        regForm.submit(form, type);
})
/* auth form input paste */
.on('paste', '.popupReg-wrapper input[type="text"]', function(e){
    var type = $(this).attr('name'),
        value = $(this).val(),
        form = $(this).parents('form');
        regForm.submit(form, type);
});