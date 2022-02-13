/**************************************************************************************
 *
 *  subscriptor de store/storeItems.js
 * Este archivo:
 * 1- Dibuja el formulario de items en nueva cotizacion y edicion de cotizacion
 * 2- Dibuja las tablas de los items en el modal de nueva cotizacion y edicion de cotizacion ,
 * 3- Dibuja la tabla items del preview de cotizacion
 *
 ************************************************************************************/

//nueva cotizacion = true, edit cotizacion = false
//se utiliza para discriminar el dibujo de los botones y tablas
//por ejemplo: si es una edicion de mquote, el boton del item seria updateItem
let data_module_flag_item = true

//get an item, draw the data view
storeItem.subscribe(() => {
    //storeItem.getState().singleItem => item activo (en formulario) en cotizacion nueva o editada
    let u = storeItem.getState().singleItem;
    //empty charge
    let y = storeItem.getState().itemNew;
    let showEmpty = storeItem.getState().showEmptyItem;

    //dibujo del charge activo (el que se encuentra en el formulario)
    if (!_.isEmpty(u)) {
        //construir los campos y la data
        let k = u[0]
        let idItem = 0;
        //find id charge
        $.map(u[1], function(k, v) {
            idItem = u[1].id
        })

        //formulario item -> barra de navegacion
        //establece tipo de tabla y botones
        let data_module = data_module_flag_item ? "table-items-new" : "table-items"
        let no_border = data_module_flag_item ? "no-border-item-new" : "no-border-item"
        let button_type = data_module_flag_item ? "updateItemNew" : "updateItem"

        //editar items
        if ($("#table-items").is(':hidden')) {
            //If (nuevo item) else (edita item) del formulario nueva mquote
            if (showEmpty) {
                $("#arrows-item").empty()
                $("#title_legend2").html("New Item")
                no_border = 'new-item'

                $("#sendItem").hide()
                $("#newItem").show()
                $("#updateItemss").hide()
                $("#updateItemNew").hide()
            } else {
                $("#title_legend2").html("Editing Item")
                let arrow_prev = `<span class="material-icons cursor-hand oculto2">arrow_back_ios_new</span>`
                let arrow_next = `<span class="material-icons cursor-hand oculto2">arrow_forward_ios</span>`
                let size = _.size(storeItem.getState().itemsOnNew)
                let index_prev = Number(k) - 1
                let index_next = Number(k) + 1

                if (index_prev >= 0) {
                    arrow_prev = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_prev}">arrow_back_ios_new</span>`
                }
                if (index_next < size) {
                    arrow_next = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_next}">arrow_forward_ios</span>`
                }

                let arrows = `${arrow_prev} ${arrow_next}`

                $("#arrows-item").html(arrows)
                $("#sendItem").hide()
                $("#newItem").hide()
                $("#updateItemss").hide()
                $("#updateItemNew").show()
            }
        } else {
            //If (nuevo item) else (edita item) del formulario edita mquote
            if (showEmpty) {
                $("#arrows-item").empty()
                $("#title_legend2").html("New Item")
                $("#sendItem").show()
                $("#newItem").hide()
                $("#updateItemss").hide()
                $("#updateItemNew").hide()
            } else {
                $("#title_legend2").html("Editing Item")
                let arrow_prev = `<span class="material-icons cursor-hand oculto2">arrow_back_ios_new</span>`
                let arrow_next = `<span class="material-icons cursor-hand oculto2">arrow_forward_ios</span>`
                let size = _.size(storeItem.getState().items)
                let index_prev = Number(k) - 1
                let index_next = Number(k) + 1

                if (index_prev >= 0) {
                    arrow_prev = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_prev}">arrow_back_ios_new</span>`
                }
                if (index_next < size) {
                    arrow_next = `<span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${index_next}">arrow_forward_ios</span>`
                }

                let arrows = `${arrow_prev} ${arrow_next}`

                $("#arrows-item").html(arrows)
                $("#sendItem").hide()
                $("#newItem").hide()
                $("#updateItemss").show()
                $("#updateItemNew").hide()
            }
        }

        let append = ``
        $("#panel-legend").html(`Editing Item`)
        let arr = {}

        //llenar el formulario
        $.map(u[1], function(k, v) {

            if (_.isObject(k) && !v.includes("$")) {
                let id = k.id
                $(`select[name=${v}]`).addClass('new-item')
                $(`select[name=${v}]`).attr('data-id', id)
                if (id > 0)
                    $(`select[name=${v}]`).val(k.id)
            }

            if (!_.isObject(v) && !v.includes("$")) {
                if (!_.isObject(k)) {
                    $(`input[name=${v}]`).removeClass('new-item no-border-item-new no-border-item').addClass(no_border)
                    $(`select[name=${v}]`).removeClass('new-item no-border-item-new no-border-item').addClass(no_border)
                    $(`#${v}`).removeClass('new-item no-border-item-new no-border-item').addClass(no_border)
                    $(`input[name=${v}]`).attr('data-id', idItem)
                    $(`select[name=${v}]`).attr('data-id', idItem)
                    $(`#${v}`).attr('data-id', idItem)
                    $("#updateItemss").attr('data-id', idItem)

                    $(`input[name=${v}]`).val(k)
                    $(`select[name=${v}]`).val(k)
                    //en el campo Name, poner Package_Description
                    if (v === "Name") {
                        $(`#magaya__Package_Description`).val(k)
                    }

                }
            }
        })
    }


    /**************************************************************
     * ************************************************************
     * tablas de items (new y edit mquote)
    ***************************************************************
    **************************************************************/

    /*********************************************************************
     * items en nueva cotizacion
     * el item del formulario se agrega al store
     * se lee del store itemsOnNew y se dibuja lo que hay en el
    **********************************************************************/
    let itemsNew = storeItem.getState().itemsOnNew;
    $("#table-items-new tbody").empty();
    $("#table-items-new tfoot").empty();

    if (!_.isEmpty(itemsNew)) {
        data_module_flag_item = true;

        let totalPieces = 0
        let totalVolume = 0
        let totalWeight = 0
        let total_weight_international = 0
        let total_volume_international = 0
        let total_weight_english = 0
        let total_volume_english = 0

        //en la tabla deben ir ambos sistemas (international y anglosajon)
        //calculo y conversion de valores de una unidad de medida a la otra
        $.each(itemsNew, function(i, k) {
            //quitar las ',' separadoras de miles
            item_volume = k.magaya__Volume0 ? k.magaya__Volume0.toString().replace(/[,]/g, '') : 0
            item_height = k.magaya__Height ? k.magaya__Height.toString().replace(/[,]/g, '') : 0
            item_width = k.magaya__Width ? k.magaya__Width.toString().replace(/[,]/g, '') : 0
            item_length = k.magaya__Length ? k.magaya__Length.toString().replace(/[,]/g, '') : 0
            item_weigth = k.magaya__Weigth ? k.magaya__Weigth.toString().replace(/[,]/g, '') : 0
            item_pieces = parseInt(k.magaya__Pieces)
            let measure_length_other_system = "m";
            let measure_volume_other_system = "m3";
            let measure_weigth_other_system = "kg";

            let item_volume_other_system  = 0
            let item_height_other_system = 0
            let item_width_other_system = 0
            let item_length_other_system = 0
            let item_weigth_other_system = 0

            item_volume_english = 0

            let measure_length = "in";
            let measure_weigth = "lb";
            let measure_volume = "ft3"

            if (k.magaya__Measure_System === "International") {
                measure_length = "m";
                measure_volume = "m3";
                measure_weigth = "kg";

                measure_length_other_system = "in";
                measure_volume_other_system = "ft3";
                measure_weigth_other_system = "lb";

                total_volume_international += roundDec(item_volume * item_pieces)
                total_weight_international += roundDec(item_weigth * item_pieces)

                item_width_other_system = k.magaya__Width * 39.3701
                item_length_other_system = k.magaya__Length * 39.3701
                item_height_other_system = k.magaya__Height * 39.3701
                item_weigth_other_system = roundDec(item_weigth * item_pieces * 2.20462)
                item_volume_other_system =  roundDec(item_volume * item_pieces * 35.3147)

            } else {
                //pulgadas y libras
                total_volume_english += roundDec(item_volume * item_pieces)
                total_weight_english += roundDec(item_weigth * item_pieces)

                //set other system values
                item_length_other_system = k.magaya__Length * 0.0254
                item_width_other_system = k.magaya__Width * 0.0254
                item_height_other_system = k.magaya__Height * 0.0254
                item_weigth_other_system = roundDec(item_weigth * item_pieces * 0.453592)
                item_volume_other_system =  roundDec(item_volume * item_pieces * 0.0283168)
            }
            //set totales
            totalPieces += item_pieces

            if (!k.Name)
                k.Name = k.magaya__Package_Type.name

            //dibujar la tabla
            $("#table-items-new tbody").append(`<tr>
                   <td class='edit'>
                     <span class="material-icons oculto btn-slide" data-module="table-items-new" data-id="${i}">create</span>
                     <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>delete_forever</span>
                 </td>
                 <td class='description'>${sanitize(k.Name)}</td>
                 <td align="center">${k.magaya__Pieces}</td>
                 <td align="right">
                     ${roundDec(item_length).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                     ${roundDec(item_length_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                 </td>
                 <td align="left" style="border-left: none;">${measure_length}<br /> ${measure_length_other_system}</td>

                 <td align="right" >
                     ${roundDec(item_height).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}<br />
                     ${roundDec(item_height_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                 </td>
                 <td align="left" style="border-left: none;">${measure_length}<br /> ${measure_length_other_system}</td>

                 <td align="right">
                     ${roundDec(item_width).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}<br />
                     ${roundDec(item_width_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}<br />
                 </td>
                 <td align="left" style="border-left: none;">${measure_length}<br /> ${measure_length_other_system}</td>

                 <td align="right">
                     ${roundDec(item_weigth * item_pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                     ${roundDec(item_weigth_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                 </td>
                 <td align="left" style="border-left: none;">${measure_weigth} <br /> ${measure_weigth_other_system}</td>

                 <td align="right">
                     ${roundDec(item_volume * item_pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}<br />
                     ${roundDec(item_volume_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                 </td>
                 <td align="left" style="border-left: none;">${measure_volume} <br /> ${measure_volume_other_system}</td>

                 </tr>`);

             })

             //get all to international system
             totalWeightInternational = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
             totalVolumeInternational = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

             //fila de totales
             $("#table-items-new tfoot").append(`<tr><td align="right" colspan="2" class="Delete">Totals</td>
             <td align="center"><strong>${totalPieces}</strong></td>
             <td colspan="6"></td>

             <td align="right">
                 <strong>${roundDec(totalWeightInternational).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                 ${roundDec(totalWeightInternational * 2.20462).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</strong>
             </td>
             <td style="border-left: none;"><strong> kg <br /> lb</strong></td>

             <td align="right">
                 <strong>${roundDec(totalVolumeInternational).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                 <strong>${roundDec(totalVolumeInternational * 35.3147).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
             </td>
             <td style="border-left: none;"><strong> m3 <br /> ft3</strong></td>

             </tr>`)
    }

    /***************************************************************************
     * items en edicion de cotizacion
     * el item del formulario se agrega directamente al CRM
     * se lee del store la variable 'items' y se dibuja la tabla
     ***************************************************************************/
     let itemsEdit = storeItem.getState().items;
     $("#table-items tbody").empty();
     $("#table-items tfoot").empty();
     $("#table-items-preview tbody").empty();
     $("#table-items-preview tfoot").empty();

     if (!_.isEmpty(itemsEdit)) {
        data_module_flag_item = false;
        let totalPieces = 0
        let totalVolume = 0
        let totalWeight = 0
        let total_weight_international = 0
        let total_volume_international = 0
        let total_weight_english = 0
        let total_volume_english = 0

        $.each(itemsEdit, function(i, k) {
            let measure_length = "in";
            let measure_volume = "ft3";
            let measure_weigth = "lb";
            let measure_length_other_system = "m";
            let measure_volume_other_system = "m3";
            let measure_weigth_other_system = "kg";

            let item_volume_english = 0
            let item_height_other_system = 0
            let item_width_other_system = 0
            let item_length_other_system = 0
            let item_weigth_other_system = 0

            if (k.magaya__Measure_System === "International") {
                measure_length = "m";
                measure_volume = "m3";
                measure_weigth = "kg";
                measure_length_other_system = "in";
                measure_volume_other_system = "ft3";
                measure_weigth_other_system = "lb";

                total_volume_international += roundDec(k.magaya__Total_V)
                total_weight_international += roundDec(k.magaya__Total_Weight)

                item_width_other_system = k.magaya__Width * 39.3701
                item_length_other_system = k.magaya__Length * 39.3701
                item_height_other_system = k.magaya__Height * 39.3701
                item_weigth_other_system = roundDec(k.magaya__Total_Weight * 2.20462)
                item_volume_other_system =  roundDec(k.magaya__Total_V * 35.3147)

            } else {
                //pulgadas y libras
                total_volume_english += roundDec(k.magaya__Total_V)
                total_weight_english += roundDec(k.magaya__Total_Weight)

                //set other system values
                item_length_other_system = k.magaya__Length * 0.0254
                item_width_other_system = k.magaya__Width * 0.0254
                item_height_other_system = k.magaya__Height * 0.0254
                item_weigth_other_system = roundDec(k.magaya__Total_Weight * 0.453592)
                item_volume_other_system =  roundDec(k.magaya__Total_V * 0.0283168)
            }

            totalPieces += parseInt(k.magaya__Pieces)
            totalVolume += roundDec(k.magaya__Total_V)
            totalWeight += roundDec(k.magaya__Total_Weight)
            k.Name = sanitize(k.Name);
            let appendData = `<tr>
                <td>
                    <span class="material-icons oculto btn-slide" data-module="table-items" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-warehouse" data-id=${k.id}>delete_forever</span>
                </td>

                <td>${sanitize(k.Name)}</td>
                <td align="center">${k.magaya__Pieces}</td>
                <td align="right">
                    ${roundDec(k.magaya__Length).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                    ${roundDec(item_length_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                </td>
                <td align="left" style="border-left: none;">${measure_length}<br /> ${measure_length_other_system}</td>

                <td align="right">
                    ${roundDec(k.magaya__Height).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                    ${roundDec(item_height_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                </td>
                <td align="left" style="border-left: none;">${measure_length}<br /> ${measure_length_other_system}</td>

                <td align="right">
                    ${roundDec(k.magaya__Width).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                    ${roundDec(item_width_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                </td>
                <td align="left" style="border-left: none;">${measure_length}<br /> ${measure_length_other_system}</td>

                <td align="right">
                    ${roundDec(k.magaya__Weigth * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                    ${roundDec(item_weigth_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                </td>
                <td align="left" style="border-left: none;">${measure_weigth} <br /> ${measure_weigth_other_system}</td>

                <td align="right">
                    ${roundDec(k.magaya__Total_V).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}<br />
                    ${roundDec(item_volume_other_system).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}

                </td>
                <td align="left" style="border-left: none;">${measure_volume} <br /> ${measure_volume_other_system}</td>

            </tr>`
             $("#table-items tbody").append(appendData);

             //preview
             let package_type = ''
             if (!_.isEmpty(k.magaya__Package_Type))
                package_type = k.magaya__Package_Type.name

            let appendPreview = `<tr>
                <td class='Name'>${sanitize(package_type)}</td>
                <td class='Name'>${sanitize(k.Name)}</td>
                <td align="right" class="magaya__Pieces">${k.magaya__Pieces}</td>
                <td align="right" class="magaya__Dimensions" style="border-right: none;">
                    ${roundDec(k.magaya__Length).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                        *
                    ${roundDec(k.magaya__Height).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                       *
                    ${roundDec(k.magaya__Width).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}
                    (${measure_length})
                </td>
                <td align="right" class="magaya__Weigth" style="border-right: none;">${roundDec(k.magaya__Weigth * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} ${measure_weigth}</td>
                <td align="right" class="NoData">${roundDec(k.magaya__Volume0).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} ${measure_volume}</td>
            </tr>`

            $("#table-items-preview").append(appendPreview)

         })

        totalWeightInternational = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
        totalVolumeInternational = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

        //fila de totales
        $("#table-items tfoot").append(`<tr><td align="right" colspan="2"><strong>Totals</td>
                                    <td align="center"><strong style="margin-right: 4px;">${totalPieces}</strong></td>
                                    <td colspan="6"></td>
                                    <td align="right">
                                        <strong>${roundDec(totalWeightInternational).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                                        ${roundDec(totalWeightInternational * 2.20462).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</strong>
                                    </td>
                                    <td style="border-left: none;"><strong> kg <br /> lb</strong></td>

                                    <td align="right">
                                        <strong>${roundDec(totalVolumeInternational).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} <br />
                                        ${roundDec(totalVolumeInternational * 35.3147).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</strong>
                                    </td>
                                    <td style="border-left: none;"><strong> m3 <br /> ft3</strong></td></tr>`)

         $("#table-items-preview tfoot").append(`<tr><td style="border-right: none;"></td>
                                    <td style="border-left: none;">Total</td>
                                    <td align="right" class="Delete"><strong style="margin-right: 4px;">${totalPieces}</strong></td>
                                    <td style="border-left: none;"></td>
                                    <td align="right"><strong>
                                        ${roundDec(totalWeightInternational).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} kg <br />
                                        ${roundDec(totalWeightInternational * 2.20462).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} lb
                                    </td>
                                    <td align="right"><strong>${roundDec(totalVolumeInternational).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} m3</td></tr>`)
    }
})

