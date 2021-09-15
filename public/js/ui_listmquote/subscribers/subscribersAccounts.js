var singleAccount = []
//get one charge
storeAccounts.subscribe(() => {
    let u = storeAccounts.getState();
    singleAccount = u.singleAccount
    console.log("State account now", u)
    let accountQuote = storeAccounts.getState().quoteAccount
    //fill data address in quote
    $.map(accountQuote, function (k, v) {
        if (!_.isObject(v) && !v.includes("$")) {
            $(`input[name=${v}]`).val(k)
            $(`select[name=${v}]`).val(k)
        }
    })

    //select rigth one on list
   // console.log("Id account in quote edit", accountQuote.id)
    $("select[name=Account]").val(accountQuote.id)

})

