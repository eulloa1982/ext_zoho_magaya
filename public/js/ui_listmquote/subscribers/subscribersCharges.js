//si es quotesOnNew es true, sino es false y son charges en edit
let data_module_flag_charge = true
//$("#info-charge").html("Loading, please wait...");
//get one charge
storeCharge.subscribe(() => {
    let u = storeCharge.getState().singleCharge;
    let y = storeCharge.getState().emptyCharge[1];
    let showEmpty = storeCharge.getState().showEmptyCharge;
    //console.log("State charges now", storeCharge.getState())
    if (!_.isEmpty(u)) {
        let k = parseInt(u[0])
        //construir los campos y la data
        let idCharge = 0;
        let idTax = 0;
        //find id charge
        let applyToName = ''
        $.map(u[1], function(k, v) {
            idCharge = u[1].id
            //applyToName = u[1].magaya__ApplyToAccounts.name
        })



        let data_module = data_module_flag_charge ? "table-charges-new" : "table-charges"
        let button_type = data_module_flag_charge ? "updateChargeNew" : "updateCharge"
        let no_border = data_module_flag_charge ? "no-border-charge-new" : "no-border-charge"


        if ($("#table-charges").is(':hidden')) {


            if (showEmpty) {
                $("#arrows-charge").empty()
                $("#title_legend").html("New Charge")
                no_border = 'new-charge'
                $("#sendCharges").hide()
                $("#newCharges").show()
                $("#updateCharge").hide()
                $("#updateChargeNew").hide()
            } else {
                $("#title_legend").html("Editing Charge")
                let arrow_prev = `<span class="material-icons cursor-hand oculto2">arrow_back_ios_new</span>`
                let arrow_next = `<span class="material-icons cursor-hand oculto2">arrow_forward_ios</span>`
                let size = _.size(storeCharge.getState().chargesOnNew)
                let index_prev = Number(k) - 1
                let index_next = Number(k) + 1

                if (index_prev >= 0) {
                    arrow_prev = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_prev}">arrow_back_ios_new</span>`
                }
                if (index_next < size) {
                    arrow_next = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_next}">arrow_forward_ios</span>`
                }

                let arrows = `${arrow_prev} ${arrow_next}`

                $("#arrows-charge").html(arrows)
                $("#sendCharges").hide()
                $("#newCharges").hide()
                $("#updateCharge").hide()
                $("#updateChargeNew").show()
            }
        } else {

            if (showEmpty) {
                $("#arrows-charge").empty()
                $("#title_legend").html("New Charge")
                $("#sendCharges").show()
                $("#newCharges").hide()
                $("#updateCharge").hide()
                $("#updateChargeNew").hide()
            } else {
                $("#title_legend").html("Editing Charge")
                let arrow_prev = `<span class="material-icons cursor-hand oculto2">arrow_back_ios_new</span>`
                let arrow_next = `<span class="material-icons cursor-hand oculto2">arrow_forward_ios</span>`
                let size = _.size(storeCharge.getState().charges)
                let index_prev = Number(k) - 1
                let index_next = Number(k) + 1

                if (index_prev >= 0) {
                    arrow_prev = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_prev}">arrow_back_ios_new</span>`
                }
                if (index_next < size) {
                    arrow_next = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_next}">arrow_forward_ios</span>`
                }

                let arrows = `${arrow_prev} ${arrow_next}`

                $("#arrows-charge").html(arrows)
                $("#sendCharges").hide()
                $("#newCharges").hide()
                $("#updateCharge").show()
                $("#updateChargeNew").hide()
            }
        }


        let arr = {}

        $.map(u[1], function(k, v) {
            if (k === null || k === 'null')
                k = ''
            if (_.isObject(k) && !v.includes("$")) {
                let id = k.id
                $(`select[name=${v}]`).attr('data-id', id)
                if (id > 0)
                    $(`select[name=${v}]`).val(k.id).change()

                $(`select[name=${v}]`).removeClass('no-border-charge-new no-border-charge').addClass('new-charge')

            }

            if (!_.isObject(v) && !v.includes("$")) {
                if (!_.isObject(k)) {
                    $(`input[name=${v}]`).removeClass('new-charge no-border-charge-new no-border-charge').addClass(no_border)
                    $(`select[name=${v}]`).removeClass('new-charge no-border-charge-new no-border-charge').addClass(no_border)
                    $(`#${v}`).removeClass('new-charge no-border-charge-new no-border-charge').addClass(no_border)
                    $(`input[name=${v}]`).attr('data-id', idCharge)
                    $(`select[name=${v}]`).attr('data-id', idCharge)
                    $(`#${v}`).attr('data-id', idCharge)
                    $("#updateCharge").attr('data-id', idCharge)

                    if (!k)
                        k = 0
                    //if (k) {
                        //console.log(v, k)
                        $(`input[name=${v}]`).val(k.toLocaleString('en-US', {  minimumFractionDigits: 2  } ))
                        $(`select[name=${v}]`).val(k)
                        $(`#${v}`).val(k)
                    //}

                }
            }


        })


        append = `<div class="row">
        <div class="col-md-4">Apply To</div>
        <div class="col-md-6"><input type="text" class="form-control" value="" readonly></div>
        </div>`


        $("#info-datad").append(append)
    }


    //empty charge
    //console.log("State charges now", storeCharge.getState())


    /*if (!_.isEmpty(y) && showEmpty) {
        $.map(y, function (k, v) {
            $(`input[name=${v}`).val(k)
        })
    }*/
})

///////subscriber charges, render UI table
storeCharge.subscribe(() => {
    let u = storeCharge.getState().charges;

    if (!_.isEmpty(u)) {
        $("#info-charge").html(" ");
        data_module_flag_charge = false;
        let accountId = 0;
        //let totalIncome = 0
        $("#table-charges tbody").empty();
        $("#table-charges tfoot").empty();
        $("#table-charges-preview tbody").empty();
        $("#table-charges-preview tfoot").empty();

        let amount_ = 0
        let tax_amount_total = 0
        let amount_total = 0

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

            //check if charge type name exists
            let name_charge = k.Name
            if (!_.isEmpty(k.magaya__Charge_Type)) {
                name_charge = k.magaya__Charge_Type.name
            }

            $("#table-charges tbody").append(`<tr>
                    <td class="Delete">
                        <span class="material-icons oculto btn-slide" data-module="table-charges" data-id="${i}">create</span>
                        <span class="material-icons oculto del-item-charge" data-id=${k.id}>delete_forever</span>
                    </td>
                    <td class="magaya__Status">${k.magaya__Status}</td>
                    <td class="Name" id="first">${name_charge}</td>
                    <td align="right" class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                    <td align="right" class="magaya__Price">${roundDec(k.magaya__Price).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Amount">${roundDec(k.magaya__Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Tax_Amount">${roundDec(k.magaya__Tax_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Amount_Total">${roundDec(k.magaya__Amount_Total).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td class="magaya__Charge_Type" style="display: none;">${k.magaya__Charge_Type}</td>
                    <td style="display: none;" class="magaya__Tax">${k.magaya__Tax}</td>
                    <td style="display: none;" clss="magaya__Unit">${k.magaya__Unit}</td>
                    <td style="display: none;" class="magaya__Paid_As">${k.magaya__Paid_As}</td>
                    <td style="display: none;" class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                    <td style="display: none;" class="Name">${k.Name}</td>
                    <td style="display: none;" class="magaya__ApplyToAccounts">${accountId}</td>

                </tr>`);


                $("#table-charges-preview tbody").append(`<tr>

                    <td class="Name" id="first">${k.Name}</td>
                    <td align="right" class="magaya__Price">$ ${roundDec(k.magaya__Price).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                    <td align="right" class="magaya__Tax_Amount">${roundDec(k.magaya__Tax_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Amount_Total">${roundDec(k.magaya__Amount_Total).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                </tr>`);

            })
            //totalIncome = roundDec(totalIncome)
            //incorporando data de totales
            $("#table-charges tfoot").append(`<tr><td align="right" colspan="5"><strong>Totals USD</strong></td>
                                        <td align="right"><strong>${amount_.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        </tr>`);

            $("#table-charges-preview tfoot").append(`<tr><td style="border-right: none;" align="right"></td>
                                        <td style="border-left: none;"></td>
                                        <td style="border-left: none;">Total</td>
                                        <td align="right"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        </tr>`);

                                        //console.log(totn_number.toLocaleString('fr-FR'));
            //$("input[name=TotalIncomeCharges]").val(totalIncome)

    } else {
        $("#table-charges tbody").empty()
        $("#table-charges tfoot").empty();

        //$("#info-charge").html("No charges found");
    }
})


storeCharge.subscribe(() => {
    let u = storeCharge.getState().chargesOnNew;
    let amount_ = 0
    let tax_amount_total = 0
    let amount_total = 0

    if (!_.isEmpty(u)) {
        $("#info-charge").html(" ");
        data_module_flag_charge = true

        $("#table-charges-new tbody").empty();
        $("#table-charges-new tfoot").empty();

        if (!_.isEmpty(u)) {

            $.each(u, function(i, k) {

                k.magaya__Status = sanitize(k.magaya__Status);
                k.Name = sanitize(k.Name);
                //k.magaya__ChargeCode = sanitize(k.magaya__ChargeCode);
                k.magaya__Paid_As = sanitize(k.magaya__Paid_As);
                k.magaya__ChargeCurrency = sanitize(k.magaya__ChargeCurrency);

                amount_ += roundDec(k.magaya__Amount);
                tax_amount_total += roundDec(k.magaya__Tax_Amount)
                amount_total += roundDec(k.magaya__Amount_Total)

                $("#table-charges-new tbody").append(`<tr>
                <td class="Delete">
                    <span class="material-icons oculto btn-slide" data-module="table-charges-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-charge-new" data-id=${i}>delete_forever</span>
                </td>
                <td class="magaya__Status">${k.magaya__Status}</td>
                <td align="right" data-type="number" class="NoData">${k.magaya__Charge_Name}</td>
                <td align="right" data-type="number" class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                <td align="right" data-type="number" class="magaya__Price">${k.magaya__Price.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" data-type="number" class="magaya__Amount">${k.magaya__Amount.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" data-type="number" class="magaya__Tax_Amount">${k.magaya__Tax_Amount.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" data-type="number" class="magaya__Amount_Total">${k.magaya__Amount_Total.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="magaya__Charge_Type" style="display: none;">${k.magaya__Charge_Type}</td>
                <td class="magaya__Tax" style="display: none;">${k.magaya__Tax}</td>
                <td class="magaya__TaxRate" style="display: none;">${k.magaya__TaxRate}</td>
                <td class="magaya__Unit" style="display: none;">${k.magaya__Unit}</td>
                <td class="magaya__Paid_As" style="display: none;">${k.magaya__Paid_As}</td>
                <td class="magaya__ChargeCurrency" style="display: none;">${k.magaya__ChargeCurrency}</td>
                <td class="Name" style="display: none;">${k.Name}</td>
                </tr>`);
                /*************************
                 * 
                 * LIMPIAR EN LA TABLA LAS CELDAS QUE NO SE MUESTRAN, 
                 * YA Q SE PROCESAN LAS INSERCIONES DESDE EL STORE
                ***************************/

            })


            $("#table-charges-new tfoot").append(`<tr><td colspan="5"class="Delete"><strong>Totals USD</strong></td>
                                        <td align="right" class="Delete"><strong>${amount_.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right" class="Delete"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right" class="Delete"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        </tr>`);
        }

    } else {
        $("#table-charges-new tbody").empty()
        $("#table-charges-new tfoot").empty();

    }
})
