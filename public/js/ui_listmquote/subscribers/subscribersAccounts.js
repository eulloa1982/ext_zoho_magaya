var singleAccount = []
//get one charge
storeAccounts.subscribe(() => {
    let u = storeAccounts.getState();
    singleAccount = u.singleAccount
    let accountQuote = u.quoteAccount
    //fill data address in quote
    if (!_.isEmpty(accountQuote)) {
        $.map(accountQuote, function (k, v) {
            if (!_.isObject(v) && !v.includes("$")) {
                $(`input[name=${v}]`).val(k)
                $(`select[name=${v}]`).val(k)
            }
        })
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
       $("input[name=magaya__ContactPhone]").val(contact[0]["Phone"])
       $("input[name=magaya__ContactEmail]").val(contact[0]["Email"])
       $("input[name=magaya__ContactMobile]").val(contact[0]["Mobile"])
   }


    let accountShipper = storeAccounts.getState().accountShipper;
    if (!_.isEmpty(accountShipper)) {
        $("input[name=Shipper_City]").val(accountShipper[0].Shipping_City)
        $("input[name=Shipper_State").val(accountShipper[0].Shipping_State)
        $("input[name=Shipper_Country]").val(accountShipper[0].Shipping_Country)
        $("input[name=Shipper_Street]").val(accountShipper[0].Shipping_Street)
    }

    let accountConsignee = storeAccounts.getState().accountConsignee;
    if (!_.isEmpty(accountConsignee)) {
        $("input[name=Consignee_City]").val(accountConsignee[0].Shipping_City)
        $("input[name=Consignee_State").val(accountConsignee[0].Shipping_State)
        $("input[name=Consignee_Country]").val(accountConsignee[0].Shipping_Country)
        $("input[name=Consignee_Street]").val(accountConsignee[0].Shipping_Street)
    }
   //get all accounts
   //let accounts = u.allAccounts
   /*if (!_.isEmpty(u.allAccounts)) {
       $("select[name=Account]").empty()
       $(`<option></option>`).appendTo("select[name=Account]")

       $.map(u.allAccounts, function(k, v) {
            if (!_.isEmpty(k.magaya__mEntityType) && k.magaya__mEntityType.trim() === "Customer")
                $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=Account]")
       })
   }*/

})






