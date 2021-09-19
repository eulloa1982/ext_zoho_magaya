storePorts.subscribe(() => {
    let u = storePorts.getState();
    console.log("Ports state nowi", u)
    //fill data address in quote
    if (!_.isEmpty(u.ports)) {
        $.map(u.ports, function (k, v) {
            k.Name = sanitize(k.Name)
            k.Country = sanitize(k.magaya__Country)
            k.magaya__Port_Code = sanitize(k.magaya__Port_Code)
            $(`<option value='${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}' selected>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__PortofLoading]");
            $(`<option value='${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}' selected>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__PortofUnloading]");

        })

      // $(`<option value='${accountQuote.id}' selected>${accountQuote.Account_Name}</option>`).appendTo("select[name=Account]");

    }

    })






