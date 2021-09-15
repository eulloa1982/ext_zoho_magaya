var quoteToEdit = []
var quoteXML = []
//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    let u = storeQuote.getState()
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
                data.push(v)

            })

            $("#table-quotes").jsGrid({
                width: "100%",
                //height: "400px",

                /*inserting: true,
                editing: true,*/
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
                    { name: "Name", title: "NUMBER", width: 10, formatter:'number'},
                    { name: "Account.name", title: "CUSTOMER", type: "text", width: 10 },
                    { name: "magaya__Status", type: "text", width: 10, title: "STAGE" },
                    { name: "magaya__QuoteTotalAmount", title: "AMOUNT", width: 10, type: "number" },
                    { name: "Modified_Time", type: "text", width: 10, title: "MODIFIED TIME" },
                ]

            });
})

//get one charge
/*storeQuote.subscribe(() => {
    let u = storeQuote.getState().quotes2;
    console.log("State quotes2 now", u)
    if (!_.isEmpty(u)) {
        let k = u[0]

        let append = ``

        $.map(u[1], function(k, v) {

                append += `${v}`

        })

        $("#search").append(append)
    }

})


///////subscriber charges, render UI table
/*storeCharge.subscribe(() => {
    let u = storeCharge.getState().charges;
    let b = storeCharge.getState()

    if (!_.isEmpty(u)) {
        data_module_flag_charge = false;
        let accountId = 0;
        $("#table-charges tbody").empty();
        if (!_.isEmpty(u)) {
            $.each(u, function(i, k) {
                if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                    accountId = k.magaya__ApplyToAccounts.id
                }
                $("#table-charges tbody").append(`<tr>

                    <td>
                        <span class="material-icons oculto btn-slide" data-id="${i}">create</span>
                        <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>clear</span>
                    </td>

                    <td class="magaya__Status">${k.magaya__Status}</td>
                    <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                    <td class="magaya__Amount">${k.magaya__Amount}</td>
                    <td><input type="text" class="form-control" name="magaya__Tax_Rate" value="${k.magaya__Tax_Rate}" readonly/></td>
                    <td><input type="text" class="form-control" name="magaya__Amount_Total" value="${k.magaya__Amount_Total}" readonly/></td>

                    <td style="display: none;"><input type="text" class="form-control" name="magaya__Tax_Amount" value="${k.magaya__Tax_Amount}" /></td>
                    <td style="display: none;"><input type="text" class="form-control" name="Name" value="${k.Name}"></td>
                    <td style="display: none;"><input type="text" class="form-control" name="magaya__CQuantity" value="${k.magaya__CQuantity}" /></td>
                    <td style="display: none;"><input type="text" class="form-control" name="magaya__Unit" value="${k.magaya__Unit}" /></td>
                    <td style="display: none;"><input type="text" class="form-control" name="magaya__Paid_As" value="${k.magaya__Paid_As}" /></td>
                    <td style="display: none;"><input type="text" class="form-control" name="magaya__Price" value="${k.magaya__Price}" /></td>
                    <td style="display: none;" class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                    <td style="display: none;" class="magaya__ApplyToAccounts">${accountId}</td>
                </tr>`);
            })
        } //IF
    }
})

storeCharge.subscribe(() => {
    let u = storeCharge.getState().chargesOnNew;

    if (!_.isEmpty(u)) {
        data_module_flag_charge = true

        $("#table-charges-new tbody").empty();
        if (!_.isEmpty(u)) {
            $.each(u, function(i, k) {

                $("#table-charges-new tbody").append(`<tr>

                <td>
                    <span class="material-icons oculto btn-slide" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>clear</span>
                </td>
                <td class="magaya__Status">${k.magaya__Status}</td>
                <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                <td class="magaya__Amount">${k.magaya__Amount}</td>
                <td class="magaya__Tax_Rate"><input type="text" class="form-control" value="${k.magaya__Tax_Rate}" readonly/></td>
                <td class="magaya__Amount_Total"><input type="text" class="form-control" value="${k.magaya__Amount_Total}" readonly/></td>

                <td class="magaya__Tax_Amount" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__Tax_Amount}" /></td>
                <td class="Name" style="display: none;"><input type="text" class="form-control no-border" value="${k.Name}" /></td>
                <td class="magaya__CQuantity" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__CQuantity}" /></td>
                <td class="magaya__Unit" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__Unit}" /></td>
                <td class="magaya__Paid_As" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__Paid_As}" /></td>
                <td class="magaya__Price" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__Price}" /></td>
                <td class="NoData" style="display: none;"></td>
                <td class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                <td class="magaya__ApplyToAccounts" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__ApplyToAccounts}"/></td>
                </tr>`);
            })
        }
    }
})*/
