//get one charge
storeChargesCrm.subscribe(() => {
    let u = storeChargesCrm.getState();
    console.log("State charges type crm now", u)
    if (!_.isEmpty(u.chargesType)) {
        $("#sortable-crm").empty()
        let content = ``
        $.map(u.chargesType, function(k, v) {
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

