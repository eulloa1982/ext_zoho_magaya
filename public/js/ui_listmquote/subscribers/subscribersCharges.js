/**************************************************************************************
 *
 *  subscriptor de store/storeCharges.js
 * Este archivo:
 * 1- Dibuja el formulario de charges en nueva cotizacion y edicion de cotizacion
 * 2- Dibuja las tablas de los charges en el modal de nueva cotizacion y edicion de cotizacion ,
 * 3- Dibuja la tabla charge del preview de cotizacion
 *
 ************************************************************************************/

//nueva cotizacion = true, edit cotizacion = false
//se utiliza para discriminar el dibujo de los botones y tablas
//por ejemplo: si es una edicion de mquote, el boton del charge seria updateCharge
let data_module_flag_charge = true

storeCharge.subscribe(() => {
    //storeCharge.getState().singleCharge => charge activo (en formulario) en cotizacion nueva o editada
    let u = storeCharge.getState().singleCharge;
    let y = storeCharge.getState().emptyCharge[1];
    let showEmpty = storeCharge.getState().showEmptyCharge;

    //dibujo del charge activo (el que se encuentra en el formulario)
    if (!_.isEmpty(u)) {
        let k = parseInt(u[0])
        //construir los campos y la data
        let idCharge = 0;
        let idTax = 0;
        //find id charge
        let applyToName = ''
        $.map(u[1], function(k, v) {
            idCharge = u[1].id
        })

        //formulario charge -> barra de navegacion
        //establece tipo de tabla y botones
        let data_module = data_module_flag_charge ? "table-charges-new" : "table-charges"
        let button_type = data_module_flag_charge ? "updateChargeNew" : "updateCharge"
        let no_border = data_module_flag_charge ? "no-border-charge-new" : "no-border-charge"

        //editar charges
        if ($("#table-charges").is(':hidden')) {

            //no existe charge aun, esconder los indicadores de navegacion (< >)
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

        //llenar el formulario charges
        $.map(u[1], function(k, v) {
            if (k === null || k === 'null')
                k = ''

            //establecer el id del charge que se utiliza despues
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

                    $(`input[name=${v}]`).val(k.toLocaleString('en-US', {  minimumFractionDigits: 2  } ))
                    $(`select[name=${v}]`).val(k)
                    $(`#${v}`).val(k)
                }
            }


        })

        //agregar apply to a modo de informacion
        append = `<div class="row">
        <div class="col-md-4">Apply To</div>
        <div class="col-md-6"><input type="text" class="form-control" value="" readonly></div>
        </div>`

        //append
        $("#info-datad").append(append)
    }


    /**************************************************************
     * ************************************************************
     * tablas de charges (new y edit mquote)
    ***************************************************************
    **************************************************************/

    /*********************************************************************
     * charges en editar cotizacion
     * el charge del formulario se agrega al store
     * se lee del store la variable charges y se dibuja lo que hay en ella
    **********************************************************************/
     let chargeEdit = storeCharge.getState().charges;

    //si existen charges en la mquote, dibujarlos
    //inicialmente limpiar las tablas
    $("#table-charges tbody").empty();
    $("#table-charges tfoot").empty();
    $("#table-charges-preview tbody").empty();
    $("#table-charges-preview tfoot").empty();

    if (!_.isEmpty(chargeEdit)) {
        $("#info-charge").html(" ");
        console.log(chargeEdit)
        data_module_flag_charge = false;
        let accountId = 0;
        let amount_ = 0
        let tax_amount_total = 0
        let amount_total = 0

        //preparar los charges para dibujarlos en la tabla
        $.each(chargeEdit, function(i, k) {
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

            //dibujar los datos de los charges que lleva la tabla
            $("#table-charges tbody").append(`<tr>
                    <td>
                        <span class="material-icons oculto btn-slide" data-module="table-charges" data-id="${i}">create</span>
                        <span class="material-icons oculto del-item-charge" data-id=${k.id}>delete_forever</span>
                    </td>
                    <td>${k.magaya__Status}</td>
                    <td id="first">${name_charge}</td>
                    <td align="right">${k.magaya__CQuantity}</td>
                    <td align="right">${roundDec(k.magaya__Price).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right">${roundDec(k.magaya__Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right">${roundDec(k.magaya__Tax_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right">${roundDec(k.magaya__Amount_Total).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>

                </tr>`);

                //tabla preview de la mquote
                $("#table-charges-preview tbody").append(`<tr>

                    <td class="Name" id="first">${k.Name}</td>
                    <td align="right" class="magaya__Price">$ ${roundDec(k.magaya__Price).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                    <td align="right" class="magaya__Tax_Amount">${roundDec(k.magaya__Tax_Amount).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                    <td align="right" class="magaya__Amount_Total">${roundDec(k.magaya__Amount_Total).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                </tr>`);

            })

            //fila de los totales tabla modal
            $("#table-charges tfoot").append(`<tr><td align="right" colspan="5"><strong>Totals USD</strong></td>
                                        <td align="right"><strong>${amount_.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        </tr>`);

            //fila de los totales tabla preview
            $("#table-charges-preview tfoot").append(`<tr><td style="border-right: none;" align="right"></td>
                                        <td style="border-left: none;"></td>
                                        <td style="border-left: none;">Total</td>
                                        <td align="right"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        </tr>`);


    }

    /******************************************************************************
     * charges en nueva cotizacion
     * el charge del formulario se agrega al store
     * se lee del store la variable 'chargesOnNew' y se dibuja lo que hay en ella
    *******************************************************************************/
    let chargesNew = storeCharge.getState().chargesOnNew;
    let amount_ = 0
    let tax_amount_total = 0
    let amount_total = 0

    $("#table-charges-new tbody").empty();
    $("#table-charges-new tfoot").empty();

    if (!_.isEmpty(chargesNew)) {
        $("#info-charge").html(" ");
        data_module_flag_charge = true

            $.each(chargesNew, function(i, k) {

                k.magaya__Status = sanitize(k.magaya__Status);
                k.Name = sanitize(k.Name);
                k.magaya__Paid_As = sanitize(k.magaya__Paid_As);
                k.magaya__ChargeCurrency = sanitize(k.magaya__ChargeCurrency);

                amount_ += roundDec(k.magaya__Amount);
                tax_amount_total += roundDec(k.magaya__Tax_Amount)
                amount_total += roundDec(k.magaya__Amount_Total)

                $("#table-charges-new tbody").append(`<tr>
                <td>
                    <span class="material-icons oculto btn-slide" data-module="table-charges-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-charge-new" data-id=${i}>delete_forever</span>
                </td>
                <td>${k.magaya__Status}</td>
                <td>${k.magaya__Charge_Name}</td>
                <td align="right" data-type="number">${k.magaya__CQuantity}</td>
                <td align="right" data-type="number">${k.magaya__Price.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" data-type="number">${k.magaya__Amount.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" data-type="number">${k.magaya__Tax_Amount.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td align="right" data-type="number">${k.magaya__Amount_Total.toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                </tr>`);
            })

            //fila de totales
            $("#table-charges-new tfoot").append(`<tr><td colspan="5"><strong>Totals USD</strong></td>
                                        <td align="right"><strong>${amount_.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${tax_amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        <td align="right"><strong>${amount_total.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong></td>
                                        </tr>`);
    }

})

