var quoteToEdit = []
var quoteXML = []
//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    let u = storeQuote.getState()
    console.log("Quotes state now", u)
    quoteXML = u.singleQuote
    //search quote by id
    if (!_.isEmpty(u.quotes2)) {
        let append = ''
        $("#quote-search tbody").empty()
        $.map(u.quotes2, function(v) {
            let accountName = ''
            if (!_.isEmpty(v.Account)){
                accountName = v.Account.name
            }
            append += `<tr>`
            append += `<td><a><span class="material-icons oculto edit" data-id="${v.id}">create</span></a><a><span class="material-icons oculto delete" data-id=${v.id}>clear</span></a></td><td>${sanitize(v.Name)}</td><td>${sanitize(accountName)}</td><td></td><td></td>`
            append += `</tr>`
        })

        $("#quote-search tbody").append(append)
    }

    //editing a quote
    quoteToEdit = u.quoteToEdit;
   // console.log("Editing quote now", quoteToEdit)



    dataQuotes = u.quotes
        data = []
    //console.log("State quotes now", u)
        if (_.isEmpty(dataQuotes)) {
            dataQuotes = {id: 1, Name:"Quote Test"}
        }


            $.map(dataQuotes, function(v) {
                let mt =  v["Modified_Time"]
                //primera porcion
                mt = mt.split("T")
                v["Modified_Time"] = `${mt[0]}`
                if (mt[1]) {
                    mt[1] = mt[1].slice(0, -6)
                    v["Modified_Time"] += ` ${mt[1]}`
                }
                data.push(v)

            })

            $("#table-quotes").jsGrid({
                width: "100%",
                sorting: true,
                paging: true,
                pageSize: 10,

                data: data,
                fields: [
                    { type: "control", width: 10, title:"Options", editButton: false, deleteButton: false, title: "Action",
                    itemTemplate: function(value, item) {
                        var $iconPencil = $(`<a><span class="material-icons oculto edit" data-id="${item.id}">create</span></a>`);
                        var $iconTrash = $(`<a><span class="material-icons oculto delete" data-id="${item.id}">clear</span></a>`);
                        var $sendMagaya = $(`<a><span class="material-icons oculto send" data-id="${item.id}">send</span></a>`);
                        var $checkbox = $(`<a><input type="checkbox" class="quoteCheckBox" data-id="${item.id}" /></a>`);
                        return $("<div>").attr({class: "btn-toolbar"})
                            .append($checkbox)
                            .append($sendMagaya)
                            .append($iconPencil)
                            .append($iconTrash);
                    } },

                    //{ type: "checkbox",width: 5 },
                    { name: "magaya__Number", title: "NUMBER", width: 10, formatter:'number'},
                    { name: "Account.name", title: "CUSTOMER", type: "text", width: 10 },
                    { name: "magaya__Status", type: "text", width: 10, title: "STAGE" },
                    { name: "magaya__QuoteTotalAmount", title: "AMOUNT", width: 5, type: "number" },
                    { name: "Modified_Time", type: "text", width: 15, title: "MODIFIED TIME" },
                ]

            });
})
