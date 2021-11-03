//si es true el module es table-items-new, sino es table-items
let data_module_flag_item = true

//get an item, draw the data view
storeItem.subscribe(() => {
    //console.log("State items", storeItem.getState())
    let u = storeItem.getState().singleItem;
    //empty charge
    let y = storeItem.getState().itemNew;
    let showEmpty = storeItem.getState().showEmptyItem;

    if (!_.isEmpty(u)) {

        //construir los campos y la data
        let k = u[0]
        let idItem = 0;
        //find id charge
        $.map(u[1], function(k, v) {
            idItem = u[1].id
        })
        let data_module = data_module_flag_item ? "table-items-new" : "table-items"
        let no_border = data_module_flag_item ? "no-border-item-new" : "no-border-item"
        let button_type = data_module_flag_item ? "updateItemNew" : "updateItem"


        if ($("#table-items").is(':hidden')) {


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

                    if (v === "Name") {
                        $(`#magaya__Package_Description`).val(k)
                    }

                }
            }
        })
    }



    if (!_.isEmpty(y) && showEmpty) {
        $.map(y, function (k, v) {
            //console.log("Show empty", `${k}, ${v}`)
            //s$(`input[name=${v}`).val(k)
        })
    }

})

//new items on table-items-new
storeItem.subscribe(() => {
    //console.log("State item now", storeItem.getState())
    let u = storeItem.getState().itemsOnNew;

    if (!_.isEmpty(u)) {
        data_module_flag_item = true;
        $("#table-items-new tbody").empty();
        $("#table-items-new tfoot").empty();

        if (!_.isEmpty(u)) {
            let totalPieces = 0
            let totalVolume = 0
            let totalWeight = 0
            let total_weight_international = 0
            let total_volume_international = 0
            let total_weight_english = 0
            let total_volume_english = 0
            $.each(u, function(i, k) {
                let measure_length = "in";
                let measure_weigth = "lb";
                let measure_volume = "ft3"

                if (k.magaya__Measure_System === "International") {
                    measure_length = "m";
                    measure_volume = "m3";
                    measure_weigth = "kg"

                    total_volume_international += roundDec(k.magaya__Volume * k.magaya__Pieces)
                    total_weight_international += roundDec(k.magaya__Weigth * k.magaya__Pieces)
                //it suposes it is English
                } else {
                    //pulgadas y libras
                    total_volume_english += roundDec(k.magaya__Volume * k.magaya__Pieces)
                    total_weight_english += roundDec(k.magaya__Weigth * k.magaya__Pieces)
                }
                //get totales
                totalPieces += parseInt(k.magaya__Pieces)

                $("#table-items-new tbody").append(`<tr>
                <td class='Delete'>
                    <span class="material-icons oculto btn-slide" data-module="table-items-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>delete_forever</span>
                </td>
                <td class='Name'>${sanitize(k.Name)}</td>
                <td align="center" class="magaya__Pieces">${k.magaya__Pieces}</td>
                <td align="right" class="magaya__Length">${roundDec(k.magaya__Length).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="NoData" align="left">${measure_length}</td>
                <td align="right" class="magaya__Height">${roundDec(k.magaya__Height).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="NoData" align="left">${measure_length}</td>
                <td align="right" class="magaya__Width">${roundDec(k.magaya__Width).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="NoData" align="left">${measure_length}</td>
                <td align="right" class="magaya__Weigth">${roundDec(k.magaya__Weigth * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="NoData" align="left">${measure_weigth}</td>
                <td align="right" class="magaya__Volume">${roundDec(k.magaya__Volume * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
                <td class="NoData" align="left">${measure_volume}</td>

                <td class="magaya__Status" style="display: none;">InQuote</td>
                <td class='magaya__Measure_System' style="display: none;">${k.magaya__Measure_System}</td>
                <td class='magaya__Package_Type' style="display: none;">${k.magaya__Package_Type.id}</td>
                </tr>`);

            })



            //get all to international system
            totalWeight = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
            totalVolume = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

            $("#table-items-new tfoot").append(`<tr><td align="right" colspan="2" class="Delete">Totals</td>
            <td align="center" class="Delete"><strong>${totalPieces}</strong></td>
            <td colspan="6"></td>
            <td align="right" class="Delete"><strong>${roundDec(totalWeight).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td><td><strong> kg</strong></td>
            <td align="right" class="Delete"><strong>${roundDec(totalVolume).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td><td><strong> m3</strong></td></tr>`)
        }

    } else {
        $("#table-items-new tbody").empty()
        $("#table-items-new tfoot").empty();
    }
})


//////subscriber items, render UI table
storeItem.subscribe(() => {
    let u = storeItem.getState().items;

    if (!_.isEmpty(u)) {
        data_module_flag_item = false;
        let totalPieces = 0
        let totalVolume = 0
        let totalWeight = 0
        let total_weight_international = 0
        let total_volume_international = 0
        let total_weight_english = 0
        let total_volume_english = 0

        $("#table-items tbody").empty();
        $("#table-items tfoot").empty();
        $("#table-items-preview tbody").empty();
        $("#table-items-preview tfoot").empty();

        $.each(u, function(i, k) {
            let measure_length = "in";
            let measure_volume = "ft3";
            let measure_weigth = "lb";

            if (k.magaya__Measure_System === "International") {
                measure_length = "m";
                measure_volume = "m3";
                measure_weigth = "kg";

                total_volume_international += roundDec(k.magaya__Volume * k.magaya__Pieces)
                total_weight_international += roundDec(k.magaya__Weigth * k.magaya__Pieces)
            //it suposes it is English
            } else {
                //pulgadas y libras
                total_volume_english += roundDec(k.magaya__Volume * k.magaya__Pieces)
                total_weight_english += roundDec(k.magaya__Weigth * k.magaya__Pieces)
            }

            totalPieces += parseInt(k.magaya__Pieces)
            totalVolume += roundDec(k.magaya__Volume)
            totalWeight += roundDec(k.magaya__Weigth)
            k.Name = sanitize(k.Name);
            let appendData = `<tr>
            <td class="Delete">
                <span class="material-icons oculto btn-slide" data-module="table-items" data-id="${i}">create</span>
                <span class="material-icons oculto del-item-warehouse" data-id=${k.id}>delete_forever</span>
            </td>

            <td class='Name'>${sanitize(k.Name)}</td>
            <td align="center" class="magaya__Pieces">${k.magaya__Pieces}</td>
            <td align="right" class="magaya__Length" style="border-right: none;">${roundDec(k.magaya__Length).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
            <td align="left" class="NoData"style="border-left: none;">${measure_length}</td>
            <td align="right" class="magaya__Height" style="border-right: none;">${roundDec(k.magaya__Height).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
            <td align="left" class="NoData" style="border-left: none;">${measure_length}</td>
            <td align="right" class="magaya__Width" style="border-right: none;">${roundDec(k.magaya__Width).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
            <td align="left" class="NoData" style="border-left: none;">${measure_length}</td>
            <td align="right" class="magaya__Weigth" style="border-right: none;">${roundDec(k.magaya__Weigth * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
            <td align="left" class="NoData" style="border-left: none;">${measure_weigth}</td>
            <td align="right" class="magaya__Volume" style="border-right: none;">${roundDec(k.magaya__Volume * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td>
            <td align="left" class="NoData" style="border-left: none;">${measure_volume}</td>

            <td class="magaya__Status" style="display: none;">InQuote</td>
            <td class='magaya__Package_Type' style="display: none;">${k.magaya__Package_Type}</td>
            <td class='magaya__Measure_System' style="display: none;">${k.magaya__Measure_System}</td>
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
            <td align="right" class="magaya__Volume" style="border-right: none;">${roundDec(k.magaya__Volume * k.magaya__Pieces).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} ${measure_volume}</td>
            </tr>`

            $("#table-items-preview").append(appendPreview)

        }) //each

        totalWeight = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
        totalVolume = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

        $("#table-items tfoot").append(`<tr><td align="right" colspan="2" class="Delete"><strong>Totals</td>
                                                <td align="center" class="Delete"><strong style="margin-right: 4px;">${totalPieces}</strong></td>
                                                <td colspan="6"></td>
                                                <td align="right" class="Delete" style="border-right: none;"><strong>${roundDec(totalWeight).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td><td style="border-left: none;"><strong> kg</strong></td>
                                                <td align="right" class="Delete" style="border-right: none;"><strong>${roundDec(totalVolume).toLocaleString('en-US', {  minimumFractionDigits: 2  } )}</td><td style="border-left: none;"><strong> m3</strong></td></tr>`)

        $("#table-items-preview tfoot").append(`<tr><td><strong>Totals</td>
                                                <td></td><td></td>
                                                <td align="right" class="Delete"><strong style="margin-right: 4px;">${totalPieces}</strong></td>
                                                <td align="right" style="border-right: none;"><strong>${roundDec(totalWeight).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} kg</td>
                                                <td align="right" style="border-right: none;"><strong>${roundDec(totalVolume).toLocaleString('en-US', {  minimumFractionDigits: 2  } )} m3</td></tr>`)



    } else {
        $("#table-items tbody").empty()
        $("#table-items tfoot").empty();
        $("#table-items-preview tbody").empty();
        $("#table-items-preview tfoot").empty();
    }
})
