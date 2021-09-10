$(document).ready(function(){
    let idAccount = 0;

    let accountId = 0
    let contact = 0
    let quoteToEdit = 0

    //////subscriber Account, quote client
    store.subscribe(() => {
        account = store.getState();
        console.log("Store state now", account)

        account = _.last(account['accountQuote'])
        accountId = account['accountId']
    })

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
        $(this).toggleClass("active"); return false;

      });

    $("#search-by-name").click(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()

        let val = $("input[type=search]").val()
        storeQuote.dispatch(findByName({char: val}))

        $("#panel-search").show("fast");
        $(this).toggleClass("active"); return false;

    })

    $('.close').click(function(){
        let div_close = $(this).attr("data-close");
        $(`#${div_close}`).animate({width:'toggle'},150);
        //$("#" + div_close).hide()
    })


    //boton send new item on edit form
    $("#sendItem").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        rowIndex = $("#select-package").val();

        let packageName = $('select[name="select-package"] option:selected').text();
        let pieces = ($(":input[name=Item-Pieces]").val()) > 0 ? $(":input[name=Item-Pieces]").val() : '1';
        let length = ($(":input[name=Item-Length]").val()) > 0 ? $(":input[name=Item-Length]").val() : (packageType[rowIndex]['magaya__PackageLenght'] >= 0 ? packageType[rowIndex]['magaya__PackageLenght'] : 0);
        let height = ($(":input[name=Item-Height]").val()) > 0 ? $(":input[name=Item-Height]").val() : (packageType[rowIndex]['magaya__PackageHeight'] >= 0 ? packageType[rowIndex]['magaya__PackageHeight'] : 0);
        let width = ($(":input[name=Item-Width]").val()) > 0 ? $(":input[name=Item-Width]").val() : (packageType[rowIndex]['magaya__PackageWidth'] >= 0 ? packageType[rowIndex]['magaya__PackageWidth'] : 0);
        //let weight = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeigth'] >= 0 ? packageType[rowIndex]['magaya__PackageWeigth'] : 0);
        let volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        let measure_system = $("select[name=magaya__Measure_System] option:selected").val()

        pieces = parseInt(pieces);
        length = parseFloat(length);
        height = parseFloat(height);
        width = parseFloat (width);
        //weight = parseFloat(weight);
        volume = parseFloat(volume);

        //formar el objeto
        let item = {
            'magaya__SQuote_Name': idmQuoteToEdit,
            'Name': packageName,
            'magaya__Status': 'InQuote',
            'magaya__Pieces': pieces,
            'magaya__Length': length,
            'magaya__Height': height,
            'magaya__Width': width,
            'magaya__Weigth': 0,
            'magaya__Volume': volume,
            'magaya__Measure_System': measure_system
        }

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

                    $(":input[name=Item-Pieces]").val('');
                    $(":input[name=Item-Length]").val('');
                    $(":input[name=Item-Height]").val('');
                    $(":input[name=Item-Width]").val('');
                    $(":input[name=Item-Weight]").val('');

                    let message = ': Item Added on module Cargo'

                    //add partial copy to store
                    storeItem.dispatch(addItem({...item, id: idItem}))
                    storeSuccess.dispatch(addSuccess({message: message}))

                    pieces = parseInt(pieces);
                    length = 0
                    height = 0
                    width = 0
                    weight = 0
                    volume = 0
                }
            })
        })
        .catch(function(error){
            dataError = error.data;
            $.map(dataError, function(k, v) {
                errorCode = k.code;
                field = k.details.api_name;
                show = true;
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

            })
        })
    })


    //boton sendCharges on edit form
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();


        let ChargeType = $("select[name=ChargeType] option:selected").val();
        let Status = $("select[name=ChargeStatus] option:selected").val();
        let DescriptionCharges = $("input[name=DescriptionCharges]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let ChargeText = DescriptionCharges;

        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=Quantity]").val() > 0) ? $("input[name=Quantity]").val() : 0;
        let Unity = $("input[name=Unity]").val() > 0 ? $("input[name=Unity]").val() : 0;
        let Price = $("input[name=Price]").val() > 0 ? $("input[name=Price]").val() : 0;

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
                'magaya__ChargeCurrency': $("select[name=Currency]").val(),
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
                            console.log("Insertando charge updateando amount de ", idmQuoteToEdit)

                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Inserting amount response", data)
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



    //boton add mquote
    $(".addMquote").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        //drop the state temporal items and charges
        storeItem.dispatch(emptyItems())
        storeCharge.dispatch(emptyCharges())
        storeQuote.dispatch(clearQuoteToEdit())

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


    //boton new item from new mquote form
    $("#newItem").click(function(e) {
        //button add package
        e.preventDefault();
        e.stopImmediatePropagation();

        //agregarCampos();
        rowIndex = $("#select-package").val();

        let packageName = $('select[name="select-package"] option:selected').text();
        let pieces = ($(":input[name=Item-Pieces]").val()) > 0 ? $(":input[name=Item-Pieces]").val() : '1';
        let length = ($(":input[name=Item-Length]").val()) > 0 ? $(":input[name=Item-Length]").val() : (packageType[rowIndex]['magaya__PackageLenght'] >= 0 ? packageType[rowIndex]['magaya__PackageLenght'] : 0);
        let height = ($(":input[name=Item-Height]").val()) > 0 ? $(":input[name=Item-Height]").val() : (packageType[rowIndex]['magaya__PackageHeight'] >= 0 ? packageType[rowIndex]['magaya__PackageHeight'] : 0);
        let width = ($(":input[name=Item-Width]").val()) > 0 ? $(":input[name=Item-Width]").val() : (packageType[rowIndex]['magaya__PackageWidth'] >= 0 ? packageType[rowIndex]['magaya__PackageWidth'] : 0);
        let volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        let measure_system = $("select[name=magaya__Measure_System] option:selected").val();

        let item = {
            'Name': packageName,
            'magaya__Pieces': pieces,
            'magaya__Length': parseFloat(length),
            'magaya__Height': parseFloat(height),
            'magaya__Width': parseFloat(width),
            'magaya__Weigth': 0,
            'magaya__Volume': parseFloat(volume),
            "magaya__Measure_System": measure_system

        }

        storeItem.dispatch(addItemOnNew({...item}))

        //reset fields
        $(":input[name=Item-Pieces]").val('')
        $(":input[name=Item-Length]").val('');
        $(":input[name=Item-Height]").val('');
        $(":input[name=Item-Width]").val('');
        $(":input[name=Item-Weight]").val('')

        //items = $(this).tableToJson('table-items', 543534534);

    });




    //add charges on new mquote form
    $("#newCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();


        let ChargeType = sanitize($("select[name=ChargeType] option:selected").val());
        let Status = sanitize($("select[name=ChargeStatus] option:selected").val());
        let DescriptionCharges = sanitize($("input[name=DescriptionCharges]").val());
        let ChargeText = DescriptionCharges;

        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=Quantity]").val() > 0) ? $("input[name=Quantity]").val() : 0;
        let Unity = $("input[name=Unity]").val() !== '' ? $("input[name=Unity]").val() : 'U';
        let Price = $("input[name=Price]").val() > 0 ? $("input[name=Price]").val() : 0;

        Price = roundDec(Price)
        TaxRate = roundDec(TaxRate)
        Quantity = roundDec(Quantity);
        let amount = Price * Quantity;
        amount = roundDec(amount)
        let amount_tax = amount / 100 * TaxRate
        amount_tax = roundDec(amount_tax);
        let amount_total = amount + amount_tax;
        amount_total = roundDec(amount_total)

        let PaidAs = $("select[name=PaidAs]").val()
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
                'magaya__ChargeCurrency': $("select[name=Currency]").val(),
                'magaya__ApplyToAccounts': accountId,
                'magaya__Unit': Unity,
                'magaya__Paid_As': PaidAs
        }
        storeCharge.dispatch(addChargeOnNew({...item}))


        $("select[name=ChargeType]").val('');
        $("input[name=DescriptionCharges]").val('');
        $("input[name=Quantity]").val('');
        $("input[name=Price]").val('');
        $("input[name=magaya__Tax_Amount]").val(''); //posible no va aqui0
        $("input[name=magaya__Amount_Total").val(''); //posible no va aqui
        //$("input[name=TotalTaxAmount]").val('');

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

        //receipt fields
        if (accountId <= 0)
            throw new UserException('Mandatory data not found: Client Quote is not defined');


        recordData = {
            "Name": $(":input[id=NameQuote]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            "Account": accountId,
            "magaya__Shipper": $(":input[name=magaya__Shipper] option:selected").text().replace(/[^a-zA-Z0-9]/g, ' '),
            "magaya__ExpirationDate": expirationDateFinal,
            "magaya__Direction": $(":input[name=magaya__Direction]").val(),
            "magaya__TransportationMode": $("select[name=magaya__TransportationMode] option:selected").val(),
            "magaya__Description": $("#magaya__Description").val().replace(/[^a-zA-Z0-9]/g, ' '),
            "magaya__Service": $("select[name=Service]").val(),
            "magaya__ConsigneeName": $("select[name=magaya__ConsigneeName] option:selected").text(),
            //"magaya__Stage": $("select[name=Stage] option:selected").val(),
            "magaya__Carrier": $("select[name=magaya__Carrier] option:selected").val(),
            "magaya__DestinationReceipt": (!_.isEmpty($("input[name=magaya__DestinationReceipt]").val())) ? $("input[name=magaya__DestinationReceipt]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
            "magaya__OriginReceipt": (!_.isEmpty(($("input[name=magaya__OriginReceipt]").val()))) ? $("input[name=magaya__OriginReceipt]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
            "magaya__DestinationPrecarriageBy": (!_.isEmpty($("input[name=magaya__DestinationPrecarriageBy]").val())) ? $("input[name=magaya__DestinationPrecarriageBy]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
            "magaya__OriginPrecarriageBy": (!_.isEmpty(($("input[name=magaya__OriginPrecarriageBy]").val()))) ? $("input[name=magaya__OriginPrecarriageBy]").val().replace(/[^a-zA-Z0-9]/g, ' ') : '',
           "magaya__Status": $("select[name=magaya__Status] option:selected").val(),
            "magaya__Representative": contact,
            //"magaya__ContactCity": $("input[name=Mailing_City]").val().replace(/[^a-zA-Z]/g, ' '),
            //"magaya__ContactCountry": $("input[name=Mailing_Country]").val().replace(/[^a-zA-Z]/g, ' '),
            //"magaya__ContactState": $("input[name=Mailing_State]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__ContactStreet": $("input[name=Mailing_Street]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__ContactCity": $("input[name=Mailing_Zip]").val().replace(/[^a-zA-Z0-9]\#\./g, ' '),
            "magaya__ContactEmail": $("input[name=magaya__ContactEmail]").val().replace(/[^a-zA-Z0-9]\.\@/g, ' '),
            "magaya__ContactMobile": $("input[name=magaya__ContactMobile]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            "magaya__ContactHomePhone": $("input[name=magaya__ContactPhone]").val().replace(/[^a-zA-Z0-9]/g, ' '),

        }

        console.log("Data mquote", recordData)
        //insertind data, get the id and insert items and charges
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: [] })
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
                console.log("Items JSON", jsonItems)

                console.log("Charges JSON", jsonData)
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


function cleanDataString(arrayData) {

    $.map (arrayData, function (k, v) {
        console.log(k, v)
        if (!_.isEmpty(arrayData[v]))
            arrayData[v] = k.replace(/[^a-zA-Z0-9]\.\#/g, ' ')
    })

    //console.log(" Data clean ", arrayData)

}
