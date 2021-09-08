//get an item, draw the data view
storeItem.subscribe(() => {
    let u = storeItem.getState().singleItem;

    //construir los campos y la data
    let append = ''
    let id = 0;
    //find id charge
    $.map(u[1], function(k, v) {
        id = u[1].id
    })
    /*if (id === undefined || id === 'undefined' || id === null) {
        id = u[0]
    }*/
    $("#info-datad").empty()
    $.map(u[1], function(k, v) {
        if ( _.has(ITEMS_FIELDS, v)) {
            let field = _.get(ITEMS_FIELDS, [v, 'field'])
            append += `<div class="row" style="margin: 5px 5px 5px 5px">
            <div data-id="${id}" class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${field}</div>
            <div data-id="${id}" class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px"><input type="text" class="form-control no-border" name="${v}" value="${k}"/></div>
            </div>`
        }
    })

    append += `<div class='close'>Close</div>`
    $("#info-datad").append(append)

})

//new items on table-items-new
storeItem.subscribe(() => {
    let u = storeItem.getState().itemsOnNew;
    $("#table-items-new tbody").empty();
    if (!_.isEmpty(u)) {
        $.each(u, function(i, k) {
            let measure_system = "in";
            let measure_system_volume = "lb";
            if (k.magaya__Measure_System === "International") {
                measure_system = "m";
                measure_system_volume = "kg";
            }

            $("#table-items-new tbody").append(`<tr>
            <td class='Delete'>
                <span class="material-icons edit btn-slide" data-id="${i}">create</span>
                <span class="material-icons delete del-item-warehouse-new" data-id=${i}>clear</span>
            </td>
            <td class="magaya__Pieces"><input type="text" class="form-control no-border" value="${k.magaya__Pieces}"/></td>
            <td class='Name'><input type="text" class="form-control" value="${k.Name}" /></td>
            <td class="magaya__Length"><input type="text" class="form-control" value="${roundDec(k.magaya__Length)}"/>(${measure_system})</td>
            <td class="magaya__Height"><input type="text" class="form-control" value="${roundDec(k.magaya__Height)}"/>(${measure_system})</td>
            <td class="magaya__Width"><input type="text" class="form-control" value="${roundDec(k.magaya__Width)}" />(${measure_system})</td>
            <td class="magaya__Weigth"><input type="text" class="form-control" value="${roundDec(k.magaya__Weigth)}" />(${measure_system_volume})</td>
            <td class="magaya__Volume"><input type="text" class="form-control" value="${roundDec(k.magaya__Volume)}"/></td>
            <td class='magaya__Status' style="display: none;">InQuote</td>
            <td class='magaya__Measure_System' style="display: none;">${k.magaya__Measure_System}</td>
            </tr>`);

        })
    }
})


//////subscriber items, render UI table
storeItem.subscribe(() => {
    let u = storeItem.getState().items;
    $("#table-items tbody").empty();
    $.each(u, function(i, k) {
        let volume = parseFloat(k.magaya__Length) * parseFloat(k.magaya__Height) * parseFloat(k.magaya__Weigth);
        let quote = k.magaya__SQuote_Name.id;

        let measure_system = "in";
        let measure_system_volume = "lb";
        if (k.magaya__Measure_System === "International") {
            measure_system = "m";
            measure_system_volume = "kg";
        }

        let appendData = `<tr>
        <td class="Delete">
            <span class="material-icons edit btn-slide" data-id="${i}">create</span>
            <span class="material-icons del-item-warehouse-new" data-id=${i}>clear</span>
        </td>
        <td><input type="text" class="form-control no-border" name="magaya__Pieces" value="${k.magaya__Pieces}"/></td>
        <td class='Name'><input type="text" class="form-control no-border" name="Name" value="${k.Name}" /></td>
        <td><input type="text" class="form-control no-border" name="magaya__Length" value="${k.magaya__Length}"/>(${measure_system})</div></td>
        <td><input type="text" class="form-control no-border" name="magaya__Height" value="${k.magaya__Height}"/><div style="display:block;">(${measure_system})</div></td>
        <td><input type="text" class="form-control no-border" name="magaya__Width" value="${k.magaya__Width}" /><div style="display:inline-block;">(${measure_system})</div></td>
        <td><input type="text" class="form-control no-border" name="magaya__Weigth" value="${k.magaya__Weigth}" /><div style="display:inline;">(${measure_system_volume})</div></td>
        <td class="magaya__Volume">${k.magaya__Volume}</td>
        <td class="magaya__Status" style="display: none;">InQuote</td>
        <td class='magaya__Measure_System' style="display: none;">${k.magaya__Measure_System}</td>
        </tr>`
        $("#table-items tbody").append(appendData);

    }) //each

})
