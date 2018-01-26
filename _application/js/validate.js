/* Validate */
var
validate = {
    pattern: {
        email: /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,8}$/i,
        name: /^[A-z0-9-_+. ,@]{3,}$/i,
    },
    email: function(value){
        if(!this.pattern.email.test(value)){ return false; } else { return true; }
    },
    name: function(value) {
        if(this.pattern.name.test(value)){ return true; } else { return false; }
    }
};