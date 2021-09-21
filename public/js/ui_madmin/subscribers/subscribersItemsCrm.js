//get one charge
storeCrm.subscribe(() => {
    let u = storeCrm.getState();
    if (!_.isEmpty(u.itemsCrm)) {
        $("#sortable-crm").empty()
        let content = ``
        $.map(u.itemsCrm, function(k, v) {
            if (!_.isEmpty(k)) {
                content += ` <label class="list-group-item">
                <input data-id="${k.id}" class="form-check-crm" type="checkbox" value="">

                <span class="material-icons" data-id="${k.id}">visibility</span>${k.Name}</label>`

            }

        })

        $(content).appendTo("#sortable-crm")
    } else {

        content = `<li class="list-group-item" >No Data</li>`
    }



})

