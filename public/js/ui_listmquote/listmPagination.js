
function paginate() {
    storePagination.subscribe(() => {

        //vaciar el state
        //storeQuote.dispatch(clearQuotes())
        //$("#table-quotes tbody").empty()
        page = storePagination.getState().page;
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__SQuotes",sort_order:"desc",per_page:200,page:page})
        .then(function(data){
            let quotes = data.data
            return quotes
        })
        .then(function(quotes) {
            //sanitizer
            if (!_.isEmpty(quotes)) {
                $.map(quotes, function(k, v) {
                    k.Name = sanitize(k.Name)
                    k.magaya__Status = sanitize(k.magaya__Status)
                    if (!_.isEmpty(k.Account)) {
                        k.Account.name = sanitize(k.Account.name)
                    }
                })
                storeQuote.dispatch(addQuote(quotes))
            }
        })
    })
        //Las 100 primeras mQuotes

}

