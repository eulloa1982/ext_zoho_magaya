var quoteToEdit = []
var quoteXML = []
//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    let u = storeQuote.getState()
    //console.log("State quote now", u)
    quoteXML = u.singleQuote
    //search quote by id
    if (!_.isEmpty(u.quotes2)) {
        console.log("Quote search", u.quotes2)
        let append = ''
        let quote = u.quotes2
        let accountName = !_.isEmpty(quote[0]['Account']) ? quote[0]['Account']['name'] : ''

        $("#quote-search tbody").empty()

        append += `<tr>
            <td>
                <a><span class="material-icons oculto edit" data-id="${quote[0]['id']}">create</span></a>
                <a><span class="material-icons oculto delete" data-id=${quote[0]['id']}>clear</span></a>
            </td>
            <td>${quote[0]['magaya__Number']}</td>
            <td>${accountName}</td>
            <td>${quote[0]['magaya__QuoteTotalAmount']}</td>
            </tr>`

        $("#quote-search tbody").append(append)
    }

    //editing a quote
    quoteToEdit = u.quoteToEdit;
    dataQuotes = u.quotes
    data = []

    if (_.size(dataQuotes) == 0) {
        dataQuotes = {id: 1, Name:"Quote Test"}
    } else {

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
                { type: "control",  title:"Options", width: 'auto', editButton: false, deleteButton: false, title: "Action",
                itemTemplate: function(value, item) {
                    let $iconPencil = $(`<a><span class="material-icons oculto edit" data-id="${item.id}">create</span></a>`);
                    let $iconTrash = $(`<a><span class="material-icons oculto delete" data-id="${item.id}">clear</span></a>`);
                    let $sendMagaya = $(`<a><span class="material-icons oculto send" data-id="${item.id}">send</span></a>`);
                    let $checkbox = $(`<a><input type="checkbox" class="quoteCheckBox" data-id="${item.id}" /></a>`);
                    let $iconPdf = $(`<a><span class="material-icons toPdf oculto" data-id="${item.id}">picture_as_pdf</span></a>`)
                    return $("<div>").attr({class: "btn-toolbar"})
                                .append($checkbox)
                                .append($sendMagaya)
                                .append($iconPencil)
                                .append($iconTrash)
                                .append($iconPdf)
                    }
                },

                //{ type: "checkbox",width: 5 },
                { name: "Name", title: "NUMBER", width: 220, formatter:'number'},
                { name: "Account.name", title: "CUSTOMER", type: "text", width: 300},
                { name: "magaya__Status", type: "text", width: 120, title: "STAGE" },
                { name: "magaya__QuoteTotalAmount", title: "AMOUNT", width: 145, type: "number", formatter: "number", classes: 'number'},
                { name: "Modified_Time", type: "text", width: 300, title: "MODIFIED TIME"},
            ]

            });
        }
    })
