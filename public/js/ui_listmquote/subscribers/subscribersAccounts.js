var singleAccount = []
//get one charge
storeAccounts.subscribe(() => {
    let u = storeAccounts.getState();
    console.log("State accounts now", u)
    singleAccount = u.singleAccount
    let accountQuote = storeAccounts.getState().quoteAccount
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


})


////////subscriber singleContact, fill fields contact data
storeAccounts.subscribe(() => {

    let contacts = storeAccounts.getState().contactList;
    $("select[name=magaya__Representative]").empty();
    $("<option></option>").appendTo("select[name=magaya__Representative]");

    $.map(contacts, function(k, v) {
        $(`<option value="${k.id}">${k.Full_Name}</option>`).appendTo("select[name=magaya__Representative]")
    })

    let contact = storeAccounts.getState().singleContact

    if (!_.isEmpty(contact)) {
        let idContact = contact[0]["id"];
        $("select[name=magaya__Representative]").val(idContact)
        $("input[name=magaya__ContactPhone]").val(contact[0]["Phone"])
        $("input[name=magaya__ContactEmail]").val(contact[0]["Email"])
        $("input[name=magaya__ContactMobile]").val(contact[0]["Mobile"])
    }
})
