/*(function($) {
    $.fn.getItemsFromForm = function(form_name) {
        var data = {};
        var a = $("#account-form").serializeArray();
        $.each(a, function() {
            if (data[this.name]) {
                if (!data[this.name].push) {
                    data[this.name] = [data[this.name]].replace(/[^a-zA-Z0-9]/g, ' ');
                }
                data[this.name].push(this.value.replace(/[^a-zA-Z0-9]/g, ' ') || '');
            } else {
                data[this.name] = this.value.replace(/[^a-zA-Z0-9]/g, ' ') || '';
            }
        });
    }
})(jQuery);



(function($) {
    $.fn.getItemsFromJSON = function(dataArray) {
            //alert (JSON.stringify (dataArray));
            items = new Array();
            i = 0;
            if (typeof dataArray === 'object' && dataArray instanceof Object) {
                $.each(dataArray, function(i, k) {
                    //cuando es 1 item pasa como array {}
                    //cuando es mas de 1 pasa como array de objetos [{}]
                    //length va a fallar si es array
                    if (k.length > 0) {
                        values = (dataArray.Item).map(function(key, value) {
                            items.push(key);
                        })
                    } else {
                        items.push(k);
                    }

                })
                return (items);

            } ///end if dataArray.Items
        } // end function
})(jQuery);


//get the object dataArray, return Charges
//of differents levels
(function($) {
    $.fn.getChargesFromJSON = function(dataArray) {
            //console.log(JSON.stringify(dataArray));
            items = new Array();
            i = 0;
            if (typeof dataArray === 'object' && dataArray instanceof Object) {
                if (dataArray.length > 0) {
                    $.each(dataArray, function(i, k) {
                            items.push(k.replace(/[^a-zA-Z0-9]/g, ' '));
                        }) //end each

                } else {
                    items.push(dataArray);
                }

                return (items);

            } ///if (dataArray.Items) {*
        } // end function
})(jQuery);*/

//get data by method GetTransRangeByDate
/*
 *@firstDate dateformat (Y-MM-DD)
 *@lastDate dateformat (Y-MM-DD)
 *@type magaya type transaction
 *@flags magaya flags
 */
(function($) {
    $.fn.GetTransRangeByDate = function(firstDate, lastDate, type, flags) {
        config = Utils.getConfig()

        data = {
            method: 'GetTransRangeByDate',
            data: [
                Utils.getAccessKey(),
                type,
                firstDate,
                lastDate,
                flags
            ]
        }

        MagayaAPI.sendRequest(data, function(result) {
                //console.log(result);
                if (result.error) {
                    $("#no-configuration-alert").show()
                } else {
                    content = '';

                    if ($.isEmptyObject(result.data)) {
                        content = '<tr><td colspan=10>Not records exists</td></tr>';
                    } else {
                        if (result.data['Quotation'] instanceof Array) {
                            records = result.data['Quotation']
                        } else {
                            records = [result.data['Quotation']]
                        }

                        records.forEach(function(item) {

                                content += `<tr>
                            <td>${item.Number}</td>
                            <td>${item.ContactName}</td>
                            <td>${item.ConsigneeName}</td>
                            <td>${item.Direction}</td>
                            <td>${item.Service}</td>
                            <td>${item.Status}</td>
                            <td>${item.ModeOfTransportCode}</td>
                            <td>${moment(item.ExpirationDate).format('Y-MM-DD')}</td>
                            <td>
                                <button class="btn btn-primary btn-sm view-quote"><i class="fa fa-eye"></i></button>
                                <a class="btn btn-success btn-sm edit-quote" href="tab-widget/edit-quotation/${item['@attributes'].GUID}"><i class="fa fa-edit"></i></a>
                                <button class="btn btn-danger btn-sm delete-quote"><i class="fa fa-trash"></i></button>
                            </td>
                            `;
                            }) //forEach

                    } //else result_data

                    $('#table-show tbody').html(content);
                } //else magayaApi
            }) //magayaApi

    }
})(jQuery);


/*
 *
 *send data to magaya API with SetEntity
 *@data array data = {"field1":"value1"}
 *xml to magaya
 *<Entity xmlns="http://www.magaya.com/XMLSchema/V1">
    <Type>Client</Type>
    <Name>Raul Estevez</Name>
    <Email>raulestevez400@yahoo.es</Email>

</Entity>
*/
(function($) {
    $.fn.sendDataEntity = function(data) {
        var val = '';
        var cad = '<Entity xmlns="http://www.magaya.com/XMLSchema/V1">';
        $.each(data, function(k, v) {
            cad += `<${k}>${v}</${k}>`
        })

        cad += "</Entity>"

        flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
        entity_type = MagayaAPI.TRANSACTION_TYPES.Customer

        data = {
            method: 'SetEntity',
            data: [
                Utils.getAccessKey(),
                flags,
                cad
                //cad
            ]
        }
        MagayaAPI.sendRequest(data, function(result) {
            if (result.error) {

                Swal.fire({
                    title: "Error creating entity",
                    text: result.data,
                    icon: 'error'
                })
            } else {

                Swal.fire({
                    title: 'Success',
                    text: 'Action successfully',
                    icon: 'success',
                    allowOutsideClick: false
                }).then(function() {
                    $("#sortable3").empty();
                    $("#sortable4").empty();
                    drawCustomersMagaya();
                    drawContactsCRM();
                })
            }
        })
    };
})(jQuery);




/////////////////////////////////////////////////////////////////
////// delete a transaction
/////////////////////////////////////////////////////////////////
(function($) {
    $.fn.deleteData = function(idRecord, module) {
        Utils.blockUI()
        var code = ''
        var status = ''
        ZOHO.CRM.API.deleteRecord({ Entity: module, RecordID: idRecord })
            .then(function(response) {

                $.map(response.data, function(k) {
                    code = k.code;
                })
                Utils.unblockUI()

                //console.log (code)
            }).catch(function(response) {
                code = response.error
                console.log('error', response)
                Utils.unblockUI()
            });

    };
})(jQuery);



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
                } else if (class_name == 'Delete' || class_name == "NoData") {
                    //
                } else {
                    json_items += ',"' + $this.attr('class') + '":"' + $this.html() + '"';
                }

            })

            jsonData += ',{' + json_items + '}';
            json_items = ''

        });

        jsonData = jsonData.substring(1)
            //console.log("WComma", jsonData)
        jsonData = JSON.parse('[' + jsonData + ']')
        return (jsonData)
    }

})(jQuery);


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
async function buildStringQuote(idSQuote) {
    stringQuote = methodCode = '';
    transpMethods = new Array();
    return new Promise(function(resolve, reject) {
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
                        accountId = k.Account.id;
                        idChecking = accounts.findIndex(i => i["id"] == accountId);
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
                        stringQuote += `<ContactName>${k.magaya__ContactName}</ContactName>`
                    }
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
    });
}

//update record in CRM
/*@dataConfig  JSON config */
(function($) {
    $.fn.updateRecordCRM = function(dataConfig) {
        ZOHO.CRM.API.updateRecord(dataConfig)
            .then(function(data) {
                return (data.data)

            })
    }
})(jQuery);

//insert record in CRM
function insertRecordCRM(module, data, trigger = '') {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.insertRecord({ "Entity": module, APIData: data, Trigger: [trigger] })
            .then(function(response) {
                resolve(response.data)
            })
    })
}


//get all record from a module
function getAllRecordCRM(module, order) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getAllRecords({ Entity: module, sort_order: order })
            .then(function(response) {
                resolve(response.data)
            })
    });
}

//get fields
//insert record in CRM
function getFieldsCRM(moduleName) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.META.getFields({ "Entity": moduleName })
            .then(function(response) {
                resolve(response)
            })
    });
}

//delete Data
function deleteDataCRM(moduleName, recordId) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.deleteRecord({ Entity: moduleName, RecordID: recordId })
            .then(function(data) {
                resolve(data)
            })
    })
}


//get a record
function getRecordCRM(moduleName, recordId) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRecord({ Entity: moduleName, RecordID: recordId })
            .then(function(data) {
                if (!_.isEmpty(data.data)) {
                    resolve(data.data)
                }
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
    });
}

//get Squote Stage for string xml quotation
function getSquoteStage(StageId) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuoteStage", RecordID: StageId })
            .then(function(data) {
                resolve(data.data);
            })
    });
}

function swalMessage(message) {
    Swal.fire({
        title: 'Info',
        html: message,
        icon: 'info',
        allowOutsideClick: false
    })
}


//get magaya login var
async function getMagayaVariables2() {
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


/*****************************************
 * toma 2 fechas
 * true si endDate >= startDate
 * false en caso contrario
 */
function compareTimeDate(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    startDate = startDate.getTime();
    endDate = endDate.getTime();

    if (endDate >= startDate)
        return true;
    else
        return false;
}


function sanitize(input) {
   if (!_.isEmpty(input)) {
        let a = HtmlSanitizer.SanitizeHtml(input);
        return a.replace(/['"]+/g, '').replace(/[^a-zA-Z0-9]\-/g, ' ').replace(/<(|\/["]\/[&<>]\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
   }
}
