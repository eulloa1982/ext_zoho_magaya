storePorts.subscribe(() => {
    let u = storePorts.getState();
    //console.log("Ports state now", u)
    //fill data address in quote
    $("select[name=magaya__Port_of_Loading]").empty()
    $("select[name=magaya__Port_of_Unloading]").empty()
    //$(".existingPorts").html("(No ports by type found)")

    if (!_.isEmpty(u.portsByType)) {

        //$(".existingPorts").html("")
        $.map(u.portsByType, function (k, v) {
            k.Name = sanitize(k.Name)
            k.Country = sanitize(k.magaya__Country)
            k.magaya__Port_Code = sanitize(k.magaya__Port_Code)
            $(`<option value='${k.id}'>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__Port_of_Loading]");
            $(`<option value='${k.id}'>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__Port_of_Unloading]");

        })


   } /*else {

        //$(".existingPorts").html("(No ports by type found)")

        $.map(u.ports, function (k, v) {
            k.Name = sanitize(k.Name)
            k.Country = sanitize(k.magaya__Country)
            k.magaya__Port_Code = sanitize(k.magaya__Port_Code)
            $(`<option value='${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}'>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__PortofLoading]");
            $(`<option value='${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}'>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__PortofUnloading]");

        })
   }*/

    })






