//get one charge
storeCrm.subscribe(() => {
    let u = storeCrm.getState();
    //console.log("State item crm", u)
    if (!_.isEmpty(u.itemsCrm)) {
        $("#sortable-crm").empty()
        let content = ``
        $.map(u.itemsCrm, function(k, v) {
            if (!_.isEmpty(k)) {
                content += ` <label class="list-group-item">
                <input data-id="${k.id}" class="form-check-crm" type="checkbox" value="">

                <span class="material-icons view-crm" data-id="${sanitize(k.id)}">visibility</span>${sanitize(k.Name)}</label>`

            }

        })

        $(content).appendTo("#sortable-crm")
    } else {

        content = `<li class="list-group-item" >No Data</li>`
    }


    if (!_.isEmpty(u.itemCrm)) {
        let idRecord = 0;
        let append = ``
        $("#form").empty()
        $.map(u.itemCrm[0], function(k, v) {

            idRecord = u.itemCrm[0].id
            if ( _.has(ITEMS_CRM, v)) {

                if (!k)
                    k = ""
                let field = _.get(ITEMS_CRM, [v, 'field'])
                let values = _.has(ITEMS_CRM, [v, "values"]) ? _.get(ITEMS_CRM, [v, 'values']) : ''
                input = `<input type="text" class="form-control" name="${v}" value="${k}"/>`

                if (!_.isEmpty(values)) {

                    input = `<select name="${v}" class="form-control">`
                    $.map(values, function(val) {
                        if (val === k)
                            input += `<option value="${val}" selected>${val}</option>`
                        else
                            input += `<option value="${val}">${val}</option>`
                    })
                    input += `</select>`
                }

                append += `<div class="row" style="margin: 5px 5px 5px 5px">
                    <div class="col-md-4" style="font-weight: bold; padding: 5px 5px 5px 5px">${field}</div>
                    <div class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${input}</div>
                    </div>`
            }
        })

        //tipo de boton
        if (!u.newItem)
            append += `<span data-id="${idRecord}" class="btn btn-primary float-right" id="save-record">Save</span><br /><br />`
        else
            append += `<span class="btn btn-primary float-right" id="add-record">Save</span><br /><br />`

        $("#form").append(append)

    }


})

