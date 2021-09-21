//get one charge
var currentModule = ''
storeCurrentModule.subscribe(() => {
    let u = storeCurrentModule.getState();
    currentModule = u.currentModule
    if (!_.isEmpty(currentModule)) {
        $("#sortable-crm").empty()
        storeCrm.dispatch(emptyItemsCrm())
    }
    /*if (!_.isEmpty(u.currentModule)) {
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
    }*/



})

