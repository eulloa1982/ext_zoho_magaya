
function paginate() {
    storePagination.subscribe(() => {

        //vaciar el state
        //storeQuote.dispatch(clearQuotes())
        //$("#table-quotes tbody").empty()
        page = storePagination.getState().page;
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__SQuotes",sort_order:"desc",per_page:20,page:page})
        .then(function(data){
            let quotes = data.data
            return quotes
        })
        .then(function(quotes) {
            //sanitizer
            if (!_.isEmpty(quotes)) {
                let table = $('#table-quotes').DataTable();
                i = localStorage.getItem('number_quotes')
                $.map(quotes, function(k, v) {
                    k.Name = sanitize(k.Name)
                    k.magaya__Status = sanitize(k.magaya__Status)
                    if (!_.isEmpty(k.Account)) {
                        k.Account.name = sanitize(k.Account.name)
                    }
                    k.number = i++
                    k.create = `
                        <a><input type="checkbox" class="quoteCheckBox" data-id="${k.id}" /></a>
                        <a><span class="material-icons oculto edit" data-id="${k.id}">create</span></a>
                        <a><span class="material-icons oculto delete" data-id="${k.id}">delete_forever</span></a>
                        <a><span class="material-icons oculto send" data-id="${k.id}">send</span></a>
                    `
                    table.rows.add([{...k}]).draw();
                })
                localStorage.setItem("number_quotes", i)
                storeQuote.dispatch(addQuote(quotes))
            }
        })
    })
        //Las 100 primeras mQuotes

}

