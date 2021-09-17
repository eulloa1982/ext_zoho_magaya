storePorts.subscribe(() => {
    let u = storePorts.getState();
    console.log("Ports state nowi", u)
    //fill data address in quote
    if (!_.isEmpty(u.ports)) {
        $.map(u.ports, function (k, v) {
            $(`<option value='${k.Name}' selected>${k.Name}</option>`).appendTo("select[name=Port_Loading]");
            $(`<option value='${k.Name}' selected>${k.Name}</option>`).appendTo("select[name=Port_Unloading]");

        })

      // $(`<option value='${accountQuote.id}' selected>${accountQuote.Account_Name}</option>`).appendTo("select[name=Account]");

    }

    })






