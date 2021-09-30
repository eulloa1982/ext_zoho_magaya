$(document).ready(function(){
    let idAccount = 0;

    let accountId = 0
    let contact = 0
    //var quoteToEdit = 0


    ////////subscriber singleContact, representative
    storeAccounts.subscribe(() => {
        let contactData = storeAccounts.getState().singleContact
        if (!_.isEmpty(contactData)) {
            contact = contactData[0].id
        }
    })

    ///////subscriptor single quote edit
    storeQuote.subscribe(() => {
        quoteToEdit = storeQuote.getState().quoteToEdit
        if (!_.isEmpty(quoteToEdit.Account)) {
            accountId = quoteToEdit.Account.id
        }
    })



    $('.open-panel').click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        let panel = $(this).attr("data-panel");
        //$('form').toggleClass('show');
        $("#"+panel).show("fast");
        console.log("Opening", panel)
        $(this).toggleClass("active");

        switch (panel) {
            case ("panel-charge") : {
                storeCharge.dispatch(addChargeEmpty())
                break;
            }

            case ("panel-item"): {
                storeItem.dispatch(addItemEmpty())
                break;
            }

            default:
                break
        }

        return false;

      });

    $("#search-by-name").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()

        let val = $("input[type=search]").val()
        storeQuote.dispatch(findByName({char: val}))

        $("#panel-search").show("fast");
        $(this).toggleClass("active"); return false;

    })

    $('.close').click(function(e){
        e.preventDefault()
        e.stopImmediatePropagation()

        let div_close = $(this).attr("data-close");
        $(`#${div_close}`).animate({width:'toggle'},150);
        //$("#" + div_close).hide()
    })


    //boton send new item on edit form
    $("#sendItem").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        //store.dispatch(addActionEdited())
        rowIndex = $("#select-package").val();
        let $form = $("#new-item");
        let item = getFormData($form);
        Object.assign(item, {"Name": $('#new-item select[name=Name] option:selected').text()})
        Object.assign(item, {'magaya__SQuote_Name': idmQuoteToEdit})

        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: item, Trigger: [] })
        .then(function(data) {
            res = data.data;
            $.map(res, function(k, v) {
                if (k.code !== "SUCCESS") {
                    codeError = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Cargo Items'

                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                } else {
                    let res = data.data;
                    let idItem = res[0].details.id;
                    let message = ': Item Added on module Cargo'

                    //add partial copy to store
                    storeItem.dispatch(addItem({...item, id: idItem}))
                    storeSuccess.dispatch(addSuccess({message: message}))
                }
            })
        })
        .catch(function(error){
            console.log(error)
            dataError = error.data[0];
            //$.map(dataError, function(k, v) {
                codeError = `${dataError.code} on field ${dataError.details.api_name}. Error Type: ${dataError.message}`;
                field = dataError.details.api_name;
                show = false;
                module = 'Items'
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

            //})
        })
    })


    //boton new item from new mquote form
    $("#newItem").click(function(e) {
        //button add package
        e.preventDefault();
        e.stopImmediatePropagation();
        //store.dispatch(addActionEdited())

        let $form = $("#new-item");
        let item = getFormData($form);
        Object.assign(item, {"Name": $('#new-item select[name=Name] option:selected').text()})
        Object.assign(item, {"magaya__Package_Description": $('input[name=magaya__Package_Description]').val()})

        storeItem.dispatch(addItemOnNew({...item}))
        $(`#panel-item`).animate({width:'toggle'},150);
    });

    //boton sendCharges on edit form
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();
        store.dispatch(addActionEdited())
        //get tax code
        let tax_code = sanitize($("select[name=magaya__TaxCode] option:selected").text());
        let $form = $("#new-charge");
        let item = getFormData($form);
        Object.assign(item, {"magaya__SQuote_Name": idmQuoteToEdit})
        Object.assign(item, {'magaya__ApplyToAccounts': accountId})
        Object.assign(item, {"Name": item["magaya__Charge_Description"]})
        Object.assign(item, {"magaya__TaxCode": tax_code})

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
            store.dispatch(addActionEdited())

            let $form = $("#new-charge");
            let item = getFormData($form);
            let accountId = $("select[name=Account]").val()
            Object.assign(item, {'magaya__ApplyToAccounts': accountId})
            Object.assign(item, {"Name": item["magaya__Charge_Description"]})
            storeCharge.dispatch(addChargeOnNew({...item}))
            $(`#panel-charge`).animate({width:'toggle'},150);
        })


    //boton add mquote
    $(".addMquote").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#Heading").html("Add mQuote");

        //drop the state temporal items and charges
        storeItem.dispatch(emptyItems())
        storeCharge.dispatch(emptyCharges())
        storeQuote.dispatch(clearQuoteToEdit())
        storeAccounts.dispatch(emptyAccounts())
        storeAccounts.dispatch(getAllAccounts())
        //representative
        $("select[name=magaya__Representative]").empty()
        //limpiar campos
        limpiar_form()

        //set tab quotatioFor active by default
        /*$("#nav-home-tab").addClass("active");
        $("#menu5").addClass("active show");
        $("#nav-profile-tab").removeClass("active");
        $("#nav-contact-tab").removeClass("active");
        //$("#nav-charges-tab").removeClass("active");
        //$("#nav-items-tab").removeClass("active");
        $("#menu1").removeClass("show active");
        $("#menu2").removeClass("show active");
        $("#menu3").removeClass("show active");
        $("#menu4").removeClass("show active");*/

        $("#table-charges").hide();
        $("#table-charges-new tbody").empty();
        $("#table-charges-new").show();

        $("#table-items").hide();
        $("#table-items-new tbody").empty();
        $("#table-items-new").show();


        $("#New").show();
        $("#Save").hide();
        $("#sendCharges").hide();
        $("#newCharges").show();
        $("#sendItem").hide();
        $("#newItem").show();

        $("#mquoteModal").modal("show")
    })



 //boton send new mquote
 $("#Save").click(function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()

    //receipt fields
    if (accountId <= 0)
        throw new UserException('Mandatory data not found: Client Quote is not defined');

    let idQuote = quoteToEdit['id']

    let is_hazardous = false;
    let hz = $("input[name=magaya__Is_Hazardous]")
    if ( $( hz ).prop( "checked" ) )
        is_hazardous = true

    let recordData = {
        "id": idQuote,
        "magaya__Shipper": $(":input[name=magaya__Shipper] option:selected").text().replace(/[^a-zA-Z0-9]/g, ' '),
        "magaya__Direction": $(":input[name=magaya__Direction]").val(),
        "magaya__TransportationMode": $("select[name=magaya__TransportationMode] option:selected").val(),
        "magaya__Description": $("#magaya__Description").val().replace(/[^a-zA-Z0-9]/g, ' '),
        "magaya__Service": $("select[name=Service]").val(),
        "magaya__ConsigneeName": $("select[name=magaya__ConsigneeName] option:selected").text(),
        "magaya__Carrier": $("select[name=magaya__Carrier] option:selected").val(),
        "magaya__DestinationReceipt": (!_.isEmpty($("input[name=magaya__DestinationReceipt]").val())) ? $("input[name=magaya__DestinationReceipt]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
        "magaya__OriginReceipt": (!_.isEmpty(($("input[name=magaya__OriginReceipt]").val()))) ? $("input[name=magaya__OriginReceipt]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
        "magaya__DestinationPrecarriageBy": (!_.isEmpty($("input[name=magaya__DestinationPrecarriageBy]").val())) ? $("input[name=magaya__DestinationPrecarriageBy]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
        "magaya__OriginPrecarriageBy": (!_.isEmpty(($("input[name=magaya__OriginPrecarriageBy]").val()))) ? $("input[name=magaya__OriginPrecarriageBy]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
        "magaya__Status": $("select[name=magaya__Status] option:selected").val(),
        "magaya__PortofLoading": $("select[name=magaya__PortofLoading]").val(),
        "magaya__PortofUnloading": $("select[name=magaya__PortofUnloading]").val(),
        "magaya__Destination": sanitize($("input[name=magaya__Destination]").val()),
        "magaya__Origin": sanitize($("input[name=magaya__Origin]").val()),
        "magaya__Is_Hazardous": is_hazardous,


    }


    let config = {
        Entity:"magaya__SQuotes",
        APIData: recordData
    }

    //updating data
    ZOHO.CRM.API.updateRecord(config)
        .then(function(response) {
            data = response.data;
            let id = 0;
            $.each(data, function(key, valor) {
                id = valor['details']['id'];
                //console.log(key, valor)
                if (valor.code !== "SUCCESS") {
                    codeError = valor.code;
                    field = valor.details.api_name;
                    show = true;
                    module = 'Service Items'

                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                } else {
                    //get the record from zoho
                    ZOHO.CRM.API.getRecord({Entity:"magaya__SQuotes",RecordID:id})
                        .then(function(data){
                            record = data.data;
                            console.log("Data returned updated", record)
                            storeQuote.dispatch(updateQuote({id: idQuote, ...record}))
                        })

                    message = `mQuote updated!!`
                    storeSuccess.dispatch(addSuccess({message: message}))
                    $("#mquoteModal").modal("hide")

                }
            })

        })
        .then(function() {
            Utils.unblockUI()

        })
        .catch(function(error) {
            dataError = error.data;
            $.map(dataError, function(k, v) {
                errorCode = k.code;
                field = k.details.api_name;
                show = true;
                module = 'mQuote'
                storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))

            })
        })
    })







    //boton send new mquote
    $("#New").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()


        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        //if date is null, date = today
        if (month < 10) {
            expirationDateFinal = `${year}-0${month}-${day}T23:59:59`
        } else {
            expirationDateFinal = `${year}-${month}-${day}T23:59:59`
        }

        let expirationDate = $(":input[name=magaya__ExpirationDate]").val()
        if (expirationDate !== '' && expirationDate !== undefined && expirationDate !== 'undefined') {
            expirationDate = expirationDate.split(" ");
            expirationDateFinal = expirationDate[0] + "T" + expirationDate[1]
        }

        let accountId = $(":input[name=Account] option:selected").val()
        let contact = $(":input[name=magaya__Representative] option:selected").val()
        //receipt fields
        if (accountId <= 0 || accountId === undefined || accountId === "undefined")
            throw new UserException('Mandatory data not found: Client Quote is not defined');

        let is_hazardous = false;
        let hz = $("input[name=magaya__Is_Hazardous]")
        if ( $( hz ).prop( "checked" ) )
            is_hazardous = true

        recordData = {
            "Name": sanitize($(":input[name=NameQuote]").val()),
            "Account": accountId,
            "magaya__Deal": $(":input[name=Deal] option:selected").val() > 0 ? $(":input[name=Deal] option:selected").val() : '',
            "magaya__Shipper": sanitize($(":input[name=magaya__Shipper] option:selected").text()),
            "magaya__ShipperAddress": `${sanitize($("input[name=Shipper_Street]").val())} / ${sanitize($("input[name=Shipper_City]").val())} / ${sanitize($("input[name=Shipper_State]").val())} / ${sanitize($("input[name=Shipper_Country]").val())}`,
            "magaya__ExpirationDate": expirationDateFinal,
            "magaya__Direction": $(":input[name=magaya__Direction]").val(),
            "magaya__TransportationMode": $("select[name=magaya__TransportationMode] option:selected").val(),
            "magaya__Description": sanitize($("#magaya__Description").val()),
            "magaya__Service": $("select[name=Service]").val(),
            "magaya__ConsigneeName": sanitize($("select[name=magaya__ConsigneeName] option:selected").text()),
            "magaya__ConsigneeAddress": `${sanitize($("input[name=Consignee_Street]").val())} / ${sanitize($("input[name=Consignee_City]").val())} / ${sanitize($("input[name=Consignee_State]").val())} / ${sanitize($("input[name=Consignee_Country]").val())}`,
            "magaya__Carrier": $("select[name=magaya__Carrier] option:selected").val(),
            "magaya__DestinationReceipt": sanitize($("input[name=magaya__DestinationReceipt]").val()),
            "magaya__OriginReceipt": sanitize($("input[name=magaya__OriginReceipt]").val()),
            "magaya__DestinationPrecarriageBy": sanitize($("input[name=magaya__DestinationPrecarriageBy]").val()),
            "magaya__OriginPrecarriageBy": sanitize($("input[name=magaya__OriginPrecarriageBy]").val()),
            "magaya__Status": $("select[name=magaya__mQuoteStatus] option:selected").val(),
            "magaya__Representative": contact,
            "magaya__PortofLoading": $("select[name=magaya__PortofLoading]").val(),
            "magaya__PortofUnloading": $("select[name=magaya__PortofUnloading]").val(),
            "magaya__Destination": sanitize($("input[name=magaya__Destination]").val()),
            "magaya__Origin": sanitize($("input[name=magaya__Origin]").val()),
            "magaya__BillingCity": sanitize($("input[name=Mailing_City]").val()),
            "magaya__BillingCountry": sanitize($("input[name=Mailing_Country]").val()),
            "magaya__BillingState": sanitize($("input[name=Mailing_State]").val()),
            "magaya__BillingStreet": sanitize($("input[name=Mailing_Street]").val()),
            "magaya__BillingCode": sanitize($("input[name=Mailing_Zip]").val()),
            "magaya__ContactEmail": sanitize($("input[name=Email]").val()),
            "magaya__ContactMobile": sanitize($("input[name=Mobile]").val()),
            "magaya__ContactHomePhone": sanitize($("input[name=Phone]").val()),
            "magaya__ContactName": sanitize($("select[name=magaya__Representative] option:selected").text()),
            "magaya__Is_Hazardous": is_hazardous,
            "magaya__Magaya_Status": "Open",
            "magaya__AddedTime": $("input[name=magaya__AddedTime]").val(),
            "magaya__Employee": $("select[name=magaya__Employee]").val(),
            "magaya__Seller": $("select[name=magaya__Seller]").val(),
            "magaya__Terms": sanitize($(":input[name=magaya__Terms]").val()),
            "magaya__IssuedBy": $(":input[name=magaya__IssuedByName]").val()
        }

        //jsonCharges = $(this).tableToJson('table-charges-new', 992929292929229);
        //jsonData = JSON.parse(`[${jsonCharges}]`)
       // Object.assign(jsonData, {"magaya__ApplyToAccounts": accountId})
        //console.log("Chrges json", jsonData)
        //insertind data, get the id and insert items and charges
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: [] })
            .then(function(response) {
                console.log("ïnserting mquote response", response)
                data = response.data;
                let id = 0;
                $.each(data, function(key, valor) {
                    id = valor['details']['id'];
                    if (valor.code !== "SUCCESS") {
                        codeError = valor.code;
                        field = valor.details.api_name;
                        show = true;
                        module = 'Service Items'

                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    } else {
                        //get the record from zoho
                        ZOHO.CRM.API.getRecord({Entity:"magaya__SQuotes",RecordID:id})
                            .then(function(data){
                                record = data.data;
                                var func_name = "magaya__setQuoteTotalAmount";
                                var req_data ={
                                    "quote_id" : id
                                };
                                ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                    console.log("Update quote amount", data)
                                })
                                storeQuote.dispatch(addQuote(record))

                            })

                        message = `A new mQuote inserted!!`
                        storeSuccess.dispatch(addSuccess({message: message}))
                        $("#mquoteModal").modal("hide")

                    }
                })

                return id
            })
            .then(function(idQuote) {

                jsonItems = $(this).tableToJson('table-items-new', idQuote);
                jsonItems = JSON.parse(`[${jsonItems}]`)

                jsonCharges = $(this).tableToJson('table-charges-new', idQuote);
                jsonData = JSON.parse(`[${jsonCharges}]`)

                //check the data
                if (!_.isEmpty(jsonItems)) {
                    ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: jsonItems, Trigger: [] })
                        .then(function(response) {
                            res = response.data;
                            console.log("ITEM Operation", res)
                            $.map(res, function(k, v) {
                                if (k.code !== "SUCCESS") {
                                    codeError = k.code;
                                    field = k.details.api_name;
                                    show = true;
                                    module = 'Cargo Items'
                                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                } else {
                                    message = " : Item Updated!!";
                                    storeSuccess.dispatch(addSuccess({message: message}))

                                }
                            })
                        })
                         .catch(function(error) {
                            dataError = error.data;
                            $.map(dataError, function(k, v) {
                                errorCode = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'mQuote'
                                storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))

                            })
                        })
                }

                if (!_.isEmpty(jsonCharges)) {
                    jsonCharges[0]['Name'] = jsonCharges[0]['magaya__Charge_Description'];

                    $.map(jsonData, function(k) {
                        Object.assign(k, {"magaya__ApplyToAccounts": accountId})
                    })

                    ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: jsonData, Trigger: [] })
                        .then(function(response) {
                            res = response.data;
                            console.log("CHARGES OPERATION", res)
                            $.map(res, function(k, v) {
                                if (k.code !== "SUCCESS") {
                                    codeError = k.code;
                                    field = k.details.api_name;
                                    show = true;
                                    module = 'Service Items'
                                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                } else {
                                    message = " : Charges Inserted!!";
                                    storeSuccess.dispatch(addSuccess({message: message}))

                                }
                            })

                        }).catch(function(error) {
                            dataError = error.data;
                            $.map(dataError, function(k, v) {
                                errorCode = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'mQuote'
                                storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))

                            })
                        })
                }
            })
            .then(function() {
                Utils.unblockUI()
                Swal.fire({
                    title: "Success",
                    text: "New mQuote inserted!!!",
                    icon: "question",
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    allowOutsideClick: false

                }).then((result) => {

                    if (result.isConfirmed) {
                        location.reload()
                    }
                })

            })
            .catch(function(error) {
                dataError = error.data;
                $.map(dataError, function(k, v) {
                    errorCode = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'mQuote'
                    storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))
                })
            })
    })


    //////////////////boton cerrar modal////////////////
    $(".cerrar-modal").click(function(e) {
        //verifico si hay acciones de edicion
        let actions = store.getState().actionsCounter
        if (actions > 0) {
            Swal.fire({
                title: "Confirm",
                text: "You'll lose your changes, press Yes to exit or Cancel to continue",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33',
                allowOutsideClick: false
            }).then((result) => {

                if (result.isConfirmed) {
                    location.reload()
                }
            })

        } else {
            $("#mquoteModal").modal("hide")
        }
    })


})


function cleanDataString(arrayData) {

    $.map (arrayData, function (k, v) {
        if (!_.isEmpty(arrayData[v]))
            arrayData[v] = k.replace(/[^a-zA-Z0-9]\.\#/g, ' ')
    })

    //console.log(" Data clean ", arrayData)

}
