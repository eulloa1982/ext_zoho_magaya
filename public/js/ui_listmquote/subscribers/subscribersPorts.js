storePorts.subscribe(() => {
    let u = storePorts.getState();
    //console.log("Ports state now", u)
    //fill data address in quote
    $("select[name=magaya__Port_of_Loading]").empty()
    $("select[name=magaya__Port_of_Unloading]").empty()

    if (!_.isEmpty(u.portsByType)) {

        $(`<option></option>`).appendTo("select[name=magaya__Port_of_Loading]");
        $(`<option></option>`).appendTo("select[name=magaya__Port_of_Unloading]");

        $.map(u.portsByType, function (k, v) {
            $(`<option value='${k.id}'>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__Port_of_Loading]");
            $(`<option value='${k.id}'>${k.magaya__Port_Code}, ${k.Name}, ${k.magaya__Country}</option>`).appendTo("select[name=magaya__Port_of_Unloading]");

        })


   }

})






