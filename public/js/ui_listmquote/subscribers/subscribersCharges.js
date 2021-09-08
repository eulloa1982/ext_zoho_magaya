//get one charge
storeCharge.subscribe(() => {
    let u = storeCharge.getState().singleCharge;
    console.log(u[1])
    //construir los campos y la data
    let append = ''
    let id = 0;
    //find id charge
    $.map(u[1], function(k, v) {
        id = u[1].id
    })

    $("#info-datad").empty()

    $.map(u[1], function(k, v) {
        if ( _.has(CHARGES_FIELDS, v)) {
            let field = _.get(CHARGES_FIELDS, [v, 'field'])
            append += `<div class="row" style="margin: 5px 5px 5px 5px">
                <div data-id="${id}" class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${field}</div>
                <div data-id="${id}" class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px"><input type="text" class="form-control no-border" name="${v}" value="${k}"/></div>
                </div>`
        }
    })

    append += `<div class='close'>Close</div>`
    $("#info-datad").append(append)

})

<<<<<<< HEAD
=======
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

>>>>>>> parent of 3703978 (Merge branch 'esteban' of https://github.com/eulloa1982/zoho_crm_magaya_ext into esteban)

///////subscriber charges, render UI table
storeCharge.subscribe(() => {
    let u = storeCharge.getState().charges;
    let b = storeCharge.getState()

    console.log("State charges now", b)
    let accountId = 0;
    $("#table-charges tbody").empty();
    if (!_.isEmpty(u)) {
        $.each(u, function(i, k) {
            if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                accountId = k.magaya__ApplyToAccounts.id
            }
            $("#table-charges tbody").append(`<tr>

                <td>
                    <span class="material-icons edit btn-slide" data-id="${i}">create</span>
                    <span class="material-icons delete del-item-warehouse-new" data-id=${i}>clear</span>
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
            /*
            <td><div class="checkbox-JASoft" data-id="${i}">
                <input type="checkbox" id="checkAvanzado" data-id="${i}" class="openDataShow" value="Valor"/>
                <label for="checkAvanzado" data-id="${i}" class="openDataShow">TEXTO QUE NO DEBERÍA VERSE</label>
                </div></td>
            */
        })
    } //IF
})

storeCharge.subscribe(() => {
    let u = storeCharge.getState().chargesOnNew;
    console.log("Charge on New state", u)
    chargesOnNew = [...u];
    $("#table-charges-new tbody").empty();
    if (!_.isEmpty(u)) {
        $.each(u, function(i, k) {

            $("#table-charges-new tbody").append(`<tr>

            <td>
                <span class="material-icons edit btn-slide" data-id="${i}">create</span>
                <span class="material-icons delete del-item-warehouse-new" data-id=${i}>clear</span>
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
})
