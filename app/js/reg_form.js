/**
 * [Reg form]
 * status - status validate
 * placeholder - function placeholder show/hide
 * submit - function on submit form (start validate) 
*/
var
regForm = {
    status: {
        email: false,
        name: false,
        agree: false
    },
    placeholder: function(obj){
        var this_ = $(obj),
        placeholder = $(obj).attr('placeholder');

        this_.attr('placeholder', '');
        if(this_.hasClass('title-animate')){
            this_.parents('label').find('.title').addClass('show');
        }

        $(this_).blur(function(){
            if(this_.val() == '') {
                this_.attr('placeholder', placeholder);

                if(this_.hasClass('title-animate')){
                    this_.parents('label').find('.title').removeClass('show');
                }
            }
        });
    },
    agree: function(){
        /* [agree checkbox] */
        var agree = $('.popupReg-wrapper [name="agree"]');
        this.status.agree = agree.prop('checked') ? true : false;
        if(!this.status.agree) { agree.parents('.checkbox').removeClass('error'); }
    },
    submit: function(obj, type){
        /**
         * [submit funcion]
         * n = input - name
         * e = input - email
         * a = input - agree
         * type = if !type - validate all
        */
        var this_ = $(obj),
            n = this_.find('input[name="name"]'),
            e = this_.find('input[name="mail"]'),
            a = this_.find('input[name="agree"]');

        type = typeof(type) == 'undefined' ? false : type; 

        this.status.name = validate.name(n.val());
        this.status.email = validate.email(e.val());
        this.status.agree = a.prop('checked') ? true : false;

        if(this.status.name && this.status.email && this.status.agree){
        /* validate success */
            this_.attr('data-validate', 'true');
            /* name success */
            if(this.status.name){ status('success', n); }
            /* email success */
            if(this.status.email){ status('success', e); }
            this_.submit();
        }
        else{
        /* validate error */
            this_.removeAttr('data-validate');
            if(!type){
                /* agree */
                var agree = $('.popupReg-wrapper [name="agree"]');
                if(!this.status.agree){
                    this_.find('.agree-line').addClass('error');
                    this_.find('.checkbox').addClass('error');

                    setTimeout(function(){
                        this_.find('.agree-line').removeClass('error');
                    }, 2000);
                }
                else{
                    this_.find('.agree-line').removeClass('error');
                    this_.find('.checkbox').removeClass('error');
                }
            }
            
            if(!type || type == 'name'){
                /* name error */
                if(!this.status.name){ status('error', n); }
                /* name success */
                else{ status('success', n); }
            }

            if(!type || type == 'mail'){
                /* email error */
                if(!this.status.email){ status('error', e); }
                /* email success */
                else{ status('success', e); }
            }
        }

        /**
         * [Success / error class]
         * t = type
         * o = object
         */
        function status(t,o) {
            if(t == 'success'){
                o.parents('label')
                 .addClass('success')
                 .removeClass('error');
            }
            else if(t == 'error') {
                o.parents('label')
                 .removeClass('success')
                 .addClass('error');
            }
            else {
                return false;
            }
        }
    }
};