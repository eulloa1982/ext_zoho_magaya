//si es quotesOnNew es true, sino es false y son charges en edit
let data_module_flag_charge = true
//get one charge
storeCharge.subscribe(() => {
    let u = storeCharge.getState().singleCharge;
    if (!_.isEmpty(u)) {
        let k = u[0]
        console.log("Id array", k)
        //construir los campos y la data
        let id = 0;
        //find id charge
        $.map(u[1], function(k, v) {
            id = u[1].id
        })


        let data_module = data_module_flag_charge ? "table-charges-new" : "table-charges"
        let no_border = data_module_flag_charge ? "no-border-charge-new" : "no-border-charge"

        $("#info-datad").empty()
        let append = `
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)-1}">arrow_back_ios_new</span>
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)+1}">arrow_forward_ios</span>
        `

        $.map(u[1], function(k, v) {
            if ( _.has(CHARGES_FIELDS, v)) {
                input = `<input type="text" data-id="${id}" class="form-control ${no_border}" name="${v}" value="${k}"/>`

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

        $("#info-datad").append(append)
    }
        })

///////subscriber charges, render UI table
storeCharge.subscribe(() => {
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
                        <span class="material-icons oculto btn-slide" data-module="table-charges" data-id="${i}">create</span>
                        <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>clear</span>
                    </td>
                    <td class="magaya__Status">${k.magaya__Status}</td>
                    <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                    <td><input type="text" class="form-control" name="Name" value="${k.Name}"></td>
                    <td class="magaya__Amount">${k.magaya__Amount}</td>
                    <td><input type="text" class="form-control" name="magaya__Tax_Rate" value="${k.magaya__Tax_Rate}" readonly/></td>
                    <td><input type="text" class="form-control" name="magaya__Amount_Total" value="${k.magaya__Amount_Total}" readonly/></td>
                    <td style="display: none;"><input type="text" class="form-control" name="magaya__Tax_Amount" value="${k.magaya__Tax_Amount}" /></td>
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
                    <span class="material-icons oculto btn-slide" data-module="table-charges-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>clear</span>
                </td>
                <td class="magaya__Status">${k.magaya__Status}</td>
                <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                <td class="Name"><input type="text" class="form-control no-border" value="${k.Name}" /></td>
                <td class="magaya__Amount">${k.magaya__Amount}</td>
                <td class="magaya__Tax_Rate"><input type="text" class="form-control" value="${k.magaya__Tax_Rate}" readonly/></td>
                <td class="magaya__Amount_Total"><input type="text" class="form-control" value="${k.magaya__Amount_Total}" readonly/></td>
                <td class="magaya__Tax_Amount" style="display: none;"><input type="text" class="form-control no-border" value="${k.magaya__Tax_Amount}" /></td>
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
})
