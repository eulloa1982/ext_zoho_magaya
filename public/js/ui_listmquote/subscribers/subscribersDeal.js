//get deals
storeDeal.subscribe(() => {
    let u = storeDeal.getState()
    console.log("Deals state now", u)


    if (!_.isEmpty(u.dealQuote)) {
        $("select[name=Account]").empty()
        let dealQuote = u.dealQuote;
        let accountId = 0;
        $.map(u.dealQuote, function(k, v) {
            accountId = k['Account_Name']['id']

            $("select[name=Account]").append(`<option value="${accountId}" selected>${sanitize(k['Account_Name']["name"])}</option>`)
        })


        store.dispatch(addQuoteAccount({accountId: accountId}))
        storeAccounts.dispatch(findContactOfAccount({id: accountId}))
    }

})

