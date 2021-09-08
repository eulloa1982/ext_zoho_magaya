    /*SHIPMENTS*/
    function showShipmentDetails (dataShipment) {
        $('#charges-shipment tbody').html("")
        $('#cargo-shipment tbody').html("")
        $('#carrier-data').html("")
        $('#consignee-data').html("")
        $('#billing-data').html("")
        $("#origin-port").html("")
        $("#destination-port").html("")
        $("#estimatedDepartureDate").html("")
        $("#estimatedArrivalDate").html("")

        $("#estimatedDepartureDate").html(dataShipment.EstimatedDepartureDate)
        $("#estimatedArrivalDate").html(dataShipment.EstimatedArrivalDate)

        if (!_.isEmpty(dataShipment["Charges"])) {
            var content = '';
            var cantElem = [].concat.apply([], dataShipment["Charges"]["Charge"]).length
            if (cantElem > 1 ) {
                console.log("Mas de uno charge")
                $.each(dataShipment["Charges"]["Charge"], function (k, v) {
                    content += `<tr><td>${v.Status}</td><td>${v.ChargeDefinition["Type"]}</td>
                    <td>${v.ChargeDefinition["Description"]}</td>
                    <td>${v.ChargeDefinition["Amount"]}</td>
                    <td>${v.Price}</td>
                    <td>${v.Quantity}</td>
                    <td>${v.PriceInCurrency}</td><td>${v.Entity["Name"]}</td></tr>`

                })
            } else {

                content += `<tr><td>${dataShipment["Charges"]["Charge"]["Status"]}</td><td>${dataShipment["Charges"]["Charge"]["ChargeDefinition"]["Type"]}</td>
                    <td>${dataShipment["Charges"]["Charge"]["ChargeDefinition"]["Description"]}</td>
                    <td>${dataShipment["Charges"]["Charge"]["ChargeDefinition"]["Amount"]}</td>
                    <td>${dataShipment["Charges"]["Charge"]["Price"]}</td>
                    <td>${dataShipment["Charges"]["Charge"]["Quantity"]}</td>
                    <td>${dataShipment["Charges"]["Charge"]["PriceInCurrency"]}</td>
                    <td>${dataShipment["Charges"]["Charge"]["Entity"]["Name"]}</td></tr>`

            }
            $('#charges-shipment tbody').html(content)

        }
        if (!_.isEmpty(dataShipment["Items"])) {
            var content = '';
            var cantElem = [].concat.apply([], dataShipment["Items"]["Item"]).length
            if (cantElem > 1) {
                $.each(dataShipment["Items"]["Item"], function (k, v) {
                    content += `<tr><td>${v.Status}</td><td>${v.Pieces}</td>
                    <td>${v.PackageName}</td>
                    </tr>`
                    /*<td>${v.ChargeDefinition["Amount"]}</td>
                    <td>${v.Price}</td>
                    <td>${v.Quantity}</td>
                    <td>${v.PriceInCurrency}</td><td>${v.Entity["Name"]}</td>*/

                })
            } else {
                content += `<tr><td>${dataShipment["Items"]["Item"]["Status"]}</td><td>${dataShipment["Items"]["Item"]["Pieces"]}</td>
                    <td>${dataShipment["Items"]["Item"]["PackageName"]}</td>
                    </tr>`

            }
                $('#cargo-shipment tbody').html(content)
        }

        if (!_.isEmpty (dataShipment.Carrier)) {
            var content = `Name: ${dataShipment["Carrier"]["Name"]}<br />
                            Email: ${dataShipment["Carrier"]["Email"]}<br />
                            Phone: ${dataShipment["Carrier"]["Phone"]}<br />`
            $("#carrier-data").html(content);

        }

        if (!_.isEmpty (dataShipment.Consignee)) {
            var content = `Name: ${dataShipment.Consignee.Name}<br />
                            Email: ${dataShipment.Consignee.Email}<br />
                            Phone: ${dataShipment.Consignee.Phone}<br />`
            $("#consignee-data").html(content);

        }

        if (!_.isEmpty (dataShipment.BillingClient)) {
            var content = `Name: ${dataShipment.BillingClient.Name}<br />
                            Email: ${dataShipment.BillingClient.Email}<br />
                            Phone: ${dataShipment.BillingClient.Phone}<br />`
            $("#billing-data").html(content);

        }

        if (!_.isEmpty (dataShipment.OriginPort)) {
            var content = `Country: ${dataShipment.OriginPort.Country}<br />
                            Name: ${dataShipment.OriginPort.Name}<br />
                            Code: ${dataShipment.OriginPort["@attributes"]["Code"]}<br />`
            $("#origin-port").html(content);
        }

        if (!_.isEmpty (dataShipment.DestinationPort)) {
            var content = `Country: ${dataShipment.DestinationPort.Country}<br />
                            Name: ${dataShipment.DestinationPort.Name}<br />
                            Code: ${dataShipment.DestinationPort["@attributes"]["Code"]}<br />`
            $("#destination-port").html(content);

        }
    }

    /*SHIPMENTS*/
    var DataShipments = [];
        /*config = Utils.getConfig()
        //if(!config.url){
            //$("#no-configuration-alert").show();
        //}else{
            flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
            type = MagayaAPI.TRANSACTION_TYPES.Shipment

            data = {
                method: 'GetTransRangeByDate',
                data: [
                    Utils.getAccessKey(),
                    type,
                    moment('1970-01-01').format('Y-MM-DD'),
                    moment().format('Y-MM-DD'),
                    flags
                ]
            }
            MagayaAPI.sendRequest(data, function(result){
                if(result.error){
                    Swal.fire({
                        title: result.error,
                        text: result.data,
                        icon: 'error'
                    })
                }else{

                    content = '';
                    if($.isEmptyObject(result.data)){
                        content = '<tr><td rowspan=10>Not records exists</td></tr>';
                    }else{
                        var i = 0;

                        //air shipment
                        if (!_.isEmpty(result.data["AirShipment"])) {
                            var content = '';
                            $.each(result.data["AirShipment"], function (k, valor) {
                                if (!_.isEmpty(valor["FromQuoteNumber"])) {
                                    var desc = '';
                                    DataShipments.push(valor);
                                    if (!_.isEmpty(valor['ModeOfTransportation'])) {
                                        desc = valor['ModeOfTransportation']['Description'];
                                    }

                                    content += `<tr><td>${valor.Number}</td>
                                    <td>${valor.CreatedOn}</td>
                                    <td>${valor.ShipperName}</td>
                                    <td>${desc}</td>
                                    <td>${valor.ConsigneeName}</td>
                                    <td>${valor.CarrierName}</td>
                                    <td>${valor.Service}</td><td>${valor.Status}</td>
                                    <td>${valor.Direction}</td>`;
                                    content += `<td><button class="btn btn-primary btn-sm view-shipment" data-guid="${valor["@attributes"]['GUID']}"><i class="fa fa-eye"></i></button></td>`;
                                    content += `</tr>`;
                                    i++;
                                    $('#air-shipments tbody').html(content)
                                }
                            })
                    }

                        //ocean shipment
                        if (!_.isEmpty(result.data["OceanShipment"])) {
                            var content = '';
                            $.each(result.data["OceanShipment"], function (k, valor) {
                                if (!_.isEmpty(valor["FromQuoteNumber"])) {

                                    DataShipments.push(valor);
                                    var desc = '';
                                    if (!_.isEmpty(valor['ModeOfTransportation'])) {
                                        desc = valor['ModeOfTransportation']['Description'];
                                    }

                                    content += `<tr><td>${valor.Number}</td>
                                    <td>${valor.CreatedOn}</td>
                                    <td>${valor.ShipperName}</td>
                                    <td>${desc}</td>
                                    <td>${valor.ConsigneeName}</td>
                                    <td>${valor.CarrierName} <br /></td>
                                    <td>${valor.Service}</td><td>${valor.Status}</td>
                                    <td>${valor.Direction}</td>`;
                                    content += `<td><button class="btn btn-primary btn-sm view-shipment" data-guid="${valor["@attributes"]['GUID']}"><i class="fa fa-eye"></i></button></td>`;
                                    content += `</tr>`;
                                    i++;
                                    $('#ocean-shipments tbody').html(content)
                                }
                            })
                        }

                        //ground shipment
                        if (!_.isEmpty(result.data["GroundShipment"])) {
                            var content = '';
                            $.each(result.data["GroundShipment"], function (k, valor) {
                                if (!_.isEmpty(valor["FromQuoteNumber"])) {

                                    DataShipments.push(valor);
                                    var desc = '';
                                    if (!_.isEmpty(valor['ModeOfTransportation'])) {
                                        desc = valor['ModeOfTransportation']['Description'];
                                    }

                                    content += `<tr><td>${valor.Number}</td>
                                    <td>${valor.CreatedOn}</td>
                                    <td>${valor.ShipperName}</td>
                                    <td>${desc}</td>
                                    <td>${valor.ConsigneeName}</td>
                                    <td>${valor.CarrierName} <br /></td>
                                    <td>${valor.Service}</td><td>${valor.Status}</td>
                                    <td>${valor.Direction}</td>`;
                                    content += `<td><button class="btn btn-primary btn-sm view-shipment" data-guid="${valor["@attributes"]['GUID']}"><i class="fa fa-eye"></i></button></td>`;
                                    content += `</tr>`;
                                    i++;
                                    $('#ground-shipments tbody').html(content)
                                }
                            })
                        }

                        console.log(DataShipments);
                    }

                }
            })
        //}*/


    function search_shipment_by_date(startDate, endDate) {
        config = Utils.getConfig()
        //if(!config.url){
            //$("#no-configuration-alert").show();
        //}else{
            flags = MagayaAPI.TRANSACTIONS_FLAGS.BasicFields
            type = MagayaAPI.TRANSACTION_TYPES.Shipment

            data = {
                method: 'GetTransRangeByDate',
                data: [
                    Utils.getAccessKey(),
                    type,
                    moment(startDate).format('Y-MM-DD'),
                    moment(endDate).format('Y-MM-DD'),
                    flags
                ]
            }
            MagayaAPI.sendRequest(data, function(result){
                if(result.error){
                    Swal.fire({
                        title: result.error,
                        text: result.data,
                        icon: 'error'
                    })
                }else{
                    content = '';
                    if($.isEmptyObject(result.data)){
                        content = '<tr><td rowspan=10>Not records exists</td></tr>';
                    }else{
                        data = result.data
                        drawDataShipment(data)
                    }
                }

            })

    }


    function drawDataShipment(DataShipment) {
        let content = "";
        let icon = "";
        if (!_.isEmpty(DataShipment) && _.isObject(DataShipment)) {
            $('#air-shipments tbody').empty()
            //keyDataShipment = Object.keys(DataShipment);
            //cantKeys = keyDataShipment.length()*/
            _.forEach(DataShipment, function (va, valor) {

                if (_.isObject(va)) {
                    if (valor === "AirShipment")
                        icon = `<i class="fa fa-plane" aria-hidden="true"></i>`
                    else if (valor === "OceanShipment")
                        icon = `<i class="fa fa-ship" aria-hidden="true"></i>`
                    else if (valor === "GroundShipment")
                        icon = `<i class="fa fa-truck" aria-hidden="true"></i>`
                    else
                        icon = ""

                    $.map (va, function(v) {
                        DataShipments.push(v)

                        if (!_.isEmpty(v["FromQuoteNumber"])) {
                            var desc = '';
                                if (!_.isEmpty(v['ModeOfTransportation'])) {
                                    desc = v['ModeOfTransportation']['Description'];
                                }

                                content += `<tr><td>${v.Number}</td>
                                <td>${v.CreatedOn}</td>
                                <td>${v.ShipperName}</td>
                                <td>${desc}</td>
                                <td>${v.ConsigneeName}</td>
                                <td>${v.CarrierName}</td>
                                <td>${v.Service}</td><td>${v.Status}</td>
                                <td>${v.Direction}</td>
                                <td>${icon}</td>`;
                                content += `<td><button class="btn btn-primary btn-sm view-shipment" data-guid="${v["@attributes"]['GUID']}"><i class="fa fa-eye"></i></button></td>`;
                                content += `</tr>`;

                                $('#air-shipments tbody').html(content)
                            }
                    })

                }
            });
        }
    }

    /////////////////////////////////////////////////////////////////////
    //Listener on dinamic table form
    /////////////////////////////////////////////////////////////////////
    $('#air-shipments').bind("DOMSubtreeModified", function(){
        $(".view-shipment"). one ("click", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var guid = $(this).attr("data-guid")
            guidChecking = DataShipments.findIndex(i => i["@attributes"]["GUID"] === guid);
            showShipmentDetails(DataShipments[guidChecking])
            $("#show-shipment").modal()

        })

    }) //end listener on #new-quotation-form

        $("#cancel").click (function ( ) {
            $('#charges > tbody').empty();
            $('#items > tbody').empty();
        })


    //date_range button search
    $("#search_shipment").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
         //comprobar las fechas primero
         let val =  $("#date_range").val()
         //validaFechas(val);
         date = val.split(" - ");

         //compararlos
         //startDate < endDate
         let compareRange = compareTimeDate(date[0], date[1]);
         //endDate < now
         now = new Date();
         let compareNow = compareTimeDate(date[1], now)
         if (compareRange && compareNow) {
            search_shipment_by_date(date[0], date[1]);
         } else {
             message = "Existen problemas con las fechas";
             swalMessage(message);
             console.log ("Problemas con las fechas")
         }



         //search_shipment_by_date(date[0], date[1]);

    })
