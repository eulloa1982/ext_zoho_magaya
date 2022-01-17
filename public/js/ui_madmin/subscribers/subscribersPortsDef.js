//get one charge
storePortsDef.subscribe(() => {
    let portsA = storePortsDef.getState().ports;
    let active = storePortsDef.getState().active;

    //console.log("Ports status now", portsA)
    //console.log("Ports active now", active)

    $("#sortable-magaya-ports").empty();
    if (!_.isEmpty(portsA) && active) {
        let content = ''
        $.map(portsA, function(k, v) {
            console.log("Port", k)
            //if (k.AccountDefinition.Type === "Income") {
            content = `<label class="list-group-item" data-id="${v}">
                <input data-id="${v}" class="form-check-magaya" type="checkbox" value="">
                ${k.Name}  (<strong>Country:</strong> ${k.Country}, <strong>Method: </strong> ${k.Method})</label>`
            //}
            $("#sortable-magaya-ports").append(content);
        })

    }

})

