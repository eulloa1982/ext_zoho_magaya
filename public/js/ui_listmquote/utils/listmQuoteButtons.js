$(document).ready(function(){
    let idAccount = 0;

    let accountId = 0
    let contact = 0
    //var quoteToEdit = 0

    jQuery('input[name=magaya__ExpirationDate]').datetimepicker({
        format: 'Y-m-d'
    });
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


    /*********************************************************** */
    /***********buttons add/edit contact and account ************/
    /********************************************************** */
    $("#add_account").click(function(e) {

        $("#account_form")[0].reset()
        $("#NewAccount").show()

        $("#modalAccount").modal("show")
    })


    $("#add_contact").click(function(e) {

        $("#contact_form")[0].reset()
        $("#NewContact").show()

        $("#modalContact").modal("show")
    })


    $("#NewContact").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()

        let $form = $("#contact_form");
        let item = getFormData($form);
        Object.assign(item, {'Account_Name': $("select[name=Account]").val()})

        $.map(item, function (k, v) {
            if (k)
                item[v] = k.toString()
        })

        ZOHO.CRM.API.insertRecord({Entity:"Contacts",APIData:item,Trigger:[]})
        .then(function(data){
            res = data.data;
            $.map(res, function(k, v) {
                if (k.code !== "SUCCESS") {
                    codeError = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Contacts'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                } else {
                    let idContact = data.data[0].details.id
                    ZOHO.CRM.API.getRecord({Entity:"Contacts",RecordID:idContact})
                        .then(function(data){
                            //record = data.data[0];
                            storeAccounts.dispatch(addContact(data.data))

                            let nameContact = `${item.First_Name} ${item.Last_Name}`
                            let contactsOfAccount = storeAccounts.getState().contactList

                            if (_.isEmpty(contactsOfAccount))
                                $(`<option></option>`).appendTo("select[name=magaya__Representative]")

                            storeAccounts.dispatch(addContactList(data.data))
                            //$(`<option value="${idContact}">${nameContact}</option>`).appendTo("select[name=magaya__Representative]")


                            $("#modalContact").modal("hide")
                        })
                        message = " : Item Updated!!";
                        storeSuccess.dispatch(addSuccess({message: message}))
                    }
            })
        })
        .catch(function(error) {
            Utils.unblockUI()
            codeError = error.data[0].message
            show = true;
            field = error.data[0].details.api_name;
            module = 'Contacts'
            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

        });

    })


    $("#NewAccount").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()

        let $form = $("#account_form");
        let item = getFormData($form);

        $.map(item, function (k, v) {
            if (k)
                item[v] = k.toString()
        })

        ZOHO.CRM.API.insertRecord({Entity:"Accounts",APIData:item,Trigger:[]})
        .then(function(data){
            res = data.data;
            $.map(res, function(k, v) {
                if (k.code !== "SUCCESS") {
                    codeError = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Accounts'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                } else {
                    let idAccount = data.data[0].details.id
                    let nameAccount = item.Account_Name
                    ZOHO.CRM.API.getRecord({Entity:"Accounts",RecordID:idAccount})
                        .then(function(data){
                            //record = data.data[0];
                            storeAccounts.dispatch(addAccount(data.data))
                            $(`<option value="${idAccount}">${nameAccount}</option>`).appendTo("select[name=Account]")

                            $("#modalAccount").modal("hide")
                        })
                        message = " : Item Updated!!";
                        storeSuccess.dispatch(addSuccess({message: message}))
                    }
            })
        })
        .catch(function(error) {
            Utils.unblockUI()
            codeError = error.data[0].message
            show = true;
            field = error.data[0].details.api_name;
            module = 'Accounts'
            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

        });

    })


    /********************************************************************** */
    /********************************************************************** */



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
        $(`#${div_close}`).fadeOut("slow");
        storeCharge.dispatch(emptyCharge())
    })

    //mass delete
    $("#deleteMquote").click(function(e) {
        e.preventDefault();
        let table = $('#example').DataTable();

        Swal.fire({
                title: "Confirm",
                text: "You are about to delete record from CRM, are you sure?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33'

            }).then((result) => {

                if (result.isConfirmed) {
                    $("input[class=quoteCheckBox]:checked").each(function() {
                        let idQuote = $(this).attr('data-id')
                        //let $tr = $(this).parent();
                        //table
                        //.row( $tr )
                        //.remove()
                        //.draw();
                        ZOHO.CRM.API.deleteRecord({Entity:"magaya__SQuotes",RecordID: idQuote})
                            .then(function(data){

                                storeQuote.dispatch(deleteQuote({id: idQuote}))
                            })

                    })
                }
            }).then(function(){
                location.reload()
            })
    })

    ////////////////////ITEMS//////////////////////////////
    $("#updateItemNew").click(function(e) {
        $("#panel-item").animate({width:'toggle'},150);
    })

    $("#updateItemss").click(function(e) {
        //e.preventDefault();

       //let idItem = $(this).attr('data-id')
        //add a change counter
        Utils.blockUI();
        /*let a = $("#new-item").serializeArray();
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
        });*/
        let quoteToEdit = storeQuote.getState().quoteToEdit

        let item = storeItem.getState().singleItem[1]
        item.magaya__Volume = item.magaya__Volume ? item.magaya__Volume.toString().replace(/[,]/g, '') : 0
        item.magaya__Height = item.magaya__Height ? item.magaya__Height.toString().replace(/[,]/g, '') : 0
        item.magaya__Length = item.magaya__Length ? item.magaya__Length.toString().replace(/[,]/g, '') : 0
        item.magaya__Width = item.magaya__Width ? item.magaya__Width.toString().replace(/[,]/g, '') : 0
        item.magaya__Weigth = item.magaya__Weigth ? item.magaya__Weigth.toString().replace(/[,]/g, '') : 0
        Object.assign(item, {"magaya__Package_Type": $("select[name=magaya__Package_Type]").val()})


        Object.assign(item, { id: item.id, magaya__SQuote_Name: quoteToEdit.id});
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
                        ZOHO.CRM.API.getRecord({Entity:"magaya__ItemQuotes",RecordID:item.id})
                        .then(function(data){
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
        Utils.blockUI()

        let item = storeItem.getState().singleItem[1]
        item.magaya__Volume = item.magaya__Volume ? item.magaya__Volume.toString().replace(/[,]/g, '') : 0
        item.magaya__Height = item.magaya__Height ? item.magaya__Height.toString().replace(/[,]/g, '') : 0
        item.magaya__Length = item.magaya__Length ? item.magaya__Length.toString().replace(/[,]/g, '') : 0
        item.magaya__Width = item.magaya__Width ? item.magaya__Width.toString().replace(/[,]/g, '') : 0
        item.magaya__Weigth = item.magaya__Weigth ? item.magaya__Weigth.toString().replace(/[,]/g, '') : 0
        let quoteToEdit = storeQuote.getState().quoteToEdit
        Object.assign(item, {'magaya__SQuote_Name': quoteToEdit.id})
        Object.assign(item, {"magaya__Package_Type": $("select[name=magaya__Package_Type]").val()})
        console.log("Send Item", item)

        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: item, Trigger: [] })
        .then(function(data) {
            res = data.data;
            Utils.unblockUI()
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
            Utils.unblockUI()
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

        let item = storeItem.getState().itemEmpty
        //let $form = $("#new-item");
        //let item = getFormData($form);
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
        let quoteToEdit = storeQuote.getState().quoteToEdit
        Object.assign(charge, {"magaya__SQuote_Name": quoteToEdit.id})
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
                                "quote_id" : quoteToEdit.id
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

        let accountId = ''
        let magayaTax = ''
        let charge = storeCharge.getState().emptyCharge[1]
        accountId = $("select[name=Account]").val()
        magayaTax = $("select[name=magaya__Tax]").val()
        if (accountId > 0) {
            Object.assign(charge, {'magaya__ApplyToAccounts': accountId})
        }
        if (magayaTax > 0) {
            Object.assign(charge, {'magaya__Tax': magayaTax})
        }

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

    //row record table
    const row_number = $("input[name=RowRecord]").val()

    //get deal and quote account, now editable
    let accountQuoteData = storeAccounts.getState().quoteAccount
    let dealQuoteData = storeDeal.getState().dealQuote[0]
    let accountQuote = accountQuoteData['id']
    let dealQuote = ""
    if (!_.isEmpty(dealQuoteData))
        dealQuote = dealQuoteData.id

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
        expirationDateFinal = expirationDate + "T00:00:00"
    }
    //obtain row index
    /*let table = $("#table-quotes tr")
    $.each(table, function(k, v) {
        var id = table.find("td:eq(0)").children();
        console.log(id.firstChild)
    })*/
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
        "magaya__ContactName": sanitize($("select[name=magaya__Representative] option:selected").text()),
        "magaya__Terms": sanitize($("#magaya__Terms").val()),
        "magaya__Incoterm_rule": $("select[name=magaya__Incoterm_rule]").val(),
        "Owner": $("select[name=Owner]").val(),
        "magaya__Origin": sanitize($(":input[name=magaya__Origin]").val()),
        "magaya__Destination": sanitize($(":input[name=magaya__Destination]").val()),
        "magaya__Seller": sanitize($(":input[name=magaya__Seller]").val()),
        "magaya__BillingCity": sanitize($("input[name=Mailing_City]").val()),
        "magaya__BillingCountry": sanitize($("input[name=Mailing_Country]").val()),
        "magaya__BillingState": sanitize($("input[name=Mailing_State]").val()),
        "magaya__BillingStreet": sanitize($("input[name=Mailing_Street]").val()),
        "magaya__BillingCode": sanitize($("input[name=Mailing_Zip]").val()),
        "magaya__ContactEmail": sanitize($("input[name=Email]").val()),
        "magaya__ContactMobile": sanitize($("input[name=Mobile]").val()),
        "magaya__ContactHomePhone": sanitize($("input[name=Phone]").val()),
        "Name": sanitize($("input[name=NameQuote]").val()),
        "magaya__ExpirationDate": expirationDateFinal

    }


    let config = {
        Entity:"magaya__SQuotes",
        APIData: recordData
    }

    routingData = {
        "Name": $(":input[name=NameQuote]").val() !== "" ? $(":input[name=NameQuote]").val() : "Routing Data",
        "magaya__Shipper0": sanitize($(":input[name=magaya__Shipper]").val()),
        "magaya__Shipper": sanitize($(":input[name=magaya__Shipper] option:selected").text()),
        "magaya__ShipperCity": sanitize($("input[name=magaya__ShipperCity]").val()),
        "magaya__ShipperState": sanitize($("input[name=magaya__ShipperState]").val()),
        "magaya__ShipperCountry": sanitize($("input[name=magaya__ShipperCountry]").val()),
        "magaya__ShipperStreet": sanitize($("input[name=magaya__ShipperStreet]").val()),
        "magaya__ShipperCode": sanitize($("input[name=magaya__ShipperCode]").val()),
        "magaya__Consignee0": sanitize($("select[name=magaya__Consignee]").val()),
        "magaya__Consignee": sanitize($("select[name=magaya__Consignee] option:selected").text()),
        "magaya__ConsigneeCity": sanitize($("input[name=magaya__ConsigneeCity]").val()),
        "magaya__ConsigneeCountry": sanitize($("input[name=magaya__ConsigneeCountry]").val()),
        "magaya__ConsigneeState": sanitize($("input[name=magaya__ConsigneeState]").val()),
        "magaya__ConsigneeStreet": sanitize($("input[name=magaya__ConsigneeStreet]").val()),
        "magaya__ConsigneeCode": sanitize($("input[name=magaya__ConsigneeCode]").val()),
        "magaya__MainCarrier": $("select[name=magaya__MainCarrier] option:selected").val(),
        "magaya__Mode_of_Transportation": $("select[name=magaya__Mode_of_Transportation] option:selected").val(),
        "magaya__Port_of_Loading": $("select[name=magaya__Port_of_Loading]").val(),
        "magaya__Port_of_Unloading": $("select[name=magaya__Port_of_Unloading]").val()

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
                            record.number = row_number
                            storeQuote.dispatch(updateQuote({id: idQuote, ...record}))
                            //update table row
                            record[0]['number'] = row_number
                            let table = $('#table-quotes').DataTable();
                            table.row(row_number).data( ...record ).draw(false);
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
                        //location.reload()
                    })


            } else {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__Routing", APIData: routingData})
                    .then(function(response) {
                        res = response.data[0]
                        let id = res.details.id
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
                                location.reload()
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
            //expirationDate = expirationDate.split(" ");
            expirationDateFinal = expirationDate + "T00:00:00"
        }

        //let accountId = $(":input[name=Account] option:selected").val()
        let accountId = 0
        if (!_.isEmpty(dataAccount.quoteAccount))
            accountId = dataAccount.quoteAccount.id

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
            "magaya__Seller": $(":input[name=magaya__Seller]").val(),
            "magaya__Terms": sanitize($("#magaya__Terms").val()),
            "magaya__IssuedBy": $(":input[name=magaya__IssuedByName]").val(),
            "magaya__Incoterm_rule": $("select[name=magaya__Incoterm_rule]").val(),
            "Owner": $("select[name=Owner]").val()
        }


        routingData = {
            "Name": $(":input[name=NameQuote]").val() !== "" ? $(":input[name=NameQuote]").val() : "Routing Data",
            "magaya__Shipper0": sanitize($(":input[name=magaya__Shipper]").val()),
            "magaya__Shipper": sanitize($(":input[name=magaya__Shipper] option:selected").text()),
            "magaya__ShipperCity": sanitize($("input[name=magaya__ShipperCity]").val()),
            "magaya__ShipperState": sanitize($("input[name=magaya__ShipperState]").val()),
            "magaya__ShipperCountry": sanitize($("input[name=magaya__ShipperCountry]").val()),
            "magaya__ShipperStreet": sanitize($("input[name=magaya__ShipperStreet]").val()),
            "magaya__ShipperCode": sanitize($("input[name=magaya__ShipperCode]").val()),
            "magaya__Consignee0": sanitize($("select[name=magaya__Consignee]").val()),
            "magaya__Consignee": sanitize($("select[name=magaya__Consignee] option:selected").text()),
            "magaya__ConsigneeCity": sanitize($("input[name=magaya__ConsigneeCity]").val()),
            "magaya__ConsigneeCountry": sanitize($("input[name=magaya__ConsigneeCountry]").val()),
            "magaya__ConsigneeState": sanitize($("input[name=magaya__ConsigneeState]").val()),
            "magaya__ConsigneeStreet": sanitize($("input[name=magaya__ConsigneeStreet]").val()),
            "magaya__ConsigneeCode": sanitize($("input[name=magaya__ConsigneeCode]").val()),
            "magaya__MainCarrier": $("select[name=magaya__MainCarrier]").val(),
            "magaya__Mode_of_Transportation": $("select[name=magaya__Mode_of_Transportation] option:selected").val(),
            "magaya__Port_of_Loading": $("select[name=magaya__Port_of_Loading]").val(),
            "magaya__Port_of_Unloading": $("select[name=magaya__Port_of_Unloading]").val()
        }

        //insertind data, get the id and insert items and charges
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__Routing", APIData: routingData, Trigger: ["workflow"] })
            .then(function(response) {
                Utils.blockUI()
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
                                module = 'SQuotes'

                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                            } else {
                                //get the record from zoho
                                //let data_return = {}
                                let func_name = "magaya__setQuoteTotalAmount";
                                let req_data ={
                                    "quote_id" : id
                                };
                                ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
                                    .then(function(data){
                                        console.log("Update quote amount", data)
                                    })
                                    .then(function() {
                                        let table = $('#table-quotes').DataTable();


                                        ZOHO.CRM.API.getRecord({Entity:"magaya__SQuotes",RecordID:id})
                                            .then(function(data){
                                                record = data.data[0];
                                                record.create = `
                                                    <a><input type="checkbox" class="quoteCheckBox" data-id="${record.id}" /></a>
                                                    <a><span class="material-icons oculto edit" data-id="${record.id}">create</span></a>
                                                    <a><span class="material-icons oculto delete" data-id="${record.id}">delete_forever</span></a>
                                                    <a><span class="material-icons oculto send" data-id="${record.id}">send</span></a>
                                                    `

                                                table.rows.add([{...record}]).draw();
                                                storeQuote.dispatch(addStarting(record))
                                            })
                                    })

                                //$("#mquoteModal").modal("hide")

                            }
                        })

                        return id
                    })
                    .then(function(idQuote) {

                        //get the items and charges from store
                        let items = storeItem.getState().itemsOnNew;
                        $.map(items, function(k) {
                            Object.assign(k, {'magaya__SQuote_Name': idQuote, 'magaya__Package_Type': k.magaya__Package_Type.id, 'magaya__Status': 'InQuote'})
                        })
                        
                        let charges = storeCharge.getState().chargesOnNew;
                        $.map(charges, function(k) {
                            Object.assign(k, {'magaya__SQuote_Name': idQuote})
                        })

                        //insert items
                        if (!_.isEmpty(items)) {
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: items, Trigger: [] })
                                .then(function(response) {
                                    res = response.data;
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

                        //insert charges
                        if (!_.isEmpty(charges)) {
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: charges, Trigger: [] })
                                .then(function(response) {
                                    res = response.data;
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
                        $("#New").prop("disable", true)
                        Swal.fire({
                            title: "Success",
                            text: "New mQuote inserted!!!",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "Yes",
                            allowOutsideClick: false

                        })
                        .then((result) => {

                            if (result.isConfirmed) {
                                //storeQuote.dispatch(addStarting(data.data[0]))
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
                    store.dispatch(cleanActionEdited())
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

function gettingTiming() {
    console.log("Timing events")
}
