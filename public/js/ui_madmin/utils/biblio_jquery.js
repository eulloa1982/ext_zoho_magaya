//magaya loguin variables
//get charges definition
let data = []

async function getChargesDefinition() {
   //get login magaya variables
   data = await getMagayaVariables()

    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.ENTITY_TYPES.Customer
    dataCharge = {
        method: "GetChargeDefinitions",
        data: [
            data["network_id"]
        ],
        url: data['magaya_url']
    }

    MagayaAPI.sendRequest(dataCharge, function(result) {
        if (!_.isEmpty(result.data)) {
            storeChargesDef.dispatch(addChargesDef(result.data.ChargeDefinition))
        };
    })

}

async function getWorkingPorts() {
    data = await getMagayaVariables()
    dataPorts = {
        method: "GetWorkingPorts",
        data: [
            "network_id"
        ],
        url: data['magaya_url']
    }

    MagayaAPI.sendRequest(dataPorts, function(result) {
        if (!_.isEmpty(result.data)) {
            storePortsDef.dispatch(addPorts(result.data.Port))
            //storeChargesDef.dispatch(addChargesDef(result.data.ChargeDefinition))
        };
    })

}

async function getCarriers() {
    data = await getMagayaVariables()

    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.ENTITY_TYPES.Carrier
    dataCarriers = {
        method: 'GetEntitiesOfType',
        data: [
            data["network_id"],
            flags,
            '',
            entity_type
        ],
        url: data['magaya_url']
    }

    MagayaAPI.sendRequest(dataCarriers, function(result) {
        if (!_.isEmpty(result.data)) {
            storeProvidersDef.dispatch(addProvidersDef(result.data.Carrier))
            //storeChargesDef.dispatch(addChargesDef(result.data.ChargeDefinition))
        };
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


//return json object ready to insert to Charges CRM
function chargeMagayaToCRM(data) {
    //code
    let code = data["Code"];
    let name = data["AccountDefinition"]["Name"];
    let accountDeftype = data["AccountDefinition"]["Type"];
    let description = data["Description"];
    let type = data["Type"];

    dataChargeSend = {
        "Name": description,
        "magaya__ChargesCode": code,
        "magaya__AccountDefinitionType": accountDeftype,
        "magaya__Type": type,
        "magaya__AccountDefinitionDescription": name
    }

    return (dataChargeSend);

}


//return json object ready to insert to Charges CRM
function providerMagayaToCRM(data) {
    //code
    let name = data["Name"];
    let type = data["CarrierInfo"]["CarrierTypeCode"];
    let magayaGuid = data["@attributes"]["GUID"];

    dataProviderSend = {
        "Name": name,
        "magaya__Carrier_Type": type,
        "magaya__Magaya_GUID": magayaGuid,
    }

    if (_.isObject(data["BillingAddress"]) && !_.isEmpty(data["BillingAddress"])) {
        Object.assign(dataProviderSend, {
            "magaya__BillingAddress_City": data["BillingAddress"]["City"],
            "magaya__BillingAddress_Country": data["BillingAddress"]["Country"],
            "magaya__BillingAddress_State": data["BillingAddress"]["State"],
            "magaya__BillingAddress_Street": data["BillingAddress"]["Street"],
            "magaya__BillingAddress_ZipCode": data["BillingAddress"]["ZipCode"],
        })
    }

    return (dataProviderSend);

}


//return json object ready to insert to Charges CRM
function portMagayaToCRM(data) {
    //code
    let airway = false
    let railway = false
    let roadway = false
    let waterway = false

    if (!_.isObject(data['Method'])) {
        switch (data["Method"]) {
            case "Ground":
                roadway = true;
                break;
            case "Air":
                airway = true;
                break;
            case "Ocean":
                waterway = true;
                break;
            case "Rail":
                railway = true;
                break;
            case "Mail":
                roadway = true;
                break;
            default:
                break;
        }
    }
    //else (!_.isEmpty(data['Method']) && _.isObject(data['Method'])) {
    else {
        $.map(data["Method"], function(k, v) {
            if (k === "Air")
                airway = true
            if (k === "Ocean")
                waterway = true
            if (k === "Mail" || k === "Ground")
                roadway = true
            if (k === "Rail")
                railway = true
        })
    }
    let country = data["Country"];
    let name = data["Name"]
    let code = data["@attributes"]["Code"]

    dataPortSend = {
        "Name": name,
        "magaya__Country": country,
        "magaya__Port_Code": code,
        "magaya__Airway": airway,
        "magaya__Railway": railway,
        "magaya__Roadway": roadway,
        "magaya__Waterway": waterway
    }

    return (dataPortSend);

}


//insertar el charge en el CRM mediante una funcion privada
/*async function insertChargeTypeCRM(chargeTypeJSON) {
    if (!_.isEmpty(chargeTypeJSON)) {
        let req_data = {}
        $.map(chargeTypeJSON, function(k, v) {
            insertRecordCRM("magaya__Charges_Type", k)
                .then(function(response) {
                    if (response[0].code === "SUCCESS") {
                        let idChargeType = response[0].details.id
                        ZOHO.CRM.API.getRecord({Entity:"magaya__Charges_Type",RecordID:idChargeType})
                        .then(function(data) {
                            let record = data.data
                            console.log("Record to added " , record)
                            message = " : New charge type added";
                            //actualizar el volumen
                            storeCrm.dispatch(addItemCrm(record))
                            //storeChargesCrm.dispatch(addChargesType(record))
                            storeSuccess.dispatch(addSuccess({message: message}))
                        })
                    } else {
                        codeError = "Error inserting new charge"
                        show = false;
                        module = 'Charge Type Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    }
                })

        })
    }
}

//insertar el charge en el CRM mediante una funcion privada
async function insertPortCRM(portJSON) {
    if (!_.isEmpty(portJSON)) {
        let req_data = {}
        $.map(portJSON, function(k, v) {
            insertRecordCRM("magaya__Ports", k)
                .then(function(response) {
                    if (response[0].code === "SUCCESS") {
                        let idPort = response[0].details.id
                        ZOHO.CRM.API.getRecord({Entity:"magaya__Ports",RecordID:idPort})
                        .then(function(data) {
                            let record = data.data
                            console.log("Record to added " , record)
                            message = " : New port added";
                            //actualizar el volumen
                            storeCrm.dispatch(addItemCrm(record))
                            //storeChargesCrm.dispatch(addChargesType(record))
                            storeSuccess.dispatch(addSuccess({message: message}))
                        })
                    } else {
                        codeError = "Error inserting new charge"
                        show = false;
                        module = 'Charge Type Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    }
                })

        })
    }
}*/

//function to insert all record from magaya to crm
async function insertMagayaRecordToCrm(recordJSON) {
    if (!_.isEmpty(recordJSON)) {
        Utils.blockUI()
        //get active module
        let currentModule = storeCurrentModule.getState().currentModule;
        let req_data = {}
        $.map(recordJSON, function(k, v) {
            insertRecordCRM(currentModule, k)
                .then(function(response) {
                    if (response[0].code === "SUCCESS") {
                        let idRecord = response[0].details.id
                        ZOHO.CRM.API.getRecord({Entity:currentModule,RecordID:idRecord})
                        .then(function(data) {
                            Utils.unblockUI()
                            let record = data.data
                            message = " : New record added";
                            storeCrm.dispatch(addItemCrm(record))
                            storeSuccess.dispatch(addSuccess({message: message}))
                        })
                    } else {
                        Utils.unblockUI()
                        codeError = "Error inserting new record"
                        show = false;
                        module = 'Charge Type Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    }
                })
                .catch(function(error) {
                    Utils.unblockUI()
                    codeError = 'Error inserting the record';
                    field = '';
                    show = false;
                    module = 'Items CRM'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                })


        })
    }
}

//get record by id
function getRecordById(moduleName, recordId) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.getRecord({Entity: moduleName, RecordID: recordId})
            .then(function(data) {
                resolve(data)
            })
    })
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


//insert record in CRM
function insertRecordCRM(module, data, trigger = '') {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.insertRecord({ "Entity": module, APIData: data, Trigger: [trigger] })
            .then(function(response) {
                resolve(response.data)
            })
    })
}


function getMagayaContent(content = 1) {
    switch (content) {
        case "getChargesDefinition": {
            getChargesDefinition()
            break;
        }

        case "GetWorkingPorts": {
            GetWorkingPorts()
            break;
        }

        default: {
            getChargesDefinition()
            break;
        }


    }

}
