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


    $(".startSession").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()

        let a = startSession()
    })


    $('.open-panel').click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        let panel = $(this).attr("data-panel");
        $("#"+panel).show("fast");
        $("#new-charge select").val("")
        $("#new-charge textarea").val(" ")
        $("#new-charge .number").val(" ")

        $(this).toggleClass("active");

        switch (panel) {
            case ("panel-charge") : {
                if ($("#table-charges-new").is(':hidden'))
                    storeCharge.dispatch(addChargeEmpty())
                else
                    storeCharge.dispatch(addChargeEmptyNew())
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
        storeCharge.dispatch(emptyCharge())
    })


    ////////////////////ITEMS//////////////////////////////
    $("#updateItemNew").click(function(e) {
        $("#panel-item").animate({width:'toggle'},150);
    })

    $("#updateItemss").click(function(e) {
        e.preventDefault();

        let idItem = $(this).attr('data-id')
        //add a change counter
        Utils.blockUI();
        let a = $("#new-item").serializeArray();
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

        console.log(item)
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
                Utils.unblockUI()
                $("#panel-item").animate({width:'toggle'},150);
            })
            .catch(function(error) {
                Utils.unblockUI()
                console.log("error", error)
                codeError = 'Error on field';
                show = true;
                field = "oldValue";
                module = 'Service Items'
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

            })
    })


    //boton send new item on edit form
    $("#sendItem").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        let item = storeItem.getState().singleItem[1]
        Object.assign(item, {'magaya__SQuote_Name': idmQuoteToEdit})
        Object.assign(item, {"magaya__Package_Type": $("select[name=magaya__Package_Type]").val()})
        console.log("Send Item", item)

        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: item, Trigger: [] })
        .then(function(data) {
            res = data.data;
            console.log("Item insert result", res)
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
                    $(`#panel-item`).animate({width:'toggle'},150);
                }
            })
        })
        .catch(function(error){
            console.log(error)
            dataError = error.data[0];
            codeError = `${dataError.code} on field ${dataError.details.api_name}. Error Type: ${dataError.message}`;
            field = dataError.details.api_name;
            show = false;
            module = 'Items'
            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
        })
    })


    //boton new item from new mquote form
    $("#newItem").click(function(e) {
        //button add package
        e.preventDefault();
        e.stopImmediatePropagation();

        let $form = $("#new-item");
        let item = getFormData($form);
        Object.assign(item, {"magaya__Package_Type": {'id': $("select[name=magaya__Package_Type]").val(), 'name':$("select[name=magaya__Package_Type] option:selected").text()}})

        console.log("new item", item)
        storeItem.dispatch(addItemOnNew({...item}))
        $(`#panel-item`).animate({width:'toggle'},150);
    });

    //boton sendCharges on edit form
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();
        store.dispatch(addActionEdited())

        let charge = storeCharge.getState().singleCharge[1]
        Object.assign(charge, {"magaya__SQuote_Name": idmQuoteToEdit})
        Object.assign(charge, {'magaya__ApplyToAccounts': accountId})
        //Object

        //quitarles las comas a los numeros grandes
        charge.magaya__Price = (charge.magaya__Price.toString()).replace(/[,]/g, '')
        charge.magaya__Amount = (charge.magaya__Amount.toString()).replace(/[,]/g, '')
        charge.magaya__Amount_Total = charge.magaya__Amount_Total.toString().replace(/[,]/g, '')
        charge.magaya__Tax_Amount = charge.magaya__Tax_Amount.toString().replace(/[,]/g, '')

        console.log("Charge send", charge)
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: charge, Trigger: [] })
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
                            storeCharge.dispatch(emptyCharge())

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
                $(`#panel-charge`).animate({width:'toggle'},150);
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

        let charge = storeCharge.getState().emptyCharge[1]
        let accountId = $("select[name=Account]").val()

        Object.assign(charge, {'magaya__ApplyToAccounts': accountId})
        Object.assign(charge, {'magaya__Tax': $("select[name=magaya__Tax]").val()})

        console.log("new charge", charge)
        storeCharge.dispatch(addChargeOnNew({...charge}))
        storeCharge.dispatch(emptyCharge())
        $(`#panel-charge`).animate({width:'toggle'},150);
    })


    //boton add mquote
    $(".addMquote").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#Title").html("Add mQuote");

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
        $("#nav-home-tab").addClass("active");
        $("#menu5").addClass("active show");
        $("#nav-general-tab").removeClass("active");
        $("#nav-routing-tab").removeClass("active");
        $("#nav-charges-tab").removeClass("active");
        $("#nav-items-tab").removeClass("active");
        $("#nav-terms-tab").removeClass("active");
        $("#nav-notes-tab").removeClass("active");
        $("#menu1").removeClass("show active");
        $("#menu2").removeClass("show active");
        $("#menu3").removeClass("show active");
        $("#menu4").removeClass("show active");
        $("#menu6").removeClass("show active");
        $("#menu7").removeClass("show active");

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

        $("#addNoteNew").show()
        $("#notes-new").show()
        $("#addNote").hide()
        $("#notes").hide()

        $("#mquoteModal").modal("show")
    })


    $("#addNoteNew").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        console.log("Ädding note")
        let subject = $("input[name=notes_subject]").val()
        let note = $("#notes_body").val()
        let now = moment().format("YYYY-MM-DD hh:mm:ss");
        let user = localStorage.getItem('current_user')

        let noteall = `<tr><td class="Delete">
        <span class="material-icons oculto del-item-note-new">clear</span></td>
        <td style="width:25%" class="Note_Title">${subject}</td>
        <td style="width:25%" class="Note_Content">${note}</td>
        <td class="NoData">${now}</td><td class="NoData">${user}</td>
        <td style="width:25%" class="Note_Title">${subject}</td>
        </tr>`
        $(noteall).appendTo("#notes-new tbody")
    })



 //boton send new mquote
 $("#Save").click(function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()

    //get deal and quote account, now editable
    let accountQuoteData = storeAccounts.getState().quoteAccount
    let dealQuoteData = storeDeal.getState().dealQuote[0]
    let accountQuote = accountQuoteData['id']
    let dealQuote = ""
    if (!_.isEmpty(dealQuote))
        dealQuote = dealQuoteData.id
    //receipt fields
    if (accountId <= 0)
        throw new UserException('Mandatory data not found: Client Quote is not defined');

    let contact = $(":input[name=magaya__Representative] option:selected").val()

    let idQuote = quoteToEdit['id']
    let idRouting = 0

    if (!_.isEmpty(quoteToEdit['magaya__Routing']))
        idRouting = quoteToEdit['magaya__Routing']['id']

    let is_hazardous = false;
    let hz = $("input[name=magaya__Is_Hazardous]")
    if ( $( hz ).prop( "checked" ) )
        is_hazardous = true

    let recordData = {
        "id": idQuote,
        "Account": accountQuote,
        "magaya__Deal": dealQuote,
        "magaya__Employee": sanitize($("input[name=magaya__Employee]").val()),
        "magaya__Direction": $(":input[name=magaya__Direction]").val(),
        "magaya__TransportationMode": $("select[name=magaya__TransportationMode] option:selected").val(),
        "magaya__Description": $("#magaya__Description").val().replace(/[^a-zA-Z0-9]/g, ' '),
        "magaya__Service": $("select[name=Service]").val(),
        "magaya__Status": $("select[name=magaya__mQuoteStatus] option:selected").val(),
        "magaya__Is_Hazardous": is_hazardous,
        "magaya__Terms": sanitize($(":input[name=magaya__Terms]").val()),
        "magaya__Representative": contact,
        "magaya__ContactMobile": sanitize($("input[name=Mobile]").val()),
        "magaya__ContactHomePhone": sanitize($("input[name=Phone]").val()),
        "magaya__ContactName": sanitize($("select[name=magaya__Representative] option:selected").text()),
        "magaya__Terms": sanitize($("#magaya__Terms").val()),
        "magaya__Incoterm_rule": $("select[name=magaya__Incoterm_rule]").val(),
        "Owner": $("select[name=Owner]").val()
    }


    let config = {
        Entity:"magaya__SQuotes",
        APIData: recordData
    }

    routingData = {
        "Name": $(":input[name=NameQuote]").val() !== "" ? $(":input[name=NameQuote]").val() : "Routing Data",
        "magaya__Shipper": sanitize($(":input[name=magaya__Shipper] option:selected").text()),
        "magaya__ShipperCity": sanitize($("input[name=magaya__ShipperCity]").val()),
        "magaya__ShipperState": sanitize($("input[name=magaya__ShipperState]").val()),
        "magaya__ShipperCountry": sanitize($("input[name=magaya__ShipperCountry]").val()),
        "magaya__ShipperStreet": sanitize($("input[name=magaya__ShipperStreet]").val()),
        "magaya__Consignee": sanitize($("select[name=magaya__Consignee] option:selected").text()),
        "magaya__ConsigneeCity": sanitize($("input[name=magaya__ConsigneeCity]").val()),
        "magaya__ConsigneeCountry": sanitize($("input[name=magaya__ConsigneeCountry]").val()),
        "magaya__ConsigneeState": sanitize($("input[name=magaya__ConsigneeState]").val()),
        "magaya__ConsigneeStreet": sanitize($("input[name=magaya__ConsigneeStreet]").val()),
        "magaya__MainCarrier": $("select[name=magaya__MainCarrier] option:selected").val(),
        "magaya__ModeofTransportation": $("select[name=magaya__TransportationMode] option:selected").val(),
    }


    //updating data
    ZOHO.CRM.API.updateRecord(config)
        .then(function(response) {
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
            if (idRouting > 0) {
                Object.assign(routingData, {"id": idRouting})
                let configRouting = {
                    Entity: "magaya__Routing",
                    APIData: routingData
                }
                ZOHO.CRM.API.updateRecord(configRouting)
                    .then(function(data) {
                        console.log("Data routing", data)
                    })


            } else {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__Routing", APIData: routingData})
                    .then(function(response) {
                        res = response.data[0]
                        let id = res.details.id
                        console.log("Id routing to insert", res)
                        //update mquote with the new record
                        let recordData = {
                            "id": idQuote,
                            "magaya__Routing": id
                        }
                        let updatemQuoteRouting = {
                            Entity:"magaya__SQuotes",
                            APIData: recordData
                        }

                        ZOHO.CRM.API.updateRecord(updatemQuoteRouting)
                            .then(function(data) {
                                console.log("New Data routing", data)
                        })
                    })
            }

        })
        .then(function() {
            Utils.unblockUI()
        })
        .catch(function(error) {
            Utils.unblockUI()

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
        //subscribe to get data on store
        let dataAccount = storeAccounts.getState()

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

        //let accountId = $(":input[name=Account] option:selected").val()
        let accountId = dataAccount.quoteAccount.id
        let contact = $(":input[name=magaya__Representative] option:selected").val()
        //receipt fields
        if (accountId <= 0 || accountId === undefined || accountId === "undefined")
            throw new UserException('Client Quote not found');

        let is_hazardous = false;
        let hz = $("input[name=magaya__Is_Hazardous]")
        if ( $( hz ).prop( "checked" ) )
            is_hazardous = true

        recordData = {
            "Name": $(":input[name=NameQuote]").val() !== "" ? $(":input[name=NameQuote]").val() : "qt",
            "Account": accountId,
            "magaya__Deal": $(":input[name=Deal] option:selected").val() > 0 ? $(":input[name=Deal] option:selected").val() : '',
            "magaya__ExpirationDate": expirationDateFinal,
            "magaya__Direction": $(":input[name=magaya__Direction]").val(),
            "magaya__Description": sanitize($("#magaya__Description").val()),
            "magaya__Service": $("select[name=Service]").val(),
            "magaya__Status": $("select[name=magaya__mQuoteStatus] option:selected").val(),
            "magaya__Representative": contact,
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
            "magaya__CreatedByName": sanitize($("input[name=magaya__CreatedByName]").val()),
            "magaya__Seller": $("select[name=magaya__Seller]").val(),
            "magaya__Terms": sanitize($("#magaya__Terms").val()),
            "magaya__IssuedBy": $(":input[name=magaya__IssuedByName]").val(),
            "magaya__Incoterm_rule": $("select[name=magaya__Incoterm_rule]").val(),
            "Owner": $("select[name=Owner]").val()
        }


        routingData = {
            "Name": $(":input[name=NameQuote]").val() !== "" ? $(":input[name=NameQuote]").val() : "Routing Data",
            "magaya__Shipper": sanitize($(":input[name=magaya__Shipper] option:selected").text()),
            "magaya__ShipperCity": sanitize($("input[name=magaya__ShipperCity]").val()),
            "magaya__ShipperState": sanitize($("input[name=magaya__ShipperState]").val()),
            "magaya__ShipperCountry": sanitize($("input[name=magaya__ShipperCountry]").val()),
            "magaya__ShipperStreet": sanitize($("input[name=magaya__ShipperStreet]").val()),
            "magaya__Consignee": sanitize($("select[name=magaya__Consignee] option:selected").text()),
            "magaya__ConsigneeCity": sanitize($("input[name=magaya__ConsigneeCity]").val()),
            "magaya__ConsigneeCountry": sanitize($("input[name=magaya__ConsigneeCountry]").val()),
            "magaya__ConsigneeState": sanitize($("input[name=magaya__ConsigneeState]").val()),
            "magaya__ConsigneeStreet": sanitize($("input[name=magaya__ConsigneeStreet]").val()),
            "magaya__MainCarrier": $("select[name=magaya__MainCarrier] option:selected").val(),
            "magaya__ModeofTransportation": $("select[name=magaya__TransportationMode] option:selected").val(),
        }

        console.log("RecordData", recordData)

        //insertind data, get the id and insert items and charges
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__Routing", APIData: routingData, Trigger: [] })
            .then(function(response) {
                res = response.data
                id = 0
                $.map(res, function(k) {
                    id = k.details.id
                })
                return id

            })
            .then(function(idRouting) {
                Object.assign(recordData, {"magaya__Routing": idRouting})

                ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: ["workflow"] })
                    .then(function(response) {
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
                                let data_return = {}
                                ZOHO.CRM.API.getRecord({Entity:"magaya__SQuotes",RecordID:id})
                                    .then(function(data){
                                        record = data.data;
                                        let func_name = "magaya__setQuoteTotalAmount";
                                        let req_data ={
                                            "quote_id" : id
                                        };
                                        data_return = {
                                            "idQuote": id,
                                            "name": record.Name
                                        }
                                        ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                            console.log("Update quote amount", data)
                                        })
                                        storeQuote.dispatch(addQuote(record))

                                    })
                                $("#mquoteModal").modal("hide")

                            }
                        })

                        //console.log("Dat to returne", data_return)

                        return id
                    })
                    .then(function(idQuote) {
                        //let idQuote = data.idQuote
                        //let name = data.name

                        jsonItems = $(this).tableToJson('table-items-new', idQuote);
                        jsonItems = JSON.parse(`[${jsonItems}]`)

                        jsonCharges = $(this).tableToJson('table-charges-new', idQuote);
                        jsonData = JSON.parse(`[${jsonCharges}]`)

                        /*jsonNotes = $(this).tableToJson('notes-new', idQuote)
                        jsonNotesData = JSON.parse(`[${jsonNotes}]`)
                        console.log("Notes", jsonNotesData)
                        //check the data
                        /*if (!_.isEmpty(jsonNotes)) {

                            Object.assign(jsonNotesData, {"Parent_Id": {"name": name, "id": idQuote}})
                            ZOHO.CRM.API.insertRecord({ Entity: "Notes", APIData: jsonNotesData, Trigger: [] })
                                .then(function(response) {
                                    console.log("Response Notes", response)
                                })
                        }*/


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
                            icon: "success",
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
            })
            .then((result) => {

                if (result.isConfirmed) {
                    //location.reload()
                    $("#mquoteModal").modal("hide")
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
}
