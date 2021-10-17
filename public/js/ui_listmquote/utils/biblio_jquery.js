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
                } else {
                    let nameValue = $(this).html()
                        //remove commas
                    let dataType = $(this).attr("data-type")
                    if (dataType === "number") {
                        console.log("Number value before", nameValue)
                        nameValue = nameValue.replace(/[,]/g, '')
                        console.log("Number value after", nameValue)

                    }
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
        switch (module) {
            case "table-items":
                {
                    storeItem.dispatch(getItemQuote({ id: id }))
                    break;
                }

            case "table-items-new":
                {
                    //console.log("Table charges new")
                    storeItem.dispatch(getItemQuoteOnNew({ id: id }))
                    break;
                }

            case "table-charges":
                {
                    storeCharge.dispatch(getCharge({ id: id }))
                    break;
                }

            case "table-charges-new":
                {
                    storeCharge.dispatch(getChargeOnNew({ id: id }))
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
    $("select[name=Deal]").val("")
    $("#magaya__Description").val("")
        //$("select[name=magaya__PortofUnloading]").val("")
        //$("select[name=magaya__PortofLoading]").val("")
    $("input[name=magaya__ShipperState]").val("")
    $("input[name=magaya__ShipperCity]").val("")
    $("input[name=magaya__ShipperCountry]").val("")
    $("input[name=magaya__ShipperStreet]").val("")
    $("input[name=magaya__ConsigneeCity]").val("")
    $("input[name=magaya__ConsigneeState]").val("")
    $("input[name=magaya__ConsigneeCountry]").val("")
    $("input[name=magaya__ConsigneeStreet]").val("")
    $("select[name=magaya__Incoterms]").val("")
    $("select[name=magaya__Consignee]").val("")
    $("select[name=magaya__Consignee]").change()
    $("select[name=magaya__Shipper]").val("")
    $("select[name=magaya__Shipper]").change()
    $("select[name=magaya__MainCarrier]").val("")
    $("input[name=magaya__Magaya_Status]").val("Open")
    $("input[name=magaya__Is_Hazardous]").prop("checked", false)
    $("input[name=Magaya_updated]").prop("checked", false)
    $("#magaya__Terms").val("")
    $("input[name=ModeOfTransportation]").val("")

    $("select[name=Account]").prop('disabled', false);

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
    let current_user = localStorage.getItem("current_user")

    $("input[name=magaya__IssuedByName]").val(organization.company_name)
    $("input[name=magaya__CreatedByName]").val(current_user)
    $("input[name=magaya__Seller]").val(current_user)
        //console.log("Organization", JSON.parse(organization))
}


//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num === 'null' || num === null) return 0;

    return Number(parseFloat(num).toFixed(2));


}



//get items cargo table, return xml charge
(function($) {
    $.fn.buildStringCharge = function(idSQuote) {
        //async function buildStringCharge(idSQuote) {
        stringCharges = '';
        return new Promise(function(resolve, reject) {
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idSQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
                .then(function(response) {
                    resolve(response.data)
                })
        });
    }
})(jQuery);

//get items package table, return xml string items
(function($) {
    $.fn.buildStringItems = function(idSQuote) {
        stringItems = '';
        return new Promise(function(resolve, reject) {
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idSQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
                .then(function(response) {
                    resolve(response.data)
                })
                .catch(err => {
                    //dispatch an error
                })
        });
    }

})(jQuery);



/**build the field if value is not empty
 * @field XML node
 * @value XML node value
 *
 * returns <field>value</field> if value is not null
 */
function buildField(field, value) {

    let node_value = ``
    if (!_.isEmpty(value) && value !== undefined && value !== null && value !== "undefined" && value !== "null") {
        if (!_.isObject(value)) {
            return `<${field}>${value}</${field}>`;
        }
    }

    return node_value;

}

let mapa = {
    "CreatedOn": "Created_Time",
    "Number": "magaya__Number",
    "ExpirationDate": "magaya__ExpirationDate",
    "IssuedByName": "magaya__IssuedBy",
    "SalespersonName": "magaya__Seller",
    "Service": "magaya__Service",
    "Direction": "magaya__Direction",
    "DescriptionOfGoods": "magaya__Description",
    "IsHazardous": "magaya__Is_Hazardous",
    //"Incoterm": "magaya__Incoterms"
    //"Carrier": {"Type": "Carrier", "Name": "magaya__Carrier"}
}


//get items package table, return xml string items
/*
@idSQuote quote to get from
*/
async function buildStringQuote2(idSQuote) {
    //check if account, contact, shipper, consignee and carrier
    //are magaya customers (has magaya__GUID)
    stringQuote = methodCode = '';
    transpMethods = new Array();
    //storeQuote.dispatch(findById({id: idSQuote}))

    quoteXML = quoteXML[0]

    stringQuote += `<IsCommerceQuotation>false</IsCommerceQuotation>`

    $.map(mapa, function(k, v) {
        stringQuote += buildField(v, quoteXML[`${k}`])
    })

    if (!_.isEmpty(quoteXML.magaya__Incoterms)) {
        let incoterm = quoteXML.magaya__Incoterms.split(" - ")
        let codeIncoterm = incoterm[0]
        let descriptionIncoterm = incoterm[1]
        stringQuote += `<Incoterm>
                            <Code>${codeIncoterm}</Code>
                            <Description>${descriptionIncoterm}</Description>
                        </Incoterm>`
    }
    stringQuote += `<CreatedByName>${quoteXML.Owner.name}</CreatedByName>
                    <Version>104</Version>`

    //<Salesperson GUID=dsfsdfsdfsdf></Salesperson><Type>Salesperson</Type><Name></Name>

    stringQuote += `<IsOpenQuote>true</IsOpenQuote><Status>Open</Status>`

    let contactName = ''
    let contact = ''

    //customer of the quote
    try {
        accountId = quoteXML.Account.id
        storeAccounts.dispatch(findAccount({ id: accountId }))
        stringQuote += `<ContactName>${singleAccount['Account_Name']}</ContactName>`

        if (!_.isEmpty(singleAccount['magaya__MagayaGUID']))
            stringQuote += `<Contact GUID="${singleAccount['magaya__MagayaGUID']}">`
        else stringQuote += `<Contact>`;

        stringQuote += `<Type>Client</Type>
                        <Name>${singleAccount['Account_Name']}</Name>
                        <Email>${singleAccount['magaya__MagayaEmail']}</Email>
                    </Contact>`


    } catch (err) {
        message = `'There is an error whit mQuote Account' ${err}`
        storeSuccess.dispatch(addSuccess({ message: message }))
    }

    //representative
    /*stringQuote += `<RepresentativeName>${quoteXML.magaya__ContactName}</RepresentativeName>
                    <Representative GUID="${quoteXML.magaya__MagayaGUID}">
                        <Type>EntityContact</Type>
                        <Name>${quoteXML.magaya__ContactName}</Name>
                        <Email>${quoteXML.magaya__ContactEmail}</Email>
                        <Phone>${quoteXML.magaya__ContactPhone}</Phone>
                        <MobilePhone>${quoteXML.magaya__ContactMobile}</MobilePhone>
                    </Representative>`*/

    //return(stringQuote)

    return stringQuote;
}


async function buildStringRouting() {
    //routing
    if (!_.isEmpty(quoteXML.magaya__Routing)) {
        let idRouting = quoteXML.magaya__Routing.id
        let routing = await getRecordCRM("magaya__Routing", idRouting)
        console.log(" routing", routing)

        let transporMethod = await buildStringTransport(routing)
        let stringRouting = `<ModeOfTransportation Code="${transporMethod[0].magaya__TransportationMethodCode}">
                <Description>${transporMethod[0].Name}</Description>
                <Method>${transporMethod[0].magaya__ParentMethod}</Method>
                </ModeOfTransportation>
                <ModeOfTransportCode>${transporMethod[0].magaya__TransportationMethodCode}</ModeOfTransportCode>`

        if (!_.isEmpty(routing[0].magaya__MainCarrier)) {
            let mainCarrier = await buildStringMainCarrier(routing[0].magaya__MainCarrier.id)
            console.log(" Main Carrier returned", mainCarrier)
            stringRouting += `<Carrier><Type>Carrier</Type><Name>${mainCarrier[0].Name}</Name></Carrier>`

        }

        if (!(_.isEmpty(routing[0].magaya__Consignee))) {

            stringRouting += `<ConsigneeName>${routing[0].magaya__Consignee}</ConsigneeName>
                            <Consignee><Type>Client</Type><Name>${routing[0].magaya__Consignee}</Name></Consignee>`
        }

        if (!(_.isEmpty(routing[0].magaya__Shipper))) {
            stringRouting += `<ShipperName>${routing[0].magaya__Shipper}</ShipperName>
                            <Shipper><Type>Client</Type><Name>${routing[0].magaya__Shipper}</Name></Shipper>`
        }


        return stringRouting;
    }

}

function buildStringTransport(dataRouting) {

    return new Promise(function(resolve, reject) {
        if (!_.isEmpty(dataRouting[0].magaya__ModeofTransportation)) {
            getTranspMethod(dataRouting[0].magaya__ModeofTransportation.id)
                .then(r => {
                    console.log("transport m", r)
                    resolve(r)
                })
                .catch(function() {
                    reject()
                })

        } else {
            reject()
        }

    })
}

function buildStringMainCarrier(idCarrier) {
    return new Promise(function(resolve, reject) {
        getRecordCRM("magaya__Providers", idCarrier)
            .then(r => {
                console.log("carrier", r)
                resolve(r)
            })
            .catch(function() {
                reject()
            })
    })
}

//send quote
async function buildStringXML(idSQuote) {
    //check magaya updated
    storeQuote.dispatch(findById({ id: idSQuote }))
    let quote = quoteXML[0]

    if (quote.Magaya_updated) {
        codeError = 'It seems like this mQuote is already in Magaya. Please contact with your administrator';
        show = false;
        field = ``;
        module = 'mQuote'
        storeError.dispatch(addError({ errorCode: codeError, showInfo: show, field: field, module: module }))


    } else {

        xml = await buildStringQuote2(idSQuote);

        stringXML = '<Quotation xmlns="http://www.magaya.com/XMLSchema/V1" xsi:schemaLocation="http://www.magaya.com/XMLSchema/V1 schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
        stringXML += stringQuote;
        let routing = await buildStringRouting()

        stringXML += routing
            //charges
        let account_id = 0;
        let data_account = {}
        let charges = ``
        let stringCharge = ``
        stringCharge = await $(this).buildStringCharge(idSQuote)
            .then(resp => {
                //if its here, charges exists, so get the account data
                account_id = resp[0].magaya__ApplyToAccounts.id
                console.log(account_id)
                charges = resp;
            })
            .catch(() => {
                //distpath an error
                charges = '';
            });

        //do not send charges without an apply to
        if (account_id > 0) {
            let data = await getRecordCRM("Accounts", account_id)
                .then(resp => {
                    data_account = resp[0]
                })
            if (charges !== undefined && !_.isEmpty(charges)) {
                let stringCharges = buildXmlCharge(charges, data_account)
                stringXML += '<Charges UseSequenceOrder="false">' + stringCharges + "</Charges>";
            }
        }

        //items
        let items = {}
        stringItem = await $(this).buildStringItems(idSQuote)
            .then(resp => {
                console.log("Items", resp)
                items = resp
            })
            .catch(() => {
                //distpath an error
                charges = '';
            });

        if (items !== undefined && !_.isEmpty(items)) {
            let stringItems = buildXmlItem(items)
            stringXML += '<Items>' + stringItems + "</Items>";
        }

        stringXML += '</Quotation>'

        console.log(stringXML);

        //Utils.blockUI();
        let result = await sendmQuote(stringXML, idSQuote)
    }
} //.send-quote



/*
@items object
*/
function buildXmlItem(items) {
    let stringItems = ``;
    if (!_.isEmpty(items)) {

        $.map(items, function(k, i) {
            let measure_length = "in";
            let measure_volume = "ft3";
            let measure_weigth = "lb";

            if (k.magaya__Measure_System === "International") {
                measure_length = "m";
                measure_volume = "m3";
                measure_weigth = "kg";
            }
            stringItems += `<Item><Version>105</Version>`
            stringItems += `<Status>${k.magaya__Status}</Status>`
            stringItems += `<Pieces>${k.magaya__Pieces}</Pieces>`
            stringItems += `<PackageName>${k.Name}</PackageName>`
            stringItems += `<Length Unit="${measure_length}">${k.magaya__Length}</Length>`
            stringItems += `<Height Unit="${measure_length}">${k.magaya__Height}</Height>`
            stringItems += `<Width Unit="${measure_length}">${k.magaya__Width}</Width>`
            stringItems += `<Weight Unit="${measure_weigth}">${k.magaya__Weigth * k.magaya__Pieces}</Weight>
                            <Volume Unit="${measure_volume}">${k.magaya__Volume * k.magaya__Pieces}</Volume>`
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

    }

    return stringItems;

}



/*
@charges object
@data_account object (apply to)
*/
function buildXmlCharge(charges, data_account) {

    let chargesString = ``

    if (!_.isEmpty(charges)) {
        $.map(charges, function(k, v) {
            chargesString += `<Charge>
                <Type>Standard</Type>`

            if (data_account.magaya__MagayaGUID !== null && data_account.magaya__MagayaGUID !== undefined && data_account.magaya__MagayaGUID !== "null" && data_account.magaya__MagayaGUID !== "undefined")
                chargesString += `<Entity GUID="${data_account.magaya__MagayaGUID}">`
            else
                chargesString += `<Entity>`

            chargesString += `<Type>Client</Type>
                    <Name>${data_account.Account_Name}</Name>
                    <IsPrepaid>true</IsPrepaid>
                </Entity>`;
            if (k.magaya__TaxRate === null || k.magaya__TaxRate === "null")
                k.magaya__TaxRate = 0.00
            else k.magaya__TaxRate = k.magaya__TaxRate.toLocaleString('en-US', { minimumFractionDigits: 2 })
            chargesString += `
                            <Quantity>${k.magaya__CQuantity}</Quantity>
                            <Price Currency="USD">${k.magaya__Price}</Price>
                            <TaxAmount Currency="USD">${k.magaya__Tax_Amount}</TaxAmount>
                            <HomeCurrency Code="USD">
                                <Name>United States Dollar</Name>
                                <ExchangeRate>1.00</ExchangeRate>
                                <DecimalPlaces>2</DecimalPlaces>
                                <IsHomeCurrency>true</IsHomeCurrency>
                            </HomeCurrency>
                            <Amount Currency="USD">${k.magaya__Amount_Total}</Amount>
                            <TaxAmountInCurrency Currency="USD">${k.magaya__Tax_Amount}</TaxAmountInCurrency>
                            <TaxDefinition>
                                <Code>${k.magaya__TaxCode}</Code>
                                <Name>Impuesto</Name>
                                <Rate>${k.magaya__TaxRate}</Rate>
                                <Layout>Simple</Layout>
                                <Type>Tax</Type>
                                <TaxAuthority>
                                    <Type>Vendor</Type>
                                    <Name>Autoridad Impositiva Predeterminada</Name>
                                </TaxAuthority>

                            </TaxDefinition>
                            <IsPrepaid>true</IsPrepaid>
                            <IsThirdPartyCharge>false</IsThirdPartyCharge>
                            <ChargeDefinition>
                                <Type>Other</Type>
                                <Description>${k.Name}</Description>
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
                                <Amount Currency="USD">${k.magaya__Amount_Total}</Amount>
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
                            <AmountInCurrency Currency="USD">${k.magaya__Amount_Total}</AmountInCurrency>

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
    }

    /*
<LiabilityAccount>
                                    <Type>OtherCurrentLiability</Type>
                                    <Name>Pagos de Impuestos</Name>
                                    <Currency Code="USD">
                                    <Name>Euro</Name>
                                    <ExchangeRate>1.00</ExchangeRate>
                                    <DecimalPlaces>2</DecimalPlaces>
                                    <IsHomeCurrency>true</IsHomeCurrency>
                                    </Currency>
                                </LiabilityAccount>
    */
    return chargesString
}



async function checkConnect() {
    config = await getMagayaVariables()

    const endpoint = `https://zohomagaya.herokuapp.com/ping?url=${config.magaya_url}`;
    fetch(endpoint, {
            method: 'POST',
            headers: new Headers({
                //'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error == false) {
                //pintar el boton verde
                $("#magaya_link").html(`<span class="material-icons md-24 btn btn-success float-right" style="background: none;border: none;">link</span>`)
            } else {
                //poner el boton para login
                $("#magaya_link").html(`<span class="material-icons md-24 startSession btn btn-primary float-right">link_off</span>`)

            }
            console.log("From endpoint", data)
        })
        .catch(err => {
            console.warn("error", err)
        })

}


async function startSession() {
    config = await getMagayaVariables()

    data = {
        method: 'StartSession',
        data: [
            config.magaya_user,
            config.magaya_pass
        ],
        url: config.magaya_url
    }

    MagayaAPI.sendRequest(data, function(result) {
            //console.log(result)
            if (result.error) {

                Swal.fire({
                    title: result.error,
                    text: result.data,
                    icon: 'error'
                })
            } else {

                Swal.fire({
                    title: 'Success',
                    text: 'Operation success',
                    icon: 'success',
                    allowOutsideClick: false
                })

            } //else

        }) //magaya api*/
}


async function sendmQuote(mquote, idQuote) {
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
                })
                stringCharge = stringItem = stringQuote = stringXML = '';
            } else {

                Swal.fire({
                    title: 'Success',
                    text: 'Operation success',
                    icon: 'success',
                    allowOutsideClick: false
                }).then(function() {
                    //all OK, update QuoteInMagaya field
                    var config = {
                        Entity: "magaya__SQuotes",
                        APIData: {
                            "id": idQuote,
                            "Magaya_updated": true
                        },
                        Trigger: [""]
                    }
                    ZOHO.CRM.API.updateRecord(config)
                        .then(function(data) {
                            console.log("Update data", data)
                        })

                    storeQuote.dispatch(updateQuoteByField({ id: idQuote, field: "Magaya_updated", value: true }))
                })



            } //else

        }) //magaya api*/
}


//get related records
function getRelatedRecordCRM(entity, related_list, recordId) {
    return new Promise(function(resolve, reject) {
        let data_charge = {}
        ZOHO.CRM.API.getRelatedRecords({ Entity: entity, RecordID: recordId, RelatedList: related_list })
            .then(function(data) {
                if (!_.isEmpty(data.data)) {
                    resolve(data.data)
                } else {
                    resolve()
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
            .then(function(response) {
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
            .then(function(response) {
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
            .then(function(response) {
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
            .then(function(response) {
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


//get transp method for string xml quotation
async function getRecordCRM(entity, idRecord) {
    //code
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRecord({ Entity: entity, RecordID: idRecord })
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

    http.open("GET", "http://" + host + ":" + port, /*async*/ true);
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            console.log("readystate")
            var ended = new Date().getTime();

            var milliseconds = ended - started;

            if (pong != null) {
                console.log(" POMG ")
                pong(milliseconds);
            }
        }
    };
    try {
        http.send(null);
        console.log("all ok")
    } catch (exception) {
        console.log("Execption")
            // this is expected
    }

}


function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
        if (_.size(n['value'] == 0)) {
            n['value'] = ""
        }
        n['value'] = n['value'].replace(/[,]/g, '')
        if (isNaN(n['value'])) {

            indexed_array[n['name']] = sanitize(n['value']);
        } else {
            if (_.size(n['value'] == 0))
                n['value'] = 0
            indexed_array[n['name']] = roundDec(n['value']);
        }

    });

    return indexed_array;
}


/*** *mQuote pdf
 *@id quote id
 */
async function make_pdf(id) {
    try {
        let pdf = await buildPdf(id);
    } catch (error) {
        let message = error
        codeError = error;
        field = ``;
        show = false;
        module = ''
        storeError.dispatch(addError({ errorCode: codeError, showInfo: show, field: field, module: module }))

    }
}

async function buildPdf(mquote_id) {
    quoteToEdit = [];
    Utils.blockUI()
        //dispatch
    storeQuote.dispatch(findQuote({ id: mquote_id }))

    //general data
    let orgData = localStorage.getItem('organization')
    orgData = JSON.parse(orgData)
    let charges = []
    let items = []
    items = await getRelatedRecordCRM("magaya__SQuotes", "magaya__SQuote_Name1", mquote_id)
    charges = await getRelatedRecordCRM("magaya__SQuotes", "magaya__SQuote_Name0", mquote_id)
    Utils.unblockUI();


    let data = `<div class="HtmltoPdf">`
    data += buildPdfHeader(orgData, quoteToEdit)

    data += buildPdfCharges(charges)

    data += `</div>`

    data += buildPdfItems(items)
    data += `</div>`

    data += `<div class="container mt-3">
            <div class="row session-fourth" style="background-color: lightskyblue; margin-top:15px;">
                <div class="col-sm headerFont" style="background-color: lightskyblue; text-align:center;">
                    Terms
                </div>
            </div>`
    data += `<div class="row">
        <div class="col headerMquote p-2">${quoteToEdit["magaya__Terms"] !== null ? quoteToEdit["magaya__Terms"] : ""}</div>`
    data += `</div></div>`

    $("#htmlToPdf").html(data)
    getPdf("htmlToPdf")
        //$("#pdfModal").modal("show")
}


function getPdf(domElement) {
    var element = document.getElementById(domElement);
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
}

/****build the header
 * @orgData organization data
 * @quote data
 */
function buildPdfHeader(orgData, quoteToEdit) {
    let data = ``;
    if (!_.isEmpty(orgData) && !_.isEmpty(quoteToEdit)) {
        var none = "";
        create_date = quoteToEdit["Created_Time"] !== null ? new Date(quoteToEdit["Created_Time"]).toISOString().split('T')[0] : "";
        expire_date = quoteToEdit["magaya__ExpirationDate"] !== null ? new Date(quoteToEdit["magaya__ExpirationDate"]).toISOString().split('T')[0] : "";
        if (!_.isEmpty(orgData["website"]))
            none = orgData["website"];
        let nameAccount = !_.isEmpty(quoteToEdit["Account"]) ? quoteToEdit["Account"]["name"] : ""
        let representative = !_.isEmpty(quoteToEdit["magaya__Representative"]) ? quoteToEdit["magaya__Representative"]["name"] : ""

        data = `<div class="container">
        <table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
            <tr>
                <th colspan="2">
                    <table id="header" cellspacing="0px" cellpadding="2px" style="border: none; text-align: left;">
                        <tr>
                            <td colspan="12" class="session-first">
                                ${orgData["company_name"]}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12" class="col dataFont p-2"><span class="material-icons">
                                language</span>${none}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12" class="col dataFont p-2"><span class="material-icons">
                                phone</span>${orgData["phone"]}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12" class="col dataFont p-2"><span class="material-icons">
                                alternate_email</span>${orgData["primary_email"]}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12" class="col dataFont p-2"><span class="material-icons">
                                home</span>${orgData["street"]}, ${orgData["city"]}, ${orgData["state"]}, ${orgData["country"]}
                            </td>
                        </tr>
                    </table>
                </th>
            </tr>
            <tr>
                <td width="50%">
                    <div style="float: left;">
                        <table id="info1" cellspacing="0px" cellpadding="0px" width="100%" style="text-align: left;">
                            <tr>
                                <th class="headerFont" colspan="2" style="text-align: center;">Contact Info</th>
                            </tr>
                            <tr>
                                <td class="headerFont" style="background-color: lightskyblue;border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Customer</td>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${nameAccount}</td>
                            </tr>
                            <tr>
                                <td class="headerFont" style="background-color: lightskyblue;border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Representative</td>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${representative}</td>
                            </tr>
                            <tr>
                                <td class="headerFont" style="background-color: lightskyblue;border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Phone</td>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${quoteToEdit["magaya__ContactMobile"]}</td>
                            </tr>
                            <tr>
                                <td class="headerFont" style="background-color: lightskyblue;border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Email</td>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${quoteToEdit["magaya__ContactEmail"]}</td>
                            </tr>
                            <tr>
                                <td class="headerFont" style="background-color: lightskyblue;border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                    Address</td>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                    ${quoteToEdit["magaya__ContactStreet"]}, ${quoteToEdit["magaya__ContactCity"]}, ${quoteToEdit["magaya__ContactState"]}, ${quoteToEdit["magaya__ContactCountry"]}
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td width="50%">
                    <div style="float: right; padding-left:15px;">
                        <table id="info2" cellspacing="0px" cellpadding="2px" style="text-align:left;border: none; padding-left: 15px;">
                            <tr>
                                <th colspan="2" class="headerFont" style="text-align:right;border: none;">Quotation</th>
                            </tr>
                            <tr>
                                <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Quote Number:</th>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${quoteToEdit["magaya__Number"]}</td>
                            </tr>
                            <tr>
                                <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Creation Date:</th>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${create_date}</td>
                            </tr>
                            <tr>
                                <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    Expiration Date:</th>
                                <td class="dataFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${expire_date}</td>
                            </tr>
                            <tr>
                                <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                    Contact To:</th>
                                <td class="dataFont" style="border-bottom: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;">
                                    ${quoteToEdit["magaya__Employee"]}</td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table width="100%" cellspacing="0px" cellpadding="2px" style="border: none; margin-top: 15px;">
                        <tr>
                            <th class="headerFont" colspan="2" style="text-align: center;">
                                Quotation Info
                            </th>
                        </tr>
                        <tr>
                            <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: center;background-color: lightskyblue;"><span>Origin:</span></th>
                            <th class="headerFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: center;background-color: lightskyblue;"><span>Destination:</span></th>
                        </tr>
                        <tr>
                            <td class="dataFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">${quoteToEdit["magaya__Origin"] !== null ? quoteToEdit["magaya__Origin"] : ""}</td>
                            <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid;">${quoteToEdit["magaya__Destination"] !== null ? quoteToEdit["magaya__Destination"] : ""}</td>
                        </tr>
                        <tr>
                            <th colspan="2" class="headerFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;background-color: lightskyblue;text-align:center;"><span>Description of Goods:</span></th>
                        </tr>
                        <tr>
                            <td colspan="2" class="dataFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">${quoteToEdit["magaya__Description"]}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>`
    }

    return data;
}

/****build charges styles for PDF
 * @charges charges object
 */
function buildPdfCharges(charges) {
    let data = ``
    data += `<div class="row" style="margin-left: 1px; margin-top: 15px;">
                <table width="97%">
                    <tr style="background-color: lightskyblue;">
                        <th class="headerFont" colspan="5" style="border-top: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; text-align: center;">
                            Charges</th>
                    </tr>
                    <tr style="background-color: lightskyblue;">
                        <th class="headerFont" style="border-left: 1px #000 solid;border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid; text-align: center;">
                            Charge Description</th>
                        <th class="headerFont" style="border-bottom: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid; text-align: center;">
                            Price</th>
                        <th class="headerFont" style="border-bottom: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid; text-align: center;">
                            Quantity</th>
                        <th class="headerFont" style="border-bottom: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid; text-align: center;">
                            Tax Amount</th>
                        <th class="headerFont" style="border-bottom: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid; text-align: center;">
                            Final Amount</th></tr>`
    if (!_.isEmpty(charges)) {

        let amount_total = 0;
        let amount_tax = 0;
        $.map(charges, function(k, v) {
            amount_total += roundDec(k["magaya__Final_Amount"]);
            amount_tax += roundDec(k["magaya__Tax_Amount"])
            data += `<tr>
                        <td class="dataFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">
                            ${k["Name"]}</td>
                        <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                            ${k["magaya__Price"]}</td>
                        <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                            ${k["magaya__CQuantity"]}</td>
                        <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                            ${k["magaya__Tax_Amount"]}</td>
                        <td class="headerFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                            ${k["magaya__Final_Amount"]}</td>
                    </tr>`
        })

        data += `<tr>
                    <td class="headerFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid; text-align: right;" colspan="4">
                        ${roundDec(amount_tax)}</td>
                    <td class="headerFont" style="border-right: 1px #000 solid;">${roundDec(amount_total)}</td>
                </tr>
            </table>
        </div>`
    } else {
        data += `<tr>
                    <td class="dataFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">
                    </td>
                    <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                    </td>
                    <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                    </td>
                    <td class="dataFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                    </td>
                    <td class="headerFont" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                    </td>
                </tr>
                <tr>
                    <td class="headerFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid; text-align: right;" colspan="4">
                    </td>
                    <td class="headerFont" style="border-right: 1px #000 solid;"></td>
                </tr>
            </table>
        </div>`
    }

    return data
}

/****build items styles for PDF
 * @items items object
 */
function buildPdfItems(items) {
    let data = ``
    data += `<div class="row" style="margin-left: 1px; margin-top: 15px;">
                    <table width="97%">
                        <tr style="background-color: lightskyblue;">
                            <th class="headerFont" colspan="5" style="text-align: center; font-weight: bold; border: 1px #000 solid;">Items</th></tr>
                        <tr style="background-color: lightskyblue;">
                            <th class="headerFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Package Type</th>
                            <th class="headerFont" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
                            <th class="headerFont" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Dimensions</th>
                            <th class="headerFont" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Weight</th>
                            <th class="headerFont" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Volume</th></tr>`
    if (!_.isEmpty(items)) {

        let totalPieces = 0
        let totalVolume = 0
        let totalWeight = 0
        let total_weight_international = 0
        let total_volume_international = 0
        let total_weight_english = 0
        let total_volume_english = 0
        $.map(items, function(k, v) {
                totalPieces += parseInt(k.magaya__Pieces)
                let measure_length = "in";
                let measure_weight = "lb";
                let measure_volume = "ft<sup>3</sup>";
                if (k.magaya__Measure_System === "International") {
                    measure_length = "m";
                    measure_volume = "m<sup>3</sup>";
                    measure_weight = "kg";
                    total_volume_international += roundDec(k.magaya__Volume * k.magaya__Pieces)
                    total_weight_international += roundDec(k.magaya__Weigth * k.magaya__Pieces)

                } else {
                    //pulgadas y libras
                    total_volume_english += roundDec(k.magaya__Volume * k.magaya__Pieces)
                    total_weight_english += roundDec(k.magaya__Weigth * k.magaya__Pieces)
                }

                data += `<tr>
                   <td class="dataFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid; text-align: left;">
                        ${k["Name"]}</td>
                    <td class="dataFont" style="border-right: 1px #000 solid; text-align: center;">
                        ${k["magaya__Pieces"]}</td>
                    <td class="dataFont" style="border-right: 1px #000 solid; text-align: center;">
                        ${k["magaya__Length"]}*${k["magaya__Height"]}*${k["magaya__Width"]} (${measure_length})</td>
                    <td class="dataFont" style="border-right: 1px #000 solid; text-align: right;">
                        ${k["magaya__Weigth"]} (${measure_weight})</td>
                    <td class="dataFont" style="border-right: 1px #000 solid; text-align: right;">
                        ${k["magaya__Volume"]} (${measure_volume})</td>
                </tr>`
            })
            //get all to international system
        totalWeight = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
        totalVolume = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

        data += `<tr style="font-weight: bold;">
            <td class="headerFont" style="border-top: 1px #000 solid;">
                Totals</td>
            <td class="headerFont" style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;">
                ${totalPieces}</td>
                <td style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;"></td>
            <td class="headerFont" style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;">
                ${roundDec(totalWeight)} kg</td>
            <td class="headerFont" style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;">
                ${roundDec(totalVolume)} m<sup>3</sup></td>
            </tr>
        </table></div>`
    } else {
        data += `<tr>
                   <td style="border-right: 1px #000 solid; text-align: left;"></td>
                    <td style="border-right: 1px #000 solid; text-align: right;"></td>
                    <td style="border-right: 1px #000 solid; text-align: left;"></td>
                    <td style="border-right: 1px #000 solid; text-align: right;"></td>
                    <td style="border-right: 1px #000 solid; text-align: right;"></td>
                </tr>
                <tr style="font-weight: bold;">
                    <td style="border-right: 1px #000 solid;border-top: 1px #000 solid;">
                        Totals</td>
                    <td style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;"></td>
                        <td style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;"></td>
                    <td style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;"></td>
                    <td style="border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: right;"></td>
                </tr>
        </table></div>`
    }

    return data
}


/*async function getRelatedCharges(idQuote) {
    ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
        .then(function(response) {
            if (!_.isEmpty(response.data)) {
                idemItems = response.data
                $.each(idemItems, function(i, k) {
                //dispatch items to store
                    storeItem.dispatch(addItem({...k}))

                    }) //each

            }
        })
}*/