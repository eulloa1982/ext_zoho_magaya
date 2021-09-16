//get one charge
storeChargesCrm.subscribe(() => {
    let u = storeChargesCrm.getState();

    if (!_.isEmpty(u.chargesType)) {
        $("#sortable-crm").empty()
        let content = ``
        $.map(u.chargesType, function(k, v) {
            //console.log(k, v)
            content += ` <label class="list-group-item"><div class="sm">
            <input data-id="${k.id}" class="form-check-crm" type="checkbox" value="">
            <i class="edit-data fa fa-eye"></i></div>${k.Name}</label>`

        })

        $(content).appendTo("#sortable-crm")
    } else {

        content = `<li class="list-group-item" >No Data</li>`
    }



})

