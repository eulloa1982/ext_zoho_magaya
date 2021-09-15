//////////////////////////////////////////////////////////////////////////////////
    ///////////////////  div edit records ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    $('.edit-record').bind("DOMSubtreeModified", function(e) {

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
                    console.log("Error Fatal", error)
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
                        if (field !== "Name") {
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
