//get one charge
var chargeDef = []
storeChargesDef.subscribe(() => {
    let u = storeChargesDef.getState();
    let content = ''
    console.log("Magaya items status", u)
    $("#sortable-magaya").empty();
    if (!_.isEmpty(u.currentItems)) {
        $.map(u.currentItems, function(k, v) {
            //if (k.AccountDefinition.Type === "Income") {
                content += `<label class="list-group-item" data-id="${v}"><div class="sm">
                <input data-id="${v}" class="form-check-magaya" type="checkbox" value="">
                </div>${k.Code}  ${k.Description}</label>`
            //}

        })
        $("#sortable-magaya").append(content);
    }

    if (!_.isEmpty(u.singleChargeDef)) {
        chargeDef = u.singleChargeDef
    }

})

