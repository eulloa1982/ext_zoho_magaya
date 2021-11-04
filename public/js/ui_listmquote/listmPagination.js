
function k() {
    storePagination.subscribe(() => {
        //vaciar el state
        storeQuote.dispatch(clearQuotes())
        page = storePagination.getState().page;
        console.log(storePagination.getState())
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__SQuotes",sort_order:"desc",per_page:2,page:page})
        .then(function(data){
            let quotes = data.data
            console.log("Pagination", data)
            return quotes
        })
        .then(function(quotes) {
            //sanitizer
            $.map(quotes, function(k, v) {
                k.Name = sanitize(k.Name)
                k.magaya__Status = sanitize(k.magaya__Status)
                if (!_.isEmpty(k.Account)) {
                    k.Account.name = sanitize(k.Account.name)
                }
            })
            storeQuote.dispatch(addQuote(quotes))
        })
    })
        //Las 100 primeras mQuotes

}

