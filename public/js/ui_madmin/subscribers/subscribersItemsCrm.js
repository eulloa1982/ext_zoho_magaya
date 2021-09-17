//get one charge
storeCrm.subscribe(() => {
    let u = storeCrm.getState();
    if (!_.isEmpty(u.itemsCrm)) {
        $("#sortable-crm").empty()
        let content = ``
        $.map(u.itemsCrm, function(k, v) {
            if (!_.isEmpty(k)) {
                content += ` <label class="list-group-item"><div class="sm">
                <input data-id="${k.id}" class="form-check-crm" type="checkbox" value="">
                </div>${k.Name}</label>`

            }

        })

        $(content).appendTo("#sortable-crm")
    } else {

        content = `<li class="list-group-item" >No Data</li>`
    }



})

