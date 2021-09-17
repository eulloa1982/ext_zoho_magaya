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

                /*else if (class_name === 'magaya__Measure_System' || class_name === 'magaya__ChargeCode' || class_name === "magaya__Amount" || class_name === "magaya__ChargeCurrency" || class_name === "magaya__Status") {
                    let nameValue = $(this).html()
                    json_items += `, "${class_name}":"${nameValue}"`
                }
                else {
                    json_items += ',"' + $this.attr('class') + '":"' + $this.children().val() + '"';
                }*/

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

function sanitize_array(array) {
    $.map(array, function(k, v) {
        v = HtmlSanitizer.SanitizeHtml(v);
        v.replace(/['"]+/g, '').replace(/[^a-zA-Z0-9]\-/g, ' ').replace(/<(|\/["]\/[&<>]\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
    })

    console.log("Array sanitizado", array)
    return array;
   /* array.reduce(function(previosValue, currentValue) {
        currentValue = HtmlSanitizer.SanitizeHtml(currentValue);
        return currentValue.replace(/['"]+/g, '').replace(/[^a-zA-Z0-9]\-/g, ' ').replace(/<(|\/["]\/[&<>]\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
    })*/
}


//clean form
function limpiar_form() {
    //limpiar Account, remove selected
    //$("select[name=Account]").removeAttr("selected")
    $("select[name=magaya__ConsigneeName]").val("")
    $("select[name=magaya__Shipper]").val("")
    $("select[name=Deal]").val("")
    //$("select[name=Account]").removeAttr("selected")
    // expected output: 10*/
    let elementos = document.querySelectorAll("input[type=text], input[id=magaya__Description], select[name=magaya__TransportationMode], select[name=magaya__Direction]")
    elementos.forEach((elemento) => {
        elemento.value = ''
    })
}


//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;
    let t = num.toString();
    let regex = /(\d*.\d{0,3})/;

    let number = parseFloat(t.match(regex)[0]);

    if (typeof (number) === "number" && !isNaN(number)) {
        return number;
    }


    return 0;

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


//get items package table, return xml string items
function buildStringQuote2(idSQuote) {
    stringQuote = methodCode = '';
    transpMethods = new Array();

    storeQuote.dispatch(findById({id: idSQuote}))

    quoteXML = quoteXML[0]
    //$.map(quoteXML, function(k, v) {
        //get account data for contact
        stringQuote += `<IsCommerceQuotation>false</IsCommerceQuotation>`
        stringQuote += `<CreatedOn>${quoteXML.Created_Time}</CreatedOn>`
        stringQuote += `<Number>${quoteXML.Name}</Number>`
        stringQuote += `<CreatedByName>${quoteXML.Owner.name}</CreatedByName>
                        <Version>104</Version>`
        stringQuote += `<ExpirationDate>${quoteXML.magaya__ExpirationDate}</ExpirationDate>`
        stringQuote += `<IssuedByName>${quoteXML.Owner.name}</IssuedByName>
                        <SalespersonName>${quoteXML.Owner.name}</SalespersonName>`
        stringQuote += `<Service>${quoteXML.magaya__Service}</Service>`
        stringQuote += `<Direction>${quoteXML.magaya__Direction}</Direction>
                        <IsOpenQuote>true</IsOpenQuote>
                        <Status>Open</Status>
                        <DescriptionOfGoods>${quoteXML.magaya__Description}</DescriptionOfGoods>`

        let contactName =''
        let contact = ''
        try {
            accountId = quoteXML.Account.id
            storeAccounts.dispatch(getAccount({id: accountId}))
            stringQuote += `<ContactName>${singleAccount[0]['Account_Name']}</ContactName>
            <Contact GUID="${singleAccount[0]['magaya__MagayaGUID']}">
                <Type>Client</Type>
                <Name>${singleAccount[0]['Account_Name']}</Name>
                <Email>${singleAccount[0]['magaya__MagayaEmail']}</Email>
            </Contact>`


        } catch (err) {
            message = `'There is an error whit mQuote Account' ${err}`
            storeSuccess.dispatch(addSuccess({message: message}))
        }
        /*if (!_.isEmpty(k.Account)) {
            console.log("Account Quote found it", k.Account.id)
            accountId = k.Account.id;
            //idChecking = accounts.findIndex(i => i["id"] == accountId);
            storeAccounts.dispatch(findAccount({id: accountId}))

            console.log("Single Account", singleAccount)

            if (idChecking >= 0) {
                //find data in accounts array
                var accountData = accounts[idChecking]
                stringQuote += `<ContactName>${accountData['Account_Name']}</ContactName>
                                <Contact GUID="${accountData['magaya__MagayaGUID']}">
                                    <Type>Client</Type>
                                    <Name>${accountData['Account_Name']}</Name>
                                    <Email>${accountData['magaya__MagayaEmail']}</Email>
                                </Contact>`
            }
        } else {
            console.log("No account Quote")
            stringQuote += `<ContactName>${k.magaya__ContactName}</ContactName>`
        }*/
        console.log("XML String till here", stringQuote)
        //get contact field

        //get representative
        //indexContact = contacts.findIndex(i => i.Email === k.magaya__ContactEmail);
        /*if (indexContact >= 0) {
            repContact = contacts[indexContact];
            stringQuote += `<RepresentativeName>${repContact['Full_Name']}</RepresentativeName>
                            <Representative GUID="${repContact['magaya__MagayaGUID']}">
                                <Type>EntityContact</Type>
                                <Name>${repContact['Full_Name']}</Name>
                                <Email>${repContact['Email']}</Email>
                                <Phone>${repContact['Phone']}</Phone>
                                <MobilePhone>${repContact['Mobile']}</MobilePhone>
                                <ContactFirstName>${repContact['First_Name']}</ContactFirstName>
                                <ContactLastName>${repContact['Last_Name']}</ContactLastName>
                                <BillingAddress>
                                    <Street>${repContact['Mailing_Street']}</Street>
                                    <City>${repContact['Mailing_City']}</City>
                                    <State>${repContact['Mailing_State']}</State>
                                    <ZipCode>${repContact['Mailing_Zip']}</ZipCode>
                                    <Country>${repContact['Mailing_Country']}</Country>
                                    <ContactName>${repContact['Full_Name']}</ContactName>
                                    <ContactPhone>${repContact['Phone']}</ContactPhone>
                                    <ContactEmail>${repContact['Email']}</ContactEmail>
                                </BillingAddress>
                            </Representative>`
        }

        if (!(_.isEmpty(k.magaya__ConsigneeName))) {

            stringQuote += `<ConsigneeName>${k.magaya__ConsigneeName}</ConsigneeName>
                            <Consignee><Type>Client</Type><Name>${k.magaya__ConsigneeName}</Name></Consignee>`
        }
        if (!(_.isEmpty(k.magaya__Shipper))) {
            stringQuote += `<ShipperName>${k.magaya__Shipper}</ShipperName>
                            <Shipper><Type>Client</Type><Name>${k.magaya__Shipper}</Name></Shipper>`
        }
        if (!(_.isEmpty(k.magaya__Carrier))) {
            //get it from MagayaCarrier Array
            carrierArrayId = MagayaCarriers.findIndex(i => i.Name === k.magaya__Carrier);
            if (carrierArrayId >= 0) {
                carrier = MagayaCarriers[carrierArrayId];
                stringQuote += `<Carrier GUID="${carrier["@attributes"]["GUID"]}"><Type>${carrier.Type}</Type><Name>${carrier['Name']}</Name>
                                <Phone>${carrier.MobilePhone}</Phone><Email>${carrier.Email}</Email>
                                <CarrierInfo><CarrierTypeCode>${carrier.CarrierInfo.CarrierTypeCode}</CarrierTypeCode></CarrierInfo>
                                </Carrier><Status>Open</Status>`;
            }
        }

        if (!_.isEmpty(k.magaya__TransportationMode)) {
            transpMethods = getTranspMethod(k.magaya__TransportationMode.id)
                .then(r => {
                    return (r);
                }).then(resp => {
                    $.map(resp, function(k, v) {
                        stringQuote += `<ModeOfTransportation Code="${k.magaya__TransportationMethodCode}">
                              <Description>${k.Name}</Description>
                              <Method>${k.magaya__ParentMethod}</Method>
                              </ModeOfTransportation>
                             <ModeOfTransportCode>${k.magaya__TransportationMethodCode}</ModeOfTransportCode>
                             `
                    })

                }).then(r => {
                    resolve(stringQuote)
                })

        } else {
            resolve(stringQuote)
        }*/


    //})

        return(stringQuote)


    //return quoteXML;

    /*let doc = document.implementation.createDocument("", "", null);
    let parent = doc.createElement("quote")

    let createdOn = parent.createElement("CreatedOn");
    createdOn.innerHTML = quoteXML.Created_Time

    let number = parent.createElement("Number")
    number.innerHTML = quoteXML.Name

    let createdBy = parent.createElement("CreatedByName")
    createdBy.innerHTML = quoteXML.Owner.Name

    let issuedBy = parent.createElement("IssuedByName")
    issuedBy.innerHTML = quoteXML.Owner.name

    let salesPerson = doc.createElement("SalespersonName")
    salesPerson.innerHTML = quoteXML.Owner.name

    let service = doc.createElement("Service")
    service.innerHTML = quoteXML.magaya__Service

    let direction = doc.createElement("Direction")
    direction.innerHTML = quoteXML.magaya__Direction

    let description = doc.createElement("DescriptionOfGoods")
    description.innerHTML = quoteXML.magaya__Direction

    let expirationDate = doc.createElement("ExpirationDate")
    expirationDate.innerHTML = quoteXML.magaya__ExpirationDate

    let contactName = doc.createElement("ContactName")
    let contact = doc.createElement("Contact")
    try {
        accountId = quoteXML.Account.id
        storeAccounts.dispatch(getAccount({id: accountId}))

        contactName.innerHTML = singleAccount[0].Account_Name
        contact.setAttribute("GUID", singleAccount[0].magaya__GUID)
        //contactType = contact.appendChild("Type")
       // contactType.innerHTML = "Client"


    } catch (err) {
        message = `'There is an error whit mQuote Account' ${err}`
        storeSuccess.dispatch(addSuccess({message: message}))
    }


    //peopleElem.appendChild(personElem1);
    //peopleElem.appendChild(personElem2);
    doc.appendChild(createdOn);
    //doc.appendChild(contactName);
    //doc.appendChild(contact)


    console.log(doc)*/

    /*return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuotes", RecordID: idSQuote })
            .then(function(response) {

                $.map(response.data, function(k, i) {
                    //get account data for contact
                    stringQuote += `<IsCommerceQuotation>false</IsCommerceQuotation>`
                    stringQuote += `<CreatedOn>${k.Created_Time}</CreatedOn>`
                    stringQuote += `<Number>${k.Name}</Number>`
                    stringQuote += `<CreatedByName>${k.Owner.name}</CreatedByName>
                                    <Version>104</Version>`
                    stringQuote += `<ExpirationDate>${k.magaya__ExpirationDate}</ExpirationDate>`
                    stringQuote += `<IssuedByName>${k.Owner.name}</IssuedByName>
                                    <SalespersonName>${k.Owner.name}</SalespersonName>`
                    stringQuote += `<Service>${k.magaya__Service}</Service>`
                    stringQuote += `<Direction>${k.magaya__Direction}</Direction>
                                    <IsOpenQuote>true</IsOpenQuote>
                                    <DescriptionOfGoods>${k.magaya__Description}</DescriptionOfGoods>`
                    var accountId;

                    if (!_.isEmpty(k.Account)) {
                        console.log("Account Quote found it", k.Account.id)
                        accountId = k.Account.id;
                        //idChecking = accounts.findIndex(i => i["id"] == accountId);
                        storeAccounts.dispatch(findAccount({id: accountId}))

                        console.log("Single Account", singleAccount)

                        if (idChecking >= 0) {
                            //find data in accounts array
                            var accountData = accounts[idChecking]
                            stringQuote += `<ContactName>${accountData['Account_Name']}</ContactName>
                                            <Contact GUID="${accountData['magaya__MagayaGUID']}">
                                                <Type>Client</Type>
                                                <Name>${accountData['Account_Name']}</Name>
                                                <Email>${accountData['magaya__MagayaEmail']}</Email>
                                            </Contact>`
                        }
                    } else {
                        console.log("No account Quote")
                        stringQuote += `<ContactName>${k.magaya__ContactName}</ContactName>`
                    }
                    console.log("XML String till here", stringQuote)
                    //get contact field

                    //get representative
                    indexContact = contacts.findIndex(i => i.Email === k.magaya__ContactEmail);
                    if (indexContact >= 0) {
                        repContact = contacts[indexContact];
                        stringQuote += `<RepresentativeName>${repContact['Full_Name']}</RepresentativeName>
                                        <Representative GUID="${repContact['magaya__MagayaGUID']}">
                                            <Type>EntityContact</Type>
                                            <Name>${repContact['Full_Name']}</Name>
                                            <Email>${repContact['Email']}</Email>
                                            <Phone>${repContact['Phone']}</Phone>
                                            <MobilePhone>${repContact['Mobile']}</MobilePhone>
                                            <ContactFirstName>${repContact['First_Name']}</ContactFirstName>
                                            <ContactLastName>${repContact['Last_Name']}</ContactLastName>
                                            <BillingAddress>
                                                <Street>${repContact['Mailing_Street']}</Street>
                                                <City>${repContact['Mailing_City']}</City>
                                                <State>${repContact['Mailing_State']}</State>
                                                <ZipCode>${repContact['Mailing_Zip']}</ZipCode>
                                                <Country>${repContact['Mailing_Country']}</Country>
                                                <ContactName>${repContact['Full_Name']}</ContactName>
                                                <ContactPhone>${repContact['Phone']}</ContactPhone>
                                                <ContactEmail>${repContact['Email']}</ContactEmail>
                                            </BillingAddress>
                                        </Representative>`
                    }

                    if (!(_.isEmpty(k.magaya__ConsigneeName))) {

                        stringQuote += `<ConsigneeName>${k.magaya__ConsigneeName}</ConsigneeName>
                                        <Consignee><Type>Client</Type><Name>${k.magaya__ConsigneeName}</Name></Consignee>`
                    }
                    if (!(_.isEmpty(k.magaya__Shipper))) {
                        stringQuote += `<ShipperName>${k.magaya__Shipper}</ShipperName>
                                        <Shipper><Type>Client</Type><Name>${k.magaya__Shipper}</Name></Shipper>`
                    }
                    if (!(_.isEmpty(k.magaya__Carrier))) {
                        //get it from MagayaCarrier Array
                        carrierArrayId = MagayaCarriers.findIndex(i => i.Name === k.magaya__Carrier);
                        if (carrierArrayId >= 0) {
                            carrier = MagayaCarriers[carrierArrayId];
                            stringQuote += `<Carrier GUID="${carrier["@attributes"]["GUID"]}"><Type>${carrier.Type}</Type><Name>${carrier['Name']}</Name>
                                            <Phone>${carrier.MobilePhone}</Phone><Email>${carrier.Email}</Email>
                                            <CarrierInfo><CarrierTypeCode>${carrier.CarrierInfo.CarrierTypeCode}</CarrierTypeCode></CarrierInfo>
                                            </Carrier><Status>Open</Status>`;
                        }
                    }

                    if (!_.isEmpty(k.magaya__TransportationMode)) {
                        transpMethods = getTranspMethod(k.magaya__TransportationMode.id)
                            .then(r => {
                                return (r);
                            }).then(resp => {
                                $.map(resp, function(k, v) {
                                    stringQuote += `<ModeOfTransportation Code="${k.magaya__TransportationMethodCode}">
                                          <Description>${k.Name}</Description>
                                          <Method>${k.magaya__ParentMethod}</Method>
                                          </ModeOfTransportation>
                                         <ModeOfTransportCode>${k.magaya__TransportationMethodCode}</ModeOfTransportCode>
                                         `
                                })

                            }).then(r => {
                                resolve(stringQuote)
                            })

                    } else {
                        resolve(stringQuote)
                    }


                })
            })
    });*/
}




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
    let entity = "magaya__SQuotes";
    let related_list_charges = "magaya__SQuote_Name0"
    config = await getMagayaVariables()

    stringQuote = buildStringQuote2(idQuote)

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
    console.log("XML String", stringXML);

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

    console.log("Dara to send", data)
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

} //function buildXML



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
