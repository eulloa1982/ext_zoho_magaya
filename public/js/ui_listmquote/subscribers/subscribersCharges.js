//si es quotesOnNew es true, sino es false y son charges en edit
let data_module_flag_charge = true
//get one charge
storeCharge.subscribe(() => {
    let u = storeCharge.getState().singleCharge;
    if (!_.isEmpty(u)) {
        let k = parseInt(u[0])
        //construir los campos y la data
        let id = 0;
        //find id charge
        $.map(u[1], function(k, v) {
            id = u[1].id
        })

        let data_module = data_module_flag_charge ? "table-charges-new" : "table-charges"
        let button_type = data_module_flag_charge ? "updateChargeNew" : "updateCharge"
        let no_border = data_module_flag_charge ? "no-border-charge-new" : "no-border-charge"

        $("#info-datad").empty()
        let append = `
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)-1}">arrow_back_ios_new</span>
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)+1}">arrow_forward_ios</span>
        `

        $.map(u[1], function(k, v) {
            if ( _.has(CHARGES_FIELDS, v)) {
                //get type of field
                let type = "text"
                if (_.has(CHARGES_FIELDS, [v, 'type']))
                    type = "number";

                input = `<input type="${type}" data-id="${id}" class="form-control ${no_border}" name="${v}" value="${k}"/>`

                let field = _.get(CHARGES_FIELDS, [v, 'field'])
                let values = _.has(CHARGES_FIELDS, [v, "values"]) ? _.get(CHARGES_FIELDS, [v, 'values']) : ''
                //si tiene una lista de valores, es un select y lo imprimimos
                if (!_.isEmpty(values)) {
                    input = `<select data-id="${id}" name="${v}" class="form-control ${no_border}">`
                        $.map(values, function(val) {
                            if (val === k)
                                input += `<option value="${val}" selected>${val}</option>`
                            else
                                input += `<option value="${val}" selected>${val}</option>`
                        })
                    input += `</select>`
                }
                append += `<div class="row" style="margin: 5px 5px 5px 5px">
                    <div class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${field}</div>
                    <div class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${input}</div>
                    </div>`
            }
        })
        append += `<span id="${button_type}" data-id="${id}" class="btn btn-primary">Send</span>`
        $("#info-datad").append(append)
    }
        })

///////subscriber charges, render UI table
storeCharge.subscribe(() => {
    let u = storeCharge.getState().charges;

    if (!_.isEmpty(u)) {
        data_module_flag_charge = false;
        let accountId = 0;
        let totalIncome = 0
        $("#table-charges tbody").empty();
        if (!_.isEmpty(u)) {
            $.each(u, function(i, k) {
                if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                    accountId = k.magaya__ApplyToAccounts.id
                }
                k.magaya__Status = sanitize(k.magaya__Status);
                k.Name = sanitize(k.Name);
                k.magaya__ChargeCode = sanitize(k.magaya__ChargeCode);

                totalIncome += roundDec(k.magaya__Final_Amount);

                $("#table-charges tbody").append(`<tr>
                    <td class="Delete">
                        <span class="material-icons oculto btn-slide" data-module="table-charges" data-id="${i}">create</span>
                        <span class="material-icons oculto del-item-charge" data-id=${k.id}>clear</span>
                    </td>
                    <td class="magaya__Status">${k.magaya__Status}</td>
                    <td class="Name" id="first">${k.Name}</td>
                    <td class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                    <td class="magaya__Price">${k.magaya__Price}</td>
                    <td class="magaya__Amount">${k.magaya__Amount}</td>
                    <td class="magaya__Tax_Amount">${k.magaya__Tax_Amount}</td>
                    <td class="magaya__Amount_Total">${k.magaya__Amount_Total}</td>
                    <td class="magaya__Final_Amount">${k.magaya__Final_Amount}</td>

                    <td class="magaya__ChargeCode" style="display: none;">${k.magaya__ChargeCode}</td>
                    <td style="display: none;" class="magaya__Tax_Rate0">${k.magaya__TaxRate}</td>
                    <td style="display: none;" clss="magaya__Unit">${k.magaya__Unit}</td>
                    <td style="display: none;" class="magaya__Paid_As">${k.magaya__Paid_As}</td>
                    <td style="display: none;" class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                    <td style="display: none;" class="magaya__ApplyToAccounts">${accountId}</td>
                </tr>`);
            })
            totalIncome = roundDec(totalIncome)
            $("input[name=TotalIncomeCharges]").val(totalIncome)

        } //IF
    }
})

storeCharge.subscribe(() => {
    let u = storeCharge.getState().chargesOnNew;

    if (!_.isEmpty(u)) {
        data_module_flag_charge = true

        $("#table-charges-new tbody").empty();
        if (!_.isEmpty(u)) {
            let totalIncome = 0;

            $.each(u, function(i, k) {

                k.magaya__Status = sanitize(k.magaya__Status);
                k.Name = sanitize(k.Name);
                k.magaya__ChargeCode = sanitize(k.magaya__ChargeCode);

                totalIncome += roundDec(k.magaya__Final_Amount);
                $("#table-charges-new tbody").append(`<tr>
                <td class="Delete">
                    <span class="material-icons oculto btn-slide" data-module="table-charges-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-charge-new" data-id=${i}>clear</span>
                </td>
                <td class="magaya__Status">${k.magaya__Status}</td>
                <td class="Name" id="first">${k.Name}</td>
                <td class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                <td class="magaya__Price">${k.magaya__Price}</td>
                <td class="magaya__Amount">${k.magaya__Amount}</td>
                <td class="magaya__Tax_Amount">${k.magaya__Tax_Amount}</td>
                <td class="magaya__Amount_Total">${k.magaya__Amount_Total}</td>
                <td class="magaya__Final_Amount">${k.magaya__Final_Amount}</td>

                <td class="magaya__ChargeCode" style="display: none;">${k.magaya__ChargeCode}</td>
                <td class="magaya__Tax_Rate0" style="display: none;">${k.magaya__TaxRate}</td>
                <td class="magaya__Unit" style="display: none;">${k.magaya__Unit}</td>
                <td class="magaya__Paid_As" style="display: none;">${k.magaya__Paid_As}</td>
                <td class="magaya__ChargeCurrency" style="display: none;">${k.magaya__ChargeCurrency}</td>
                <td class="magaya__ApplyToAccounts" style="display: none;">${k.magaya__ApplyToAccounts}</td>
                </tr>`);
            })

            $("input[name=TotalIncomeCharges]").val(totalIncome)
        }
    }
})

