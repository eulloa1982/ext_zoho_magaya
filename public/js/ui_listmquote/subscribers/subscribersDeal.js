//get deals
storeDeal.subscribe(() => {
    let u = storeDeal.getState()
    console.log("Deals state now", u)

    /*if (!_.isEmpty(u.deals)) {
        $("select[name=Deal]").empty()
        $.map(u.deals, function(k, v) {
            k.Deal_Name = sanitize(k.Deal_Name)
            $(`<option value='${k.id}'>${k.Deal_Name}</option>`).appendTo("select[name=Deal]");

        })

    }*/

    if (!_.isEmpty(u)) {
        let dealQuote = u.dealQuote;
        let accountId = 0;
        $.map(u.dealQuote, function(k, v) {
            console.log(k)
            accountId = k['Account_Name']['id']
        })

        store.dispatch(addQuoteAccount({accountId: accountId}))
        storeAccounts.dispatch(findContactOfAccount({id: accountId}))
    }

})

