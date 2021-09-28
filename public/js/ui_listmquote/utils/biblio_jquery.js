/********************************************************
 * *******************************************************
 * *******************************************************
 */
//get row data, build json with squote id
//agregar filtrado
/******************************************************
 * ******************************************************
 * ****************************************************
 */
 (function($) {
    $.fn.tableToJson = function(table, id) {
        jsonData = '';
        json_items = ''
        $("#" + table + " tbody tr").each(function() {
            //get fields
            id_quote = id;
            //required field
            json_items += `"magaya__SQuote_Name": "${id_quote}"`
            $(this).find('td').each(function() {
                $this = $(this);
                var class_name = $this.attr('class');
                if (class_name == 'magaya__StatusA') {
                    json_items += ',"magaya__StatusA":"' + $("select[name=StatusA]").val() + '"';
                } else if (class_name === 'Delete' || class_name === "NoData") {
                    //
                }
                else {
                    let nameValue = $(this).html()
                    json_items += `, "${class_name}":"${nameValue}"`
                }
            })

            jsonData += ',{' + json_items + '}';
            json_items = ''

        });

        jsonData = jsonData.substring(1)
        console.log("Returning literal", jsonData)
        return (jsonData)
    }

})(jQuery);




(function($) {
    $.fn.dataShow = function(module, id) {
        //console.log("Lanzando en modulo " + module + ", con id, "  + id)
        switch(module) {
            case "table-items": {
                storeItem.dispatch(getItemQuote({id: id}))
                break;
            }

            case "table-items-new": {
                //console.log("Table charges new")
                storeItem.dispatch(getItemQuoteOnNew({id: id}))
                break;
            }

            case "table-charges": {
                storeCharge.dispatch(getCharge({id: id}))
                break;
            }

            case "table-charges-new": {
                storeCharge.dispatch(getChargeOnNew({id: id}))
                break;
            }

            default:
                return "No data"
        }

    }

})(jQuery);



function sanitize(input) {
    /*
    var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                 replace(/<[\/\!]*?[^<>]*?>/gi, '').
                 replace(/<style[^>]*?>.*?<\/style>/gi, '').
                 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
    return output;
    */
   if (!_.isEmpty(input)) {
       /*if (input.match(/^[0-9a-zA-Z]\-\#{1,255}$/))
        return input;

    return false;*/
        let a = HtmlSanitizer.SanitizeHtml(input);
        return input.replace(/['"]+/g, '').replace(/[^a-zA-Z0-9]\-/g, ' ').replace(/<(|\/["]\/[&<>]\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
   }
};


//clean form
function limpiar_form() {
    //limpiar Account, remove selected
    //$("select[name=Account]").removeAttr("selected")
    $("select[name=magaya__ConsigneeName]").val("")
    $("select[name=magaya__Shipper]").val("")
    $("select[name=Deal]").val("")
    $("#magaya__Description").val("")
    $("select[name=magaya__PortofUnloading]").val("")
    $("select[name=magaya__PortofLoading]").val("")
    $("input[name=Shipper_Street]").val("")
    $("input[name=Shipper_City]").val("")
    $("input[name=Shipper_State]").val("")
    $("input[name=Shipper_Country]").val("")
    $("input[name=Consignee_Street]").val("")
    $("input[name=Consignee_City]").val("")
    $("input[name=Consignee_State]").val("")
    $("input[name=Consignee_Country]").val("")
    $("select[name=magaya__ConsigneeName]").val("")
    $("select[name=magaya__Shipper]").val("")
    $("input[name=magaya__Magaya_Status]").val("Open")

    //hora actual

    //$("select[name=Account]").removeAttr("selected")
    // expected output: 10*/
    let elementos = document.querySelectorAll("input[type=text], input[id=magaya__Description], select[name=magaya__TransportationMode], select[name=magaya__Direction]")
    elementos.forEach((elemento) => {
        elemento.value = ''
    })
    let now = moment().format("YYYY-MM-DD");
    $("input[name=magaya__AddedTime]").val(now)

    //get org data
    let organization = JSON.parse(localStorage.getItem('organization'))

    $("input[name=magaya__IssuedByName]").val(organization.company_name)
    //console.log("Organization", JSON.parse(organization))
}


//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;

    return Number(parseFloat(num).toFixed(2));


}



//get items cargo table, return xml charge
(function($) {
    $.fn.buildStringCharge = function(idSQuote) {
        stringCharges = '';
        return new Promise(function(resolve, reject) {
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idSQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
                .then(function(response) {

                    $.map(response.data, function(k, i) {
                        console.log(k)
                        priceInCurrency = k.magaya__CQuantity * k.magaya__Price;
                        amountInCurrency = Math.round(priceInCurrency * 100) / 100;
                        //console.log (k.magaya__ApplyTo['name'])
                        //magaya__ApplyTo es una lista relacionada, pero puede estar vacia
                        var applyTo;
                        var applyToGuid;
                        var applyToId;
                        //applyTo = !_.isEmpty(k.magaya__ApplyTo) ? k.magaya__ApplyToAccounts['name'] : '';
                        //applyToGuid = k.magaya__ApplyToAccounts['']
                        stringCharges += `<Charge>
                            <Type>Standard</Type>`;

                        //get apply to data
                        if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                            applyToId = k.magaya__ApplyToAccounts.id;
                            applyToGuid = accounts.findIndex(i => i["id"] == applyToId);
                            if (applyToGuid >= 0) {
                                applyTo = accounts[applyToGuid];
                                stringCharges += `<Entity GUID="${applyTo['magaya__MagayaGUID']}">
                                                  <Type>Client</Type>
                                                  <Name>${applyTo["Account_Name"]}</Name>
                                                  <IsPrepaid>true</IsPrepaid>
                                                  </Entity>`
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Error selecting a valid Apply To charges, please check the Quote',
                                    icon: 'error',
                                    allowOutsideClick: false
                                }).then(function() {
                                    return
                                })
                            }
                        }

                        stringCharges += `
                            <Quantity>${k.magaya__CQuantity}</Quantity>
                            <Price Currency="USD">${k.magaya__Price}</Price>
                            <HomeCurrency Code="USD">
                                <Name>United States Dollar</Name>
                                <ExchangeRate>1.00</ExchangeRate>
                                <DecimalPlaces>2</DecimalPlaces>
                                <IsHomeCurrency>true</IsHomeCurrency>
                            </HomeCurrency>
                            <Amount Currency="USD">0.00</Amount>
                            <IsPrepaid>true</IsPrepaid>
                            <IsThirdPartyCharge>false</IsThirdPartyCharge>
                            <ChargeDefinition>
                                <Type>Other</Type>
                                <Description>Description</Description>
                                <Code>${k.magaya__ChargeCode}</Code>
                                <AccountDefinition>
                                    <Type>Income</Type>
                                    <Name>Servicios</Name>
                                    <Currency Code="USD">
                                        <Name>United States Dollar</Name>
                                        <ExchangeRate>1.00</ExchangeRate>
                                        <DecimalPlaces>2</DecimalPlaces>
                                        <IsHomeCurrency>true</IsHomeCurrency>
                                    </Currency>
                                </AccountDefinition>
                                <Amount Currency="USD">0.00</Amount>
                                <Currency Code="USD">
                                    <Name>United States Dollar</Name>
                                    <ExchangeRate>1.00</ExchangeRate>
                                    <DecimalPlaces>2</DecimalPlaces>
                                    <IsHomeCurrency>true</IsHomeCurrency>
                                </Currency>
                                <Enforce3rdPartyBilling>false</Enforce3rdPartyBilling>
                            </ChargeDefinition>
                            <Status>Open</Status>
                            <Description>${k.magaya__Charge_Description}</Description>
                            <PriceInCurrency Currency="USD">${k.magaya__Price}</PriceInCurrency>
                            <AmountInCurrency Currency="USD">0.00</AmountInCurrency>
                            <ExchangeRate>1.00</ExchangeRate>
                            <Currency Code="USD">
                                <Name>United States Dollar</Name>
                                <ExchangeRate>1.00</ExchangeRate>
                                <DecimalPlaces>2</DecimalPlaces>
                                <IsHomeCurrency>true</IsHomeCurrency>
                            </Currency>
                            <ShowInDocuments>true</ShowInDocuments>
                            <IsCredit>false</IsCredit>
                            <IsFromSegment>false</IsFromSegment>
                        </Charge>`;


                    })
                    if (stringCharges !== '') {
                        resolve(stringCharges)
                    } else reject();
                })



        });
    }

})(jQuery);

//get items package table, return xml string items
(function($) {
    $.fn.buildStringItems = function(idSQuote) {
        stringItems = '';
        return new Promise(function(resolve, reject) {
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
                .then(function(response) {
                    //discriminar por sistema de medida
                    /*
                    k.magaya__Measure_System
                    Sistema International
                    "Length(m)";
                    "Width(m)";
                    "Height(m)";
                    "Weight(Kg)";

                    Sistema Ingles
                    "Length(in)";
                    "Width(in)";
                    "Height(in)";
                    "Weight(lb)";
                    */
                    $.map(response.data, function(k, i) {
                        stringItems += `<Item><Version>105</Version>`
                        stringItems += `<Status>${k.magaya__Status}</Status>`
                        stringItems += `<Pieces>${k.magaya__Pieces}</Pieces>`
                        stringItems += `<PackageName>${k.Name}</PackageName>`
                        stringItems += `<Length Unit="in">${k.magaya__Length}</Length>`
                        stringItems += `<Height Unit="in">${k.magaya__Height}</Height>`
                        stringItems += `<Width Unit="in">${k.magaya__Width}</Width>`
                        stringItems += `<Weight Unit="kg">${k.magaya__Weigth}</Weight>
                                        <Volume Unit="ft3">${k.magaya__Volume}</Volume>`
                        stringItems += `<Package>`
                        stringItems += `<Type>Container</Type>
                                        <Name>${k.Name}</Name>
                                        </Package>
                                        <ContainerInfo>
                                        <GeneratorSetup>false</GeneratorSetup>
                                        <IsNonOperatingReefer>false</IsNonOperatingReefer>
                                        </ContainerInfo>
                                        </Item>`

                    })

                    if (stringItems !== '') {

                        resolve(stringItems)
                    } else reject();
                })



        });
    }

})(jQuery);



async function sendQuotePdf(data) {
    console.log(data)
    let dataVar = await getMagayaVariables()
    let magaya_url = dataVar["magaya_url"]
    var endpoint = `localhost/zoho_magaya/blog/public/createPdf?url=http://98.211.167.16:3691&data[]=96101&data[]=524288&cabecera[]=${data}`;
    fetch(endpoint, {
        method: 'POST',
        headers: new Headers({
            //'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    })
    .then((response) => response.text())
    .then((data) => {
        console.log("From endpoint", data)
    })
}


//get items package table, return xml string items
async function buildStringQuote2(idSQuote) {
    //check if account, contact, shipper, consignee and carrier
    //are magaya customers (has magaya__GUID)
    stringQuote = methodCode = '';
    transpMethods = new Array();
    storeQuote.dispatch(findById({id: idSQuote}))

    quoteXML = quoteXML[0]
    console.log("JSON QUOTE", quoteXML)

    stringQuote += `<IsCommerceQuotation>false</IsCommerceQuotation>`
    stringQuote += `<CreatedOn>${quoteXML.Created_Time}</CreatedOn>`
    stringQuote += `<Number>${quoteXML.magaya__Number}</Number>`
    stringQuote += `<CreatedByName>${quoteXML.Owner.name}</CreatedByName>
                    <Version>104</Version>`
    stringQuote += `<ExpirationDate>${quoteXML.magaya__ExpirationDate}</ExpirationDate>`
    stringQuote += `<IssuedByName>${quoteXML.magaya__IssuedBy}</IssuedByName>
                    <SalespersonName>${quoteXML.magaya__Seller}</SalespersonName>`
                    //<Salesperson GUID=dsfsdfsdfsdf></Salesperson><Type>Salesperson</Type><Name></Name>

    stringQuote += `<Service>${quoteXML.magaya__Service}</Service>`
    stringQuote += `<Direction>${quoteXML.magaya__Direction}</Direction>
                    <IsOpenQuote>true</IsOpenQuote>
                    <Status>Open</Status>
                    <DescriptionOfGoods>${quoteXML.magaya__Description}</DescriptionOfGoods>
                    <IsHazardous>${quoteXML.magaya__Is_Hazardous}</IsHazardous>`

    let contactName =''
    let contact = ''

    //customer of the quote
    try {
        accountId = quoteXML.Account.id
        storeAccounts.dispatch(findAccount({id: accountId}))
        stringQuote += `<ContactName>${singleAccount['Account_Name']}</ContactName>
                    <Contact GUID="${singleAccount['magaya__MagayaGUID']}">
                        <Type>Client</Type>
                        <Name>${singleAccount['Account_Name']}</Name>
                        <Email>${singleAccount['magaya__MagayaEmail']}</Email>
                    </Contact>`


    } catch (err) {
        message = `'There is an error whit mQuote Account' ${err}`
        storeSuccess.dispatch(addSuccess({message: message}))
    }

    //representative
    stringQuote += `<RepresentativeName>${quoteXML.magaya__ContactName}</RepresentativeName>
                    <Representative GUID="${quoteXML.magaya__MagayaGUID}">
                        <Type>EntityContact</Type>
                        <Name>${quoteXML.magaya__ContactName}</Name>
                        <Email>${quoteXML.magaya__ContactEmail}</Email>
                        <Phone>${quoteXML.magaya__ContactPhone}</Phone>
                        <MobilePhone>${quoteXML.magaya__ContactMobile}</MobilePhone>
                    </Representative>`

    //carrier
    stringQuote += `<Carrier><Type>Carrier</Type><Name>${quoteXML.magaya__Carrier}</Name></Carrier>`

    if (!(_.isEmpty(quoteXML.magaya__ConsigneeName))) {

        stringQuote += `<ConsigneeName>${quoteXML.magaya__ConsigneeName}</ConsigneeName>
                        <Consignee><Type>Client</Type><Name>${quoteXML.magaya__ConsigneeName}</Name></Consignee>`
    }

    if (!(_.isEmpty(quoteXML.magaya__Shipper))) {
        stringQuote += `<ShipperName>${quoteXML.magaya__Shipper}</ShipperName>
                        <Shipper><Type>Client</Type><Name>${quoteXML.magaya__Shipper}</Name></Shipper>`
    }

    //transport method
    if (!_.isEmpty(quoteXML.magaya__TransportationMode)) {
        transporMethod = await getTranspMethod(quoteXML.magaya__TransportationMode.id)
        stringQuote += `<ModeOfTransportation Code="${transporMethod[0].magaya__TransportationMethodCode}">
                        <Description>${transporMethod[0].Name}</Description>
                        <Method>${transporMethod[0].magaya__ParentMethod}</Method>
                        </ModeOfTransportation>
                        <ModeOfTransportCode>${transporMethod[0].magaya__TransportationMethodCode}</ModeOfTransportCode>`
    }

    //return(stringQuote)

    return stringQuote;
}




//send quote
async function buildStringXML(idSQuote) {
    xml = await buildStringQuote2(idSQuote);
    stringXML = '<Quotation xmlns="http://www.magaya.com/XMLSchema/V1" xsi:schemaLocation="http://www.magaya.com/XMLSchema/V1 schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    stringXML += stringQuote;
    stringXML += '</Quotation>'

    console.log(stringXML)
    sendmQuote(stringXML)

} //.send-quote


/*
 * async function to build the XML to send Magaya
 * @idem dataArray of Squote from Quote List
 */
async function buildXML(idQuote) {

    stringCharge = stringItem = stringQuote = stringXML = '';
    transpMethods = new Array();
    let entity = "magaya__SQuotes";
    let related_list_charges = "magaya__SQuote_Name0"
    config = await getMagayaVariables()

    stringQuote = buildStringQuote2(idQuote)

    console.log("XML resolved", stringQuote)

    stringXML = '<Quotation xmlns="http://www.magaya.com/XMLSchema/V1" xsi:schemaLocation="http://www.magaya.com/XMLSchema/V1 schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    stringXML += stringQuote;
    //console.log("String XML", stringXML)
    /*if (stringCharge !== undefined) {
        //code
        stringXML += '<Charges UseSequenceOrder="false">' + stringCharge + "</Charges>";
    }

    if (stringItem !== undefined) {
        //code
        stringXML += "<Items>" + stringItem + "</Items>";
    }*/

    stringXML += '</Quotation>'

    /*charges = await getRelatedRecordCRM(entity, related_list_charges, idQuote)
                    .then(response => {
                        console.log("Charges", response)
                    })
    items = await getRelatedRecordCRM(entity, related_list_charges, idQuote)
            .then(response => {
                console.log("Items", response)
            })*/



    /*stringCharge = await $(this).buildStringCharge(idQuote).catch(() => {
        stringCharge = '';
    });
    stringItem = await $(this).buildStringItems(idQuote).catch(() => {
        stringItem = '';
    });*/
    //stringQuote = await buildStringQuote2(idQuote)

    //stringXML = '<Quotation xmlns="http://www.magaya.com/XMLSchema/V1" xsi:schemaLocation="http://www.magaya.com/XMLSchema/V1 schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    //stringXML += stringQuote;
    //console.log("String XML", stringXML)
    /*if (stringCharge !== undefined) {
        //code
        stringXML += '<Charges UseSequenceOrder="false">' + stringCharge + "</Charges>";
    }

    if (stringItem !== undefined) {
        //code
        stringXML += "<Items>" + stringItem + "</Items>";
    }*/

    //stringXML += '</Quotation>'
        //finding user
        //xmlDoc = $.parseXML(stringXML),
        //    $xml = $(xmlDoc),
        //    $title = $xml.find("ContactName");
        //ContactName = $title.text();
    //console.log("XML String", stringXML);

    //send xml trougth magaya api
    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.TRANSACTION_TYPES.Quotation

    data = {
        method: 'SetTransaction',
        data: [
            config.network_id,
            entity_type,
            flags,
            stringXML
        ],
        url: config.magaya_url
    };

    /*MagayaAPI.sendRequest(data, function(result) {
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
                    })
                    //all OK, update QuoteInMagaya field

                //$(this).updateRecordCRM(data);

            } //else

        }) //magaya api*/

} //function buildXML


async function sendmQuote(mquote) {
    config = await getMagayaVariables()

    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.TRANSACTION_TYPES.Quotation

    data = {
        method: 'SetTransaction',
        data: [
            config.network_id,
            entity_type,
            flags,
            mquote
        ],
        url: config.magaya_url
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
                    })
                    //all OK, update QuoteInMagaya field

                //$(this).updateRecordCRM(data);

            } //else

        }) //magaya api*/
}


//get related records
function getRelatedRecordCRM(entity, related_list, recordId) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRelatedRecords({ Entity: entity, RecordID: recordId, RelatedList: related_list })
            .then(function(data) {
                if (!_.isEmpty(data.data)) {
                    resolve(data.data)
                }
            })
    })
}


async function getMagayaVariables() {
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


function getMagayaNetworkId() {
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

function getMagayaUrl() {
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

function getMagayaUser() {
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

function getMagayaPass() {
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


//get transp method for string xml quotation
function getTranspMethod(transpId) {
    //code
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRecord({ Entity: "magaya__TransportationMethods", RecordID: transpId })
                .then(function(data) {
                    resolve(data.data);
                })
                .catch(function(error) {
                    reject()
                })
        })
}

function ping(host, port, pong) {

    var started = new Date().getTime();

    var http = new XMLHttpRequest();

    http.open("GET", "http://" + host + ":" + port, /*async*/true);
    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        var ended = new Date().getTime();

        var milliseconds = ended - started;

        if (pong != null) {
          pong(milliseconds);
        }
      }
    };
    try {
      http.send(null);
    } catch(exception) {
        console.log("Execption")
      // this is expected
    }

  }


  function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        if (isNaN(n['value'])) {
            indexed_array[n['name']] = sanitize(n['value']);
        } else {
            indexed_array[n['name']] = roundDec(n['value']);
        }

    });

    return indexed_array;
}
