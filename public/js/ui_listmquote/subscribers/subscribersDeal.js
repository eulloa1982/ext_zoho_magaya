//get deals
storeDeal.subscribe(() => {
    let u = storeDeal.getState()

    if (!_.isEmpty(u.dealQuote)) {
        $("select[name=Account]").empty()
        let dealQuote = u.dealQuote;
        let accountId = 0;
        $.map(u.dealQuote, function(k, v) {
            accountId = k['Account_Name']['id']
            storeAccounts.dispatch(addQuoteAccount({id: accountId}))
            $("select[name=Account]").append(`<option value="${accountId}" selected>${sanitize(k['Account_Name']["name"])}</option>`)
            $("#magaya__Description").val(sanitize(k["magaya__DescriptionofGoods"]))
            $("input[name=magaya__Origin]").val(sanitize(k["Origin"]))
            $("input[name=magaya__Destination]").val(sanitize(k['Destination']))
            $("input[name=applyToName]").val(sanitize(k['Account_Name']["name"]))

        })


        store.dispatch(addQuoteAccount({accountId: accountId}))
        storeAccounts.dispatch(findContactOfAccount({id: accountId}))
    }

})
