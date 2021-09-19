$(document).ready(function(){
    let idAccount = 0;

    let accountId = 0
    let contact = 0
    let quoteToEdit = 0

    //////subscriber Account, quote client
    /*store.subscribe(() => {
        accounts = storeAccounts.getState().quoteAccount;

        if (!_.isEmpty(accounts)) {
            console.log("State quoteAccount now", accounts)

            account = _.last(accounts)
            accountId = accounts['accountId']
        }
    })*/

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

        store.dispatch(addActionEdited())

        rowIndex = $("#select-package").val();

        let packageName = $('select[name="select-package"] option:selected').text();
        let pieces = ($(":input[name=Item-Pieces]").val()) > 0 ? $(":input[name=Item-Pieces]").val() : '1';
        let length = ($(":input[name=Item-Length]").val()) > 0 ? $(":input[name=Item-Length]").val() : (packageType[rowIndex]['magaya__PackageLenght'] >= 0 ? packageType[rowIndex]['magaya__PackageLenght'] : 0);
        let height = ($(":input[name=Item-Height]").val()) > 0 ? $(":input[name=Item-Height]").val() : (packageType[rowIndex]['magaya__PackageHeight'] >= 0 ? packageType[rowIndex]['magaya__PackageHeight'] : 0);
        let width = ($(":input[name=Item-Width]").val()) > 0 ? $(":input[name=Item-Width]").val() : (packageType[rowIndex]['magaya__PackageWidth'] >= 0 ? packageType[rowIndex]['magaya__PackageWidth'] : 0);
        let volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        let measure_system = $("select[name=magaya__Measure_System] option:selected").val()
        let weigth = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeight'] >= 0 ? packageType[rowIndex]['magaya__PackageWeight'] : 0);
        pieces = roundDec(pieces);
        length = roundDec(length);
        height = roundDec(height);
        width = roundDec(width);
        //weight = parseFloat(weight);
        volume = roundDec(volume);

        //formar el objeto
        let item = {
            'magaya__SQuote_Name': idmQuoteToEdit,
            'Name': packageName,
            'magaya__Status': 'InQuote',
            'magaya__Pieces': pieces,
            'magaya__Length': length,
            'magaya__Height': height,
            'magaya__Width': width,
            'magaya__Weigth': weigth,
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
            //$.map(dataError, function(k, v) {
                errorCode = dataError.code;
                field = dataError.details.api_name;
                show = true;
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

            //})
        })
    })


    //boton sendCharges on edit form
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();
        store.dispatch(addActionEdited())

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
                'magaya__Final_Amount': amount_total,
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
        let weigth = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeight'] >= 0 ? packageType[rowIndex]['magaya__PackageWeight'] : 0);

        let item = {
            'Name': packageName,
            'magaya__Pieces': pieces,
            'magaya__Length': parseFloat(length),
            'magaya__Height': parseFloat(height),
            'magaya__Width': parseFloat(width),
            'magaya__Weigth': weigth,
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
                'magaya__Final_Amount': amount_total,
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
 $("#Save").click(function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()

    //receipt fields
    if (accountId <= 0)
        throw new UserException('Mandatory data not found: Client Quote is not defined');

    let idQuote = quoteToEdit['id']

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


        recordData = {
            "Name": sanitize($(":input[id=NameQuote]").val()),
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
            "magaya__Status": $("select[name=magaya__Status] option:selected").val(),
            "magaya__Representative": contact,
            "magaya__PortofLoading": $("select[name=Port_Loading]").val(),
            "magaya__PortofUnloading": $("select[name=Port_Unloading]").val(),
            //"magaya__ContactCity": $("input[name=Mailing_City]").val().replace(/[^a-zA-Z]/g, ' '),
            //"magaya__ContactCountry": $("input[name=Mailing_Country]").val().replace(/[^a-zA-Z]/g, ' '),
            //"magaya__ContactState": $("input[name=Mailing_State]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__ContactStreet": $("input[name=Mailing_Street]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__ContactCity": $("input[name=Mailing_Zip]").val().replace(/[^a-zA-Z0-9]\#\./g, ' '),
            "magaya__ContactEmail": sanitize($("input[name=magaya__ContactEmail]").val()),
            "magaya__ContactMobile": sanitize($("input[name=magaya__ContactMobile]").val()),
            "magaya__ContactHomePhone": sanitize($("input[name=magaya__ContactPhone]").val()),
            "magaya__ContactName": sanitize($("select[name=magaya__Representative] option:selected").text())

        }

        console.log("data to insert", recordData)

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
                text: "Some changes have been made, please select Confirm or Save your Changes",
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
