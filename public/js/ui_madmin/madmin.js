$(document).ready(function(){

    //botton enviar al CRM
    $(".send-to-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var message = '';
        var i = 0;
        let chargesToSend = []
        $("input[class=form-check-magaya]:checked").each(function() {
            id = $(this).attr("data-id");

            storeChargesDef.dispatch(getChargeDef({id: id}))
            chargesToSend.push(chargeMagayaToCRM(chargeDef))

            //

        })
        console.log("All charges to send", chargesToSend)
        insertChargeTypeCRM(chargesToSend)

    })
        //Packages Types
        /*ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:20,page:1})
            .then(function(data){
                $("#select-package").empty();
                $.map (data.data, function (k, i){
                    k.Name = sanitize(k.Name)
                    $("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#select-package");
                    packageType.push(k);
                })
            })*/




})
