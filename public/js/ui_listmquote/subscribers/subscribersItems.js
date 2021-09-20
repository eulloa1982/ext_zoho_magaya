//si es true el module es table-items-new, sino es table-items
let data_module_flag_item = true

//get an item, draw the data view
storeItem.subscribe(() => {
    let u = storeItem.getState().singleItem;

    if (!_.isEmpty(u)) {
        //construir los campos y la data
        let k = u[0]
        let id = 0;
        //find id charge
        $.map(u[1], function(k, v) {
            id = u[1].id
        })
        let data_module = data_module_flag_item ? "table-items-new" : "table-items"
        let no_border = data_module_flag_item ? "no-border-item-new" : "no-border-item"
        let button_type = data_module_flag_item ? "updateItemNew" : "updateItem"

        $("#info-datad").empty()
        let append = `
            <span class="material-icons cursor-hand btn-slide ${no_border}" data-module="${data_module}" data-id="${parseInt(k)-1}">arrow_back_ios_new</span>
            <span class="material-icons cursor-hand btn-slide" data-module="${data_module}" data-id="${parseInt(k)+1}">arrow_forward_ios</span>
        `
        $.map(u[1], function(k, v) {
            if ( _.has(ITEMS_FIELDS, v)) {
                let type = "text"
                if (_.has(ITEMS_FIELDS, [v, 'type']))
                    type = "number";

                input = `<input type="text" data-id="${id}" class="form-control ${no_border} ${type}" name="${v}" value="${k}"/>`
                let field = _.get(ITEMS_FIELDS, [v, 'field'])
                let values = _.has(ITEMS_FIELDS, [v, "values"]) ? _.get(ITEMS_FIELDS, [v, 'values']) : ''

                if (!_.isEmpty(values)) {
                    input = `<select data-id="${id}" name="${v}" class="form-control no-border-item">`
                        $.map(values, function(val) {
                            if (val === k)
                                input += `<option value="${val}" selected>${val}</option>`
                            else
                                input += `<option value="${val}" selected>${val}</option>`
                        })
                    input += `</select>`
                }
                append += `<div class="row" style="margin: 5px 5px 5px 5px">
                <div class="col-md-4" style="font-weight: bold; padding: 5px 5px 5px 5px">${field}</div>
                <div data-id="${id}" class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${input}</div>
                </div>`
            }
        })

        append += `<span id="${button_type}" data-id="${id}" class="btn btn-primary">Send</span>`

        $("#info-datad").append(append)
    }

})

//new items on table-items-new
storeItem.subscribe(() => {
    let u = storeItem.getState().itemsOnNew;

    if (!_.isEmpty(u)) {
        data_module_flag_item = true;
        $("#table-items-new tbody").empty();
        if (!_.isEmpty(u)) {
            let totalPieces = 0
            let totalVolume = 0
            let totalWeight = 0
            let total_weight_international = 0
            let total_volume_international = 0
            let total_weight_english = 0
            let total_volume_english = 0
            $.each(u, function(i, k) {

                if (k.magaya__Measure_System === "International") {
                    total_volume_international += roundDec(k.magaya__Volume)
                    total_weight_international += roundDec(k.magaya__Weigth)
                //it suposes it is English
                } else {
                    //pulgadas y libras
                    total_volume_english += roundDec(k.magaya__Volume)
                    total_weight_english += roundDec(k.magaya__Weigth)
                }
                //get totales
                totalPieces += roundDec(k.magaya__Pieces)

                $("#table-items-new tbody").append(`<tr>
                <td class='Delete'>
                    <span class="material-icons oculto btn-slide" data-module="table-items-new" data-id="${i}">create</span>
                    <span class="material-icons oculto del-item-warehouse-new" data-id=${i}>clear</span>
                </td>
                <td class='magaya__Status'>InQuote</td>
                <td class='Name'>${sanitize(k.Name)}</td>
                <td align="right" class="magaya__Pieces">${k.magaya__Pieces}</td>
                <td align="right" class="magaya__Length">${roundDec(k.magaya__Length)}</td>
                <td align="right" class="magaya__Height">${roundDec(k.magaya__Height)}</td>
                <td align="right" class="magaya__Width">${roundDec(k.magaya__Width)}</td>
                <td align="right" class="magaya__Weigth">${roundDec(k.magaya__Weigth)}</td>
                <td align="right" class="magaya__Volume">${roundDec(k.magaya__Volume)}</td>

                <td class='magaya__Measure_System' style="display: none;">${k.magaya__Measure_System}</td>
                </tr>`);

            })



            //get all to international system
            totalWeight = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
            totalVolume = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

            $("#table-items-new tbody").append(`<tr><td align="right" colspan="3" class="Delete">Totals</td>
                                        <td align="right" class="Delete"><strong>${totalPieces}</strong></td><td></td><td></td><td></td>
                                        <td align="right" class="Delete"><strong>${roundDec(totalWeight)} kg</strong></td>
                                        <td align="right" class="Delete"><strong>${roundDec(totalVolume)} m3</strong></td></tr>`)
        }
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
        $.each(u, function(i, k) {
            let measure_system = "in";
            let measure_system_volume = "lb";
            if (k.magaya__Measure_System === "International") {
                measure_system = "m";
                measure_system_volume = "kg";
                total_volume_international += roundDec(k.magaya__Volume)
                total_weight_international += roundDec(k.magaya__Weigth)
            //it suposes it is English
            } else {
                //pulgadas y libras
                total_volume_english += roundDec(k.magaya__Volume)
                total_weight_english += roundDec(k.magaya__Weigth)
            }

            totalPieces += roundDec(k.magaya__Pieces)
            totalVolume += roundDec(k.magaya__Volume)
            totalWeight += roundDec(k.magaya__Weigth)
            k.Name = sanitize(k.Name);
            let appendData = `<tr>
            <td class="Delete">
                <span class="material-icons oculto btn-slide" data-module="table-items" data-id="${i}">create</span>
                <span class="material-icons oculto del-item-warehouse" data-id=${k.id}>clear</span>
            </td>
            <td class="magaya__Status">InQuote</td>
            <td class='Name'>${k.Name}</td>
            <td align="right" class="magaya__Pieces">${k.magaya__Pieces}</td>
            <td align="right" class="magaya__Length">${k.magaya__Length}</td>
            <td align="right" class="magaya__Height">${k.magaya__Height}</td>
            <td align="right" class="magaya__Width">${k.magaya__Width}</td>
            <td align="right" class="magaya__Weigth">${k.magaya__Weigth}</td>
            <td align="right" class="magaya__Volume">${k.magaya__Volume}</td>

            <td class='magaya__Measure_System' style="display: none;">${k.magaya__Measure_System}</td>
            </tr>`
            $("#table-items tbody").append(appendData);

        }) //each

        totalWeight = roundDec(total_weight_international) + roundDec(total_weight_english) * 0.453562
        totalVolume = roundDec(total_volume_international) + roundDec(total_volume_english) * 0.0283168

        $("#table-items tbody").append(`<tr><td align="right" colspan="3" class="Delete">Totals</td>
                                                <td align="right" class="Delete"><strong>${totalPieces}</strong></td><td></td><td></td><td></td>
                                                <td align="right" class="Delete"><strong>${roundDec(totalWeight)} kg</strong></td>
                                                <td align="right" class="Delete"><strong>${roundDec(totalVolume)} m3</strong></td></tr>`)
    }
})
