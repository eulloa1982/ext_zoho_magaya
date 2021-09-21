var quoteToEdit = []
var quoteXML = []
//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    let u = storeQuote.getState()
    console.log("State quote now", u)
    quoteXML = u.singleQuote
    //search quote by id
    if (!_.isEmpty(u.quotes2)) {
        console.log("Quote search", u.quotes2)
        let append = ''
        let quote = u.quotes2
        $("#quote-search tbody").empty()
        append += `<tr>
            <td>
                <a><span class="material-icons oculto edit" data-id="${quote[0]['id']}">create</span></a>
                <a><span class="material-icons oculto delete" data-id=${quote[0]['id']}>clear</span></a>
            </td>
            <td>${quote[0]['magaya__Number']}</td>
            <td>${quote[0]['Account']['name']}</td>
            <td></td>
            <td></td>
            </tr>`


        $("#quote-search tbody").append(append)
    }

    //editing a quote
    quoteToEdit = u.quoteToEdit;
    dataQuotes = u.quotes
    data = []
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
                }
            },

            //{ type: "checkbox",width: 5 },
            { name: "magaya__Number", title: "NUMBER", width: 10, formatter:'number'},
            { name: "Account.name", title: "CUSTOMER", type: "text", width: 10 },
            { name: "magaya__Status", type: "text", width: 10, title: "STAGE" },
            { name: "magaya__QuoteTotalAmount", title: "AMOUNT", width: 5, type: "text", formatter: "number" },
            { name: "Modified_Time", type: "text", width: 15, title: "MODIFIED TIME" },
        ]

    });
})
