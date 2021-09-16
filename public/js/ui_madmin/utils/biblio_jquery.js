//get charges definition
async function getChargesDefinition() {
   //get login magaya variables
    let data = await getMagayaVariables()

    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.ENTITY_TYPES.Customer
    dataCharge = {
        method: "GetChargeDefinitions",
        data: [
            data["network_id"]
        ]
    }

    MagayaAPI.sendRequest(dataCharge, function(result) {
        if (!_.isEmpty(result.data)) {
            storeChargesDef.dispatch(addChargesDef(result.data.ChargeDefinition))
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
    var code = data["Code"];
    var name = data["AccountDefinition"]["Name"];
    var accountDeftype = data["AccountDefinition"]["Type"];
    var description = data["Description"];
    var type = data["Type"];

    dataChargeSend = {
        "Name": description,
        "magaya__ChargesCode": code,
        "magaya__AccountDefinitionType": accountDeftype,
        "magaya__Type": type,
        "magaya__AccountDefinitionDescription": name
    }

    return (dataChargeSend);

}


//insertar el charge en el CRM mediante una funcion privada
async function insertChargeTypeCRM(chargeTypeJSON) {
    if (!_.isEmpty(chargeTypeJSON)) {
        let req_data = {}
        $.map(chargeTypeJSON, function(k, v) {
            req_data = {
                "magaya__ChargesCode":k.magaya__ChargesCode, "Name":k["Name"]
             };

             console.log("charge to send" , req_data)
             let result = insertCharge(req_data).then(r => {
                if (r.output === "1"){
                    dataError = "error.data";
                    codeError = "error.code"
                    show = true;
                    field = '';
                    module = 'Charge Type Items'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))


                } else {
                    message = " : Item Deleted!!";
                    //actualizar el volumen
                    storeChargesCrm.dispatch(addChargesType({...req_data}))
                    storeSuccess.dispatch(addSuccess({message: message}))
                }


                console.log("Ïnserted ", r)
            })
        })


    }


    //let result = await insertCharge(req_data).then(r => {
    //    storeChargesCrm.dispatch(addChargesType({...req_data}))
      //  console.log(r)
    //});



}


//insertar el cargo
async function insertCharge(charge) {
    return new Promise(function(resolve, reject) {
        var func_name = "magaya__CheckChargeType";

        ZOHO.CRM.FUNCTIONS.execute(func_name, charge)
            .then(function (data) {
                resolve(data.details)
            })
            .catch(function(error) {
                reject()
            })
    })
}
