var singleAccount = []
//get one charge
storeAccounts.subscribe(() => {
    let u = storeAccounts.getState();
    console.log("State account now", u)
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

   }


    let accountShipper = u.accountShipper;
    if (!_.isEmpty(accountShipper)) {
        $("select[name=magaya__Shipper]").val(accountShipper[0].id)
        $("input[name=Shipper_City]").val(accountShipper[0].Shipping_City)
        $("input[name=Shipper_State").val(accountShipper[0].Shipping_State)
        $("input[name=Shipper_Country]").val(accountShipper[0].Shipping_Country)
        $("input[name=Shipper_Street]").val(accountShipper[0].Shipping_Street)
    }

    let accountConsignee = u.accountConsignee;
    if (!_.isEmpty(accountConsignee)) {
        $("select[name=magaya__ConsigneeName]").val(accountConsignee[0].id)
        $("input[name=Consignee_City]").val(accountConsignee[0].Shipping_City)
        $("input[name=Consignee_State").val(accountConsignee[0].Shipping_State)
        $("input[name=Consignee_Country]").val(accountConsignee[0].Shipping_Country)
        $("input[name=Consignee_Street]").val(accountConsignee[0].Shipping_Street)
    }


})
