var singleAccount = []
//get one charge
storeAccounts.subscribe(() => {
    let u = storeAccounts.getState();
    //console.log("State account now", u)
    singleAccount = u.singleAccount

    let accountQuote = u.quoteAccount
    //fill data address in quote
    if (!_.isEmpty(accountQuote)) {
        $("select[name=Account]").val(accountQuote.id)
    }

    //select rigth one on list
   // console.log("Id account in quote edit", accountQuote.id)
   let contacts = u.contactList;
   $("select[name=magaya__Representative]").empty();
   $("<option></option>").appendTo("select[name=magaya__Representative]");

   $.map(contacts, function(k, v) {
       $(`<option value="${k.id}">${k.Full_Name}</option>`).appendTo("select[name=magaya__Representative]")
   })

   let contact = u.singleContact
   if (!_.isEmpty(contact)) {
       let idContact = contact[0]["id"];
       $("select[name=magaya__Representative]").val(idContact)

       $.map(contact[0], function (k, v) {
            if (!_.isObject(v) && !v.includes("$")) {
               $(`input[name=${v}]`).val(k)
               $(`select[name=${v}]`).val(k)
            }
        })
    } else {
        $("input[name=Phone]").val("")
        $("input[name=Mobile]").val("")
        $("input[name=Email]").val("")
        $("input[name=Mailing_Street]").val("")
        $("input[name=Mailing_City]").val("")
        $("input[name=Mailing_State]").val("")
        $("input[name=Mailing_Country]").val("")
        $("input[name=Mailing_Zip]").val("")


    }



    let accountShipper = u.accountShipper;
    if (!_.isEmpty(accountShipper)) {
        $("select[name=magaya__Shipper]").val(accountShipper[0].id)
        $("input[name=magaya__ShipperCity]").val(accountShipper[0].Shipping_City)
        $("input[name=magaya__ShipperState").val(accountShipper[0].Shipping_State)
        $("input[name=magaya__ShipperCountry]").val(accountShipper[0].Shipping_Country)
        $("input[name=magaya__ShipperStreet]").val(accountShipper[0].Shipping_Street)
    }

    let accountConsignee = u.accountConsignee;
    if (!_.isEmpty(accountConsignee)) {
        $("select[name=magaya__Consignee]").val(accountConsignee[0].id)
        $("input[name=magaya__ConsigneeCity]").val(accountConsignee[0].Shipping_City)
        $("input[name=magaya__ConsigneeState").val(accountConsignee[0].Shipping_State)
        $("input[name=magaya__ConsigneeCountry]").val(accountConsignee[0].Shipping_Country)
        $("input[name=magaya__ConsigneeStreet]").val(accountConsignee[0].Shipping_Street)
    }


})
