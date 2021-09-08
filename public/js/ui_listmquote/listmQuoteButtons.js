$(document).ready(function(){
    let idAccount = 0;

    let accountId = 0
    let contact = 0
    let quoteToEdit = 0

    //////subscriber Account, quote client
    store.subscribe(() => {
        account = store.getState();

        account = _.last(account['accountQuote'])
        accountId = account['accountId']
        //console.log("Account quote id", accountId)
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
        let quote = storeQuote.getState();
        quoteToEdit = quote.quoteToEdit;
        console.log("Editing quote", quoteToEdit)
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
        let weight = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeigth'] >= 0 ? packageType[rowIndex]['magaya__PackageWeigth'] : 0);
        let volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        let measure_system = $("select[name=magaya__Measure_System] option:selected").val()

        pieces = parseInt(pieces);
        length = parseFloat(length);
        height = parseFloat(height);
        width = parseFloat (width);
        weight = parseFloat(weight);
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
            'magaya__Weigth': weight,
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
        Price = roundDec(Price);

        TaxRate = parseInt(TaxRate);
        let TaxAmount = ($("input[name=TaxAmount]").val() > 0) ? $("input[name=TaxAmount]").val() : 0;
        TaxAmount = parseFloat(TaxAmount)

        let Amount = parseFloat(Quantity) * parseFloat(Price);
        Amount = roundDec(Amount);

        let accountId = 0
        if (!_.isEmpty(quoteToEdit.Account)) {
            accountId = quoteToEdit.Account.id
        }

        let item = {
                'magaya__SQuote_Name': idmQuoteToEdit,
                'Name': DescriptionCharges,
                'magaya__Status': Status,
                'magaya__Tax_Rate': TaxRate,
                'magaya__Tax_Amount': 0,
                'magaya__Amount_Total': 0,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': Amount,
                'magaya__ChargeCurrency': $("select[name=Currency]").val(),
                'magaya__CantImp': TaxAmount,
                'magaya__ApplyToAccounts': accountId
        }
        console.log("Charge too insert on edit", item)


        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: item, Trigger: [] })
            .then(function(data) {
                res = data.data;
                //console.log(res)
                $.map(res, function(k, v) {
                    if (k.code !== "SUCCESS") {
                        codeError = k.code;
                        field = k.details.api_name;
                        show = true;
                        module = 'Service Items'

                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    } else {
                        let idCharge = res[0].details.id;
                        codeError = "";
                        field = "";
                        show = false;
                        module = 'Service Items'
                        let message = ": Added new Charge item"
                        storeSuccess.dispatch(addSuccess({message: message}))
                        //console.log({...item, id: idCharge})
                        storeCharge.dispatch(addCharge({...item, id: idCharge}))


                    }
                })
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



    //button save edited quote
    $("#Save").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();



        let idQuote = quoteToEdit.id;

        //receive data
        data = {
                id: idQuote,
                "Name": quoteToEdit.Name,
                "magaya__Shipper": $(":input[name=magaya__Shipper] option:selected").text().replace(/[^a-zA-Z0-9]/g, ' '),
                "magaya__ExpirationDate": $(":input[name=magaya__ExpirationDate]").val(),
                "magaya__Direction": $(":input[name=magaya__Direction]").val().replace(/[^0-9]\-\:\T/g, ' '),
                "magaya__TransportationMode": $("select[name=magaya__TransportationMode] option:selected").val(),
                "magaya__Description": $("#magaya__Description").val().replace(/[^a-zA-Z0-9]/g, ' '),
                "magaya__Service": $("select[name=Service]").val().replace(/[^a-zA-Z0-9]/g, ' '),
                "magaya__ConsigneeName": $("select[name=magaya__ConsigneeName] option:selected").text().replace(/[^a-zA-Z0-9]/g, ' '),
                //"magaya__Stage": $("select[name=Stage] option:selected").val(),
                //"magaya__Carrier": $("select[name=magaya__Carrier] option:selected").val().replace(/[^a-zA-Z0-9]/g, ' '),
                //"magaya__Destination": $("input[name=magaya__Destination]").val().replace(/[^a-zA-Z0-9]/g, ' '),
                //"magaya__Origin": $("input[name=magaya__Origin]").val().replace(/[^a-zA-Z0-9]/g, ' '),
                "magaya__Status": $("select[name=magaya__Status] option:selected").val()
        }
        //cleanDataString(data)
        console.log(data)
        var config = {
            Entity: "magaya__SQuotes",
            id: idQuote,
            APIData: { ...data}
        }

        ZOHO.CRM.API.updateRecord(config).then(function(response) {
            res = response.data;
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
                    ZOHO.CRM.API.getRecord({Entity: "magaya__SQuotes", RecordID:idQuote})
                        .then(function (res) {
                            let record = res.data[0]
                            storeQuote.dispatch(updateQuote(record))

                        })
                    $(".container").show().addClass("animate__animated animate__bounceOutLeft")

                }
            })
        })
        .catch(function(error) {
            //$celd.removeClass("editable");
            console.log(error)
            codeError = 'Error on field';
            show = true;
            module = 'Service Items'
            storeError.dispatch(addError({errorCode: codeError, showInfo: show, module: module}))

        })
    })


    var elementos = document.getElementsByTagName('input');

    $(".addMquote").onclick = (e)=> {
        e.preventDefault();
        for (let i = 0; i < elementos.length; i++) {
            elementos[i].value='';
        }
    }


    //boton add mquote
    $(".addMquote").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        //drop the state temporal items and charges
        storeItem.dispatch(emptyItems())
        storeCharge.dispatch(emptyCharges())

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
        let weight = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeigth'] >= 0 ? packageType[rowIndex]['magaya__PackageWeigth'] : 0);
        let volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        let measure_system = $("select[name=magaya__Measure_System] option:selected").val();

        let item = {
            'Name': packageName,
            'id': 0,
            'magaya__Pieces': pieces,
            'magaya__Length': parseFloat(length),
            'magaya__Height': parseFloat(height),
            'magaya__Width': parseFloat(width),
            'magaya__Weigth': weight,
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


        let ChargeType = $("select[name=ChargeType] option:selected").val();
        let Status = $("select[name=ChargeStatus] option:selected").val();
        let DescriptionCharges = $("input[name=DescriptionCharges]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let ChargeText = DescriptionCharges;

        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=Quantity]").val() > 0) ? $("input[name=Quantity]").val() : 0;
        let Unity = $("input[name=Unity]").val() > 0 ? $("input[name=Unity]").val() : 0;
        let Price = $("input[name=Price]").val() > 0 ? $("input[name=Price]").val() : 0;
        Price = roundDec(Price);

        TaxRate = parseInt(TaxRate);
        let TaxAmount = ($("input[name=TaxAmount]").val() > 0) ? $("input[name=TaxAmount]").val() : 0;
        TaxAmount = parseFloat(TaxAmount)

        let Amount = parseFloat(Quantity) * parseFloat(Price);
        Amount = roundDec(Amount);

        var ChargeCurrency = $("select[name=Currency]").val();
        let item = {
                'Name': DescriptionCharges,
                'id': 0,
                'magaya__Status': Status,
                'magaya__Tax_Rate': TaxRate,
                'magaya__Tax_Amount': 0,
                'magaya__Amount_Total': 0,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': Amount,
                'magaya__ChargeCurrency': $("select[name=Currency]").val(),
                'magaya__CantImp': TaxAmount,
                'magaya__ApplyToAccounts': accountId
        }
        storeCharge.dispatch(addChargeOnNew({...item}))
        //storeCharge.dispatch(setAmountOnNew({...item}))


        $("#ChargeType").val('');
        $("#DescriptionCharges").val('');
        $("#Quantity").val('');
        $("#Unity").val('');
        $("#Price").val('');
        $("#Amount").val('');


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

        recordData = {
            "Name": $(":input[name=Name]").val().replace(/[^a-zA-Z0-9]/g, ' '),
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
            //"magaya__Destination": $("input[name=magaya__Destination]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__Origin": $("input[name=magaya__Origin]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            "magaya__Status": $("select[name=magaya__Status] option:selected").val(),
            "magaya__Representative": contact,
            "magaya__ContactCity": $("input[name=Mailing_City]").val().replace(/[^a-zA-Z]/g, ' '),
            "magaya__ContactCountry": $("input[name=Mailing_Country]").val().replace(/[^a-zA-Z]/g, ' '),
            "magaya__ContactState": $("input[name=Mailing_State]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__ContactStreet": $("input[name=Mailing_Street]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            //"magaya__ContactCity": $("input[name=Mailing_Zip]").val().replace(/[^a-zA-Z0-9]\#\./g, ' '),
            "magaya__ContactEmail": $("input[name=Email]").val().replace(/[^a-zA-Z0-9]\.\@/g, ' '),
            "magaya__ContactMobile": $("input[name=Mobile]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            "magaya__ContactHomePhone": $("input[name=Phone]").val().replace(/[^a-zA-Z0-9]/g, ' '),
            "magaya__Measure_System": $("select[name=magaya__Measure_System] option:selected").val()
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
                console.log("Insreting related data on " + idQuote)

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

        //items = $(this).tableToJson('table-items', 543534534);
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
