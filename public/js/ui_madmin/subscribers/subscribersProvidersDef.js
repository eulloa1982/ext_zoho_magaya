//get one charge
storeProvidersDef.subscribe(() => {
    let providers = storeProvidersDef.getState().providersDef;
    let active = storeProvidersDef.getState().active;

    //console.log("Ports status now", portsA)
    //console.log("Ports active now", active)

    $("#sortable-magaya-providers").empty();
    if (!_.isEmpty(providers) && active) {
        let content = ''
        $.map(providers, function(k, v) {
            //if (k.AccountDefinition.Type === "Income") {
            content = `<label class="list-group-item" data-id="${v}"><div class="sm">
                <input data-id="${v}" class="form-check-magaya" type="checkbox" value="">
                </div>${k.Name}  ${k.Country}</label>`
            //}
            $("#sortable-magaya-providers").append(content);
        })

    }

})

