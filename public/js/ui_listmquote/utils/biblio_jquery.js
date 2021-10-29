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
                        nameValue = nameValue.replace(/[,]/g, '')
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
    $("select[name=Account]").val("")
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
       //console.log("Building routing")
        let idRouting = quoteXML.magaya__Routing.id
        let routing = await getRecordCRM("magaya__Routing", idRouting)
        let stringRouting = ``
        if (!_.isEmpty(routing[0].magaya__ModeofTransportation)) {
            let transporMethod = await buildStringTransport(routing)
            stringRouting += `<ModeOfTransportation Code="${transporMethod[0].magaya__TransportationMethodCode}">
                <Description>${transporMethod[0].Name}</Description>
                <Method>${transporMethod[0].magaya__ParentMethod}</Method>
                </ModeOfTransportation>
                <ModeOfTransportCode>${transporMethod[0].magaya__TransportationMethodCode}</ModeOfTransportCode>`
        }

        if (!_.isEmpty(routing[0].magaya__MainCarrier)) {
            let mainCarrier = await buildStringMainCarrier(routing[0].magaya__MainCarrier.id)
            //console.log(" Main Carrier returned", mainCarrier)
            stringRouting += `<Carrier GUID="${mainCarrier[0].magaya__Magaya_GUID}"><Type>Carrier</Type><Name>${mainCarrier[0].Name}</Name></Carrier>`

        }

        if (!(_.isEmpty(routing[0].magaya__Consignee))) {

            stringRouting += `<ConsigneeName>${routing[0].magaya__Consignee}</ConsigneeName>
                            <Consignee>
                                <Type>Client</Type>
                                <Name>${routing[0].magaya__Consignee}</Name>
                                <Address>
                                    <Street>${routing[0].magaya__ConsigneeStreet}</Street>
                                    <City>${routing[0].magaya__ConsigneeCity}</City>
                                    <State>${routing[0].magaya__ConsigneeState}</State>
                                    <ZipCode>${routing[0].magaya__ConsigneeCode}</ZipCode>
                                    <Country>${routing[0].magaya__ConsigneeCountry}</Country>
                                </Address>
                            </Consignee>`
        }

        if (!(_.isEmpty(routing[0].magaya__Shipper))) {
            stringRouting += `<ShipperName>${routing[0].magaya__Shipper}</ShipperName>
                            <Shipper>
                                <Type>Client</Type>
                                <Name>${routing[0].magaya__Shipper}</Name>
                                <Address>
                                    <Street>${routing[0].magaya__ShipperStreet}</Street>
                                    <City>${routing[0].magaya__ShipperCity}</City>
                                    <State>${routing[0].magaya__ShipperState}</State>
                                    <ZipCode>${routing[0].magaya__ShipperCode}</ZipCode>
                                    <Country>${routing[0].magaya__ShipperCountry}</Country>
                                </Address>
                            </Shipper>`
        }

        return stringRouting;
    }

}

function buildStringTransport(dataRouting) {

    return new Promise(function(resolve, reject) {
        if (!_.isEmpty(dataRouting[0].magaya__ModeofTransportation)) {
            //console.log("Building transport")
            getTranspMethod(dataRouting[0].magaya__ModeofTransportation.id)
                .then(r => {
                    //console.log("transport m", r)
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
                //console.log("carrier", r)
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
    Utils.blockUI()
    storeQuote.dispatch(findById({ id: idSQuote }))
    let quote = quoteXML[0]
    console.log("XAML", quote)
        //if (quote.Magaya_updated) {
        /*    codeError = 'It seems like this mQuote is already in Magaya. Please contact with your administrator';
        show = false;
        field = ``;
        module = 'mQuote'
        storeError.dispatch(addError({ errorCode: codeError, showInfo: show, field: field, module: module }))

*/
        //} else {

    xml = await buildStringQuote2(idSQuote);

        stringXML = '<Quotation xmlns="http://www.magaya.com/XMLSchema/V1" xsi:schemaLocation="http://www.magaya.com/XMLSchema/V1 schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
        stringXML += stringQuote;
        let routing = await buildStringRouting()
        if (_.size(routing) > 0) {
            stringXML += routing
        }
            //charges
        let account_id = 0;
        let data_account = {}
        let charges = ``
        let stringCharge = ``
        stringCharge = await $(this).buildStringCharge(idSQuote)
            .then(resp => {
                //if its here, charges exists, so get the account data
                account_id = resp[0].magaya__ApplyToAccounts.id
                //console.log(account_id)
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

    //do not send charges without an apply to
    if (account_id > 0) {
        let data = await getRecordCRM("Accounts", account_id)
            .then(resp => {
                //console.log("Items", resp)
                items = resp
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

    //}
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
            //set name
            let name_item = k.Name
            if (!_.isEmpty(k.magaya__Package_Type))
                name_item = k.magaya__Package_Type.name;

            stringItems += `<Item><Version>105</Version>`
            stringItems += `<Status>InQuote</Status>`
            stringItems += `<Pieces>${k.magaya__Pieces}</Pieces>`
            stringItems += `<PackageName>${name_item}</PackageName>`
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




function buildSimpleCharge(k, data_account) {
    chargesString = `<Charge>
    <Type>Standard</Type>`

    if (data_account.magaya__MagayaGUID !== null && data_account.magaya__MagayaGUID !== undefined && data_account.magaya__MagayaGUID !== "null" && data_account.magaya__MagayaGUID !== "undefined")
        chargesString += `<Entity GUID="${data_account.magaya__MagayaGUID}">`
    else
        chargesString += `<Entity>`

    chargesString += `<Type>Client</Type>
            <Name>${data_account.Account_Name}</Name>
            <IsPrepaid>true</IsPrepaid>
        </Entity>`;
        chargesString += `
        <Quantity>${k.magaya__CQuantity}</Quantity>
        <Price Currency="USD">${k.magaya__Price}</Price>
        <HomeCurrency Code="USD">
            <Name>United States Dollar</Name>
            <ExchangeRate>1.00</ExchangeRate>
            <DecimalPlaces>2</DecimalPlaces>
            <IsHomeCurrency>true</IsHomeCurrency>
        </HomeCurrency>
        <Amount Currency="USD">${k.magaya__Amount_Total}</Amount>
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
        <Status>${k.magaya__Status}</Status>
        <Description>${k.Name}</Description>
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

    /*if (!_.isEmpty(k.magaya__Tax)) {

        idTax = k.magaya__Tax.id
        let dataTax = getRecordCRM("magaya__Taxes", idTax)
                    .then((rec) => {
                        chargesString += `<TaxDefinition>
                                <Code>${rec.magaya__TaxCode}</Code>
                                <Name>Impuesto</Name>
                                <Rate>${rec.magaya__TaxRate}</Rate>
                                <Layout>Simple</Layout>
                                <Type>Tax</Type>
                                <TaxAuthority>
                                    <Type>Vendor</Type>
                                    <Name>Autoridad Impositiva Predeterminada</Name>
                                </TaxAuthority>

                            </TaxDefinition>`

                            console.log("Tax record", chargesString)
                            return chargesString;

                    })
                }*/
        return chargesString

/*if (k.magaya__TaxRate === null || k.magaya__TaxRate === "null")
    k.magaya__TaxRate = 0.00
else k.magaya__TaxRate = k.magaya__TaxRate.toLocaleString('en-US', { minimumFractionDigits: 2 })*/



    /*if (idTax > 0) {
        console.log("Tax", idTax)
    }*/

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

}

/*
@charges object
@data_account object (apply to)
*/
function buildXmlCharge(charges, data_account) {

    let chargesString = ``
    let idTax = 0
    if (!_.isEmpty(charges)) {
        $.map(charges, function(k, v) {
            chargesString += buildSimpleCharge(k, data_account)
        })
    }

    return chargesString;
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
            $("#no-configuration-alert").hide();


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
                let error_string = ''
                let error_title = 'Error'
                if (!$.isEmptyObject(result.data)) {
                    error_title = `mQuote couldn't be sended.`
                    $.map(result.data['error'], function(k) {
                        error_string += `${k}<br />`
                    })
                } else {
                    error_string = result.data
                }

                Swal.fire({
                    title: error_title,
                    html: error_string,
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



function bipdf(items) {
    let data_items = {}
    if (!_.isEmpty(items)) {
        $.map(items, function(k, v) {

        })
    }
}

async function buildPdf(mquote_id) {
    quoteToEdit = [];
    //Utils.blockUI()
    //dispatch
    storeQuote.dispatch(findQuote({ id: mquote_id }))

    //general data
    let orgData = localStorage.getItem('organization')
    orgData = JSON.parse(orgData)
    console.log(orgData)
    let charges = []
    let items = []


    items = await getRelatedRecordCRM("magaya__SQuotes", "magaya__SQuote_Name1", mquote_id)
    charges = await getRelatedRecordCRM("magaya__SQuotes", "magaya__SQuote_Name0", mquote_id)
        //Utils.unblockUI();
        //let dataPost = bipdf(items)

    dataPost = {
        'first_name': "Name from post",
        'last_name': "Apellido from posdt"
    }
    const endpoint = `http://localhost/zoho_magaya/blog/public/pdf`;
    /*$.ajax({
        type: 'POST',
        url: endpoint,
        data: dataPost,
        beforeSend: function() {
            Utils.blockUI()
        },
        success: function(resp) {
            blob = resp.blob
            var file = window.URL.createObjectURL(blob);
        //img.src = file;
        //img.target = "_blank"
        //document.body.appendChild(img);
        window.location.assign(file);
        },
        error: function(resp) {
            console.log(resp)
            if (error) {
                error(resp)
            } else {
                message_error = 'Unknown error during operation, please try again';
                //error(message_error)
                Swal.fire({
                    title: 'Unknown Error',
                    html: "Unknown error during operation, please try to <a class='startSession'>Login again</a>",
                    icon: 'error'
                })
                $("#no-configuration-alert").show();
            }
        },
        complete: function() {
            Utils.unblockUI()
        }

    })*/
    /*fetch(endpoint, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                //'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }),
            body: JSON.stringify(dataPost)
        })
        .then((response) => response.blob())
        .then((blob) => {
            //var img = document.createElement('img');
            var file = window.URL.createObjectURL(blob);
            //img.src = file;
            //img.target = "_blank"
            //document.body.appendChild(img);
            window.location.assign(file);
        })
        .catch((err) => {
            console.warn("error", err)
        })*/
    let data = `<div class="HtmltoPdf">`
    data += buildPdfHeader(orgData, quoteToEdit)

    data += buildPdfCharges(charges)

    data += `</div>`

    data += buildPdfItems(items)
    data += `</div>`

    data += `<div class="container" style="margin-top: 10px;">
                <table width="100%" cellpadding="0px" cellspacing="0px">
                    <tr>
                        <th colspan="12" class="session-fourth headerFont" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">
                            Terms & Conditions</th>
                    </tr>
                    <tr>
                        <td colspan="12" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                            ${quoteToEdit["magaya__Terms"] !== null ? quoteToEdit["magaya__Terms"] : ""}<br></td>
                    </tr>
                </table>
            </div>`

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
        let none = ``;
        let address = ``;
        let contact = ``;
        let phone = ``;
        let email = ``;
        let customer_address = ``;
        none = !_.isEmpty(orgData["website"]) ? orgData["website"] : ""
        address = !_.isEmpty(orgData["street"]) ? orgData["street"] : ""
        address += ", " + !_.isEmpty(orgData["city"]) ? orgData["city"] : ""
        address += ", " + !_.isEmpty(orgData["state"]) ? orgData["state"] : ""
        address += ", " + !_.isEmpty(orgData["country"]) ? orgData["country"] : ""
        phone = !_.isEmpty(orgData["phone"]) ? orgData["phone"] : ""
        email = !_.isEmpty(orgData["primary_email"]) ? orgData["primary_email"] : ""
        
        let create_date = quoteToEdit["Created_Time"] !== null ? new Date(quoteToEdit["Created_Time"]).toISOString().split('T')[0] : "";
        let expire_date = quoteToEdit["magaya__ExpirationDate"] !== null ? new Date(quoteToEdit["magaya__ExpirationDate"]).toISOString().split('T')[0] : "";
        let nameAccount = !_.isEmpty(quoteToEdit["Account"]) ? quoteToEdit["Account"]["name"] : "";
        let representative = !_.isEmpty(quoteToEdit["magaya__Representative"]) ? quoteToEdit["magaya__Representative"]["name"] : "";
        contact = !_.isEmpty(quoteToEdit["magaya__Employee"]) ? quoteToEdit["magaya__Employee"]["name"] : ""
        customer_address = !_.isEmpty(quoteToEdit["magaya__ContactStreet"]) ? quoteToEdit["magaya__ContactStreet"] : "" 
        customer_address += ", " + !_.isEmpty(quoteToEdit["magaya__ContactCity"]) ? quoteToEdit["magaya__ContactCity"] : "" 
        customer_address += ", " + !_.isEmpty(quoteToEdit["magaya__ContactState"]) ? quoteToEdit["magaya__ContactState"] : ""
        customer_address += ", " + !_.isEmpty(quoteToEdit["magaya__ContactCountry"]) ? quoteToEdit["magaya__ContactCountry"] : ""

        //console.log(orgData)
        data = `
        <div class="container" style="margin-top: 0px;">
        <table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
            <tr>
                <th rowspan="2">
                    <table>
                        <tr>
                            <th rowspan="2">
                                <img class="headerIMG" width="100px" height="100px" src="https://zohomagaya.herokuapp.com/js/ui_listmquote/utils/logo2.png" style="text-align: center; margin-left:15px;" />
                            </th>
                            <th style="text-align: start; vertical-align: top;">
                                <div class="session-first" style="float: left; font-size: 28px;">
                                    ${orgData["company_name"]}
                                </div>
                            </th>
                        </tr>
                        <tr></tr>
                    </table>
                </th>
                <th style="vertical-align: top;">
                    <table id="header" cellspacing="0px" cellpadding="2px" style="border: none; text-align: right;float: right; font-size: 12px">
                        <tr>
                            <td colspan="12" class="headerFont">
                                <span class="material-icons">language</span>
                                ${none}</td>
                        </tr>
                        <tr>
                            <td colspan="12" class="col headerFont">
                                <span class="material-icons">phone</span>
                                ${phone}</td>
                        </tr>
                        <tr>
                            <td colspan="12" class="headerFont">
                                <span class="material-icons">alternate_email</span>
                                ${email}</td>
                        </tr>
                        <tr>
                            <td colspan="12" class="headerFont">
                                <span class="material-icons">home</span>
                                ${address}</td>
                        </tr>
                    </table>
                </th>
            </tr>
            <tr></tr>
            <tr></tr>
        </table>
    </div>
    <div class="container" style="margin-top:10px;">
        <table cellspacing="0px" cellpadding="0px" width="100%">
            <tr>
                <td width="40%">
                    <table id="info1" cellspacing="0px" cellpadding="0px" width="100%" style="text-align: left;">
                        <tr>
                            <th class="headerFont" colspan="2" style="border: 1px #000 solid; padding: 3px;text-align: center;">Customer Info</th>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px; border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                Customer</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                ${nameAccount}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px; border-left: 1px #000 solid;border-right: 1px #000 solid;">
                                Representative</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                ${representative}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px; border: 1px #000 solid;">
                                Phone</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                ${!_.isEmpty(quoteToEdit["magaya__ContactMobile"]) ? quoteToEdit["magaya__ContactMobile"]:""}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px;border-left: 1px #000 solid;border-right: 1px #000 solid;">
                                Email</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                ${!_.isEmpty(quoteToEdit["magaya__ContactEmail"]) ? quoteToEdit["magaya__ContactEmail"] : "" }</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;border: 1px #000 solid;">
                                Address</th>
                            <td class="dataFont" style="text-align: start;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                ${customer_address}
                            </td>
                        </tr>
                    </table>
    
                </td>
                <td width="40%">
                    <table id="info2" cellspacing="0px" cellpadding="2px" style="text-align:left;border: none; float: right;margin-left: 45px;">
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Quote Number:</th>
                            <td class="dataFont">
                                ${quoteToEdit["magaya__Number"]}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Creation Date:</th>
                            <td class="dataFont">
                                ${create_date}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Expiration Date:</th>
                            <td class="dataFont">
                                ${expire_date}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Contact To:</th>
                            <td class="dataFont">
                                ${contact}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table width="100%" cellspacing="0px" cellpadding="2px" style="border: none; margin-top: 5px;">
                        <tr>
                            <th class="headerFont" colspan="2" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border-left: 1px #000 solid;border-right: 1px #000 solid;border-top: 1px #000 solid;">
                                Quotation Info
                            </th>
                        </tr>
                        <tr>
                            <th colspan="2" class="headerFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: start;">
                                <span>Description of Goods:</span>
                                <div class="dataFont">${quoteToEdit["magaya__Description"]}</div>
                            </th>
                        </tr>
                        <tr>
                            <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;">
                                <span>Origin:</span>
                                <div class="dataFont" style="text-align: start;">${quoteToEdit["magaya__Origin"] !== null ? quoteToEdit["magaya__Origin"] : ""}</div>
                            </th>
                            <th class="headerFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;">
                                <span>Destination:</span>
                                <div class="dataFont" style="text-align: start;">${quoteToEdit["magaya__Destination"] !== null ? quoteToEdit["magaya__Destination"] : ""}</div>
                            </th>
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
    data += `<div class="container" style="margin-top: 10px;">
                <table width="100%" cellspacing="0px" cellpadding="0px">
                    <tr>
                        <th class="headerFont" colspan="5" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid">
                            Charges</th>
                    </tr>
                    <tr style="font-weight: bold;">
                        <th style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                            Description</th>
                        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                            Price</th>
                        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                            Quantity</th>
                        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                            Tax</th>
                        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                            Amount</th>
                    </tr>`
    if (!_.isEmpty(charges)) {
        let amount_total = 0;
        let amount_tax = 0;
        $.map(charges, function(k, v) {
            amount_total += roundDec(k["magaya__Amount_Total"]);
            amount_tax += roundDec(k["magaya__Tax_Amount"])
            data += `<tr>
                    <td style="padding-left: 3px;border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: left;">
                        ${k["Name"]}</td>
                    <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">
                        ${k["magaya__Price"]}</td>
                    <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">
                        ${k["magaya__CQuantity"]}</td>
                    <td style="border-right: 1px #000 solid; text-align: right;">
                        ${k["magaya__Tax_Amount"]}</td>
                    <td style="border-right: 1px #000 solid; text-align: right; font-weight: bold;">
                        ${k["magaya__Amount_Total"]}</td>
                </tr>`
        })
        data += `<tr style="font-weight: bolder;">
                    <td style="border:none" colspan="3">
                    </td>
                    <td style="border-left: 1px #000 solid; border-top: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                        TOTAL</td>
                    <td style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">${roundDec(amount_total)}</td>
                </tr>`
    } else {
        data += `<tr>
                    <td style="border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: left;">
                     </td>
                    <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">
                     </td>
                    <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">
                     </td>
                    <td style="border-right: 1px #000 solid; text-align: right;">
                     </td>
                    <td style="border-right: 1px #000 solid; text-align: right; font-weight: bold;">
                     </td>
                </tr>`
    }
    data += `</table></div>`
    return data
}

/****build items styles for PDF
 * @items items object
 */
function buildPdfItems(items) {
    let data = ``
    data += `<div class="container" style="margin-top: 10px;">
                <table width="100%">
                    <tr>
                        <th class="headerFont" colspan="5" style="background-color: lightblue; text-align: start;text-transform:uppercase; border: 1px #000 solid;"> Items</th>
                    </tr>
                    <tr>
                        <th style="border-left: 1px #000 solid; border-bottom: 1px #000 solid; border-right: 1px #000 solid; text-align: center;">Description </th>
                        <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
                        <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Dimensions</th>
                        <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Weight</th>
                        <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Volume</th>
                    </tr>`
    let totalPieces = 0
    let totalVolume = 0
    let totalWeight = 0
    let total_weight_international = 0
    let total_volume_international = 0
    let total_weight_english = 0
    let total_volume_english = 0
    if (!_.isEmpty(items)) {        
        $.map(items, function(k, v) {
                totalPieces += parseInt(k.magaya__Pieces)
                let measure_length = "in";
                let measure_weigth = "lb";
                let measure_volume = "ft<sup>3</sup>"
                if (k.magaya__Measure_System === "International") {
                    measure_length = "m";
                    measure_volume = "m<sup>3</sup>";
                    measure_weigth = "kg"
                    total_volume_international += roundDec(k.magaya__Volume * k.magaya__Pieces)
                    total_weight_international += roundDec(k.magaya__Weigth * k.magaya__Pieces)
                } else {
                    //pulgadas y libras
                    total_volume_english += roundDec(k.magaya__Volume * k.magaya__Pieces)
                    total_weight_english += roundDec(k.magaya__Weigth * k.magaya__Pieces)
                }
                data += `<tr>
                <td width="40%" style="padding-left: 3px;border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">
                    ${k["Name"]}</td>
                <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    ${k["magaya__Pieces"]}</td>
                <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    ${k["magaya__Length"]} X ${k["magaya__Height"]} X ${k["magaya__Width"]} (${measure_length})</td>
                <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">
                    ${k["magaya__Weigth"]} (${measure_weigth})</td>
                <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">
                    ${k["magaya__Volume"]} (${measure_volume})</td>
                </tr>`
            })
            //get all to international system
        totalWeight = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
        totalVolume = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168
        data += `<tr style="font-weight: bold;">
                    <td style="border:none; text-align: center;" colspan="2">
                    </td>
                    <td style="border-left: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                        TOTAL</td>
                    <td style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                        ${roundDec(totalWeight)} kg</td>
                    <td style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                        ${roundDec(totalVolume)} m<sup>3</sup></td>
                </tr>`
    } else {
        data += `<tr>
                    <td width="40%" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">
                        </td>
                    <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                        </td>
                    <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                        </td>
                    <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">
                        </td>
                    <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">
                        </td>
                </tr>
                <tr style="font-weight: bold;">
                    <td style="border:none; text-align: center;" colspan="2">
                    </td>
                    <td style="border-left: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                        TOTAL</td>
                    <td style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                        ${roundDec(totalWeight)} kg</td>
                    <td style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                        ${roundDec(totalVolume)} m<sup>3</sup></td>
                </tr>`
    }
    data += `</table></div>`

    return data
}


function move_quote(idQuote) {
    //console.log("moving quote", idQuote)
    //drop the state temporal items and charges
    storeItem.dispatch(emptyItems())
    storeCharge.dispatch(emptyCharges())
    storeAccounts.dispatch(emptyAllAccounts())
    storeQuote.dispatch(clearQuoteToEdit())
    quoteToEdit = [];
    limpiar_form()
    //dispatch
    storeQuote.dispatch(findQuote({id: idQuote}))
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
