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
    $("select[name=magaya__Mode_of_Transportation]").val("")
    $("select[name=magaya__Incoterm_rule]").val("")


    $("select[name=Account]").prop('disabled', false);

    //hora actual

    //$("select[name=Account]").removeAttr("selected")
    // expected output: 10*/
    let elementos = document.querySelectorAll("input[type=text], input[id=magaya__Description], select[name=magaya__TransportationMode], select[name=magaya__Direction]")
    elementos.forEach((elemento) => {
        elemento.value = ''
    })
    let now = moment().format("YYYY-MM-DD");
    let expire_date = moment().add(1, 'months').format("YYYY-MM-DD HH:mm:ss")
    $("input[name=magaya__AddedTime]").val(now)
    $("input[name=magaya__ExpirationDate]").val(expire_date)

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

    //representative
    stringQuote += `<RepresentativeName>${quoteXML.magaya__ContactName}</RepresentativeName>`
                    /*<Representative GUID="${quoteXML.magaya__MagayaGUID}">
                        <Type>EntityContact</Type>
                        <Name>${quoteXML.magaya__ContactName}</Name>
                        <Email>${quoteXML.magaya__ContactEmail}</Email>
                        <Phone>${quoteXML.magaya__ContactPhone}</Phone>
                        <MobilePhone>${quoteXML.magaya__ContactMobile}</MobilePhone>
                    </Representative>`*/

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
                        <ContactFirstName>${quoteXML.magaya__ContactName}</ContactFirstName>
                    </Contact>
                    <ContactAddress>
                        <Street>${quoteXML.magaya__BillingStreet}</Street>
                        <City>${quoteXML.magaya__BillingCity}</City>
                        <State>${quoteXML.magaya__BillingState}</State>
                        <ZipCode>${quoteXML.magaya__Billing_Zip}</ZipCode>
                        <Country>${quoteXML.magaya__BillingCountry}</Country>
                        <ContactName>${quoteXML.magaya__ContactName}</ContactName>
                        <ContactPhone>${quoteXML.magaya__ContactPhone}</ContactPhone>
                        <ContactEmail>${quoteXML.magaya__ContactEmail}</ContactEmail>
                    </ContactAddress>`


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
        //let routing = await buildStringRouting()
        //if (_.size(routing) > 0) {
            //stringXML += routing
        //}
            //charges
        let account_id = 0;
        let data_account = {}
        let charges = ``
        let stringCharge = ``
        stringRouting = await $(this).getRelatedRouting(idSQuote)
                        .then(resp => {
                            stringXML  += resp.details.output
                        })

        stringCharge = await $(this).getRelatedCharge(idSQuote)
                        .then(resp => {
                            stringXML  += resp.details.output
                        })

        stringItem = await $(this).getRelatedItem(idSQuote)
                        .then(resp => {
                            stringXML  += resp.details.output
                        })

    stringXML += '</Quotation>'

    console.log(stringXML);

    //Utils.blockUI();

    let result = await sendmQuote(stringXML, idSQuote)

    //}
} //.send-quote


//get items cargo table, return xml charge
(function($) {
    $.fn.getRelatedCharge = function(idSQuote) {
        return new Promise(function(resolve, reject) {
            var func_name = "magaya__getChargesMquote";
            var req_data ={
                "quote_id" : idSQuote
            };
            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
                .then(function(data){
                    resolve(data)
                })
        });
    }
})(jQuery);

//get items service table, return xml items
(function($) {
    $.fn.getRelatedItem = function(idSQuote) {
        return new Promise(function(resolve, reject) {
            var func_name = "magaya__getItemMquote";
            var req_data ={
                "quote_id" : idSQuote
            };
            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
                .then(function(data){
                    resolve(data)
                })
        });
    }
})(jQuery);

//get items service table, return xml items
(function($) {
    $.fn.getRelatedRouting = function(idSQuote) {
        return new Promise(function(resolve, reject) {
            var func_name = "magaya__getRoutingMquote";
            var req_data ={
                "quote_id" : idSQuote
            };
            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
                .then(function(data){
                    resolve(data)
                })
        });
    }
})(jQuery);



async function checkConnect() {
    config = await getMagayaVariables()

    const endpoint = `https://zohomagaya.herokuapp.com/ping?url=${config.magaya_url}`;
    //const endpoint = `http://localhost/zoho_magaya/blog/public/ping?url=${config.magaya_url}`
    fetch(endpoint, {
            mode: 'cors',
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
        })
        .catch(err => {
            console.warn("error", err)
            $("#magaya_link").html(`<span class="material-icons md-24 startSession btn btn-primary float-right" style="background: none;border: none;">link_off</span>`)

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
                $("#magaya_link").html(`<span class="material-icons md-24 btn btn-success float-right" style="background: none;border: none;">link</span>`)

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
async function make_pdf(pdf_type) {
    try {
        let pdf = await buildPdf(pdf_type);
    } catch (error) {
        let message = error
        codeError = error;
        field = ``;
        show = false;
        module = ''
        storeError.dispatch(addError({ errorCode: codeError, showInfo: show, field: field, module: module }))

    }
}



async function buildPdf(pdf_type) {
    Utils.blockUI()

    //general data
    let orgData = localStorage.getItem('organization')
    orgData = JSON.parse(orgData)
    let charges = []
    let items = []
    let mquote = storeQuote.getState().quoteToEdit

    dataPost = {
        'organization': {
            "pdfType": pdf_type,
            "orgData" :orgData,
            'mQuote': mquote,
            'charges': storeCharge.getState().charges,
            'items': storeItem.getState().items
        }
    }

    //const endpoint = `http://localhost/zoho_magaya/blog/public/pdf`;
    const endpoint = `https://zohomagayab.herokuapp.com/pdf`

    fetch(endpoint, {
        mode: 'cors',
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
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob);
            return;
          }

          // For other browsers: create a link pointing to the ObjectURL containing the blob.
          const objUrl = window.URL.createObjectURL(blob);

          let link = document.createElement('a');
          link.href = objUrl;
          link.download = mquote.magaya__Number;
          link.click();

          // For Firefox it is necessary to delay revoking the ObjectURL.
          setTimeout(() => {
            window.URL.revokeObjectURL(objUrl);
          }, 250);

          Utils.unblockUI();

    })
    .catch((err) => {
        Utils.unblockUI();

    })

}



function move_quote(idQuote) {
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

//disable enter key in app
$(function () {
    $("body").keypress(function (e) {
        var key;
        if (window.event)
            key = window.event.keyCode; //IE
        else
            key = e.which; //firefox
        return (key != 13);
    });
});

//checa cantidad de digitos
//https://www.it-swarm-es.com/es/javascript/obtener-numero-de-digitos-con-javascript/1071038179/
const digitCount2 = num => String( Math.floor( Math.abs(num) ) ).length;
