//get deals
storeDeal.subscribe(() => {
    let u = storeDeal.getState()
    console.log("Deals state now", u)


    if (!_.isEmpty(u)) {
        let dealQuote = u.dealQuote;
        let accountId = 0;
        $.map(u.dealQuote, function(k, v) {
            accountId = k['Account_Name']['id']
        })

        store.dispatch(addQuoteAccount({accountId: accountId}))
        storeAccounts.dispatch(findContactOfAccount({id: accountId}))
    }

})

