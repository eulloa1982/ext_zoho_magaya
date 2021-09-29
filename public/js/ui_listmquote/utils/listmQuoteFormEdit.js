//////////////////////////////////////////////////////////////////////////////////
    ///////////////////  div edit records ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    $('.edit-record').bind("DOMSubtreeModified", function(e) {
        $('.close').click(function(e){
            e.preventDefault()
            e.stopImmediatePropagation()

            let div_close = $(this).attr("data-close");
            $(`#${div_close}`).animate({width:'toggle'},150);
            //$("#" + div_close).hide()
        })

        $("#updateChargeNew").click(function(e) {
            $("#panel").hide("slow");
        })

        ///////////////////CHARGES//////////////////////////////
        $("#updateCharge").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            let idCharge = $(this).attr('data-id')
            //add a change counter
            store.dispatch(addActionEdited())
            //Utils.blockUI();
            let a = $(".edit-record").serializeArray();
            let charge = {}
            $.each(a, function() {
                if (charge[this.name]) {
                    if (!charge[this.name].push) {
                        charge[this.name] = sanitize([charge[this.name]]);
                    }
                    charge[this.name].push(sanitize(this.value) || '');
                } else {
                    charge[this.name] = sanitize(this.value) || '';
                }
            });

            Object.assign(charge, { id: idCharge, magaya__SQuote_Name: idmQuoteToEdit});
            let config = { APIData: charge }
            Object.assign(config, { Entity: "magaya__ChargeQuote" });


            ZOHO.CRM.API.updateRecord(config)
                .then(function(data){
                    res = data.data;
                    $.map(res, function(k, v) {
                        console.log("Error", k)
                        if (k.code !== "SUCCESS") {
                            codeError = k.code;
                            field = k.details.api_name;
                            show = true;
                            module = 'Service Items'
                            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                        } else {
                            var func_name = "magaya__setQuoteTotalAmount";
                            var req_data ={
                                "quote_id" : idmQuoteToEdit
                            };

                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Update quote amount", data)
                            })

                            ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                                .then(function(data){
                                    record = data.data;

                                    $.map(record, function(k, v){
                                        storeCharge.dispatch(updateCharge({...k}))
                                    })


                                })


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

                })

                $("#panel").animate({width:'toggle'},150);
        })


        $(".no-border-charge").focus(function(e) {
            $(this).addClass("editable");

            oldValue = $(this).val()
        })

        $(".no-border-charge").on("change blur", function(e) {
            e.preventDefault();
            e.stopImmediatePropagation()

            $(this).removeClass("editable")

            //let idQuote = quoteToEdit.id
            let value = sanitize($(this).val());
            let field = $(this).attr('name');
            let idCharge = $(this).attr("data-id")
            //check class for each field
            if (field !== undefined && field !== 'undefined') {

                value = sanitize(value)
                if (field === "Adjustment" || field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = roundDec(value);
                }

                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {

                    //let json_items ='{"id":"'+ idCharge +'", "' + field + '": "' + value + '"}';
                    //message = " : Item Updated!!";
                    storeCharge.dispatch(setAmount({field: field, value: value}))
                    //storeSuccess.dispatch(addSuccess({message: message}))
                }
            }

        })

        //////////////////////////////////////////////////////////////////
            ///////// data in situ editable
            ///// VALORAR QUITAR
            ///// VERIFICAR, DEBE SOBRAR
            ///////////////////////////////////////////////////////////////////
            /*$(".no-border-charge-new").focus(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-charge-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');
                let idItem = $(this).attr("data-id")
                value = sanitize(value);
                if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = parseFloat(value);
                }
                console.log(`${idItem}, ${field} ${value}`)
                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {
                    //storeCharge.dispatch(updateCharge({id:idItem, field: field, value: value}))
                    storeCharge.dispatch(setAmountOnNew({id:idItem, field: field, value: value}))
                }
            })*/

            ////////////////////ITEMS//////////////////////////////
            $("#updateItemNew").click(function(e) {
                $("#panel").hide("slow");
            })

            $("#updateItem").click(function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                let idItem = $(this).attr('data-id')
                //add a change counter
                store.dispatch(addActionEdited())
                //Utils.blockUI();
                let a = $(".edit-record").serializeArray();
                let item = {}
                $.each(a, function() {
                    if (item[this.name]) {
                        if (!item[this.name].push) {
                            item[this.name] = sanitize([item[this.name]]);
                        }
                        item[this.name].push(sanitize(this.value) || '');
                    } else {
                        item[this.name] = sanitize(this.value) || '';
                    }
                });

                Object.assign(item, { id: idItem, magaya__SQuote_Name: idmQuoteToEdit});
                let config = { APIData: item }
                Object.assign(config, { Entity: "magaya__ItemQuotes" });

                console.log(config)
                ZOHO.CRM.API.updateRecord(config)
                    .then(function(data){
                        res = data.data;
                        $.map(res, function(k, v) {
                            if (k.code !== "SUCCESS") {
                                codeError = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'Cargo Items'
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                            } else {
                                ZOHO.CRM.API.getRecord({Entity:"magaya__ItemQuotes",RecordID:idItem})
                                .then(function(data){
                                    console.log("response get item", data)
                                    record = data.data[0];
                                    storeItem.dispatch(updateItem({...record}))
                                })
                                message = " : Item Updated!!";
                                storeSuccess.dispatch(addSuccess({message: message}))
                            }
                        })

                    })
                    .catch(function(error) {
                        console.log("error", error)
                        codeError = 'Error on field';
                        show = true;
                        field = "oldValue";
                        module = 'Service Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    })

                    $("#panel").animate({width:'toggle'},150);

            })




            //editable in situ
            $(".no-border-item").click(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })

            $(".no-border-item").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")

                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');

                //it have to be any class attached
                if (field !== undefined && field !== 'undefined') {
                    let idItem = $(this).attr("data-id");

                    //pintamos el nuevo value parseado
                    $(this).val(value);
                    if (oldValue.toString() !== value.toString()) {
                        value = sanitize(value)
                        if (field !== "Name" && field !== "magaya__Pieces") {
                            value = roundDec(value)
                        }

                        let json_items ='{"id":"'+ idItem +'", "' + field + '": "' + value + '"}';
                        storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                        storeItem.dispatch(setVolume({id:idItem, field: field, value: value}))
                        //storeSuccess.dispatch(addSuccess({message: message}))



                    }
                }
            })


            $(".no-border-item-new").click(function(e) {
                $(this).addClass("editable");

                oldValue = $(this).val()
            })

            $(".no-border-item-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let field = $(this).attr('name');
                let value = $(this).val()

                value = sanitize(value)

                if (field !== "Name")
                    value = roundDec(value);

                let idItem = $(this).parent().attr("data-id")
                //pintamos el nuevo value parseado
                $(this).val(value);
                if (oldValue.toString() !== value.toString()) {
                    storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                    storeItem.dispatch(setVolumeOnNew({id:idItem, field: field, value: value}))
                }

            })


    })





/*let accountId = 0;
let idmQuoteToEdit = 0;
let chargesType = []
///////subscriptor single quote edit
storeQuote.subscribe(() => {
    quoteToEdit = storeQuote.getState().quoteToEdit
    if (!_.isEmpty(quoteToEdit.Account)) {
        accountId = quoteToEdit.Account.id
    }
})
storeChargesType.subscribe(() => {
    chargesType = storeChargesType.getState()
    /*$.map(chargesType, function(k) {
        k.magaya__Tax_Rate = sanitize(k.magaya__Tax_Rate)
        k.Name = sanitize(k.Name)
        $(`<option value="${k.magaya__Tax_Rate0}">${k.Name}</option>`).appendTo("select[name=magaya__ChargeCodes]");
    })*
})
var obs = new MutationObserver(function(mutations, observer) {
    $(".close-panel").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        let panel = $(this).attr("data-panel")
        $(`#${panel}`).animate({width:'toggle'},150);
    })
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();
        store.dispatch(addActionEdited())
        let ChargeType = $("select[name=magaya__ChargeCode] option:selected").val();
        let Status = $("select[name=magaya__Status] option:selected").val();
        let DescriptionCharges = $("input[name=Name]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let ChargeText = DescriptionCharges;
        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=magaya__CQuantity]").val() > 0) ? $("input[name=magaya__CQuantity]").val() : 0;
        let Unity = $("input[name=magaya__Unity]").val() > 0 ? $("input[name=magaya__Unity]").val() : 0;
        let Price = $("input[name=magaya__Price]").val() > 0 ? $("input[name=magaya__Price]").val() : 0;
        Price = roundDec(Price)
        TaxRate = roundDec(TaxRate)
        Quantity = roundDec(Quantity);
        let amount = Price * Quantity;
        amount = roundDec(amount)
        let amount_tax = amount / 100 * TaxRate
        amount_tax = roundDec (amount_tax);
        let amount_total = amount + amount_tax;
        amount_total = roundDec (amount_total)
        let item = {
                'magaya__SQuote_Name': idmQuoteToEdit,
                'Name': DescriptionCharges,
                'magaya__Status': Status,
                'magaya__TaxRate': TaxRate,
                'magaya__Tax_Amount': amount_tax,
                'magaya__Amount_Total': amount_total,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': amount,
                'magaya__Final_Amount': amount_total,
                "magaya__Paid_As": $("select[name=magaya__Paid_As]").val(),
                'magaya__ChargeCurrency': $("select[name=magaya__ChargeCurrency]").val(),
                'magaya__ApplyToAccounts': accountId
        }
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: item, Trigger: [] })
            .then(function(data) {
                res = data.data;
                let idCharge = res[0]['details']['id'];
                if (res[0]["code"] !== "SUCCESS") {
                    codeError = res[0]["code"];
                    field = res[0]['details']["api_name"];
                    show = true;
                    module = 'Service Items'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                } else {
                    ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                        .then(function(data){
                            record = data.data;
                            $.map(record, function(k, v){
                                storeCharge.dispatch(addCharge({...k}))
                            })
                            var func_name = "magaya__setQuoteTotalAmount";
                            var req_data ={
                                "quote_id" : idmQuoteToEdit
                            };
                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Update quote amount", data)
                            })
                            let message = ": Added new Charge item"
                            storeSuccess.dispatch(addSuccess({message: message}))
                        })
                }
            })
            .then(function(){
                Utils.unblockUI()
            })
            .catch(function(error){
                dataError = error.data;
                $.map(dataError, function(k, v) {
                    errorCode = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Service Items'
                    storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))
                })
                Utils.unblockUI()
            })
    })
    //add charges on new mquote form
    $("#newCharges").click(function(e) {
        //e.preventDefault();
        //e.stopImmediatePropagation();
        let ChargeType = sanitize($("select[name=magaya__ChargeCode] option:selected").val());
        let Status = sanitize($("select[name=magaya__Status] option:selected").val());
        let DescriptionCharges = sanitize($("input[name=Name]").val());
        let ChargeText = DescriptionCharges;
        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=magaya__CQuantity]").val() > 0) ? $("input[name=magaya__CQuantity]").val() : 0;
        let Unity = $("input[name=magaya__Unity]").val() !== '' ? $("input[name=magaya__Unity]").val() : 'U';
        let Price = $("input[name=magaya__Price]").val() > 0 ? $("input[name=magaya__Price]").val() : 0;
        Price = roundDec(Price)
        TaxRate = roundDec(TaxRate)
        Quantity = roundDec(Quantity);
        let amount = Price * Quantity;
        amount = roundDec(amount)
        let amount_tax = amount / 100 * TaxRate
        amount_tax = roundDec(amount_tax);
        let amount_total = amount + amount_tax;
        amount_total = roundDec(amount_total)
        let PaidAs = $("select[name=magaya__Paid_As]").val()
        let accountId = $("select[name=Account]").val()
        let item = {
                'Name': DescriptionCharges,
                'magaya__Status': Status,
                'magaya__TaxRate': TaxRate,
                'magaya__Tax_Amount': amount_tax,
                'magaya__Amount_Total': amount_total,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': amount,
                'magaya__Final_Amount': amount_total,
                'magaya__ChargeCurrency': $("select[name=magaya__ChargeCurrency]").val(),
                'magaya__ApplyToAccounts': accountId,
                'magaya__Unit': Unity,
                'magaya__Paid_As': PaidAs
        }
        console.log("New charge", item)
        storeCharge.dispatch(addChargeOnNew({...item}))
        $("select[name=ChargeType]").val('');
        $("input[name=DescriptionCharges]").val('');
        $("input[name=Quantity]").val('');
        $("input[name=Price]").val('');
        $("input[name=magaya__Tax_Amount]").val(''); //posible no va aqui0
        $("input[name=magaya__Amount_Total").val(''); //posible no va aqui
        //$("input[name=TotalTaxAmount]").val('');
    })
        $("#updateChargeNew").click(function(e) {
            $("#panel").hide("slow");
        })
        ///////////////////CHARGES//////////////////////////////
        $("#updateCharge").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            let idCharge = $(this).attr('data-id')
            //add a change counter
            store.dispatch(addActionEdited())
            //Utils.blockUI();
            let a = $(".edit-record").serializeArray();
            let charge = {}
            $.each(a, function() {
                if (charge[this.name]) {
                    if (!charge[this.name].push) {
                        charge[this.name] = sanitize([charge[this.name]]);
                    }
                    charge[this.name].push(sanitize(this.value) || '');
                } else {
                    charge[this.name] = sanitize(this.value) || '';
                }
            });
            Object.assign(charge, { id: idCharge, magaya__SQuote_Name: idmQuoteToEdit});
            let config = { APIData: charge }
            Object.assign(config, { Entity: "magaya__ChargeQuote" });
            ZOHO.CRM.API.updateRecord(config)
                .then(function(data){
                    res = data.data;
                    $.map(res, function(k, v) {
                        console.log("Error", k)
                        if (k.code !== "SUCCESS") {
                            codeError = k.code;
                            field = k.details.api_name;
                            show = true;
                            module = 'Service Items'
                            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                        } else {
                            var func_name = "magaya__setQuoteTotalAmount";
                            var req_data ={
                                "quote_id" : idmQuoteToEdit
                            };
                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Update quote amount", data)
                            })
                            ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                                .then(function(data){
                                    record = data.data;
                                    $.map(record, function(k, v){
                                        storeCharge.dispatch(updateCharge({...k}))
                                    })
                                })
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
                })
                $("#panel").animate({width:'toggle'},150);
        })
        $(".no-border-charge").focus(function(e) {
            $(this).addClass("editable");
            oldValue = $(this).val()
        })
        $(".no-border-charge").on("change blur", function(e) {
            e.preventDefault();
            e.stopImmediatePropagation()
            $(this).removeClass("editable")
            //let idQuote = quoteToEdit.id
            let value = sanitize($(this).val());
            let field = $(this).attr('name');
            let idCharge = $(this).attr("data-id")
            //check class for each field
            if (field !== undefined && field !== 'undefined') {
                value = sanitize(value)
                if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = roundDec(value);
                }
                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {
                    //let json_items ='{"id":"'+ idCharge +'", "' + field + '": "' + value + '"}';
                    //message = " : Item Updated!!";
                    storeCharge.dispatch(setAmount({field: field, value: value}))
                    //storeSuccess.dispatch(addSuccess({message: message}))
                }
            }
        })
        //////////////////////////////////////////////////////////////////
            ///////// data in situ editable
            ///////////////////////////////////////////////////////////////////
            $(".no-border-charge-new").focus(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-charge-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');
                let idItem = $(this).attr("data-id")
                value = sanitize(value);
                if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = parseFloat(value);
                }
                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {
                    //storeCharge.dispatch(updateCharge({id:idItem, field: field, value: value}))
                    storeCharge.dispatch(setAmountOnNew({id:idItem, field: field, value: value}))
                }
            })
            ////////////////////ITEMS//////////////////////////////
            $("#updateItemNew").click(function(e) {
                $("#panel").hide("slow");
            })
            $("#updateItem").click(function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                let idItem = $(this).attr('data-id')
                //add a change counter
                store.dispatch(addActionEdited())
                //Utils.blockUI();
                let a = $(".edit-record").serializeArray();
                let item = {}
                $.each(a, function() {
                    if (item[this.name]) {
                        if (!item[this.name].push) {
                            item[this.name] = sanitize([item[this.name]]);
                        }
                        item[this.name].push(sanitize(this.value) || '');
                    } else {
                        item[this.name] = sanitize(this.value) || '';
                    }
                });
                Object.assign(item, { id: idItem, magaya__SQuote_Name: idmQuoteToEdit});
                let config = { APIData: item }
                Object.assign(config, { Entity: "magaya__ItemQuotes" });
                console.log(config)
                ZOHO.CRM.API.updateRecord(config)
                    .then(function(data){
                        res = data.data;
                        $.map(res, function(k, v) {
                            if (k.code !== "SUCCESS") {
                                codeError = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'Cargo Items'
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                            } else {
                                ZOHO.CRM.API.getRecord({Entity:"magaya__ItemQuotes",RecordID:idItem})
                                .then(function(data){
                                    console.log("response get item", data)
                                    record = data.data[0];
                                    storeItem.dispatch(updateItem({...record}))
                                })
                                message = " : Item Updated!!";
                                storeSuccess.dispatch(addSuccess({message: message}))
                            }
                        })
                    })
                    .catch(function(error) {
                        console.log("error", error)
                        codeError = 'Error on field';
                        show = true;
                        field = "oldValue";
                        module = 'Service Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                    })
                    $("#panel").animate({width:'toggle'},150);
            })
            //editable in situ
            $(".no-border-item").click(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-item").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');
                //it have to be any class attached
                if (field !== undefined && field !== 'undefined') {
                    let idItem = $(this).attr("data-id");
                    //pintamos el nuevo value parseado
                    $(this).val(value);
                    if (oldValue.toString() !== value.toString()) {
                        value = sanitize(value)
                        if (field !== "Name" && field !== "magaya__Pieces") {
                            value = roundDec(value)
                        }
                        let json_items ='{"id":"'+ idItem +'", "' + field + '": "' + value + '"}';
                        storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                        storeItem.dispatch(setVolume({id:idItem, field: field, value: value}))
                        //storeSuccess.dispatch(addSuccess({message: message}))
                    }
                }
            })
            $(".no-border-item-new").click(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-item-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let field = $(this).attr('name');
                let value = $(this).val()
                value = sanitize(value)
                if (field !== "Name")
                    value = roundDec(value);
                let idItem = $(this).parent().attr("data-id")
                //pintamos el nuevo value parseado
                $(this).val(value);
                if (oldValue.toString() !== value.toString()) {
                    storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                    storeItem.dispatch(setVolumeOnNew({id:idItem, field: field, value: value}))
                }
            })
    /*$.each(mutations, function (i, mutation) {
        //alert('Insertion detected: ', mutation.addedNodes);
      var addedNodes = $(mutation.addedNodes);
      var selector = "span.stuff"
      var filteredEls = addedNodes.find(selector).addBack(selector); // finds either added alone or as tree
      filteredEls.each(function () { // can use jQuery select to filter addedNodes
        alert('Insertion detected: ' + $(this).text());
      });
    });*
  });
  var canvasElement = $("#edit-record")[0];
  obs.observe(canvasElement, {childList: true, subtree: true});
//////////////////////////////////////////////////////////////////////////////////
///////////////////  div edit records ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/*$('.edit-record').bind("DOMSubtreeModified", function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
        //boton sendCharges on edit form
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();
        store.dispatch(addActionEdited())
        let ChargeType = $("select[name=magaya__ChargeCode] option:selected").val();
        let Status = $("select[name=magaya__Status] option:selected").val();
        let DescriptionCharges = $("input[name=Name]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let ChargeText = DescriptionCharges;
        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=magaya__CQuantity]").val() > 0) ? $("input[name=magaya__CQuantity]").val() : 0;
        let Unity = $("input[name=magaya__Unity]").val() > 0 ? $("input[name=magaya__Unity]").val() : 0;
        let Price = $("input[name=magaya__Price]").val() > 0 ? $("input[name=magaya__Price]").val() : 0;
        Price = roundDec(Price)
        TaxRate = roundDec(TaxRate)
        Quantity = roundDec(Quantity);
        let amount = Price * Quantity;
        amount = roundDec(amount)
        let amount_tax = amount / 100 * TaxRate
        amount_tax = roundDec (amount_tax);
        let amount_total = amount + amount_tax;
        amount_total = roundDec (amount_total)
        let item = {
                'magaya__SQuote_Name': idmQuoteToEdit,
                'Name': DescriptionCharges,
                'magaya__Status': Status,
                'magaya__TaxRate': TaxRate,
                'magaya__Tax_Amount': amount_tax,
                'magaya__Amount_Total': amount_total,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': amount,
                'magaya__Final_Amount': amount_total,
                "magaya__Paid_As": $("select[name=magaya__Paid_As]").val(),
                'magaya__ChargeCurrency': $("select[name=magaya__ChargeCurrency]").val(),
                'magaya__ApplyToAccounts': accountId
        }
        console.log("Charge new", item)
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: item, Trigger: [] })
            .then(function(data) {
                res = data.data;
                let idCharge = res[0]['details']['id'];
                if (res[0]["code"] !== "SUCCESS") {
                    codeError = res[0]["code"];
                    field = res[0]['details']["api_name"];
                    show = true;
                    module = 'Service Items'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                } else {
                    ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                        .then(function(data){
                            record = data.data;
                            $.map(record, function(k, v){
                                storeCharge.dispatch(addCharge({...k}))
                            })
                            var func_name = "magaya__setQuoteTotalAmount";
                            var req_data ={
                                "quote_id" : idmQuoteToEdit
                            };
                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Update quote amount", data)
                            })
                            let message = ": Added new Charge item"
                            storeSuccess.dispatch(addSuccess({message: message}))
                        })
                }
            })
            .then(function(){
                Utils.unblockUI()
            })
            .catch(function(error){
                dataError = error.data;
                $.map(dataError, function(k, v) {
                    errorCode = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Service Items'
                    storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))
                })
                Utils.unblockUI()
            })
    })
    //add charges on new mquote form
    $("#newCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let ChargeType = sanitize($("select[name=magaya__ChargeCode] option:selected").val());
        let Status = sanitize($("select[name=magaya__Status] option:selected").val());
        let DescriptionCharges = sanitize($("input[name=Name]").val());
        let ChargeText = DescriptionCharges;
        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=magaya__CQuantity]").val() > 0) ? $("input[name=magaya__CQuantity]").val() : 0;
        let Unity = $("input[name=magaya__Unity]").val() !== '' ? $("input[name=magaya__Unity]").val() : 'U';
        let Price = $("input[name=magaya__Price]").val() > 0 ? $("input[name=magaya__Price]").val() : 0;
        Price = roundDec(Price)
        TaxRate = roundDec(TaxRate)
        Quantity = roundDec(Quantity);
        let amount = Price * Quantity;
        amount = roundDec(amount)
        let amount_tax = amount / 100 * TaxRate
        amount_tax = roundDec(amount_tax);
        let amount_total = amount + amount_tax;
        amount_total = roundDec(amount_total)
        let PaidAs = $("select[name=magaya__Paid_As]").val()
        let accountId = $("select[name=Account]").val()
        let item = {
                'Name': DescriptionCharges,
                'magaya__Status': Status,
                'magaya__TaxRate': TaxRate,
                'magaya__Tax_Amount': amount_tax,
                'magaya__Amount_Total': amount_total,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': amount,
                'magaya__Final_Amount': amount_total,
                'magaya__ChargeCurrency': $("select[name=magaya__ChargeCurrency]").val(),
                'magaya__ApplyToAccounts': accountId,
                'magaya__Unit': Unity,
                'magaya__Paid_As': PaidAs
        }
        console.log("New charge", item)
        storeCharge.dispatch(addChargeOnNew({...item}))
        $("select[name=ChargeType]").val('');
        $("input[name=DescriptionCharges]").val('');
        $("input[name=Quantity]").val('');
        $("input[name=Price]").val('');
        $("input[name=magaya__Tax_Amount]").val(''); //posible no va aqui0
        $("input[name=magaya__Amount_Total").val(''); //posible no va aqui
        //$("input[name=TotalTaxAmount]").val('');
    })
        $("#updateChargeNew").click(function(e) {
            $("#panel").hide("slow");
        })
        ///////////////////CHARGES//////////////////////////////
        $("#updateCharge").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            let idCharge = $(this).attr('data-id')
            //add a change counter
            store.dispatch(addActionEdited())
            //Utils.blockUI();
            let a = $(".edit-record").serializeArray();
            let charge = {}
            $.each(a, function() {
                if (charge[this.name]) {
                    if (!charge[this.name].push) {
                        charge[this.name] = sanitize([charge[this.name]]);
                    }
                    charge[this.name].push(sanitize(this.value) || '');
                } else {
                    charge[this.name] = sanitize(this.value) || '';
                }
            });
            Object.assign(charge, { id: idCharge, magaya__SQuote_Name: idmQuoteToEdit});
            let config = { APIData: charge }
            Object.assign(config, { Entity: "magaya__ChargeQuote" });
            ZOHO.CRM.API.updateRecord(config)
                .then(function(data){
                    res = data.data;
                    $.map(res, function(k, v) {
                        console.log("Error", k)
                        if (k.code !== "SUCCESS") {
                            codeError = k.code;
                            field = k.details.api_name;
                            show = true;
                            module = 'Service Items'
                            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                        } else {
                            var func_name = "magaya__setQuoteTotalAmount";
                            var req_data ={
                                "quote_id" : idmQuoteToEdit
                            };
                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Update quote amount", data)
                            })
                            ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                                .then(function(data){
                                    record = data.data;
                                    $.map(record, function(k, v){
                                        storeCharge.dispatch(updateCharge({...k}))
                                    })
                                })
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
                })
                $("#panel").animate({width:'toggle'},150);
        })
        $(".no-border-charge").focus(function(e) {
            $(this).addClass("editable");
            oldValue = $(this).val()
        })
        $(".no-border-charge").on("change blur", function(e) {
            e.preventDefault();
            e.stopImmediatePropagation()
            $(this).removeClass("editable")
            //let idQuote = quoteToEdit.id
            let value = sanitize($(this).val());
            let field = $(this).attr('name');
            let idCharge = $(this).attr("data-id")
            //check class for each field
            if (field !== undefined && field !== 'undefined') {
                value = sanitize(value)
                if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = roundDec(value);
                }
                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {
                    //let json_items ='{"id":"'+ idCharge +'", "' + field + '": "' + value + '"}';
                    //message = " : Item Updated!!";
                    storeCharge.dispatch(setAmount({field: field, value: value}))
                    //storeSuccess.dispatch(addSuccess({message: message}))
                }
            }
        })
        //////////////////////////////////////////////////////////////////
            ///////// data in situ editable
            ///////////////////////////////////////////////////////////////////
            $(".no-border-charge-new").focus(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-charge-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');
                let idItem = $(this).attr("data-id")
                value = sanitize(value);
                if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = parseFloat(value);
                }
                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {
                    //storeCharge.dispatch(updateCharge({id:idItem, field: field, value: value}))
                    storeCharge.dispatch(setAmountOnNew({id:idItem, field: field, value: value}))
                }
            })
            ////////////////////ITEMS//////////////////////////////
            $("#updateItemNew").click(function(e) {
                $("#panel").hide("slow");
            })
            $("#updateItem").click(function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                let idItem = $(this).attr('data-id')
                //add a change counter
                store.dispatch(addActionEdited())
                //Utils.blockUI();
                let a = $(".edit-record").serializeArray();
                let item = {}
                $.each(a, function() {
                    if (item[this.name]) {
                        if (!item[this.name].push) {
                            item[this.name] = sanitize([item[this.name]]);
                        }
                        item[this.name].push(sanitize(this.value) || '');
                    } else {
                        item[this.name] = sanitize(this.value) || '';
                    }
                });
                Object.assign(item, { id: idItem, magaya__SQuote_Name: idmQuoteToEdit});
                let config = { APIData: item }
                Object.assign(config, { Entity: "magaya__ItemQuotes" });
                console.log(config)
                ZOHO.CRM.API.updateRecord(config)
                    .then(function(data){
                        res = data.data;
                        $.map(res, function(k, v) {
                            if (k.code !== "SUCCESS") {
                                codeError = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'Cargo Items'
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                            } else {
                                ZOHO.CRM.API.getRecord({Entity:"magaya__ItemQuotes",RecordID:idItem})
                                .then(function(data){
                                    console.log("response get item", data)
                                    record = data.data[0];
                                    storeItem.dispatch(updateItem({...record}))
                                })
                                message = " : Item Updated!!";
                                storeSuccess.dispatch(addSuccess({message: message}))
                            }
                        })
                    })
                    .catch(function(error) {
                        console.log("error", error)
                        codeError = 'Error on field';
                        show = true;
                        field = "oldValue";
                        module = 'Service Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                    })
                    $("#panel").animate({width:'toggle'},150);
            })
            //editable in situ
            $(".no-border-item").click(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-item").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');
                //it have to be any class attached
                if (field !== undefined && field !== 'undefined') {
                    let idItem = $(this).attr("data-id");
                    //pintamos el nuevo value parseado
                    $(this).val(value);
                    if (oldValue.toString() !== value.toString()) {
                        value = sanitize(value)
                        if (field !== "Name" && field !== "magaya__Pieces") {
                            value = roundDec(value)
                        }
                        let json_items ='{"id":"'+ idItem +'", "' + field + '": "' + value + '"}';
                        storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                        storeItem.dispatch(setVolume({id:idItem, field: field, value: value}))
                        //storeSuccess.dispatch(addSuccess({message: message}))
                    }
                }
            })
            $(".no-border-item-new").click(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })
            $(".no-border-item-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let field = $(this).attr('name');
                let value = $(this).val()
                value = sanitize(value)
                if (field !== "Name")
                    value = roundDec(value);
                let idItem = $(this).parent().attr("data-id")
                //pintamos el nuevo value parseado
                $(this).val(value);
                if (oldValue.toString() !== value.toString()) {
                    storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                    storeItem.dispatch(setVolumeOnNew({id:idItem, field: field, value: value}))
                }
            })
    })*/
