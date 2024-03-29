//get object from magaya
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


function buildMagayaContentFromArray(content) {
    if (!_.isEmpty(content)) {
        $.map(content, function(k, v) {
            var content = `<li class="list-group-item" data-id="${v}">
                            <div class="form-check">
                            <input class="form-check-magaya" type="checkbox" value="">
                            </div>

                            ${k.Code}  ${k.Description}</li>`
            $("#sortable-magaya").append(content);
        })
    } else {
        $("#sortable-magaya").empty()
    }
}

//function getContent
function getContent(moduleNameCRM) {
    //code
    var dataForm = ''
    var dataModule = '';
    $("#form").empty();
    let data = getFieldsCRM(moduleNameCRM).then(r => {
        $("#form").empty();
        //always get field Name
        var type = "text";
        dataForm += `<label>Name</label><input type="text" name="Name" class="form-control" readonly/>`;
        $.each(r.fields, function(k, i) {
            //console.log(i);
            var field = i.api_name.indexOf("magaya__");
            //set html input type
            switch (i.json_type) {
                //case
                case "string":
                    type = "text";
                    break;
                case "integer":
                    type = "numeric";
                    break;
                default:
                    type = "string";
                    break
            }
            if (field >= 0) {
                dataForm += `<label>${i.api_name}</label><input type="${type}" name="${i.api_name}" class="form-control" readonly/>`
            }
        })

        //button send
        //hide edit button

        $(dataForm).appendTo("#form")
            //$(`<span class="btn btn-outline-success send">New</button><br />`).appendTo("#form")

    })

    let records = getAllRecordCRM(moduleNameCRM).then(r => {
        $("#sortable-crm").empty();
        if (!_.isEmpty(r)) {
            $.each(r, function(k, i) {
                i.Name = sanitize(i.Name)
                dataModule += ` <li class="list-group-item"><div class="sm"><i data-id="${i.id}" class="edit-data fa fa-eye"></i></div>${i.Name}</li>`
                    //dataModule += ` <li class="list-group-item"><div class="sm"></div>${i.Name}</li>`
            })
        } else {
            dataModule += ` <li class="list-group-item" >No Data</li>`

        }

        $(dataModule).appendTo("#sortable-crm")

    });
}


function getMagayaContent(magayaMethod = 'GetChargeDefinitions') {

    if (magayaMethod === 'GetChargeDefinitions') {
        var access_key = localStorage.getItem("access_key")
            //Magaya Users
        flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
        entity_type = MagayaAPI.ENTITY_TYPES.Customer
        dataCharge = {
            method: `${magayaMethod}`,
            data: [
                access_key
            ]
        }

        MagayaAPI.sendRequest(dataCharge, function(result) {
            if (_.isEmpty(result.data)) {
                Swal.fire({
                    title: "Error",
                    text: "Cant get data charges",
                    icon: 'error'
                })
            } else {
                $.map(result.data.ChargeDefinition, function(k, v) {
                    if (k.AccountDefinition.Type === "IN") {
                        var content = `<li class="list-group-item" data-id="${v}"> ${k.Code}  ${k.Description}</li>`
                        $("#sortable-magaya").append(content);
                        magayaCharges.push(k)
                    }

                })
            }
        });
    } else {
        $("#sortable-magaya").empty();
    }

}

$(".import-all-charges").click(function(e) {
    e.preventDefault();
    Swal.fire({
        title: "Confirm",
        text: "You are about load charges from Magaya, you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        cancelButtonColor: '#d33'

    }).then((result) => {

        if (result.isConfirmed) {
            if (!_.isEmpty(magayaCharges)) {
                //console.log("IMPORT ALL", magayaCharges);
                var module = "magaya__Charges_Type";
                var message = "";

                for (i = 0; i < magayaCharges.length; i++) {
                    var dataSend = chargeMagayaToCRM(magayaCharges[i]);
                    setTimeout((insertRecordCRM(module, dataSend)), 50)
                }
                getContent(moduleName);
                $("#error-alert").html("Work in progress...").css("display", "inline").fadeIn("slow").delay(5000).fadeOut("slow");


                /*$.map(magayaCharges, function(k, v) {
                    //inserting
                    var dataSend = chargeMagayaToCRM(k);
                    ///setInterval(function() { buildChargesData(k) }, 1700);
                    insertRecordCRM(module, dataSend).then(r => {
                        if (r[0]["code"] == "SUCCESS") {
                            message += `${k["AccountDefinition"]["Name"]} with code ${k["Code"]} created on CRM`

                        } else {
                            //draw again sortable
                            getContent(moduleName);
                            message += `Error inserting ${k["AccountDefinition"]["Name"]} with code ${k["Code"]} on CRM`
                        }
                        return message;
                    }).then(r => {
                        getContent(moduleName);

                    })

                })*/


            } else {
                $("#error-alert").html(`Can\'t get Charges from Magaya, please check is Magaya Service is Online`).css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");

            }
        }
    })
})
