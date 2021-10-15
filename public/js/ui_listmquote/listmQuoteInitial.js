
    //try {
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {

        //Las 100 primeras mQuotes
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__SQuotes",sort_order:"desc"})
            .then(function(data){
                let quotes = data.data;
                if (_.isEmpty(quotes)) {
                    let now = moment().format("YYYY-MM-DD T HH:mm:ss");
                    quotes = { "id": 1, "Name": "Quote Test", "magaya__Status": "Draft", "magaya__Description": "Do a new mquote, i'll gone", "Modified_Time": now }
                }
                //return all data quotes to initial statel
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
                Utils.unblockUI()
            })
            .catch(err => {
                console.log("Error quote", err)
            })


        //checkConnect()


    });


    ZOHO.embeddedApp.init()

