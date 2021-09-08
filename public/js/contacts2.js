//import all magaya customers into Account CRM
$(".import-all-customers").click(function(e) {
    e.preventDefault();
    Swal.fire({
        title: "Confirm",
        text: "You are about to import all customers to CRM, please confirm?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        cancelButtonColor: '#d33'

    }).then((result) => {

        if (result.isConfirmed) {
            if (!_.isEmpty(MagayaUsers)) {

                $("#error-alert").html(`Starting, please wait....`)
                    .css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");

                c = sendAllCustomerMagaya2CRM().then(r => {
                    $("#error-alert").html(`Proccess is done`)
                        .css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");
                    drawContactsCRM();
                });
                //note the proccess is done

            } else {
                $("#error-alert").html(`Not found Magaya Customers, please check if Magaya is Online`)
                    .css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");

            }

        }
    });
})

//new account on crm
$(".contact > .fa-plus").click(function() {
    $("#account-form")[0].reset();
    $("#new-account").show();
    $("#edit-account").hide();
    $("#edit-contact").modal();
})

/*********************************************************************
 ************* SORTABLES BIND DINAMIC UL LI ***************************
 ************* *******************************************************
 ************* ********************************************************/
$('#sortable3').bind("DOMSubtreeModified", function() {
    //select li at click
    $(".delete-from-crm").show();
    $(".send-to-magaya").show();
    //delete Contact from CRM
    $(".delete-from-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
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
                moduleName = "Accounts";
                message = ''
                $("input[class=form-check-input-contact-crm]:checked").each(function(k) {
                    parent = $(this).closest('li');
                    id = parent.attr("data-id");
                    deleteDataCRM(moduleName, id).then(r => {
                        if (r["code"] == "SUCCESS") {
                            //message += `Deleting record ${i} "SUCCESS"<br />`
                        } else {
                            //message += `Deleting record ${i} "ERROR"<br />`
                        }
                    })
                })

                Swal.fire({
                    title: 'Success',
                    html: "Operation successfull",
                    //text: message,
                    icon: 'success',
                    allowOutsideClick: false
                }).then(function() {
                    $("#sortable3").empty();
                    drawContactsCRM();
                })
            }
        });
    });

    //send records to magaya, setEntity method
    $(".send-to-magaya").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Swal.fire({
            title: "Confirm",
            text: "You are about to send records to Magaya, you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            cancelButtonColor: '#d33'

        }).then((result) => {
            if (result.isConfirmed) {
                moduleName = "Accounts";
                message = '';

                $("input[class=form-check-input-contact-crm]:checked").each(function(k) {

                    var parent = $(this).closest('li');
                    var idAccount = parent.attr("data-id");
                    var magayaGuid = parent.attr("data-magayaGuid");

                    var checking = MagayaUsers.findIndex(i => i["@attributes"]["GUID"] === magayaGuid);
                    var id = accounts.findIndex(i => i["id"] == idAccount);

                    if (checking >= 0) {
                        $("#error-alert").html(`Editing ${accounts[id]['Account_Name']}, with email ${accounts[id]['magaya__MagayaEmail']}`)
                            .css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");
                    }
                    sleep(800).then(function() {
                        createCustomerCRMtoMagaya(accounts[id])
                    })
                });
            } else {
                drawContactsCRM();
            }
        })
    })

    //show info on dblclick event
    //$("#sortable3 li").dblclick(function(e) {
    $(".view-account-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#info").empty();
        var parent = $(this).closest('li');
        var idQuote = parent.attr("data-id");
        var idMagaya = parent.attr("data-magayaguid");
        $("#customer").empty();
        $("#account").empty();

        //find id in Array
        var idAccount = accounts.findIndex(i => i.id == idQuote);
        var idCustomer = MagayaUsers.findIndex(i => i['@attributes']['GUID'] === idMagaya);

        drawTableSameRecords(accounts[idAccount], MagayaUsers[idCustomer]);

        $("#show-contact-customer").modal();
    })


    //select magaya record with equal GUID on click event
    $("#sortable3 li").dblclick(function(e) {
        $("#sortable3 li").removeClass("animado")
        $("#sortable4 li").removeClass("animado")
        e.preventDefault();
        e.stopImmediatePropagation();

        var parent = $(this).closest('li');
        var idMagayaGuidCRM = parent.attr("data-magayaguid");
        //get magaya record
        //find Magaya User in Array
        var idMagayaCustomer = MagayaUsers.findIndex(i => i['@attributes']['GUID'] == idMagayaGuidCRM);
        var idCrmAccount = accounts.findIndex(i => i["magaya__MagayaGUID"] == idMagayaGuidCRM);
        //get +1 to select rigth one
        idLi = idMagayaCustomer + 1;
        $("#sortable4 li:nth-child(" + idLi + ")").addClass("animado")

    })


    //edit option
    $("#sortable3 li > .fa-edit").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#new-account").hide();
        $("#edit-account").show();
        //$("#AccountForm").empty();

        var parent = $(this).closest('li');
        var idAccount = parent.attr("data-id");
        var idArrayAccount = accounts.findIndex(i => i["id"] == idAccount);

        $("#account-form input[name=id]").val(accounts[idArrayAccount]['id']);
        $.each(accounts[idArrayAccount], function(k, v) {

            field = k;
            value = v;
            //locate field
            if (!k.includes('$')) {
                $("input[name=" + k + "]").val(v);
            }
        })

        $("#edit-contact").modal();
    })

    /////////////////////////////////////////////////////////////
    //////// insert new account
    /////////////////////////////////////////////////////////////
    $("#new-account").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var data = {};
        var a = $("#account-form").serializeArray();
        console.log("Filtrando carecteres y espacio")

        $.each(a, function() {
            if (data[this.name]) {
                if (!data[this.name].push) {
                    data[this.name] = sanitize([data[this.name]]);
                }
                data[this.name].push(sanitize(this.value) || '');
            } else {
                data[this.name] = sanitize(this.value) || '';
            }
        });

        //$('#output').text($.sanitize($input));
        //var config = { APIData: data }
        //Object.assign(config, { Entity: "Accounts" });
        insertRecordCRM("Accounts", data, "workflow").then(r => {
            if (r[0]['code'] == "SUCCESS") {
                Swal.fire({
                    title: 'Success',
                    text: 'Operation success',
                    icon: 'success',
                    allowOutsideClick: false
                }).then(function() {
                    $("#sortable3").empty();
                    $("#sortable4").empty();
                    drawContactsCRM();
                    drawCustomersMagaya();

                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Operation error!!',
                    icon: 'error',
                    allowOutsideClick: false
                })
            }
        })
    })

    ////////////////////////////////////////////////////////////////////
    ////////////////edit an account
    ////////////////////////////////////////////////////////////////////
    $("#edit-account").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var data = {};
        var a = $("#account-form").serializeArray();
        $.each(a, function() {
            if (data[this.name]) {
                if (!data[this.name].push) {
                    data[this.name] = sanitize([data[this.name]]);
                }
                data[this.name].push(sanitize(this.value) || '');
            } else {
                data[this.name] = sanitize(this.value) || '';
            }
        });
        var config = { APIData: data }
        Object.assign(config, { Entity: "Accounts" });

        ZOHO.CRM.API.updateRecord(config)
            .then(function(response) {
                var code = '';
                $.map(response.data, function(k) {
                        code = k['code'];
                    })
                    //code = result['code']
                if (code === 'SUCCESS') {
                    Swal.fire({
                        title: 'Success',
                        html: "Record update successfully!!",
                        icon: 'success',
                        allowOutsideClick: false
                    }).then(function() {
                        $("#sortable3").empty();
                        $("#sortable4").empty();
                        drawContactsCRM();
                        drawCustomersMagaya();
                    })
                }
            })
    })


    /////////////////////////////////////////////////////
    //////// copy billing address to shipping address
    //////// and viceversa
    ///////////////////////////////////////////////////////
    $(".addresstoshipping").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("input[name=Shipping_City]").val($("input[name=Billing_City]").val())
        $("input[name=Shipping_Code]").val($("input[name=Billing_Code]").val())
        $("input[name=Shipping_Country]").val($("input[name=Billing_Country]").val())
        $("input[name=Shipping_State]").val($("input[name=Billing_State]").val())
        $("input[name=Shipping_Street]").val($("input[name=Billing_Street]").val())
    })

    $(".shippingtoaddress").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("input[name=Billing_City]").val($("input[name=Shipping_City]").val())
        $("input[name=Billing_Code]").val($("input[name=Shipping_Code]").val())
        $("input[name=Billing_Country]").val($("input[name=Shipping_Country]").val())
        $("input[name=Billing_State]").val($("input[name=Shipping_State]").val())
        $("input[name=Billing_Street]").val($("input[name=Shipping_Street]").val())
    })

});



/***************************************************
 * **** magaya sortable1 dinamic interfaz *************
 **** ***********************************************/
$('#sortable4').bind("DOMSubtreeModified", function() {
    $(".delete-from-magaya").show();
    $(".send-to-crm").show();
    //view details
    $(".view-customer-magaya").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var parent = $(this).closest('li');
        var idQuote = parent.attr("data-id");
        $("#info").empty();
        var idCustomer = MagayaUsers.findIndex(i => i["@attributes"]["GUID"] == idQuote);
        var idAccount = accounts.findIndex(i => i["magaya__MagayaGUID"] == idQuote);

        $("#customer").empty();
        $("#account").empty();

        drawTableSameRecords(accounts[idAccount], MagayaUsers[idCustomer]);

        $("#show-contact-customer").modal();
    })


    $(".delete-from-magaya").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
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
                typeC = MagayaAPI.TRANSACTION_TYPES.Client;

                $("input[class=form-check-input-customer-magaya]:checked").each(function(k) {
                    parent = $(this).closest('li');
                    guid = parent.attr("data-id");

                    dataCustomer = {
                        method: 'DeleteTransaction',
                        data: [
                            Utils.getAccessKey(),
                            typeC,
                            guid
                        ]
                    }

                    MagayaAPI.sendRequest(dataCustomer, function(result) {
                            if (result.error !== "no_error") {
                                Swal.fire({
                                    title: result.error,
                                    text: result.data,
                                    icon: 'error',
                                    allowOutsideClick: false
                                });

                            } else {
                                Swal.fire({
                                    title: "Success",
                                    text: "Record Deleted",
                                    icon: 'success'
                                }).then(function() {
                                    $("#sortable4").empty();
                                    drawCustomersMagaya();
                                });
                            } //else magayaApi
                        }) //magaya api*/
                })
            }
        })
    })
    var message = "";
    var guid = 0;
    $(".send-to-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var guidsArray = new Array();

        $(".selected-magaya").each(function() {
            guid = $(this).attr("data-id");
            idArray = $(this).attr("data-idArray");

            userMagaya = MagayaUsers[idArray];
            guidChecking = contacts.findIndex(i => i["magaya__MagayaGUID"] === userMagaya["@attributes"]["GUID"]);
            emailChecking = contacts.findIndex(i => i["Email"] === userMagaya["Email"])
            if ((guidChecking >= 0) || (emailChecking >= 0)) {
                Swal.fire({
                    title: 'Error',
                    text: `Cant import user ${userMagaya["Name"]} to CRM, eigther magaya Guid or Email already exists`,
                    icon: 'error',
                    allowOutsideClick: false
                }).then(function() {
                    $("#sortable3").empty();
                    drawContactsCRM();
                })
            }
        });

        /*$.each (guidsArray, function (k, v) {
            userMagaya = MagayaUsers[v['idArray']];
            message = ''
            dataSend = setUserMagaya2CRM(userMagaya);
            var guid = dataSend["magaya__MagayaGUID"];

            checkUserByGUID(guid).then (r => {
                if (!_.isEmpty(r.data)) {
                    message += `User ${dataSend["First_Name"]} ${dataSend["Last_Name"]} already exists on CRM<br />`

                } else {
                    insertRecordCRM("Contacts", dataSend)
                        .then (r => {
                            message += r[0]["code"] + ` importing user ${dataSend["First_Name"]} ${dataSend["Last_Name"]}<br />`;

                        }).then (r => {
                            Swal.fire({
                                title: "Info",
                                html: message,
                                icon: 'info'
                            })
                            $("#sortable3").empty();
                            drawContactsCRM();
                        })

                    $("#sortable3").empty();
                    drawContactsCRM();
                }
            });
        });*/
        $("#sortable3").empty();
        drawContactsCRM();
        //userMagaya = MagayaUsers[idContact];
        //dataSend = setUserMagaya2CRM(userMagaya);

    });

    //highligth same Account on event click
    $("#sortable4 li").dblclick(function(e) {
        $("#sortable3 li").removeClass("animado")
        $("#sortable4 li").removeClass("animado")
        e.preventDefault();
        e.stopImmediatePropagation();
        var parent = $(this).closest('li');
        var idCrmGuidMagaya = parent.attr("data-id");
        //get magaya record
        //find id in Array
        var id = accounts.findIndex(i => i['magaya__MagayaGUID'] == idCrmGuidMagaya);
        //get +1 to select correct one
        idLi = id + 1;
        $("#sortable3 li:nth-child(" + idLi + ")").addClass("animado")
    })

});

/***************************************************************************
 *************  END BIND ON SORTABLES **************************************
 *************  **************************************************************
 *************  **************************************************************/

/********************************************************************************
 *************** SORTABLES CONFIGURATION CUSTOMER AND CONTACTS *****************
 *************** *****************************************************************
 *************** *****************************************************************/

/*************************************************************************
 * *********** sortable customers ****************************************
 **************************************************************************/
$("#sortable4").sortable({
    connectWith: ".connectedSortable",
    remove: function(event, ui) {
        $("#sortable3").prepend(ui.item.clone())
        $(this).sortable('cancel');
    },
    receive: function(event, ui) {
            data = ui.item;

            $.map(data, function(k) {
                idMagayaAccount = k["attributes"]["data-magayaGuid"]["nodeValue"];
                idAccount = k["attributes"]["data-id"]["nodeValue"];
            });
            //get user in account array
            var checking = MagayaUsers.findIndex(i => i["@attributes"]["GUID"] === idMagayaAccount);
            var id = accounts.findIndex(i => i["id"] == idAccount);

            if (checking >= 0) {
                $("#error-alert").html(`Editing ${accounts[id]['Account_Name']}, with email ${accounts[id]['magaya__MagayaEmail']}`)
                    .css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");
            }
            createCustomerCRMtoMagaya(accounts[id])


        } //receive
});

/**********************************************************************
 * **************** sortable accounts ********************************
 ***********************************************************************/
$("#sortable3").sortable({
    connectWith: ".connectedSortable",
    remove: function(event, ui) {
        $("#sortable4").prepend(ui.item.clone())
        $(this).sortable('cancel');
    },
    receive: function(event, ui) {
        data = ui.item;
        $.map(data, function(k) {
            idContact = k["attributes"]["data-idArray"]["nodeValue"];
        });
        userMagaya = MagayaUsers[idContact];
        guidChecking = accounts.findIndex(i => i["magaya__MagayaGUID"] === userMagaya["@attributes"]["GUID"]);
        emailChecking = accounts.findIndex(i => i["magaya__MagayaEmail"] === userMagaya["Email"])

        if ((guidChecking >= 0) || (emailChecking >= 0)) {
            //updating
            var id = accounts[guidChecking]["id"];
            if (userMagaya['Email'] !== 'null' || JSON.stringify(userMagaya['Email']).length > 7) {
                var config = {
                    Entity: "Accounts",
                    APIData: {
                        "id": id,
                        "magaya__MagayaEmail": userMagaya['Email'],
                        "magaya__MagayaGUID": userMagaya["@attributes"]["GUID"]
                    },
                    Trigger: []
                }

                ZOHO.CRM.API.updateRecord(config)
                    .then(function(response) {
                        var code = '';
                        $.map(response.data, function(k) {
                                code = k['code'];
                            })
                            //code = result['code']
                        if (code === 'SUCCESS') {
                            Swal.fire({
                                title: 'Success',
                                html: "Record update successfully!!",
                                icon: 'success',
                                allowOutsideClick: false
                            }).then(function() {
                                $("#sortable3").empty();
                                drawContactsCRM();
                            })
                        } else {
                            Swal.fire({
                                title: 'Warning',
                                html: "An error ocurred",
                                icon: 'warning',
                                allowOutsideClick: false
                            }).then(function() {
                                $("#sortable3").empty();
                                $("#sortable4").empty();
                                drawCustomersMagaya();
                                drawContactsCRM();
                            })
                        }
                    })
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Cant't import Account without a valid email",
                    icon: 'error'
                })
            }

        } else {
            dataSend = setUserMagaya2CRM(userMagaya);
            insertRecordCRM("Accounts", dataSend).then(r => {
                Swal.fire({
                    title: "Info",
                    text: "Succesfully import customer to CRM",
                    icon: 'info'
                })
                $("#sortable3").empty();
                drawContactsCRM();
            })

        }
    }
});
/***********************************************************************
 *    ************* END CONFIGURATION SORTABLES *************************
 *    ************* ****************************************************/



/*************************************************************************
 ******************** HELPER FUNCTIONS ***********************************
 ******************** ****************************************************/

//set json data from magaya customers array
function setUserMagaya2CRM(dataMagayaArray) {

    if (!_.isEmpty(dataMagayaArray)) {
        //get field Name, must to be split to First_Name Last_Name
        var dataAppend = {};
        var dataSend = {
            "magaya__MagayaGUID": dataMagayaArray["@attributes"]["GUID"],
            "Account_Name": dataMagayaArray["Name"],
            "magaya__MagayaEmail": dataMagayaArray["Email"],
            "Phone": dataMagayaArray["Phone"],
            "Website": dataMagayaArray["Website"],

        }

        if (!_.isEmpty(dataMagayaArray["BillingAddress"])) {
            var dataAppend = {
                "Billing_City": dataMagayaArray["BillingAddress"]["City"],
                "Billing_Code": dataMagayaArray["BillingAddress"]["ZipCode"],
                "Billing_Country": dataMagayaArray["BillingAddress"]["Country"],
                "Billing_State": dataMagayaArray["BillingAddress"]["State"],
                "Billing_Street": dataMagayaArray["BillingAddress"]["Street"]
            }

            Object.assign(dataSend, dataAppend);
        }

        if (!_.isEmpty(dataMagayaArray["OtherAddresses"])) {
            var dataAppend = {
                "Shipping_City": dataMagayaArray["OtherAddresses"]["Address"]["City"],
                "Shipping_Street": dataMagayaArray["OtherAddresses"]["Address"]["Street"]
            }

            Object.assign(dataSend, dataAppend);
        }
        return dataSend;
    }
}

//draw contact on sortable list
function drawContactsCRM() {
    accounts = []
    ZOHO.CRM.API.getAllRecords({ Entity: "Accounts", sort_order: "asc" })
        .then(function(response) {
            $.map(response.data, function(k, i) {
                //contacts.push(k);
                accounts.push(k)
                k.Account_Name = sanitize(k.Account_Name)
                k.magaya__MagayaGUID = sanitize(k.magaya__MagayaGUID)
                $("#sortable3").append(`<li class="list-group-item" data-magayaGuid="${k.magaya__MagayaGUID}" data-id="${k.id}">
                                       <input class="form-check-input-contact-crm" type="checkbox" value="">
                                       <button class="btn btn-sm view-account-crm"><i class="fa fa-eye"></i></button>

                                       <i class="far fa-edit"></i>
                                       ${k.Account_Name}  (${k.magaya__MagayaEmail})</li>`)

                                       $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=quotation-for-accounts]");
                                       $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ShipperName]");
                                       $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ConsigneeName]");


            })
        })

}


async function checkUser(GUID, Email) {
    data = await checkUserByGUID(GUID, Email);
    if (_.isEmpty(data.data)) {
        return true;
    } else return false;
}


//check if an user from magaya exists on CRM
function checkUserByGUID(GUID, Email) {
    return new Promise(function(resolve, reject) {
        ZOHO.CRM.API.searchRecord({ Entity: "Contacts", Type: "criteria", Query: "((magaya__MagayaGUID:equals:'" + GUID + "')or(Email:equals:'" + Email + "'))" })
            .then(function(data) {
                resolve(data);
            })
    })

}


//get customer from magaya
function drawCustomersMagaya() {
    flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
    entity_type = MagayaAPI.ENTITY_TYPES.Customer
    data = {
        method: 'GetEntitiesOfType',
        data: [
            Utils.getAccessKey(),
            flags,
            '',
            entity_type
        ]
    }
    MagayaAPI.sendRequest(data, function(result) {
        if (result.error) {
            $("#no-configuration-alert").show();
        } else {
            var i = 0;
            MagayaUsers = [];
            $.map(result.data.Client, function(k, v) {
                MagayaUsers.push(k)
                var content = `<li class="list-group-item" data-id="${k["@attributes"]["GUID"]}" data-idArray="${i}">
                               <input class="form-check-input-customer-magaya" type="checkbox" value="">
                               <button class="btn btn-sm view-customer-magaya"><i class="fa fa-eye"></i></button>
                               ${k.Name} (${k.Email})</li>`
                i++;
                $("#sortable4").append(content);
            })
        }
    })

}

/****************************************************
 * **** send all magaya customers to CRM contacts
 ***************************************************/
async function sendAllCustomerMagaya2CRM() {
    return new Promise(function(resolve, reject) {
        var message = '';
        $.each(MagayaUsers, function(k, v) {
            //check email and guid
            emailChecking = accounts.findIndex(i => i["magaya__MagayaEmail"] === v.Email);
            guidChecking = accounts.findIndex(i => i["magaya__MagayaGUID"] === v['magaya__MagayaGUID']);

            if (emailChecking < 0 && guidChecking < 0) {
                if (v["Email"] === null || v["Email"] === undefined) {
                    var randomString = generateRandomString();
                    v["Email"] = randomString + "@mail-magaya.com"
                }

                //sleep 300 mls, then insert the record
                sleep(300).then(function() {
                    data = setUserMagaya2CRM(v);
                    insert = insertRecordCRM("Accounts", data).then(r => {
                        message += r;
                    })
                })

            } else {
                message += `Can't import <strong>${v.Name}</strong>, eigther Email (${v.Email}) or Magaya GUID (${v["@attributes"]["GUID"]}) exists on CRM already <br />`;
            }

            Swal.fire({
                title: 'Info',
                html: `Process done!!<br /> ${message}`,
                icon: 'info',
                allowOutsideClick: false
            }).then(function() {
                drawContactsCRM();
            })

            resolve(message);
        });
    })

}


//sleep
function sleep(ms) {
    return (
        new Promise(function(resolve, reject) {
            setTimeout(function() { resolve(); }, ms);
        })
    );
}


//create new customer from CRM Account
function createCustomerCRMtoMagaya(dataAccount) {
    if (!_.isEmpty(dataAccount)) {
        //get this var from CRM var
        //tomar de la variable de CRM el magaya url
        var magaya_url = localStorage.getItem('url');
        var endpoint = `https://zohomagaya.herokuapp.com/createCustomer?url=${magaya_url}&data%5B%5D=96101&data%5B%5D=524288&contactData%5BName%5D=${dataAccount['Account_Name']}&contactData%5BAttribute_GUID%5D=${dataAccount['magaya__MagayaGUID']}&contactData%5BEmail%5D=${dataAccount['magaya__MagayaEmail']}&contactData%5BPhone%5D=${dataAccount['Phone']}&contactData%5BAccountNumber%5D=${dataAccount['Account_Number']}&contactData%5BNotes%5D=${dataAccount['Description']}&contactData%5BFax%5D=${dataAccount['Fax']}&contactData%5BWebsite%5D=${dataAccount['Website']}&contactData%5BBillingAddress%5D%5BStreet%5D=${dataAccount['Billing_Street']}&contactData%5BBillingAddress%5D%5BCity%5D=${dataAccount['Billing_City']}&contactData%5BBillingAddress%5D%5BState%5D=${dataAccount['Billing_State']}&contactData%5BBillingAddress%5D%5BZipCode%5D=${dataAccount['Billing_Code']}&contactData%5BBillingAddress%5D%5BCountry%5D=${dataAccount['Billing_Country']}&contactData%5BAddress%5D%5BStreet%5D=${dataAccount['Shipping_Street']}&contactData%5BAddress%5D%5BCity%5D=${dataAccount['Shipping_City']}&contactData%5BAddress%5D%5BState%5D=${dataAccount['Shipping_State']}&contactData%5BAddress%5D%5BZipCode%5D=${dataAccount['Shipping_Code']}&contactData%5BAddress%5D%5BCountry%5D=${dataAccount['Shipping_Country']}`;
            //var endpoint = `https://zohomagaya.herokuapp.com/createCustomer?data%5B%5D=96101&data%5B%5D=524288&contactData%5BName%5D=${dataAccount['Account_Name']}&contactData%5BAttribute_ID%5D=${dataAccount['magaya__MagayaGUID']}&contactData%5BEmail%5D=${dataAccount['magaya__MagayaEmail']}&contactData%5BPhone%5D=${dataAccount['Phone']}&contactData%5BAccountNumber%5D=${dataAccount['Account_Number']}&contactData%5BNotes%5D=${dataAccount['Description']}&contactData%5BFax%5D=${dataAccount['Fax']}&contactData%5BWebsite%5D=${dataAccount['Website']}&url=${magaya_url}`;
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
                magayaGuid = data;
                if (magayaGuid != 0 && magayaGuid !== 'null') {
                    var config = {
                        Entity: "Accounts",
                        APIData: {
                            "id": `${dataAccount['id']}`,
                            "magaya__MagayaGUID": magayaGuid
                        },
                        Trigger: []
                    }

                    ZOHO.CRM.API.updateRecord(config)
                        .then(function(data) {
                            var code = "ERROR";
                            $.map(data.data, function(k) {
                                code = k.code;
                            })

                            if (code === 'SUCCESS') {
                                Swal.fire({
                                    title: 'Success',
                                    html: "Record update successfully!!",
                                    icon: 'success',
                                    allowOutsideClick: false
                                }).then(function() {
                                    $("#sortable3").empty();
                                    $("#sortable4").empty();
                                    drawCustomersMagaya();
                                    drawContactsCRM();
                                })
                            } else {
                                Swal.fire({
                                    title: 'Warning',
                                    html: "An error ocurred",
                                    icon: 'warning',
                                    allowOutsideClick: false
                                }).then(function() {
                                    $("#sortable3").empty();
                                    $("#sortable4").empty();
                                    drawCustomersMagaya();
                                    drawContactsCRM();
                                })
                            }
                        })
                }


            })
    }

}


////////////////////////////////////////////////////////
////////// check if an account has customer on magaya
////////// @parameter idAccount  - crm id Account
///////////////////////////////////////////////////////
function checkCustomerOnMagaya(account = 0) {

    const idAccount = account;
    if (idAccount > 0 && idAccount !== NaN) {
        //find customer in accounts Array
        var magayaGuid = 0;
        var customerIndex = 0;
        var guidChecking = accounts.findIndex(i => i["id"] == idAccount);
        if (guidChecking >= 0) {
            magayaGuid = sanitize(accounts[guidChecking]["magaya__MagayaGUID"])
                //get customer
            customerIndex = MagayaUsers.findIndex(i => i["@attributes"]["GUID"] === magayaGuid);
            if (customerIndex >= 0)
                return true;

            return false;
        }

        return false;
    }
}


//generate random string to construct email
const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(36).substring(0, num);
    return result1;
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
            return input.replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '').replace(/[^a-zA-Z0-9]/g, ' ');
       }
	};
