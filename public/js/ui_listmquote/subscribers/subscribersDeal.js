//get deals
storeDeal.subscribe(() => {
    let u = storeDeal.getState()
    //console.log("State deals", u)
    if (!_.isEmpty(u.dealQuote)) {
        $("select[name=magaya__Representative]").empty()
        $("select[name=Account]").prop('disabled', true);
        let dealQuote = u.dealQuote;
        let accountId = 0;
        $.map(u.dealQuote, function(k, v) {
            accountId = k['Account_Name']['id']
            is_hazardous = k['magaya__IsHazardous']
            storeAccounts.dispatch(addQuoteAccount({id: accountId}))
            $("select[name=Account]").append(`<option value="${accountId}" selected>${sanitize(k['Account_Name']["name"])}</option>`)
            $("#magaya__Description").val(sanitize(k["magaya__DescriptionofGoods"]))
            $("input[name=magaya__Origin]").val(sanitize(k["Origin"]))
            $("input[name=magaya__Destination]").val(sanitize(k['Destination']))
            $("input[name=applyToName]").val(sanitize(k['Account_Name']["name"]))
            if (is_hazardous === true) {
                $("input[name=magaya__Is_Hazardous]").prop("checked", true)
            } else {
                $("input[name=magaya__Is_Hazardous]").prop("checked", false)
            }
        })


        store.dispatch(addQuoteAccount({accountId: accountId}))
        storeAccounts.dispatch(findContactOfAccount({id: accountId}))
    }
})
