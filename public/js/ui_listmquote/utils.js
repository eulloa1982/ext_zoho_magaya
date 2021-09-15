var Utils = function(){
    return {
        getConfig : function(){
            //config = localStorage.getItem('config');
            if(config != undefined){
                return JSON.parse(config)
            }else{
                return {
                    url: null,
                    user:null,
                    pass: null
                }
            }
        },
        setConfig: function(config){
            //localStorage.setItem('config', JSON.stringify(config))
        },
        getAccessKey(){
            let access_key = getCookie('access_key');
            console.log("From utils", access_key)
            return access_key;
            //access_key = $( "div" ).data( "accessKey" ).accessKey;
            //console.log("Access key from data")
            //return access_key;
        },
        setAccessKey(value){
            setCookie("access_key", value, 1)
            //localStorage.setItem('access_key', value)
        },
        blockUI: function(container){
            $('#preloader').css('display', 'inline-block');
        },
        unblockUI: function(){
            $('#preloader').css('display', 'none');
        },
        showFormErrors: function(resp, form){
            errors = resp.errors;
            keys = Object.keys(resp.errors);

            $.map(keys, function (i){
                form.find("[name='" + i + "']").addClass('is-invalid');
                form.find("[name='" + i + "']").parents("div").append('<div class="invalid-feedback">' + errors[i] + '</div>');
            })

        },
        hideFormErrors: function(form){
            form.find('.is-invalid').removeClass('is-invalid');
            form.find('.invalid-feedback').remove();
        }
    }
}();
