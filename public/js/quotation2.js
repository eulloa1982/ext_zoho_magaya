//send quote
async function buildStringXML(idSQuote) {
    xml = await buildXML(idSQuote);
} //.send-quote


/*
 * async function to build the XML to send Magaya
 * @idem dataArray of Squote from Quote List
 */
async function buildXML(idQuote) {
    stringCharge = stringItem = stringQuote = stringXML = '';
    transpMethods = new Array();

    stringCharge = await $(this).buildStringCharge(idQuote).catch(() => {
        stringCharge = '';
    });
    stringItem = await $(this).buildStringItems(idQuote).catch(() => {
        stringItem = '';
    });
    stringQuote = await buildStringQuote(idQuote).catch(() => {
        stringQuote = '';
    });

    stringXML = '<Quotation xmlns="http://www.magaya.com/XMLSchema/V1" xsi:schemaLocation="http://www.magaya.com/XMLSchema/V1 schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    stringXML += stringQuote;

    if (stringCharge !== undefined) {
        //code
        stringXML += '<Charges UseSequenceOrder="false">' + stringCharge + "</Charges>";
    }

    if (stringItem !== undefined) {
        //code
        stringXML += "<Items>" + stringItem + "</Items>";
    }

    stringXML += '</Quotation>'
        //finding user
        //xmlDoc = $.parseXML(stringXML),
        //    $xml = $(xmlDoc),
        //    $title = $xml.find("ContactName");
        //ContactName = $title.text();
    console.log("XML String", stringXML);

    //send xml trougth magaya api
    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.TRANSACTION_TYPES.Quotation
    config = Utils.getConfig()
    data = {
        method: 'SetTransaction',
        data: [
            Utils.getAccessKey(),
            entity_type,
            flags,
            stringXML
        ]
    };

    MagayaAPI.sendRequest(data, function(result) {
        //console.log(result)
            if (result.error) {
                Swal.fire({
                    title: result.error,
                    text: result.data,
                    icon: 'error'
                }).then(function() {
                    location.reload();
                })
                stringCharge = stringItem = stringQuote = stringXML = '';
            } else {

                Swal.fire({
                        title: 'Success',
                        text: 'Operation success',
                        icon: 'success',
                        allowOutsideClick: false
                    }).then(function() {
                        $("#sortable1").empty()
                        drawQuotationMagaya();
                    })
                    //all OK, update QuoteInMagaya field

                //$(this).updateRecordCRM(data);

            } //else

        }) //magaya api*/

} //function buildXML



$("input[name=Quantity]").keyup(function(e) {
    var Quantity = ($("input[name=Quantity]").val() > 0) ? $("input[name=Quantity]").val() : 0;
    var Price = ($("input[name=Price]").val() > 0) ? $("input[name=Price]").val() : 0;
    var Amount = parseFloat(Price) * parseFloat(Quantity);
    $("input[name=Amount]").val(Amount);
    e.preventDefault();
});

$("input[name=Price]").keyup(function(e) {
    var Quantity = ($("input[name=Quantity]").val() > 0) ? $("input[name=Quantity]").val() : 0;
    var Price = ($("input[name=Price]").val() > 0) ? $("input[name=Price]").val() : 0;
    var Amount = parseFloat(Price) * parseFloat(Quantity);
    $("input[name=Amount]").val(Amount);
    e.preventDefault();
});



/*************************************************
//SortTable Quotation configuration
*************************************************/
$("#sortable1").sortable({
    connectWith: ".connectedSortable",
    remove: function(event, ui) {
        $("#sortable2").prepend(ui.item.clone())
        $(this).sortable('cancel');
    },
    receive: function(event, ui) {
        data = ui.item;
        $.map(data, function(k) {
            idQuote = k.attributes['data-id']['value']
        });
        buildStringXML(idQuote);
    }
});

$("#sortable2").sortable({
    connectWith: ".connectedSortable",
    remove: function(event, ui) {
        $("#sortable1").prepend(ui.item.clone())
        $(this).sortable('cancel');
    },
    receive: function(event, ui) {

        data = ui.item;
        $.map(data, function(k) {
            idQuote = k.attributes['data-idArray']['value']
        });
        arrayQuote = arrayMagayaQuotes[idQuote];
        sendQuoteMagaya2CRM(arrayQuote)

    }
});

/***************************************************************
 *************** END SORTABLE CONFIGURATION **********************
 *************** ************************************************/

/////////////////////////////
// magaya loguin
//////////////////////////////
$("#magaya-loguin").click(function() {
    var magayaData;
    var magayaUser = '';
    var magayaPass = '';
    var magayaUrl = '';
    //get crm variables
    getMagayaVariables().then(r => {
        magayaData = r;
        return r;
    }).then(r => {

        localStorage.setItem('url', r.magaya_url);

        data = {
            method: 'StartSession',
            data: [
                r.magaya_user,
                r.magaya_pass
            ]
        }
        MagayaAPI.sendRequest(data, function(result) {
            if (result.error) {
                Swal.fire({
                    title: 'Error',
                    text: result.data,
                    icon: 'error'
                })
            } else {
                Utils.setAccessKey(result.data.access_key)
                Swal.fire({
                    title: 'Success',
                    text: 'Your configuration was saved successfully',
                    icon: 'success'
                }).then(function() {
                    location.reload();
                })
            }
        })

    });

});


function setDataRepresentative() {
    return new Promise(function(resolve, reject) {
        var representative = $("select[name=RepresentativeName]").val();
        var dataRepresentative = {};
        if (representative > 0) {
            //select representative data, Contact
            getRecordCRM("Contacts", representative).then(r => {
                dataRepresentative = {
                        "magaya__Representative": r[0]["id"],
                        "magaya__ContactCity": r[0]['Mailing_City'],
                        "magaya__ContactCountry": r[0]['Mailing_Country'],
                        "magaya__ContactEmail": r[0]['Email'],
                        "magaya__ContactHomePhone": r[0]['Home_Phone'],
                        "magaya__ContactMobile": r[0]['Mobile'],
                        "magaya__ContactPhone": r[0]['Phone'],
                        "magaya__ContactState": r[0]['Mailing_State'],
                        "magaya__ContactStreet": r[0]['Mailing_Street']
                    }
                    //join object to insert
                resolve(dataRepresentative);
            })

        } else {
            resolve(dataRepresentative);
        }

    })
}

//////////////////////
// send form
// Get fields form
// Get data from table items
// Get data from table charges
//////////////////////
$("#sendQuote").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();


    //cannot require field client from module
    //so we need to add custom validation
    var contact = $("select[name=ContactName]").val();
    if (contact === "" || contact === null || contact === "null") {
        Swal.fire({
            title: 'Error',
            text: 'Please, set a client for Quotation',
            icon: 'error'
        })

    } else {
        let stageCreated = '';
        Utils.blockUI()
            //fecha actual
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            expirationDateFinal = `${year}-0${month}-${day}T23:59:59`
        } else {
            expirationDateFinal = `${year}-${month}-${day}T23:59:59`
        }

        var expirationDate = $(":input[name=ExpirationDate]").val()
        if (expirationDate !== '') {
            expirationDate = expirationDate.split(" ");
            expirationDateFinal = expirationDate[0] + "T" + expirationDate[1]
        }

        //seleccionar el Stage Created en el CRM
        stage = squoteStage.findIndex(i => i["Name"] === "Created");
        if (stage >= 0) {
            stageCreated = squoteStage[stage]["id"];
        }

        recordData = {
            "Account": $("select[name=ContactName]").val(),
            "magaya__ConsigneeName": $(":input[name=ConsigneeName] option:selected").text(),
            //"magaya__ConsigneeName": $(":input[name=OtherConsignee] option:selected").text(),
            "magaya__Shipper": $(":input[name=ShipperName] option:selected").text(),
            "magaya__Carrier": $("select[name=Carrier]").val(),
            "magaya__ExpirationDate": expirationDateFinal,
            "magaya__IssuedBy": currentUser,
            //"Name": $(":input[name=Name]").val(),
            "Name": quoteName,
            "magaya__Direction": $(":input[name=Direction]").val(),
            "magaya__TransportationMode": $("select[name=TransportationMode] option:selected").val(),
            "magaya__Seller": currentUser,
            "magaya__MethodOfTransportation": $("input[name=TransportationMethod]").val(),
            "magaya__Description": sanitize($(":input[name=Description]").val()),
            //"magaya__Deal": ,
            "magaya__Stage": stageCreated,
            "magaya__ContactName": sanitize($("select[name=ContactName] option:selected").text()),
            "magaya__Service": $("select[name=Service]").val()

        };

        //get Deal data, if Exists
        /*if (!_.isEmpty(dealData)) {
            Object.assign(recordData, dealData)
        }*/
        //Representative data
        rep = setDataRepresentative()
            .then(r => {
                if (!_.isEmpty(r)) {
                    Object.assign(recordData, r)
                }
                return (recordData)
            })
            .then(r => {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: [] })
                    .then(function(response) {
                        data = response.data;
                        $.each(data, function(key, valor) {
                            id = valor['details']['id'];
                        })

                    }).then(function() {
                        //insert squote_item
                        //ItemsQuote
                        jsonData = $(this).tableToJson('table-items', id);
                        //check the data
                        if (!_.isEmpty(jsonData)) {
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: jsonData, Trigger: [] })
                                .then(function(response) {}).catch(function(error) {

                                })
                        }

                    }).then(function() {
                        //charges
                        //ChargesQuote
                        jsonCharges = $(this).tableToJson('table-charges', id);
                        if (!_.isEmpty(jsonCharges)) {
                            jsonCharges[0]['Name'] = jsonCharges[0]['magaya__Charge_Description'];
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: jsonCharges, Trigger: [] })
                                .then(function(response) {
                                    console.log(response)

                                }).catch(function(response) {
                                    //do smething
                                })
                        }

                    }).then(function() {
                        //all is OK, unblock UI, reset form and tables
                        Utils.unblockUI()
                        Swal.fire({
                            title: 'Success',
                            text: 'Operation success',
                            icon: 'success',
                            allowOutsideClick: false
                        }).then(function() {
                            drawQuotationCRM();
                        })

                    }).catch(function(response) {
                        Utils.unblockUI()
                        errorData = response.data
                        console.log("Error", response)
                        codeError = ''
                        $.map(errorData, function(k) {
                            codeError = k.details.api_name;
                        })
                        Swal.fire({
                            title: 'Error',
                            text: 'Please, refer the field ' + codeError,
                            icon: 'error'
                        })
                    })
            })

        //join objects
        //Object.assign(recordData, dataArray)
        //ready to insert
        id = 0;


    }
})


//////////////////////
// send form
// Get fields form
// Get data from table items
// Get data from table charges
//////////////////////
$("#sendQuotation").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    //cannot require field client from module
    //so we need to add custom validation
    var contact = $("select[name=ContactName]").val();
    if (contact === "" || contact === null || contact === "null") {
        Swal.fire({
            title: 'Error',
            text: 'Please, set a client for Quotation',
            icon: 'error'
        })

    } else {
        let stageCreated = '';
        Utils.blockUI()
            //fecha actual
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            expirationDateFinal = `${year}-0${month}-${day}T23:59:59`
        } else {
            expirationDateFinal = `${year}-${month}-${day}T23:59:59`
        }

        var expirationDate = $(":input[name=ExpirationDate]").val()
        if (expirationDate !== '') {
            expirationDate = expirationDate.split(" ");
            expirationDateFinal = expirationDate[0] + "T" + expirationDate[1]
        }

        //seleccionar el Stage Created en el CRM
        stage = squoteStage.findIndex(i => i["Name"] === "Created");
        if (stage >= 0) {
            stageCreated = squoteStage[stage]["id"];
        }

        //get and cleand data
        let account = sanitize($("select[name=ContactName]").val());
        let consignee = sanitize($(":input[name=ConsigneeName] option:selected").text());
        let shipper = sanitize($(":input[name=ShipperName] option:selected").text());
        let carrier = sanitize($("select[name=Carrier]").val());
        let direction = sanitize($(":input[name=Direction]").val());
        let description = sanitize($(":input[name=Description]").val());


        recordData = {
            "Account": account,
            "magaya__ConsigneeName": consignee,
            "magaya__Shipper": shipper,
            "magaya__Carrier": carrier,
            "magaya__ExpirationDate": expirationDateFinal,
            "magaya__IssuedBy": currentUser,
            //"Name": $(":input[name=Name]").val(),
            "Name": quoteName,
            "magaya__Direction": direction,
            "magaya__TransportationMode": $("select[name=TransportationMode] option:selected").val(),
            "magaya__Seller": currentUser,
            "magaya__MethodOfTransportation": $("input[name=TransportationMethod]").val(),
            "magaya__Description": description,
            //"magaya__Deal": ,
            "magaya__Stage": stageCreated,
            "magaya__ContactName": $("select[name=ContactName] option:selected").text(),
            "magaya__Service": $("select[name=Service]").val()

        };

        //get Deal data, if Exists
        /*if (!_.isEmpty(dealData)) {
            Object.assign(recordData, dealData)
        }*/
        //Representative data
        rep = setDataRepresentative()
            .then(r => {
                if (!_.isEmpty(r)) {
                    Object.assign(recordData, r)
                }
                return (recordData)
            })
            .then(r => {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: [] })
                    .then(function(response) {
                        data = response.data;
                        $.each(data, function(key, valor) {
                            id = valor['details']['id'];
                        })

                    }).then(function() {
                        //insert squote_item
                        //ItemsQuote
                        jsonData = $(this).tableToJson('table-items', id);
                        //check the data
                        if (!_.isEmpty(jsonData)) {
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: jsonData, Trigger: [] })
                                .then(function(response) {}).catch(function(error) {

                                })
                        }

                    }).then(function() {
                        //charges
                        //ChargesQuote
                        jsonCharges = $(this).tableToJson('table-charges', id);
                        if (!_.isEmpty(jsonCharges)) {
                            jsonCharges[0]['Name'] = jsonCharges[0]['magaya__Charge_Description'];
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: jsonCharges, Trigger: [] })
                                .then(function(response) {

                                }).catch(function(response) {
                                    //do smething
                                })
                        }

                    }).then(function() {
                        //all is OK, unblock UI, reset form and tables
                        Utils.unblockUI()
                        Swal.fire({
                            title: 'Success',
                            text: 'Operation success',
                            icon: 'success',
                            allowOutsideClick: false
                        }).then(function() {
                            drawQuotationCRM();
                        })

                    }).catch(function(response) {
                        Utils.unblockUI()
                        errorData = response.data
                        codeError = ''
                        $.map(errorData, function(k) {
                            codeError = k.details.api_name;
                        })
                        Swal.fire({
                            title: 'Error',
                            text: 'Please, refer the field ' + codeError,
                            icon: 'error'
                        })
                    })
            })

        //join objects
        //Object.assign(recordData, dataArray)
        //ready to insert
        id = 0;


    }
})


/************************************************************************************
 ************  SORTABLES QUOTES CRM AND MAGAYA *************************************
 ************  **********************************************************************/
//sortable1 dinamic interfaz
$('#sortable1').bind("DOMSubtreeModified", function() {
    $(".delete-quote-from-magaya").show();
    $(".send-quote-to-crm").show();
    let message = '';
    //delete group of quote on magaya
    $(".delete-quote-from-magaya").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        let i = 0;
        $("input[class=form-check-input-quote-magaya]:checked").each(function(k) {
            i++

        })

        if (i > 0) {


        Swal.fire({
            title: "Confirm",
            text: "You are about to delete record from Magaya, you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            cancelButtonColor: '#d33'

        }).then((result) => {

            if (result.isConfirmed) {
                $("input[class=form-check-input-quote-magaya]:checked").each(function(k) {
                    parent = $(this).closest('li');
                    guid = parent.attr("data-id");
                    type = MagayaAPI.TRANSACTION_TYPES.Quotation
                    data = {
                            method: 'DeleteTransaction',
                            data: [
                                '96101',
                                type,
                                guid
                            ]
                        }
                        //call async function
                    let result = getMagayaRequest(data);
                    if (result)
                        message += `Operation SUCCESS with Quote Magaya GUID ${guid} <br />`
                    else
                        message += `Operation error with Quote GUID ${guid} <br />`
                });

                $("#no-configuration-alert").html(message)
                .css("display", "inline").fadeIn("slow").delay(6000).fadeOut("slow");
                $("#sortable1").empty();
                drawQuotationMagaya();
            } else {

            }
        })/*.then(() => {

            $("#no-configuration-alert").html(message)
                .css("display", "inline").fadeIn("slow").delay(6000).fadeOut("slow");

            Swal.fire({
                title: "Success",
                html: message,
                icon: 'success'
            }).then(function() {
                $("#sortable1").empty();
                drawQuotationMagaya();
            });
        })*/
    }
    })


    $(".send-quote-to-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Swal.fire({
            title: "Confirm",
            text: "You are about to import record to CRM, you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            cancelButtonColor: '#d33'

        }).then((result) => {

            if (result.isConfirmed) {
                $("input[class=form-check-input-quote-magaya]:checked").each(function(k) {
                    parent = $(this).closest('li');
                    id = parent.attr("data-idArray");
                    sendQuoteMagaya2CRM(arrayMagayaQuotes[id])
                })
            }
        })
    });
});


$('#sortable2').bind("DOMSubtreeModified", function() {
    $(".delete-quote-from-crm").show();
    $(".send-quote-to-magaya").show();

    //delete button
    $(".delete-quote-from-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        let i = 0;
        $("input[class=form-check-input-quote-crm]:checked").each(function(k) {
            i++

        })

        if (i > 0) {

            Swal.fire({
                title: "Confirm",
                text: "You are about to delete record from CRM, you sure?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33'

            }).then((result) => {

                if (result.isConfirmed) {
                    message = '';
                    moduleName = "magaya__SQuotes";
                    $("input[class=form-check-input-quote-crm]:checked").each(function(k) {
                        parent = $(this).closest('li');
                        idQuote = parent.attr("data-id");
                        //get related records to find id
                        ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
                            .then(function(response) {
                                $.map(response.data, function(k) {
                                    let result = deleteDataCRM("magaya__ChargeQuote", k.id).then(r => {
                                        message += r.data.code;
                                    })

                                })
                            })

                        ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
                            .then(function(response) {
                                $.map(response.data, function(k) {
                                    let result = deleteDataCRM("magaya__ItemQuotes", k.id).then(r => {
                                        message += r.data.code;
                                    })

                                })
                            })

                        let result = deleteDataCRM("magaya__SQuotes", idQuote).then(r => {
                            message += r['data']['code'];

                        }).then(r => {
                            drawQuotationCRM();
                        });
                    });
                }
        }).then(function() {
            drawQuotationCRM();
        })
    }
    })

    //send quote to magaya
    $(".send-quote-to-magaya").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Swal.fire({
            title: "Confirm",
            text: "You are about to export Quote to Magaya, you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            cancelButtonColor: '#d33'

        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire({
                        title: "Warning",
                        text: "Not ready yet",
                        icon: "warning",
                        //showCancelButton: true,
                        //confirmButtonText: "Yes",
                        //cancelButtonText: "Cancel",
                        //cancelButtonColor: '#d33'

                    })
                    /*$(".selected-quote-crm").each(function() {
                        idQuote = $(this).attr("data-id");
                        buildStringXML(idQuote);
                    })*/

            }
        })
    })

    //Click on ApplyToAccount to fill it
    $("select[name=ApplyToAccounts]").click(function(e) {
        e.preventDefault();
        //e.stopImmediatePropagation();

        $("select[name=ApplyToAccounts]").empty();

        //seleccionar Client, Shipper y Consignee
        let clientNum = $("select[name=ContactName]").val();
        let shipperNum = $("select[name=ShipperName]").val();
        let consigneeNum = $("select[name=ConsigneeName]").val();

        addedToApplyAccounts(clientNum);
        addedToApplyAccounts(shipperNum);
        addedToApplyAccounts(consigneeNum);



        //Eliminar valores duplicados del ApplyToAccounts
        var valores = document.getElementById("ApplyToAccounts");
        //console.warn("HHHHHHH")
        [].slice.call(valores.options)
            .map(function(a) {
                if (this[a.value]) {
                    valores.removeChild(a);
                } else {
                    this[a.value] = 1;
                }
            }, {});

    })

    //new quote
    //set panel quote-for active and show
    $(".new-quote").click(function() {
        $("#quote-alert").hide().html("")
        $("#nav-tab > a").removeClass("active");
        $("#nav-tabContent > div").removeClass("show active");
        $("#av-quotationFor-tab").addClass('active');
        $("#nav-quotationFor").addClass('show active');
        //limpiar campos
        $("select[name=RepresentativeName]").empty();
        $("select[name=TransportationMode]").val('');
        $("select[name=ContactName]").empty();
        $("select[name=ApplyToAccounts]").empty();
        $("select[name=Shipper]").val('');
        $("select[name=ConsigneeName]").val('');
        $("textarea").val('');
        $("select[name=Stage]").val('');
        //$('.qtForm').next('qtForSelect').html('Accounts')
        $("#QuoteForm").modal();
    })

    //edit quote on CRM
    //show and fill #QuoteForm with Quote Id value
    //set panel general active and show
    $(".edit-quote").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#nav-tab > a").removeClass("active");
        $("#nav-tabContent > div").removeClass("show active");
        $("#quote-alert").hide().html("")
        $("#table-items tbody").empty();
        $("#table-charges tbody").empty();
        $("#QuoteForm select[name=ContactName]").empty();
        $("#QuoteForm select[name=ApplyToAccounts]").empty();
        $("#QuoteForm select[name=Stage]").empty();
        $("#QuoteForm select[name=RepresentativeName]").empty();
        $("#QuoteForm #sendQuote").prop('disabled', true);
        $("#nav-general-tab").addClass('active');
        $("#nav-general").addClass('show active');
        $("#QuoteForm #sendQuote").hide();
        $("#QuoteForm #editQuote").show();

        idQuote = 0;
        parent = $(this).parent();
        idQuote = parent[0]['attributes']["data-id"]["nodeValue"];
        //get MQuote data
        ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuotes", RecordID: idQuote })
            .then(function(response) {

                if (!_.isEmpty(response)) {

                    data = response.data;
                    $.each(data[0], function(k, v) {
                        if (!_.isObject(v) && !k.includes("$")) {
                            //console.log(k)
                            var nameField = k.split("magaya__");
                            //campos que no son objetos
                            nameField[1] = sanitize(nameField[1])
                            v = sanitize(v)
                            $("#QuoteForm input[name=" + nameField[1] + "]").val(v);
                            $("#QuoteForm select[name=" + nameField[1] + "]").val(v);
                            //otros select


                        }
                    })

                    //Shipper y Consignee
                    if (!_.isEmpty(data[0]['magaya__ConsigneeName'])) {
                        //get the id from Account Array
                        //checking por el nombre, inseguro, cambiar a ID
                        checking = accounts.findIndex(i => i["Account_Name"] === data[0]['magaya__ConsigneeName']);

                        if (checking >= 0) {
                            $(`<option value="${accounts[checking]['id']}" selected>${sanitize(accounts[checking]["Account_Name"])}</option>`).appendTo("select[name=ConsigneeName]");
                            $(`<option value="${accounts[checking]['id']}">${sanitize(accounts[checking]["Account_Name"])}</option>`).appendTo("select[name=ApplyToAccounts]");
                        } else {
                            $("select[name=ConsigneeName]").val("")

                        }
                    }

                    //Quote Shipper
                    if (!_.isEmpty(data[0]['magaya__Shipper'])) {
                        //checking por el nombre, inseguro, cambiar a ID
                    checking = accounts.findIndex(i => i["Account_Name"] === data[0]['magaya__Shipper']);
                    //agregar al ApplyToAccounts
                    if (checking >= 0) {
                        $(`<option value="${accounts[checking]['id']}">${sanitize(accounts[checking]["Account_Name"])}</option>`).appendTo("select[name=ApplyToAccounts]");
                            //var
                            $("select[name=ShipperName] option").each(function() {
                                if ($(this).text() === data[0]['magaya__Shipper']) {
                                    $("select[name=ShipperName]").val($(this).val())
                                }
                            })

                        }

                    }

                    //metodo de transporte
                    if (!_.isEmpty(data[0]['magaya__TransportationMode'])) {
                        $("<option value='" + data[0]['magaya__TransportationMode']['id'] + "' selected>" + sanitize(data[0]['magaya__TransportationMode']['name']) + "</option>").appendTo("#TransportationMode");
                    }

                    if (!_.isEmpty(data[0]["Account"])) {
                        id = data[0]["Account"]["id"];
                        client = sanitize(data[0]["Account"]["name"]);
                        //$("<option value='" + idem[0]["Account"]["id"] + ">" + idem[0]["Account"]["name"] + "</option>").appendTo("#QuoteForm select[name=ContactName]");
                    }
                    $("#QuoteForm select[name=ContactName]").append(`<option value='${id}'>${client}</option>`);
                    $("#QuoteForm select[name=ApplyToAccounts]").append(`<option value='${id}'>${client}</option>`);


                    $("#QuoteForm input[name=Name]").val(data[0]["Name"])
                    $("#QuoteForm input[name=id]").val(data[0]["id"]);
                    $("#Description").text(data[0]["magaya__Description"]);

                    //
                }

            }) //then*/

            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
            .then(function(response) {
                $("#charges tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemCharges = response.data
                    amountTotal = cont = 0;
                    $.each(idemCharges, function(i, k) {
                            cont++;
                            amountTotal += (k.magaya__CQuantity * k.magaya__Price);
                            //ApplyTo es un objeto, que pudiera estar vacio
                            var applyTo = '';
                            var applyToId = '';
                            if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                                applyTo = sanitize(k.magaya__ApplyToAccounts.name)
                                applyToId = k.magaya__ApplyToAccounts.id

                              $("#ApplyToAccounts").append(`<option value='${applyToId}'>${applyTo}</option>`);
                              //$("#QuoteForm select[name=ApplyToAccounts]").val(applyToId);
                                }

                                k.magaya__ChargeCode = sanitize(k.magaya__ChargeCode)
                                k.Name = sanitize(k.Name)
                                k.magaya__Charge_Description = sanitize(k.magaya__Charge_Description)

                            $("#table-charges tbody").append(`<tr><td class="Delete"><i class="fa fa-trash del-item-charge" aria-hidden="true"></i></td>
                                                            <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                                                            <td class="Name">${k.Name}</td>
                                                            <td class="magaya__Charge_Description">${k.magaya__Charge_Description}</td>
                                                            <td class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                                                            <td class="magaya__Price">dfgdfgdf${k.magaya__Price}</td>
                                                            <td class="magaya__Amount">${k.magaya__Amount}</td>
                                                            <td class="magaya__QuanPlusTax">${k.magaya__QuanPlusTax}</td>
                                                            <td class="NoData"></td>
                                                            <td></td>
                                                            <td class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                                                            <td class="magaya__GastoOIngreso">${k.magaya__GastoOIngreso}</td>
                                                            <td class="NoData">${applyTo}</td>
                                                            <td class="magaya__ApplyToAccounts">${applyToId}</td>

                                                            </tr>`);

                        }) //each

                } //IF
            }) //then

            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
            .then(function(response) {
                $("#table-items tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemItems = response.data
                    $.each(idemItems, function(i, k) {
                        k.Name = sanitize(k.Name)
                        var volume = k.magaya__Length * k.magaya__Height * k.magaya__Width;
                        //appendData = `<tr><td class="Delete"><i class="fa fa-trash del-item-warehouse" aria-hidden="true"></i></td><td class="magaya__Status"><select id="Status" name="Status" class="form-control"><option value="${k.magaya__Status}" selected="true">${k.magaya__Status}</option></select></td><td class='Name'>${k.Name}</td><td class='magaya__Pieces'>${k.magaya__Pieces}</td><td class='magaya__Length'>${k.magaya__Length}</td><td class='magaya__Height'>${k.magaya__Height}</td><td class='magaya__Width'>${k.magaya__Width}</td><td class="magaya__Weigth">${k.magaya__Weigth}</td><td class="magaya__Volume">${volume}</td></tr>`
                        appendData = `<tr><td class="Delete"><i class="fa fa-trash del-item-warehouse" aria-hidden="true"></i></td><td class="magaya__Status">${sanitize(k.magaya__Status)}</td><td class='Name'>${sanitize(k.Name)}</td><td class='magaya__Pieces'>${k.magaya__Pieces}</td><td class='magaya__Length'>${k.magaya__Length}</td><td class='magaya__Height'>${k.magaya__Height}</td><td class='magaya__Width'>${k.magaya__Width}</td><td class="magaya__Weigth">${k.magaya__Weigth}</td><td class="magaya__Volume">${volume}</td></tr>`
                        $("#table-items tbody").append(appendData);

                        }) //each

                }
            }) //then

            $('#QuoteForm').modal({ show: true });
        }) //then*/



    }); //edit quote link

//bind CRM Quotes

/*****************************************************************************
 *********************** END SORTABLE BIND *********************************
 *********************** ****************************************************/
async function getMagayaRequest(dataSend) {
    let result = await magayaRequest(dataSend)
}

async function magayaRequest(data) {
    MagayaAPI.sendRequest(data, function(result) {
        if (result.error !== "no_error") {
            return false;

        } else {
            return true;
        } //else magayaApi
    })
}


//editQuote button
//save changes to Edit
$("#editQuote").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    idQuote = $("#QuoteForm input[name=id]").val();
    //SQuote Update
    var config = {
            Entity: "magaya__SQuotes",
            id: idQuote,
            APIData: {
                id: idQuote,
                "magaya__Shipper": $(":input[name=ShipperName] option:selected").text(),
                //"magaya__Carrier": $("select[name=Carrier]").val(),
                //"magaya__ExpirationDate": expirationDateFinal,
                "magaya__Direction": $(":input[name=Direction]").val(),
                "magaya__TransportationMode": $("select[name=TransportationMode] option:selected").val(),
                "magaya__MethodOfTransportation": $("input[name=TransportationMethod]").val(),
                "magaya__Description": $("#Description").val().replace(/[^a-zA-Z0-9]/g, ' '),
                "magaya__Service": $("select[name=Service]").val(),
                "magaya__ConsigneeName": $("select[name=ConsigneeName] option:selected").text(),
                //"magaya__ConsigneeName": $("select[name=OtherConsignee] option:selected").text(),
                "magaya__Stage": $("select[name=Stage] option:selected").val(),
                "magaya__Carrier": $("select[name=Carrier] option:selected").val()
            }
        }
        //SQuotes
    $(this).updateRecordCRM(config);

    //selecciono los registros relacionados, para luego borrarlos
    //items
    ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
        .then(function(response) {
            if (!_.isEmpty(response.data)) {
                //borrarlos
                items = response.data;
                $.map(items, function(k) {
                    $(this).deleteData(k.id, "magaya__ItemQuotes")
                })
            }
        })
        //get table json and insert data
    items = $(this).tableToJson('table-items', idQuote);
    if (!_.isEmpty(items)) {
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: items, Trigger: [] }).then(function(data) {});
    }

    //charges
    ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
        .then(function(response) {
            if (!_.isEmpty(response.data)) {
                //borrarlos
                charges = response.data;
                $.map(charges, function(k) {
                    $(this).deleteData(k.id, "magaya__ChargeQuote")
                })
            }
        });
    //get table json and insert data
    charges = $(this).tableToJson('table-charges', idQuote);
    if (!_.isEmpty(charges)) {
        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: charges, Trigger: [] }).then(function(data) {});
    }

    Swal.fire({
        title: 'Success',
        text: 'Operation success',
        icon: 'success',
        allowOutsideClick: false
    }).then(function() {
        $("#QuoteForm").modal("hide");
        drawQuotationCRM();

        //location.reload();
    })

});

////////////////////////////////////////////////////////////////////
////////////   check consignee
/////////////////////////////////////////////////////////////////////
$("select[name=ConsigneeName]").change(function(e) {
    e.preventDefault();
    let idAccount = $("select[name=ConsigneeName]").val();
    if (idAccount) {
        if (!_.isEmpty(MagayaUsers)) {
            if (!checkCustomerOnMagaya(idAccount)) {
                Swal.fire({
                    title: "Warning",
                    text: "Consignee selected is not a Magaya Customer, want to create it now?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    allowOutsideClick: false,
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    //get account
                    var indexAccount = accounts.findIndex(i => i['id'] == idAccount)
                    if (result.isConfirmed) {

                        if (indexAccount >= 0) {
                            var accountData = accounts[indexAccount];
                            createCustomerCRMtoMagaya(accountData);
                        }
                        $("#quote-alert").hide("slow").html("");
                        //agregarlo en el ApplyToAccounts
                        //addedToApplyAccounts(idAccount);

                    } else {
                        //$("#quote-alert").show("slow").html("Warning!!");
                        $("#quote-alert").show("slow").append(`<p>Consignee ${sanitize(accounts[indexAccount]["Account_Name"])} is not a Magaya Customer!!</p>`)
                    }
                });

            } else {
                //agregarlo en el ApplyToAccounts
                //addedToApplyAccounts(idAccount);
            }
        } else {
            Swal.fire({
                title: "Error",
                text: "Can't fetch Magaya Customer to compare this item, please check your Magaya conection",
                icon: "error",
                confirmButtonText: "Yes"
            })
        }
    }
})

////////////////////////////////////////////////////////////////////
////////////   check Shipper
/////////////////////////////////////////////////////////////////////
$("select[name=ShipperName]").change(function(e) {
    e.preventDefault();
    let idAccount = $("select[name=ShipperName]").val();

    if (idAccount) {
        if (!_.isEmpty(MagayaUsers)) {
            if (!checkCustomerOnMagaya(idAccount)) {
                Swal.fire({
                    title: "Warning",
                    text: "Shipper selected is not a Magaya Customer, want to create it now?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    allowOutsideClick: false,
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    //get account
                    var indexAccount = accounts.findIndex(i => i['id'] == idAccount)
                    if (result.isConfirmed) {
                        if (indexAccount >= 0) {
                            var accountData = accounts[indexAccount];
                            createCustomerCRMtoMagaya(accountData);
                        }
                        $("#quote-alert").hide("slow").html("")
                        //agregarlo en el ApplyToAccounts
                        //addedToApplyAccounts(idAccount);
                    } else {
                        //$("#quote-alert").show("slow").html("Warning!!");
                        $("#quote-alert").show("slow").append(`<p>Shipper ${sanitize(accounts[indexAccount]["Account_Name"])} is not a Magaya Customer!!</p>`)
                    }
                });

            } else {
                //agregarlo en el ApplyToAccounts
                //addedToApplyAccounts(idAccount);
            }
        } else {
            Swal.fire({
                title: "Error",
                text: "Can't fetch Magaya Customer to compare this item, please check your Magaya conection",
                icon: "error",
                confirmButtonText: "Yes"
            })
        }
    }


})

////////////////////////////////////////////////////////////////////
////////////   check ApplyToAccounts
/////////////////////////////////////////////////////////////////////
$("select[name=ApplyToAccounts]").change(function(e) {
    e.preventDefault();
    let idAccount = $("select[name=ApplyToAccounts]").val();
    if (!_.isEmpty(MagayaUsers)) {
        if (!checkCustomerOnMagaya(idAccount)) {
            Swal.fire({
                title: "Warning!!",
                text: "Client selected is not a Magaya Customer, want to create it now?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33',
                allowOutsideClick: false
            }).then((result) => {
                //get account
                var indexAccount = accounts.findIndex(i => i['id'] == idAccount)
                if (result.isConfirmed) {
                    if (indexAccount >= 0) {
                        var accountData = accounts[indexAccount];
                        createCustomerCRMtoMagaya(accountData);
                    }
                    $("#quote-alert").hide("slow").html("")


                } else {
                    //$("#quote-alert").show("slow").html("Warning!!");
                    $("#quote-alert").show("slow").append(`<p>Client ${sanitize(accounts[indexAccount]["Account_Name"])} is not a Magaya Customer!!</p>`)
                }
            });
        }

    } else {
        Swal.fire({
            title: "Error",
            text: "Can't fetch Magaya Customer to compare this item, please check your Magaya conection",
            icon: "error",
            confirmButtonText: "Yes"
        })
    }
})

////////////////////////////////////////////////////////////////////
////////////   check ApplyToAccounts
/////////////////////////////////////////////////////////////////////
$('select[name=ContactName]').bind("DOMSubtreeModified", function(e) {
//$("select[name=ContactName]").change(function(e) {
    e.preventDefault();
    let idAccount = $("select[name=ContactName]").val();

    if (idAccount) {
        if (!_.isEmpty(MagayaUsers)) {
            if (!checkCustomerOnMagaya(idAccount)) {
                Swal.fire({
                    title: "Warning",
                    text: "Client selected is not a Magaya Customer, want to create it now?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    allowOutsideClick: false,
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    //get account
                    var indexAccount = accounts.findIndex(i => i['id'] == idAccount)
                    if (result.isConfirmed) {
                        if (indexAccount >= 0) {
                            var accountData = accounts[indexAccount];
                            createCustomerCRMtoMagaya(accountData);
                        }
                        $("#quote-alert").hide("slow").html("")
                    } else {
                        //$("#quote-alert").show("slow").html("Warning!!");
                        $("#quote-alert").show("slow").append(`<p>Client ${sanitize(accounts[indexAccount]["Account_Name"])} is not a Magaya Customer!!</p>`)

                    }
                });
            }
        } else {
            Swal.fire({
                title: "Error",
                text: "Can't fetch Magaya Customer to compare this item, please check your Magaya conection",
                icon: "error",
                confirmButtonText: "Yes"
            })
        }
    }
})



/********************************************************************
 * ******** set carriers select when transportation mode change
 * *******************************************************************/
/*$("select[name=TransportationMode]").change(function(e) {
    e.preventDefault();
    var idMethod = $(this).val();
    var parentMethod = '';
    method = transpMethods.findIndex(i => i.id == idMethod);
    if (method >= 0) {
        $("select[name=Carrier]").empty();
        parentMethod = transpMethods[method]['magaya__ParentMethod'];
        $.each(MagayaCarriers, function(k, v) {
            if (v.CarrierInfo.CarrierTypeCode === parentMethod) {
                $(`<option value="${v.Name}">${v.Name}</option>`).appendTo("select[name=Carrier]");
            }
        })
    }
})*/


//button toPdf form modal show
$("#toPdf").click(function() {
    //datetime expiration date

    //load = $(".loading");
    //$("#toPdf").addClass("spiner-border text-primary");
    //$("#toPdf").attr("role", "status")
    //$("#toPdf").html("Wait for it...");
    var element = document.getElementById("htmlToPdf");
    var opt = {
        margin: [30, 10, 30, 10], //top, left, buttom, right
        //filename: this.auth_user,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 1,
            bottom: 10
        },
        pagebreak: { mode: ['css'] },
        jsPDF: {
            unit: 'mm',
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).then(function() {
        $("#inner").css({ "font-size": "11px", "background-color": "#F5F5F5" });
        $("#message-pdf").html("Successfully created PDF")
            .css("display", "inline").fadeIn("slow").delay(2000).fadeOut("slow");

    }).save();
})




/***************************************************************
 ************DIBUJA LAS COTIZACIONES ****************************
 *****************************************************************/
function drawQuotationCRM() {
    //get SQuotes from CRM
    var dataAppend;

    getAllRecordCRM("magaya__SQuotes", "desc").then(r => {
        $("#sortable2").empty();
        arrayQuote = [];
        if (!_.isEmpty(r)) {

            $.each(r, function(k, v) {
                v.Name = sanitize(v.Name)
                v.magaya__ContactName = sanitize(v.magaya__ContactName)
                arrayQuote.push(v)

                id = v.id;
                dataAppend = `<li class="list-group-item" data-id="${v.id}">
                            <div class="form-check">
                            <input class="form-check-input-quote-crm" type="checkbox" value="">
                            </div>
                        <div class="view-quote sm"><i class="fa fa-eye"></i></div>
                        <div class="btn-sm edit-quote"><i class="far fa-edit"></i></div>
                        <span>${sanitize(v.Name)}</span><span>${sanitize(v.magaya__ContactName)}</span></li>`;
                $("#sortable2").append(dataAppend);
            })
        } else {
            dataAppend = `<li class="list-group-item">No Quotes found in CRM</li>`
            $("#sortable2").append(dataAppend);
        }
        return (arrayQuote);

    }).then(function(r) {
        quoteName = "QT-1";
        if (_.isEmpty(r)) {
            quoteName = "QT-1";
        } else {
            realQuoteNumber = 0;
            $.each(r, function(k, v) {
                var quoteNumber = v["Name"].split("-");
                var actualQuoteNumber = parseInt(quoteNumber[1]);
                if (actualQuoteNumber > realQuoteNumber) {
                    realQuoteNumber = actualQuoteNumber
                }
            })
            realQuoteNumber++;
            quoteName = `QT-${realQuoteNumber}`

        }

        $(":input[name=Name]").val(quoteName);
    })
}

/****************************************************************
 * ************ GET CARRIERS DESDE MAGAYA *************************
 * ****************************************************************/
 async function getCarriersFromMagaya() {
    let dataVar = await getMagayaVariables()

    flags = MagayaAPI.TRANSACTIONS_FLAGS.IncludeRelatedObj
    type = MagayaAPI.ENTITY_TYPES.Any

    data = {
        method: 'GetEntitiesOfType',
        data: [
            dataVar["network_id"],
            flags,
            '',
            type
        ],
        url: dataVar.magaya_url
    }


    ////////////////////////////////////////////////////////////
    ///////// getting contacts for a uuid client ////////////////
    ///////////////////////////////////////////////////////////
    /*flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    dataContacts = {
            method: 'GetTransaction',
            data: [
                Utils.getAccessKey(),
                'CL',
                2048,
                '83013b4e-d9f2-4a42-a830-204075205735',
            ]
        }
        /*dataContacts = {
            method: 'GetEntityContacts',
            data: [
                Utils.getAccessKey(),
                flags,
                '83013b4e-d9f2-4a42-a830-204075205735',
            ]
        }

    MagayaAPI.sendRequest(dataContacts, function(result) {
            if (result.error) {
                $("#no-configuration-alert").show()

            } else {
            } //else magayaApi
        })*/
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    MagayaAPI.sendRequest(data, function(result) {
        if (result.error) {
            $("#no-configuration-alert").show()

        } else {
            MagayaUsers = [];
            if (!$.isEmptyObject(result.data.Client)) {
                var i = 0
                $.each(result.data.Client, function(k, v) {
                    MagayaUsers.push(v)
                    var content = `<li class="list-group-item" data-id="${v["@attributes"]["GUID"]}" data-idArray="${i}">
                    <input class="form-check-input-customer-magaya" type="checkbox" value="">
                    <button class="btn btn-sm view-customer-magaya"><i class="fa fa-eye"></i></button>
                    ${v.Name} (${v.Email})</li>`
                    i++;
                    $("#sortable4").append(content);
                })

            }


            if ($.isEmptyObject(result.data.Carrier)) {

            } else {
                var content = '';
                if (result.data['Carrier'] instanceof Array) {
                    records = result.data['Carrier']
                } else {
                    records = [result.data['Carrier']]
                }

                console.log("Carriers", records)
                var i = 0;
                records.forEach(function(item) {
                        MagayaCarriers.push(item);
                        content = `<option value="${item.Name}"> ${item.Name}</option>`
                        i++;
                        $("select[name=Carrier]").append(content);
                    }) //forEach
            } //else result_data
            $('#table-show tbody').html(content);
        } //else magayaApi
    })

}


/*
endpoint para los puertos
data = { "url": "http://73.46.168.57:3691/CSSoapService?wsdl" }
fetch('https://localhost/zoho_crm_magaya_ext/public/getPorts?data%5B%5D=96101&data%5B%5D=524288&contactData%5BName%5D=Wilfredo Gallardo&contactData%5BEmail%5D=gallardoWil1988@gmail.com&contactData%5BPhone%5D=+1100111111&url=http://73.46.168.57:3691/CSSoapService?wsdl', {
        method: 'post',
        //body: JSON.stringify(data)

        //body: JSON.stringify(opts)
    })
    .then((response) => response.text())
    .then(function(data) {
        var tab = '';
        //$("#fetching").html(response);
        //$.each(data, function(k, v) {
        //tab += `<tr><td>${v.ID}</td><td>${v.CreatedAt}</td><td>${v.name}</td><td>${v.author}</td></tr>`

        //});
        //$(tab).appendTo("#show tbody");
        //return response.json();
    })*/

/***********************************************************************
 ************ DIBUJA LAS QUOTES DE MAGAYA *********************************
 ************ ********************************************************/
async function drawQuotationMagaya() {
    let dataVar = await getMagayaVariables()

    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    type = MagayaAPI.TRANSACTION_TYPES.Quotation

    data = {
        method: 'GetTransRangeByDate',
        data: [
           dataVar["network_id"],
            type,
            moment('1970-01-01').format('Y-MM-DD'),
            moment().format('Y-MM-DD'), //today
            flags
        ],
        url: dataVar.magaya_url
    }

    MagayaAPI.sendRequest(data, function(result) {
        if (result.error) {
            $("#no-configuration-alert").show()

        } else {
            content = '';

            if ($.isEmptyObject(result.data)) {
                content = '<li class="list-group-item">Cant fetch any record from Magaya</li>';
                $("#sortable1").append(content);
            } else {
                if (result.data['Quotation'] instanceof Array) {
                    records = result.data['Quotation']
                } else {
                    records = [result.data['Quotation']]
                }
                var i = 0;
                records.forEach(function(item) {
                        arrayMagayaQuotes.push(item);
                        content = `<li class="list-group-item" data-id="${item["@attributes"]["GUID"]}" data-idArray="${i}">
                        <div class="form-check">
                        <input class="form-check-input-quote-magaya" type="checkbox" value="">
                        </div>
                        <button class="btn btn-primary btn-sm view-quote-magaya"><i class="fa fa-eye"></i></button> ${item.Number} ${item.ContactName}</li>`
                        i++;
                        $("#sortable1").append(content);
                    }) //forEach

            } //else result_data
            $('#table-show tbody').html(content);
        } //else magayaApi
    })
}

/**********************************************************
 ********* DRAW MAGAYA QUOTE, FROM ARRAY, HELP TO REBUILD
        VIEW WITHOUT QUERY MAGAYA

*************************************************************/
function drawQuotationMagayaFromArray() {
    $("#sortable1").empty();
    $.each(arrayMagayaQuotes, function(k, v) {
        content = `<li class="list-group-item" data-id="${v["@attributes"]["GUID"]}">
                        <div class="form-check">
                        <input class="form-check-input-quote-magaya" type="checkbox" value="">
                        </div>
                        <button class="btn btn-primary btn-sm view-quote-magaya"><i class="fa fa-eye"></i></button> ${v.Number} ${v.ContactName}</li>`

        $("#sortable1").append(content);
    })
}

/**********************************************************
 ********* GET MAGAYA QUOTE, CONVERT TO CRM SQUOTE **********
 ********* *************************************************/
async function sendQuoteMagaya2CRM(dataArray) {
    let state = "";
    let methodCode = 0;
    let idQuote = 0;
    const guidQuote = dataArray["@attributes"]["GUID"];
    let createdOn = dataArray["CreatedOn"].split("T")
    const createdAt = createdOn[0]
    let measurementUnit = "International"
    let ms = dataArray["MeasurementUnits"]["LengthUnit"]
    if (ms === "in") {
        measurementUnit = "English"
    }

    console.log(dataArray)
    //get method code
    if (!_.isEmpty(dataArray['ModeOfTransportation'])) {
        //get transportation code
        code = dataArray['ModeOfTransportation']["@attributes"]["Code"];
        indexArray = transpMethods.findIndex(i => i["magaya__TransportationMethodCode"] == code);

        method = transpMethods[indexArray];
        methodCode = method.id;
    }

    //set right stage
    /*if (!_.isEmpty(dataArray['Status'])) {
        stage = await getAllRecordCRM("magaya__SQuoteStage")
            .then(r => {
                if (!_.isEmpty(r)) {
                    $.map(r, function(k, i) {
                        if ((k.magaya__SQuoteStageMagaya).toString() === (dataArray['Status']).toString()) {
                            state = k.id;
                        }
                    })
                }
            })
    }*/

    //get carrier
    carrier = '';
    let idCarrier = 0
    if (!_.isEmpty(dataArray['Carrier'])) {
        //check if carrier exists in CRM
        carrier = dataArray['Carrier'].Name;
        carrierGUID = dataArray['Carrier']['@attributes']["GUID"]
        let status = 0

        let resCarrier = '';
        cc = await ZOHO.CRM.API.searchRecord({Entity:"magaya__Providers",Type:"criteria",Query:"(magaya__Magaya_GUID:equals:"+carrierGUID + ")"})
        .then(function(data){
            console.log("Searching carrier", data)
            resCarrier = data
            status = data.status

        })

        if (status && status == 204) {
            //create carrier
            let carrier = {
                "Name": dataArray['Carrier'].Name,
                "magaya__Magaya_GUID": dataArray['Carrier']['@attributes']["GUID"],
                "magaya__Type": dataArray['Carrier'].Type,
                "magaya__BillingAddress_City": dataArray['Carrier'].BillingAddress.City,
                "magaya__BillingAddress_Country": dataArray['Carrier'].BillingAddress.Country,
                "magaya__BillingAddress_State": dataArray['Carrier'].BillingAddress.State,
                "magaya__BillingAddress_Street": dataArray['Carrier'].BillingAddress.Street,
                "magaya__BillingAddress_ZipCode": dataArray['Carrier'].BillingAddress.ZipCode,
            }

            let a = await insertRecordCRM("magaya__Providers", carrier)
                    .then(function(data){
                        idCarrier = data[0]["details"]["id"]
                        console.log("result inserting", idCarrier)
                    })
        } else {
            idCarrier = resCarrier.data[0]["id"]
        }
    }
    //SQuotes
    //seleccionar account
    let accountGUID = 0;
    let resAccount = {}
    let statusAccount = ''
    let idAccount = 0
    if (!_.isEmpty(dataArray["Contact"])) {
        accountGUID = dataArray["Contact"]["@attributes"]["GUID"]

        cc = await ZOHO.CRM.API.searchRecord({Entity:"Accounts",Type:"criteria",Query:"(magaya__MagayaGUID:equals:"+accountGUID+")"})
        .then(function(data){
            console.log("Searching account", data)
            resAccount = data
            statusAccount = data.status

        })

        if (statusAccount && statusAccount == 204) {
            //create carrier
            let email = ''
            if (dataArray['Contact'].Email !== 'null' && dataArray['Contact'].Email !== null)
                email = dataArray['Contact'].Email

            let account = {
                "Account_Name": dataArray['Contact'].Name,
                "magaya__MagayaGUID": dataArray['Contact']['@attributes']["GUID"],
                "magaya__MagayaEmail": email ,

            }


            if (!_.isEmpty(dataArray['Contact'].BillingAddress)) {
                let billingdata = {
                    "Billing_City": dataArray['Contact'].BillingAddress.City,
                    "Billing_Country": dataArray['Contact'].BillingAddress.Country,
                    "Billing_State": dataArray['Contact'].BillingAddress.State,
                    "Billing_Street": dataArray['Contact'].BillingAddress.Street,
                    "Billing_ZipCode": dataArray['Contact'].BillingAddress.ZipCode,
                }

                Object.assign(account, billingdata)
            }

            let a = await insertRecordCRM("Accounts", account)
                    .then(function(data){
                        idAccount = data[0]["details"]["id"]
                        console.log("result inserting account", idAccount)
                    })
                    .catch(err => {
                        console.log("error inserting", err)
                    })
        } else {
            idAccount = resAccount.data[0]["id"]
        }
    }

    recordData = {
        "magaya__ExpirationDate": !_.isEmpty(dataArray['ExpirationDate']) ? dataArray['ExpirationDate'] : "",
        "magaya__IssuedBy": !_.isEmpty(dataArray['IssuedByName']) ? dataArray['IssuedByName'] : "",
        "Name": !_.isEmpty(dataArray['Number']) ? dataArray['Number'] : "",
        "magaya__Direction": !_.isEmpty(dataArray['Direction']) ? dataArray['Direction'] : "",
        "magaya__Seller": "",
        "magaya__Description": !_.isEmpty(dataArray['DescriptionOfGoods']) ? dataArray['DescriptionOfGoods'] : "",
        "magaya__Stage": state,
        "magaya__ContactName": !_.isEmpty(dataArray['ContactName']) ? dataArray['ContactName'] : "",
        "magaya__Service": !_.isEmpty(dataArray['Service']) ? dataArray['Service'] : "",
        "magaya__Status": !_.isEmpty(dataArray['Status']) ? dataArray['Status'] : "",
        "magaya__MagayaGUID": guidQuote,
        "magaya__AddedTime": createdAt,
        "magaya__CreatedByName": dataArray['CreatedByName']
    };


    if (!_.isEmpty(dataArray["Incoterm"])) {
        let incoterm = `${dataArray["Incoterm"]["Code"]} - ${dataArray["Incoterm"]["Description"]}`
        Object.assign(recordData, {"magaya__Incoterms": incoterm})
    }


    if (idAccount > 0)
        Object.assign(recordData, {"Account": idAccount})


    routing = {
        "Name": !_.isEmpty(dataArray['Number']) ? dataArray['Number'] : "Data Routing",
        "magaya__Consignee": !_.isEmpty(dataArray['ConsigneeName']) ? dataArray['ConsigneeName'] : "",
        "magaya__Shipper": !_.isEmpty(dataArray['ShipperName']) ? dataArray['ShipperName'] : "",
    }
    if (idCarrier > 0)
        Object.assign(routing, {"magaya__MainCarrier": idCarrier})
    if (methodCode > 0)
        Object.assign(routing, {"magaya__ModeofTransportation":methodCode})



    console.log("mQuote Data", recordData)
    console.log("Routing Data", routing)
    //datos del contact
    /*if (!_.isEmpty(dataArray["Contact"]["Email"]) && dataArray["Contact"]["Email"] !== "null") {
        dataContact = {
            "magaya__ContactEmail": dataArray['Contact']["Email"],
            "magaya__ContactMobile": dataArray['Contact']['Phone']
        }
        Object.assign(recordData, dataContact)
    }*/

    idQuote = 0;
    ZOHO.CRM.API.insertRecord({ Entity: "magaya__Routing", APIData: routing, Trigger: []})
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

            ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: [] })
            .then(function(response) {
                data = response.data;
                $.each(data, function(key, valor) {
                    idQuote = valor['details']['id'];
                })

            }).then(function() {
                //Service Items
                if (!_.isEmpty(dataArray["Charges"])) {

                    var data = {};
                    var dataCharges = {};
                    var crmId = 0;
                    //var a = dataArray["Charges"]["Charge"];
                    cantElem = [].concat.apply([], dataArray["Charges"]["Charge"]).length;
                    //mas de un charge, array de objetos [{},{}]
                    if (cantElem > 1) {

                        $.map(dataArray["Charges"]["Charge"], function(k) {
                            if (!_.isEmpty(k.Entity)) {
                                guid = k.Entity["@attributes"]["GUID"];
                                guidChecking = accounts.findIndex(i => i["magaya__MagayaGUID"] === guid);
                                //si el usuario existe en el CRM, agregar el ApplyTo
                                if (guidChecking >= 0) {
                                    idAccount = accounts[guidChecking]['id'];
                                } else {
                                    $("#no-configuration-alert").html(`User ${k.Entity.Name} with Magaya GUID ${guid} not found in CRM`)
                                        .css("display", "inline").fadeIn("slow").delay(6000).fadeOut("slow");
                                }

                            }
                            dataCharges = {
                                "magaya__ApplyToAccounts": idAccount,
                                "magaya__SQuote_Name": idQuote,
                                "magaya__Tax_Amount": k.TaxAmount,

                                "magaya__Amount": k.Amount,
                                "magaya__Amount_Total": parseFloat(k.Amount) + parseFloat(k.TaxAmount),
                                "magaya__Charge_Description": k.ChargeDefinition.Description,
                                "magaya__ChargeCode": k.ChargeDefinition.Code,
                                "magaya__Price": k.Price,
                                "magaya__CQuantity": parseInt(k.Quantity),
                                "magaya__Amount": k.Amount,
                                "magaya__ChargeCurrency": k.Currency["@attributes"]["Code"],
                                "Name": k.ChargeDefinition.Description
                            }

                            console.log("Data charges", dataCharges)

                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: dataCharges, Trigger: ["workflow"] })
                                .then(function(response) {
                                    /*var func_name = "magaya__setQuoteTotalAmount";
                                    var req_data ={
                                        "quote_id" : idQuote
                                    };

                                    ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                        console.log("Update quote amount", data)
                                    })*/
                                })
                                .catch(function(error) {

                                })
                        });

                    } else {
                        //JSON {} de un solo elemento
                        charge = dataArray["Charges"]["Charge"];
                        if (!_.isEmpty(charge.Entity)) {
                            guid = charge.Entity["@attributes"]["GUID"];
                            guidChecking = accounts.findIndex(i => i["magaya__MagayaGUID"] === guid);
                            //si el usuario existe en el CRM, agregar el ApplyTo
                            if (guidChecking >= 0) {
                                idAccount = accounts[guidChecking]['id'];
                            } else {
                                $("#no-configuration-alert").html(`User ${k.Entity.Name} with Magaya GUID ${guid} not found in CRM`)
                                    .css("display", "inline").fadeIn("slow").delay(6000).fadeOut("slow");
                            }
                            //si guidChecking < 0, crear el usuario
                            dataCharges = {
                                "magaya__ApplyToAccounts": idAccount,
                                "magaya__Tax_Amount": charge.TaxAmount,
                                "magaya__SQuote_Name": idQuote,
                                "magaya__Amount": charge.Amount,
                                "magaya__Amount_Total": parseFloat(charge.Amount) + parseFloat(charge.TaxAmount),
                                "magaya__Charge_Description": charge.ChargeDefinition.Description,
                                "magaya__ChargeCode": charge.ChargeDefinition.Code,
                                "magaya__Price": charge.Price,
                                "magaya__CQuantity": parseInt(charge.Quantity),
                                "magaya__Amount": charge.Amount,
                                "magaya__ChargeCurrency": charge.Currency["@attributes"]["Code"],
                                "Name": charge.ChargeDefinition.Description
                            }
                            console.log("Data charges", dataCharges)
                            if (guidChecking < 0) {
                                $("#no-configuration-alert").html(`User ${charge.Entity.Name} with Magaya GUID ${guid} not found in CRM`)
                                    .css("display", "inline").fadeIn("slow").delay(6000).fadeOut("slow");

                            } else {
                                crmId = accounts[guidChecking]['id'];
                                dataPlus = { "magaya__ApplyToAccounts": crmId }
                                Object.assign(dataCharges, dataPlus)
                            }

                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: dataCharges, Trigger: ["workflow"] })
                                .then(function(response) {}).catch(function(error) {

                                })
                        }
                    }

                }
                //packages
                if (!_.isEmpty(dataArray["Items"])) {
                    var data = {};
                    var dataPackages = {};
                    var crmId = 0;
                    //var a = dataArray["Charges"]["Charge"];
                    cantElem = [].concat.apply([], dataArray["Items"]["Item"]).length;
                    //mas de un charge, array de objetos [{},{}]
                    if (cantElem > 1) {
                        $.map(dataArray["Items"]["Item"], function(k) {

                            dataPackages = {
                                "magaya__SQuote_Name": idQuote,
                                "magaya__Length": roundDec(k.Length),
                                "magaya__Pieces": k.Pieces,
                                "magaya__Height": roundDec(k.Height),
                                "magaya__Status": k.Status,
                                "magaya__Volume": roundDec(k.Volume),
                                "magaya__Weigth": roundDec(k.Weight),
                                "Name": k.Package.Name,
                                "magaya__Width": k.Width,
                                "magaya__Measure_System": measurementUnit
                            }

                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: dataPackages, Trigger: [] })
                                .then(function(response) {}).catch(function(error) {

                                })
                        });

                    } else {
                        //JSON {} de un solo elemento
                        items = dataArray["Items"]["Item"];
                        var itemName = 'No Package Name'
                        if (!_.isEmpty(items.PackageName)) {
                            itemName = items.PackageName
                        }
                        dataPackages = {
                            "magaya__SQuote_Name": idQuote,
                            "magaya__Length": roundDec(items.Length),
                            "magaya__Pieces": items.Pieces,
                            "magaya__Status": items.Status,
                            "magaya__Height": roundDec(items.Height),
                            "magaya__Volume": roundDec(items.Volume),
                            "magaya__Weigth": roundDec(items.Weight),
                            "Name": itemName,
                            "magaya__Width": roundDec(items.Width),
                            "magaya__Measure_System": measurementUnit
                        }

                        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: dataPackages, Trigger: [] })
                            .then(function(response) {}).catch(function(error) {

                            })
                    }
                }
                //dibuja el area
                Swal.fire({
                    title: 'Success',
                    html: "Operation successfull",
                    //text: message,
                    icon: 'success',
                    allowOutsideClick: false
                }).then(function() {
                    drawQuotationCRM();
                })

            })
        })




}

//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;
    let t = num.toString();
    let regex = /(\d*.\d{0,4})/;
    return t.match(regex)[0];

}

//funcion carriers
function fillCarriers() {
    $.each(MagayaCarriers, function(k) {
        //$("select[name=Carriers]").append()
    })

}


//added fields to ApplyToAccounts
function addedToApplyAccounts(id) {
    //find account from accounts array
    account = accounts.findIndex(i => i["id"] === id)
    //if exits, put it on ApplyToAccount
    if (account >= 0) {
        $("<option value='"+accounts[account]['id']+"'>"+accounts[account]['Account_Name']+"</option>").appendTo("select[name=ApplyToAccounts]");

    }

}

//get magaya n var
async function getMagayaVariables() {
    console.log("Seek magaya vars")
    network_id = await getMagayaNetworkId()
    magaya_url = await getMagayaUrl();
    magaya_user = await getMagayaUser();
    magaya_pass = await getMagayaPass();
    data = {
        'network_id': network_id,
        'magaya_url': magaya_url,
        'magaya_user': magaya_user,
        'magaya_pass': magaya_pass
    }

    return data;
}


async function getMagayaNetworkId() {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getOrgVariable("magaya__networkid")
        .then(function (response) {
               network_id = response.Success.Content;
               resolve(network_id)
        })
        .catch(function(error) {
            reject()
        })
    })
}

async function getMagayaUrl() {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getOrgVariable("magaya__magaya_url")
            .then(function (response) {
                url = response.Success.Content;
                resolve(url);
            })
            .catch(function(error) {
                reject()
            })
    })
}

async function getMagayaUser() {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getOrgVariable("magaya__magaya_user")
            .then(function (response) {
                    user = response.Success.Content;
                    resolve(user)

            })
            .catch(function(error) {
                reject()
            })
    })
}

async function getMagayaPass() {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getOrgVariable("magaya__magaya_pass")
            .then(function (response) {
                    pass = response.Success.Content;
                    resolve(pass)
            })
            .catch(function(error) {
                reject()
            })
    })
}
