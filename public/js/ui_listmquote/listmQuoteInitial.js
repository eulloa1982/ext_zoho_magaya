$(document).ready(function(){
    packageType = [];
    transpMethods = [];

    idmQuoteToEdit = 0;
    let page = 1;


    //try {
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        //Las 100 primeras mQuotes
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__SQuotes",sort_order:"desc",per_page:150,page:page})
            .then(function(data){
                let quotes = data.data;

                if (_.isEmpty(quotes)) {
                    let now = moment().format("YYYY-MM-DD T HH:mm:ss");
                    quotes = { "id": 1, "Name": "Quote Test", "magaya__Status": "Draft", "magaya__Description": "Do a new mquote, i'll gone", "Modified_Time": now }
                }
                //return all data quotes to initial statel
                return quotes

            })
            .then(function(quotes) {
                //sanitizer
                $.map(quotes, function(k, v) {
                    k.Name = sanitize(k.Name)
                    k.magaya__Status = sanitize(k.magaya__Status)
                    if (!_.isEmpty(k.Account)) {
                        k.Account.name = sanitize(k.Account.name)
                    }
                })
                storeQuote.dispatch(addQuote(quotes))
                Utils.unblockUI()
            })
        //Packages Types
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:120,page:1})
            .then(function(data){
                $("#select-package").empty();
                $.map (data.data, function (k, i){
                    k.Name = sanitize(k.Name)
                    //$("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#new-item select[name=Name]");
                    $("#new-item select[name=Name]").append("<option value='"+i+"'>"+k.Name+"</option>");
                    packageType.push(k);
                })
            })

        //get current user
        ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
            $.map (data.users, function (k, i) {
                currentUser = k.full_name;
                //$(":input[name=magaya__IssuedByName]").val(k.full_name);
                $(":input[name=magaya__IssuedByName]").val(k.full_name);
            })

        });

        ZOHO.CRM.API.getAllRecords({Entity: "Accounts", sort_order: "asc"})
            .then(function(response){
                $.map (response.data, function (k, i) {
                    var accountId = k.id;
                    k.Account_Name = sanitize(k.Account_Name)
                    if (k.magaya__mEntityType === "Carrier") {
                        $(`<option value='${k.Account_Name}'>${k.Account_Name}</option>`).appendTo("select[name=magaya__Carrier]");

                    } else {
                        $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=Account]");
                        $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=magaya__Shipper]");
                        $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=magaya__ConsigneeName]");

                    }
                })
                storeAccounts.dispatch(addAccount(response.data))
            })

        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Employees", sort_order: "asc"})
            .then(function(response){
                $.map (response.data, function (k, i) {
                    console.log(k)
                    $(`<option value='${k.Name}'>${k.Name}</option>`).appendTo("select[name=magaya__Employee]");

                    if (k.magaya__Is_Salesperson) {

                        $(`<option value="${k.Name}">${k.Name}</option>`).appendTo("select[name=magaya__Seller]");

                    }
                })
                storeAccounts.dispatch(addAccount(response.data))
            })

        ZOHO.CRM.API.getAllRecords({Entity: "Contacts", sort_order: "asc"})
            .then(function(response){
                storeAccounts.dispatch(addContact(response.data))
            })


        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Ports"})
            .then(function(response){
                storePorts.dispatch(addPorts(response.data))

            })

        //get all records of the given module
        ZOHO.CRM.API.getAllRecords({Entity: "Deals", sort_order: "asc"})
            .then(function(response){
                let deals = response.data
                $.map (response.data, function (k, i) {
                    k.Deal_Name = sanitize(k.Deal_Name)
                    $(`<option value='${k.id}'>${k.Deal_Name}</option>`).appendTo("select[name=Deal]");

                })
                return deals
            }).then(function (k) {
                storeDeal.dispatch(addDeal(k))
            })

        //get all transports methods
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__TransportationMethods", sort_order: "asc"})
            .then(function(response){
                $.map (response.data, function (k, i) {
                    k.Name = sanitize(k.Name)
                    $("<option value='"+k.id+"'>"+k.Name+"</option>").appendTo("select[name=magaya__TransportationMode]");
                    transpMethods.push (k);
                })
            })

        //Charges Type
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
            .then(function (response) {

                if (!_.isEmpty (response.data)) {
                    storeChargesType.dispatch(addChargeType (response.data))
                    $.map(response.data, function (k, i) {

                        k.magaya__ChargesCode = sanitize(k.magaya__ChargesCode)
                        k.Name = sanitize(k.Name)
                        $(`<option value="${k.magaya__ChargesCode}">${k.Name}</option>`).appendTo("select[name=magaya__ChargeCode]");

                    })
                }

            })

        //Charges Type
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Taxes", sort_order: "asc"})
            .then(function (response) {
                storeChargesType.dispatch(addChargeType(response.data))
                if (!_.isEmpty (response.data)) {
                    $.map(response.data, function (k, i) {
                        k.magaya__Tax_Rate = sanitize(k.magaya__Tax_Rate)
                        k.Name = sanitize(k.Name)
                        $(`<option value="${k.magaya__Tax_Rate0}">${k.Name}</option>`).appendTo("select[name=magaya__TaxCode]");

                    })
                }
            })

        //organization data
        ZOHO.CRM.CONFIG.getOrgInfo().then(function(data){
            let orgData = data.org[0]
            localStorage.setItem('organization', JSON.stringify(orgData))
        });

    });


    ZOHO.embeddedApp.init()

/*}
catch {
    console.log("Error")
}*/
if (_.isEmpty(packageType)) {
    console.log("You probably have not zoho content")
}

})


//check if magaya is available
//ping('98.211.167.16', '3691')
