//get deals
storeDeal.subscribe(() => {
    let u = storeDeal.getState()
    //console.log("State deals", u)
    if (!_.isEmpty(u.dealQuote)) {
        //$("select[name=magaya__Representative]").empty()

        $("select[name=Account]").prop('disabled', true);
        let dealQuote = u.dealQuote;
        let accountId = 0;


        $.map(u.dealQuote, function(k, v) {
            accountId = k['Account_Name']['id']
            let accounts = storeAccounts.getState().accounts
            let accountA = {}
            accounts.map(account_f => {
                if (account_f.id === accountId) {
                    accountA = account_f;
                }
            })

            //if not in store, get account
            if (_.isEmpty(accountA)) {
                getRecordCRM("Accounts", accountId)
                    .then(function(response) {
                        storeAccounts.dispatch(addAccount(response[0]))
                        return response

                    })
                    .then(function(response) {
                        storeAccounts.dispatch(addQuoteAccount({id: response[0].id}))
                        storeAccounts.dispatch(findContactOfAccount({id: response[0].id}))
                        $("select[name=Account]").append(`<option value="${response[0].id}" selected>${sanitize(response[0]['Account_Name'])}</option>`).change()
                        $("select[name=magaya__Shipper]").append(`<option value="${response[0].id}">${sanitize(response[0]['Account_Name'])}</option>`).change()
                        $("select[name=magaya__Consignee]").append(`<option value="${response[0].id}">${sanitize(response[0]['Account_Name'])}</option>`).change()
                    })

            //account in store
            } else {
                storeAccounts.dispatch(addQuoteAccount({id: accountId}))
                storeAccounts.dispatch(findContactOfAccount({id: accountId}))
                $("select[name=Account]").val(accountId).change()
            }



            is_hazardous = k['magaya__IsHazardous']
            //storeAccounts.dispatch(addQuoteAccount({id: accountId}))

            //$("select[name=Account]").append(`<option value="${accountId}" selected>${sanitize(k['Account_Name']["name"])}</option>`).change()
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



        //store.dispatch(addQuoteAccount({accountId: accountId}))
        //storeAccounts.dispatch(findContactOfAccount({id: accountId}))
    }
})
