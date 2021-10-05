//si es quotesOnNew es true, sino es false y son charges en edit
let data_module_flag_charge = true
$("#info-charge").html("Loading, please wait...");
//get one charge
storeCharge.subscribe(() => {
    let u = storeCharge.getState().singleCharge;
    //console.log("State charges now", storeCharge.getState())
    if (!_.isEmpty(u)) {
        let k = parseInt(u[0])
        //construir los campos y la data
        let id = 0;
        //find id charge
        let applyToName = ''
        $.map(u[1], function(k, v) {
            id = u[1].id
            applyToName = u[1].magaya__ApplyToAccounts.name
        })

        if (_.isEmpty(applyToName) || applyToName === undefined) {
            applyToName = $("select[name=Account]").text()
        }


        let data_module = data_module_flag_charge ? "table-charges-new" : "table-charges"
        let button_type = data_module_flag_charge ? "updateChargeNew" : "updateCharge"
        let no_border = data_module_flag_charge ? "no-border-charge-new" : "no-border-charge"

        $("#info-datad").empty()
        $("#arrows").empty()
        let arrows = `
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)-1}">arrow_back_ios_new</span>
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)+1}">arrow_forward_ios</span>
        `
        $("#panel-legend").html(`Editing Charge`)
        let arr = {}
        $.map(u[1], function(k, v) {
            //get place order
            let order = _.get(CHARGES_FIELDS, [v, 'place'])
            if ( _.has(CHARGES_FIELDS, v)) {
                //get type of field
                let type = "text"
                if (_.has(CHARGES_FIELDS, [v, 'type'])) {
                    type = "number";
                    k = roundDec(k).toLocaleString('en-US', {  minimumFractionDigits: 2  } )

                    if (Number.isInteger(k))
                        k = `${k}.00`
                }

                let editable = _.get(CHARGES_FIELDS, [v, 'editable'])

                if (k === null || k === "null") k = 0

                //check values .00

                input = `<input type="text" data-id="${id}" class="form-control ${no_border} ${type}" name="${v}" value="${k}" ${editable}/>`

                let field = _.get(CHARGES_FIELDS, [v, 'field'])
                let values = _.has(CHARGES_FIELDS, [v, "values"]) ? _.get(CHARGES_FIELDS, [v, 'values']) : ''
                //si tiene una lista de valores, es un select y lo imprimimos
                if (!_.isEmpty(values)) {
                    input = `<select data-id="${id}" name="${v}" class="form-control ${no_border}">`
                        $.map(values, function(val) {
                            if (val === k)
                                input += `<option value="${val}" selected>${val}</option>`
                            else
                                input += `<option value="${val}">${val}</option>`
                        })
                    input += `</select>`
                }
                appendArr = `<div class="row">
                    <div class="col-md-4">${field}</div>
                    <div class="col-md-6">${input}</div>
                    </div>`

                //Object.assign(arr, append)
                arr[order] = appendArr
            }
        })

        let append = ``
        arrows += `<span id="${button_type}" data-id="${id}" class="material-icons btn btn-primary">task_alt</span>
                    <span class="material-icons close btn btn-danger float-right" style="margin: 0px 0px 0px 4px" data-close="panel">close</span>`


        //imprimir campos en orden
        for(i = 1; i < 16; i++) {
            append += arr[i];
        }

        append += `<div class="row">
        <div class="col-md-4">Apply To</div>
        <div class="col-md-6"><input type="text" class="form-control" value="${applyToName}" readonly></div>
        </div>`

        $("#arrows").append(arrows)
        $("#info-datad").append(append)
    }


    //empty charge
    //console.log("State charges now", storeCharge.getState())
    let y = storeCharge.getState().emptyCharge;
    let showEmpty = storeCharge.getState().showEmptyCharge;

    if (!_.isEmpty(y) && showEmpty) {
        $.map(y, function (k, v) {
            $(`input[name=${v}`).val(k)
        })
    }
})

///////subscriber charges, render UI table
storeCharge.subscribe(() => {
    let u = storeCharge.getState().charges;


    if (!_.isEmpty(u)) {
        $("#info-charge").html("Loading, please wait...");
        data_module_flag_charge = false;
        let accountId = 0;
        //let totalIncome = 0
        $("#table-charges tbody").empty();
        $("#table-charges tfoot").empty();

        let amount_ = 0
        let tax_amount_total = 0
        let amount_total = 0
        let final_amount = 0

        $.each(u, function(i, k) {
            if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                accountId = k.magaya__ApplyToAccounts.id
            }
            k.magaya__Status = sanitize(k.magaya__Status);
            k.Name = sanitize(k.Name);
            k.magaya__ChargeCode = sanitize(k.magaya__ChargeCode);
            k.magaya__Paid_As = sanitize(k.magaya__Paid_As);
            k.magaya__ChargeCurrency = sanitize(k.magaya__ChargeCurrency);

            //totalIncome += k.magaya__Final_Amount;
            amount_ += roundDec(k.magaya__Amount);
            tax_amount_total += roundDec(k.magaya__Tax_Amount)
            amount_total += roundDec(k.magaya__Amount_Total)
            final_amount += roundDec(k.magaya__Final_Amount)

            if (roundDec(k.magaya__Final_Amount) == 0) {
                //totalIncome += roundDec(k.magaya__Amount_Total);
                //final_amount += roundDec(k.magaya__Amount_Total);
            }

            $("#table-charges tbody").append(`<tr>
                    <td class="Delete">
                        <span class="material-icons oculto btn-slide" data-module="table-charges" data-id="${i}">create</span>
                        <span class="material-icons oculto del-item-charge" data-id=${k.id}>clear</span>
                    </td>
                    <td class="magaya__Status">${k.magaya__Status}</td>
                    <td class="Name" id="first">${k.Name}</td>
                    <td align="right" class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                    <td align="right" class="magaya__Price">${roundDec(k.magaya__Price).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Amount">${roundDec(k.magaya__Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Tax_Amount">${roundDec(k.magaya__Tax_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Amount_Total">${roundDec(k.magaya__Amount_Total).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Final_Amount">${roundDec(k.magaya__Final_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td class="magaya__ChargeCode" style="display: none;">${k.magaya__ChargeCode}</td>
                    <td style="display: none;" class="magaya__Tax_Rate0">${k.magaya__TaxRate}</td>
                    <td style="display: none;" clss="magaya__Unit">${k.magaya__Unit}</td>
                    <td style="display: none;" class="magaya__Paid_As">${k.magaya__Paid_As}</td>
                    <td style="display: none;" class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                    <td style="display: none;" class="magaya__ApplyToAccounts">${accountId}</td>
                </tr>`);
            })
            //totalIncome = roundDec(totalIncome)
            //incorporando data de totales
            $("#table-charges tfoot").append(`<tr><td align="right" colspan="5"><strong>Totals USD</strong></td>
                                        <td align="right"><strong>${amount_.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${final_amount.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td></tr>`);

                                        //console.log(totn_number.toLocaleString('fr-FR'));
            //$("input[name=TotalIncomeCharges]").val(totalIncome)
            $("#info-charge").html("");

    } else {
        $("#table-charges tbody").empty()
        $("#table-charges tfoot").empty();

        $("#info-charge").html("No charges found");
    }
})

storeCharge.subscribe(() => {
    let u = storeCharge.getState().chargesOnNew;
    let amount_ = 0
    let tax_amount_total = 0
    let amount_total = 0
    let final_amount = 0

    if (!_.isEmpty(u)) {
        data_module_flag_charge = true

        $("#table-charges-new tbody").empty();
        $("#table-charges-new tfoot").empty();

        if (!_.isEmpty(u)) {


            $.each(u, function(i, k) {

                k.magaya__Status = sanitize(k.magaya__Status);
                k.Name = sanitize(k.Name);
                k.magaya__ChargeCode = sanitize(k.magaya__ChargeCode);
                k.magaya__Paid_As = sanitize(k.magaya__Paid_As);
                k.magaya__ChargeCurrency = sanitize(k.magaya__ChargeCurrency);

                amount_ += roundDec(k.magaya__Amount);
                tax_amount_total += roundDec(k.magaya__Tax_Amount)
                amount_total += roundDec(k.magaya__Amount_Total)
                final_amount += roundDec(k.magaya__Final_Amount)

                if (k.magaya__Final_Amount == 0) {
                    //totalIncome += roundDec(k.magaya__Amount_Total);
                    //final_amount += roundDec(k.magaya__Amount_Total);
                }

                $("#table-charges-new tbody").append(`<tr>
                <td class="Delete">
                    <span class="material-icons oculto btn-slide" data-module="table-charges-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-charge-new" data-id=${i}>clear</span>
                </td>
                <td class="magaya__Status">${k.magaya__Status}</td>
                <td class="Name" id="first">${k.Name}</td>
                <td align="right" class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                <td align="right" class="magaya__Price">${roundDec(k.magaya__Price).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" class="magaya__Amount">${roundDec(k.magaya__Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" class="magaya__Tax_Amount">${roundDec(k.magaya__Tax_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" class="magaya__Amount_Total">${roundDec(k.magaya__Amount_Total).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" class="magaya__Final_Amount">${roundDec(k.magaya__Final_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="magaya__ChargeCode" style="display: none;">${k.magaya__ChargeCode}</td>
                <td class="magaya__Tax_Rate0" style="display: none;">${k.magaya__TaxRate}</td>
                <td class="magaya__Unit" style="display: none;">${k.magaya__Unit}</td>
                <td class="magaya__Paid_As" style="display: none;">${k.magaya__Paid_As}</td>
                <td class="magaya__ChargeCurrency" style="display: none;">${k.magaya__ChargeCurrency}</td>
                </tr>`);
            })


            $("#table-charges-new tfoot").append(`<tr><td colspan="5"class="Delete"><strong>Totals USD</strong></td>
                                        <td align="right" class="Delete"><strong>${amount_.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right" class="Delete"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right" class="Delete"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right" class="Delete"><strong>${final_amount.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td></tr>`);
        }

    } else {
        $("#table-charges-new tbody").empty()
        $("#table-charges-new tfoot").empty();

    }
})
