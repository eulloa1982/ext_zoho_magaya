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
        $("input[name=applyToName]").val(accountQuote.Account_Name)
        $("input[name=Account_Name]").val(accountQuote.id)

        $.map(accountQuote, function (k, v) {
            //console.log(k, v)
            if (v && !_.isObject(v) && !v.includes("$")) {

                if (!_.isObject(k)) {
                    $(`#account_form input[name=${v}]`).val(k)
                    $(`#account_form select[name=${v}]`).val(k)
                }
            }
        })
    }


    //select rigth one on list
   let contacts = u.contactList;
   let contact = u.singleContact
   let quoteToEdit = storeQuote.getState().quoteToEdit
   //
   $("<option></option>").appendTo("select[name=magaya__Representative]");
    if (!_.isEmpty(contact)) {
        $("select[name=magaya__Representative]").empty();
        let idContact = contact[0]["id"];
        let nameContact = contact[0]['Full_Name']
        //storeAccounts.dispatch(findContact({id: idContact}));
        $(`<option value='${idContact}' selected>${nameContact}</option>`).appendTo("select[name=magaya__Representative]");
        $("select[name=magaya__Representative]").val(idContact)

        $.map(contact[0], function (k, v) {
            if (!_.isObject(v) && !v.includes("$")) {
                $(`#contact_form input[name=${v}]`).val(k)
                $(`#contact_form select[name=${v}]`).val(k)
                $(`#customer_form input[name=${v}]`).val(k)
                $(`#customer_form select[name=${v}]`).val(k)
            }
        })

        //if is a quote, get the values from the mquote
        if (!_.isEmpty(quoteToEdit)) {
            $("input[name=Mailing_City]").val(quoteToEdit.magaya__BillingCity)
            $("input[name=Mailing_Country]").val(quoteToEdit.magaya__BillingCountry)
            $("input[name=Mailing_State]").val(quoteToEdit.magaya__BillingState)
            $("input[name=Mailing_Street]").val(quoteToEdit.magaya__BillingStreet)
            $("input[name=Mailing_Zip]").val(quoteToEdit.magaya__Billing_Zip)
            $("input[name=Email]").val(quoteToEdit.magaya__ContactEmail)
            $("input[name=Mobile]").val(quoteToEdit.magaya__ContactMobile)
            $("input[name=Phone]").val(quoteToEdit.magaya__ContactPhone)
        }

    }

    //contact list
    if (!_.isEmpty(contacts)) {
        /*let deal_quote = storeDeal.getState().dealQuote*/


        $.map(contacts, function(k, v) {
            $(`<option value="${k.id}">${k.Full_Name}</option>`).appendTo("select[name=magaya__Representative]")
        })

        let map = {};
        $('select[name=magaya__Representative] option').each(function () {
            if (map[this.value]) {
                $(this).remove()
            }
            map[this.value] = true;
        })
    }





    let accountShipper = u.accountShipper;
    if (!_.isEmpty(accountShipper)) {
        $("select[name=magaya__Shipper]").val(accountShipper[0].id)
        $("input[name=magaya__ShipperCity]").val(accountShipper[0].Billing_City)
        $("input[name=magaya__ShipperState").val(accountShipper[0].Billing_State)
        $("input[name=magaya__ShipperCountry]").val(accountShipper[0].Billing_Country)
        $("input[name=magaya__ShipperStreet]").val(accountShipper[0].Billing_Street)
        $("input[name=magaya__ShipperCode]").val(accountShipper[0].Billing_Code)
    }

    let accountConsignee = u.accountConsignee;
    if (!_.isEmpty(accountConsignee)) {
        $("select[name=magaya__Consignee]").val(accountConsignee[0].id)
        $("input[name=magaya__ConsigneeCity]").val(accountConsignee[0].Shipping_City)
        $("input[name=magaya__ConsigneeState").val(accountConsignee[0].Shipping_State)
        $("input[name=magaya__ConsigneeCountry]").val(accountConsignee[0].Shipping_Country)
        $("input[name=magaya__ConsigneeStreet]").val(accountConsignee[0].Shipping_Street)
        $("input[name=magaya__ConsigneeCode]").val(accountConsignee[0].Shipping_Code)
    }


})
