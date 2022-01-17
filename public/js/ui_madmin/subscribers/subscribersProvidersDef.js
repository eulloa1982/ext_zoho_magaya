//get one charge
storeProvidersDef.subscribe(() => {
    let providers = storeProvidersDef.getState().providersDef;
    let active = storeProvidersDef.getState().active;

    $("#sortable-magaya-providers").empty();
    if (!_.isEmpty(providers) && active) {
        let content = ''
        $.map(providers, function(k, v) {
            //if (k.AccountDefinition.Type === "Income") {
            content = `<label class="list-group-item" data-id="${v}">
                <input data-id="${v}" class="form-check-magaya" type="checkbox" value="">
                ${k.Name}  (<strong>Email:</strong> ${k.Email}, <strong>Type: </strong> ${k.CarrierInfo.CarrierTypeCode})</label>`
            //}
            $("#sortable-magaya-providers").append(content);
        })

    }

})

