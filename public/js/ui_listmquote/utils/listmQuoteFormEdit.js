$("#updateChargeNew").click(function(e) {
    $("#panel-charge").hide("slow");
})

///////////////////CHARGES//////////////////////////////
$("#updateCharge").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let idCharge = $(this).attr('data-id')
    //add a change counter
    store.dispatch(addActionEdited())
    Utils.blockUI();
    let a = $("#new-charge").serializeArray();
    let charge = {}
    $.each(a, function() {
        if (charge[this.name]) {
            if (!charge[this.name].push) {
                charge[this.name] = sanitize([charge[this.name]]);
            }
            charge[this.name].push(sanitize(this.value) || '');
        } else {
            if (this.name !== "magaya__Tax" && this.name !== "magaya__Charge_Type" && $.isNumeric(this.value)) {
                charge[this.name] = Number(this.value)
            }
            else {
                this.value = this.value.replace(/[,]/g, '')
                charge[this.name] = sanitize(this.value) || '';
            }
        }
    });

    //get textarea
    let quoteToEdit = storeQuote.getState().quoteToEdit
    Object.assign(charge, { id: idCharge, magaya__SQuote_Name: quoteToEdit.id, Name: sanitize($("#Name").val())});
    let config = { APIData: charge }
    Object.assign(config, { Entity: "magaya__ChargeQuote" });
    Object.assign(config, {Trigger:[]})

    console.log("Charges updated", config)

    ZOHO.CRM.API.updateRecord(config)
        .then(function(data){
            res = data.data;
            $.map(res, function(k, v) {
                if (k.code !== "SUCCESS") {
                    codeError = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Service Items'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                } else {
                    var func_name = "magaya__setQuoteTotalAmount";
                    var req_data ={
                        "quote_id" : quoteToEdit.id
                    };

                    ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                        console.log("Update quote amount", data)
                    })

                    ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                        .then(function(data){
                            record = data.data;
                            Utils.unblockUI()
                            $.map(record, function(k, v){
                                storeCharge.dispatch(updateCharge({...k}))
                            })

                            storeCharge.dispatch(emptyCharge())
                        })

                        $("#panel-charge").animate({width:'toggle'},150);
                        let message = ": Updated successfully!!"
                        storeSuccess.dispatch(addSuccess({message: message}))
                }
            })
        })
        .catch(function(error) {
            codeError = 'Error on field';
            show = true;
            field = "oldValue";
            module = 'Service Items'
            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
            Utils.unblockUI()
        })
})
