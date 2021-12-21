$("select[name=TransportationMode]").change(function(e) {
    e.preventDefault();
    var idMethod = $(this).val();
    var parentMethod = '';
    method = transpMethods.findIndex(i => i.id == idMethod);
    if (method >= 0) {
        $("select[name=Carrier]").empty();
        parentMethod = transpMethods[method]['magaya__ParentMethod'];
        $(":input[name=TransportationMethod]").val(parentMethod);
        //console.log("Parent Method", parentMethod);
        $.each(MagayaCarriers, function(k, v) {
            if (v.CarrierInfo.CarrierTypeCode === parentMethod) {
                $(`<option value="${v.Name}">${v.Name}</option>`).appendTo("select[name=Carrier]");
            }
        })
    }
})

$("select[name=Measure_System]").change(function() {
    var value = $("select[name=Measure_System] option:selected").text();
    var length = ($("input[name=Item-Length]").val() > 0) ? $("input[name=Item-Length]").val() : 0;
    var width = ($("input[name=Item-Width]").val() > 0) ? $("input[name=Item-Width]").val() : 0;
    var height = ($("input[name=Item-Height]").val() > 0) ? $("input[name=Item-Height]").val() : 0;
    var label_length = "Length(in)";
    var label_width = "Width(in)";
    var label_height = "Height(in)";
    var label_weight = "Weight(lb)";
    var factor = localStorage.getItem('convert_factor');
    var volume = length * width * height;
    if (value == "International") {
        factor = 1000;
        label_length = "Length(m)";
        label_width = "Width(m)";
        label_height = "Height(m)";
        label_weight = "Weight(Kg)";
    }
    var weight = (volume / factor).toFixed(2);
    $("label[name=Length]").text(label_length);
    $("label[name=Width]").text(label_width);
    $("label[name=Height]").text(label_height);
    $("label[name=Weight]").text(label_weight);
    $("input[name=Item-Weight]").val(weight);
});

$("input[name=Item-Length]").keyup(function(e) {
    e.preventDefault();
    var value = $("select[name=Measure_System] option:selected").text();
    var length = ($("input[name=Item-Length]").val() > 0) ? $("input[name=Item-Length]").val() : 0;
    var width = ($("input[name=Item-Width]").val() > 0) ? $("input[name=Item-Width]").val() : 0;
    var height = ($("input[name=Item-Height]").val() > 0) ? $("input[name=Item-Height]").val() : 0;
    var factor = localStorage.getItem('convert_factor');
    var volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
    if (value == "International") {
        factor = 1000;
    }
    var weight = (volume / factor).toFixed(2);
    //weight = roundDec(volume / factor);
    $("input[name=Item-Weight]").val(weight);
});

$("input[name=Item-Height]").keyup(function(e) {
    e.preventDefault();
    var value = $("select[name=Measure_System] option:selected").text();
    var length = ($("input[name=Item-Length]").val() > 0) ? $("input[name=Item-Length]").val() : 0;
    var width = ($("input[name=Item-Width]").val() > 0) ? $("input[name=Item-Width]").val() : 0;
    var height = ($("input[name=Item-Height]").val() > 0) ? $("input[name=Item-Height]").val() : 0;
    var factor = localStorage.getItem('convert_factor');
    var volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
    if (value == "International") {
        factor = 1000;
    }
    var weight = (volume / factor).toFixed(2);
    $("input[name=Item-Weight]").val(weight);
});

$("input[name=Item-Width]").keyup(function(e) {
    e.preventDefault();
    var value = $("select[name=Measure_System] option:selected").text();
    console.log("value: " + value);
    var length = ($("input[name=Item-Length]").val() > 0) ? $("input[name=Item-Length]").val() : 0;
    var width = ($("input[name=Item-Width]").val() > 0) ? $("input[name=Item-Width]").val() : 0;
    var height = ($("input[name=Item-Height]").val() > 0) ? $("input[name=Item-Height]").val() : 0;
    var factor = localStorage.getItem('convert_factor');
    var volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
    if (value == "International") {
        factor = 1000;
    }
    var weight = (volume / factor).toFixed(2);
    $("input[name=Item-Weight]").val(weight);
});

//button add package
$("#buton-package").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    //agregarCampos();
    rowIndex = $("#select-package").val();

    var packageName = $('select[name="select-package"] option:selected').text();
    var pieces = ($(":input[name=Item-Pieces]").val()) > 0 ? $(":input[name=Item-Pieces]").val() : '1';
    var length = ($(":input[name=Item-Length]").val()) > 0 ? $(":input[name=Item-Length]").val() : (packageType[rowIndex]['magaya__PackageLenght'] >= 0 ? packageType[rowIndex]['magaya__PackageLenght'] : 0);
    var height = ($(":input[name=Item-Height]").val()) > 0 ? $(":input[name=Item-Height]").val() : (packageType[rowIndex]['magaya__PackageHeight'] >= 0 ? packageType[rowIndex]['magaya__PackageHeight'] : 0);
    var width = ($(":input[name=Item-Width]").val()) > 0 ? $(":input[name=Item-Width]").val() : (packageType[rowIndex]['magaya__PackageWidth'] >= 0 ? packageType[rowIndex]['magaya__PackageWidth'] : 0);
    var weight = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeigth'] >= 0 ? packageType[rowIndex]['magaya__PackageWeigth'] : 0);
    var volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
    console.log(packageType[rowIndex])
    console.log(length + ' ' + height + ' ' + width + ' ' + weight);
    //zoho module fields = td class
    dataAppend = `<tr>
                    <td class='Delete'><i class="fa fa-trash del-item-warehouse" aria-hidden="true"></i></td>
                    <td class='magaya__Status'>InQuote</td>
                    <td class='Name'>${packageName}</td>
                    <td class='magaya__Pieces'>${pieces}</td>
                    <td class='magaya__Length'>${roundDec(length)}</td>
                    <td class='magaya__Height'>${roundDec(height)}</td>
                    <td class='magaya__Width'>${roundDec(width)}</td>
                    <td class='magaya__Weigth'>${roundDec(weight)}</td>
                    <td class='magaya__Volume'>${roundDec(volume)}</td>
                     </tr>`;
                     /*<select name="Status" id="Status" class='form-control'>
                     <option value="InQuote" selected>In Quote</option>
                 </select>*/
    $(dataAppend).appendTo("#table-items");

    //reset fields
    $(":input[name=Item-Pieces]").val('')
    $(":input[name=Item-Length]").val('');
    $(":input[name=Item-Height]").val('');
    $(":input[name=Item-Width]").val('');
    $(":input[name=Item-Weight]").val('')

});

$("#addCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let accountId = 0;
        let accountName = '';
        if ($( "div" ).data( "account" )) {
            //accountId = $( "div" ).data( "account" ).idQuote;
            //accountName = $( "div" ).data( "account" ).clientName;
        }

        var ChargeType = $("#ChargeType").val();
        var DescriptionCharges = $("#DescriptionCharges").val().replace(/[^a-zA-Z0-9]/g, ' ');
        var ChargeText = DescriptionCharges;
        //var ApplyTo = $("select[name=ApplyToAccounts] option:selected").text();
        var ApplyTo = $("select[name=ContactName] option:selected").text();
        var ApplyToId = $("select[name=ContactName] option:selected").val();
        console.log("Apply to Id", ApplyToId)
        //si no esta en el contactname, lo tomo del $.data
        if (_.isEmpty(ApplyToId) || ApplyToId === undefined || ApplyToId === 'undefined') {
            ApplyToId = accountId;
            ApplyTo = accountName;
        }

        var Quantity = ($("#Quantity").val() > 0) ? $("#Quantity").val() : 0;
        var Unity = $("#Unity").val() > 0 ? $("#Unity").val() : 0;
        var Price = $("#Price").val() > 0 ? $("#Price").val() : 0;
        Price = roundDec(Price);
        //var Amount = Math.round(Price * 100) / 100;
        var Amount = parseFloat(Quantity) * parseFloat(Price);
        Amount = roundDec(Amount);
        //console.log("cant: " + Quantity + " price: " + Price + " amount: " + Amount);
        var Tax = $("#Tax").val() > 0 ? $("#Tax").val() : 0;
        Tax = roundDec(Tax);
        var CantPlusPrice = parseFloat(Price) + parseFloat(Tax);
        CantPlusPrice = roundDec(CantPlusPrice);

        var TaxPlusAmount = parseFloat(Tax) + parseFloat(Amount);
        TaxPlusAmount = roundDec(TaxPlusAmount);

        var TotalAmount = parseFloat(Tax) + parseFloat(Amount);
        TotalAmount = roundDec(TotalAmount);

        var ChargeCurrency = $("select[name=Currency]").val();
        if (ChargeType != null && ChargeType != "select") {
            content = `<tr><td class="Delete"><i class="fa fa-trash del-item-charge" aria-hidden="true"></i></td>
                <td class="magaya__ChargeCode">${ChargeType}</td>
                <td class="Name">${ChargeText}</td>
                <td class="magaya__Charge_Description">${DescriptionCharges}</td>
                <td class="magaya__CQuantity">${Quantity}</td>
                <td class="magaya__Price">${Price}</td>
                <td class="magaya__Amount">${Amount}</td>
                <td class="magaya__QuanPlusTax">${Tax}</td>
                <td class="NoData">${CantPlusPrice}</td>
                <td class="NoData"></td>
                <td class="magaya__ChargeCurrency">${ChargeCurrency}</td>
                <td class="magaya__GastoOIngreso">${TotalAmount}</td>
                <td class="NoData">${ApplyTo}</td>
                <td class="magaya__ApplyToAccounts">${ApplyToId}</td>
                </tr>`;
            //"magaya__ChargeCurrency"
            //magaya__CantImp
            //magaya__QuanPlusTax
            //reset fields
            $("#ChargeType").val('');
            $("#DescriptionCharges").val('');
            $("#ApplyToAccounts").val('');
            $("#Quantity").val('');
            $("#Unity").val('');
            $("#Price").val('');
            $("#Tax").val('');
            $("#Amount").val('');

            $(content).appendTo("#table-charges tbody");
        } else {
            Swal.fire({
                title: 'Error',
                text: "You need to select a charge type!!",
                icon: 'error'
            })
        }


    }) //end click on addCharges

$('#sortable2').bind("DOMSubtreeModified", function() {
    //view quote from crm button on dinamic table
    $(".view-quote").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $("#contact_info tbody").empty();
        $("#quotation_data tbody").empty();
        $("#destination_data tbody").empty();
        $("#head thead").empty();
        $("#notes tbody").empty();
        $("#charges tbody").empty();
        $("#items tbody").empty();
        var idQuote = 0;
        parent = $(this).parent();
        idQuote = parent[0]['attributes']["data-id"]["nodeValue"];
        var idQuoteArray = arrayQuote.findIndex(i => i["id"] == idQuote);
        var quote = arrayQuote[idQuoteArray]
        console.log(quote);
        $("#toPdf").html("Pdf");
        //if (!_.isEmpty(quote['Account'])) {
        //$("#show-quote input[name=magaya__ContactEmail]").val(quote.Account.magaya__MagayaEmail);
        //$("#show-quote input[name=magaya__ContactMobile]").val(quote.Contact.Phone);

        ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuotes", RecordID: idQuote })
            .then(function(response) {
                idem = response.data;
                if (!_.isEmpty(idem)) {
                    $.each(idem[0], function(k, v) {
                        if (!_.isObject(v) && !k.includes("$")) {
                            $("input[name=" + k + "]").val(v);
                        } else {
                            if (k === "magaya__Stage") {
                                $("input[name='magaya__Stage']").val(v.name);
                            }
                        }
                    })
                    var name = idem[0]["magaya_ContactName"] != null ? idem[0]["magaya_ContactName"] : "               ";
                    var email = idem[0]["magaya_ContactEmail"] != null ? idem[0]["magaya_ContactEmail"] : "               ";
                    var phone = idem[0]["magaya__ContactPhone"] != null ? idem[0]["magaya__ContactPhone"] : "               ";
                    var number = idem[0]["Name"] != null ? idem[0]["Name"] : "";
                    var created_time = idem[0]["Created_Time"] != null ? idem[0]["Created_Time"] : "";
                    var exp_date = idem[0]["magaya__ExpirationDate"] != null ? idem[0]["magaya__ExpirationDate"] : "";
                    var issued_name = idem[0]["magaya__IssuedBy"] != null ? idem[0]["magaya__IssuedBy"] : "";
                    var type_of_move = '';
                    if (!_.isEmpty(idem[0]["magaya__TransportationMode"])) {
                        type_of_move = idem[0]["magaya__TransportationMode"]["name"];
                    }

                    $("#contact_info tbody").append(
                        `
                            <tr>
                                <th style="width: 30%;text-align:left;"><img src='icons/contact.png' width='35px' height='35px'></th>
                                <td style="text-align:left;">${organizationInfo[0]["company_name"]}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;"><img src='icons/email.png' width='35px' height='35px'></th>
                                <td style="text-align:left;">${organizationInfo[0]["primary_email"]}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;"><img src='icons/phone.png' width='35px' height='35px'></th>
                                <td style="text-align:left;">${organizationInfo[0]["phone"]}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;"><img src='icons/link.png' width='35px' height='35px'></th>
                                <td style="text-align:left;">${organizationInfo[0]["website"]}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;"><img src='icons/location.png' width='35px' height='35px'></th>
                                <td style="text-align:left;">${organizationInfo[0]["street"]}, ${organizationInfo[0]["city"]},  ${organizationInfo[0]["state"]}. ${organizationInfo[0]["country"]}, ${organizationInfo[0]["country_code"]}</td>
                            </tr>
                            `);
                    $("#quotation_data tbody").append(
                        `<tr>
                                <th width="40%" style="text-align:left;border: 1px solid #000;">Quotation Number:</th>
                                <td style="text-align:left;border: 1px solid #000;"> ${number}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;border: 1px solid #000;">Date/Time:</th>
                                <td style="text-align:left;border: 1px solid #000;">${created_time}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;border: 1px solid #000;">Expiration Date:</th>
                                <td style="text-align:left;border: 1px solid #000;">${exp_date}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;border: 1px solid #000;">Employee:</th>
                                <td style="text-align:left;border: 1px solid #000;">${issued_name}</td>
                            </tr>
                            <tr>
                                <th style="text-align:left;border: 1px solid #000;">Payments Terms:</th>
                                <td style="text-align:left;border: 1px solid #000;"></td>
                            </tr>`);
                    $("#destination_data tbody").append(
                        `<tr>
                                <th colspan="6" width="50%" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Origin</th>
                                <th colspan="6" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Destination</th>
                            </tr>
                            <tr>
                                <td colspan="6" style="border: 1px solid #000;"></td>
                                <td colspan="6" style="border: 1px solid #000;"></td>
                            </tr>
                            <tr>
                                <td colspan="6" style="border: 1px solid #000;"></td>
                                <td colspan="6" style="border: 1px solid #000;"></td>
                            </tr>
                            <tr>
                                <td colspan="6" style="border: 1px solid #000;"></td>
                                <td colspan="6" style="border: 1px solid #000;"></td>
                            </tr>
                            <tr>
                                <td colspan="2" width="15%" style="border: 1px solid #000;">Type of Move:</td>
                                <td colspan="2" width="15%" style="border: 1px solid #000;">${type_of_move}</td>
                                <td colspan="2" width="15%" style="border: 1px solid #000;">Origin:</td>
                                <td colspan="2" width="15%" style="border: 1px solid #000;"></td>
                                <td colspan="2" width="15%" style="border: 1px solid #000;">Destination:</td>
                                <td colspan="2" width="15%" style="border: 1px solid #000;"></td>
                            </tr>`);
                }
            });
        $("#head thead").append(
            `<th colspan="12" style="width: 100%; background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: center;">Cargo Information</th>`
        );

        ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
            .then(function(response) {
                $("#charges thead").empty();
                $("#charges tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemCharges = response.data
                    amountTotal = cont = 0;
                    $("#charges thead").append(
                        `<th colspan="6" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Description of Charges</th>
                                <th colspan="2" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: right;">Quantity</th>
                                <th colspan="2" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: right;">Price</th>
                                <th colspan="2" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: right;">Amount</th>`
                    );
                    $.each(idemCharges, function(i, k) {
                        cont++;
                        amountTotal += parseFloat(k.magaya__Amount);
                        k.Name = sanitize(k.Name)
                        //k.Description
                        $("#charges tbody").append(
                            `<tr>
                                            <td colspan="6" style="border: 1px solid #000;">${k.Name}</td>
                                            <td colspan="2" style="border: 1px solid #000;text-align: right;">${k.magaya__CQuantity}</td>
                                            <td colspan="2" style="border: 1px solid #000;text-align: right;">$${k.magaya__Price}</td>
                                            <td colspan="2" style="border: 1px solid #000;text-align: right;">$${k.magaya__Amount}</td>
                                        </tr>`);
                        //<tr><td width="50%" colspan="5"></td><td>${k.Name}</td><td>${k.magaya__Quantity}</td><td>${k.magaya__Price}</td><td>${k.magaya__Quantity * k.magaya__Price}</td></tr>

                    })
                    $("#charges tbody").append(
                        `<tr>
                                    <td colspan="10" style="border: 1px solid #000;text-align: right;font-weight:bold;">Total</td>
                                    <td colspan="2" style="border: 1px solid #000;text-align: right;font-weight:bold;">$${roundDec(amountTotal)}</td>
                                </tr>`);
                    //<tr><td colspan="5"></td><td>Total</td><td></td><td></td><td>${amountTotal}</td></tr>
                }
            })

        ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
            .then(function(response) {
                $("#items thead").empty();
                $("#items tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemItems = response.data;
                    var mass_measure = localStorage.getItem("size_unit");
                    $("#items thead").append(
                        `<th style="border: 1px solid #000;">Pieces</th>
                                        <th colspan="5" style="border: 1px solid #000;">Description</th>
                                        <th colspan="2" style="border: 1px solid #000;text-align: right;">Weight</th>
                                        <th colspan="2" style="border: 1px solid #000;text-align: right;">Volume</th>
                                        <th colspan="2" style="border: 1px solid #000;text-align: right;">Volume Weight</th>`
                    );
                    //arrayItem.push(response.data)
                    $.each(idemItems, function(i, k) {
                        var weight = k.magaya__Weigth > 0 ? k.magaya__Weigth : 0;
                        var volume = k.magaya__Volume > 0 ? k.magaya__Volume : 0;
                        k.Name = sanitize(k.Name)
                        $("#items tbody").append(
                            `<tr>
                                                <td style="border: 1px solid #000;">${k.magaya__Pieces}</td>
                                                <td colspan="5" style="border: 1px solid #000;">${k.Name}</td>
                                                <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(weight)} ${mass_measure}</td>
                                                <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(volume)} ${mass_measure}</td>
                                                <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(weight)} ${mass_measure}</td>
                                            </tr>`
                        );
                        //<tr><td class='magaya__Pieces'>${k.magaya__Pieces}</td><td class='Name'>${k.Name}</td><td class='magaya__Length'>${k.magaya__Length} x ${k.magaya__Length} x ${k.magaya__Width}</td><td>${k.magaya__Weigth}</td><td>${k.magaya__Volume}</td></tr>
                    })
                }
            })

        $('#show-quote-id').modal({ show: true });
        //}
    }); //click on view-quote
})

//view magaya quote
$('#sortable1').bind("DOMSubtreeModified", function() {
        $(".view-quote-magaya").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $("#toPdf").html("Pdf");
            idQuoteMagaya = 0;
            parent = $(this).parent().parent().attr("data-idArray");
            quote = arrayMagayaQuotes[parent]

            if (quote != null) {
                $("#contact_info tbody").empty();
                $("#quotation_data tbody").empty();
                $("#destination_data tbody").empty();
                $("#charges thead").empty();
                $("#charges tbody").empty();
                $("#items thead").empty();
                $("#items tbody").empty();
                $("#head thead").empty();
                $("#notes tbody").empty();
                //set general data
                $("#show-quote input[name=Name]").val(quote.Number)
                $("#show-quote input[name=Created_Time]").val(quote.CreatedOn);
                $("#show-quote input[name=magaya__ExpirationDate]").val(quote.ExpirationDate);
                $("#show-quote input[name=magaya__IssuedBy]").val(quote.IssuedByName);
                $("#show-quote input[name=magaya__ContactName]").val(quote.ContactName);
                //$("#show-quote input[name=magaya__Description]").val(quote.ContactName);
                var type_of_move = '';
                var dir_consignee = '';
                var dir_shipper = '';

                if (!_.isEmpty(quote.ModeOfTransportation)) {
                    type_of_move = quote.ModeOfTransportation.Description;
                }
                if (!_.isEmpty(quote.Consignee)) {
                    if (!_.isEmpty(quote.Consignee.BillingAddress))
                        dir_consignee = quote.Consignee.BillingAddress.City + ', ' + quote.Consignee.BillingAddress.Street;
                }
                if (!_.isEmpty(quote.Shipper)) {
                    if (!_.isEmpty(quote.Shipper.BillingAddress))
                        dir_shipper = quote.Shipper.BillingAddress.City + ', ' + quote.Shipper.BillingAddress.Street;
                }

                $("#contact_info tbody").append(
                    `<tr>
                            <th style="width: 30%;text-align:left;"><img src='icons/contact.png' width='35px' height='35px'></th>
                            <td style="text-align:left;">${organizationInfo[0]["company_name"]}</td>
                        </tr>
                        <tr>
                            <th style="text-align:left;"><img src='icons/email.png' width='35px' height='35px'></th>
                            <td style="text-align:left;">${organizationInfo[0]["primary_email"]}</td>
                        </tr>
                        <tr>
                            <th style="text-align:left;"><img src='icons/phone.png' width='35px' height='35px'></th>
                            <td style="text-align:left;">${organizationInfo[0]["phone"]}</td>
                        </tr>
                        <tr>
                            <th style="text-align:left;"><img src='icons/link.png' width='35px' height='35px'></th>
                            <td style="text-align:left;">${organizationInfo[0]["website"]}</td>
                        </tr>
                        <tr>
                            <th style="text-align:left;"><img src='icons/location.png' width='35px' height='35px'></th>
                            <td style="text-align:left;">${organizationInfo[0]["street"]}, ${organizationInfo[0]["city"]},  ${organizationInfo[0]["state"]}. ${organizationInfo[0]["country"]}, ${organizationInfo[0]["country_code"]}</td>
                        </tr>
                        `);

                $("#quotation_data tbody").append(`<tr>
                <th width="60%" style="text-align:left;border: 1px solid #000;">Quotation Number:</th>
                <td style="text-align:left;border: 1px solid #000;"> ${quote.Number}</td>
            </tr>
            <tr>
                <th style="text-align:left;border: 1px solid #000;">Date/Time:</th>
                <td style="text-align:left;border: 1px solid #000;">${quote.CreatedOn}</td>
            </tr>
            <tr>
                <th style="text-align:left;border: 1px solid #000;">Expiration Date:</th>
                <td style="text-align:left;border: 1px solid #000;">${quote.ExpirationDate}</td>
            </tr>
            <tr>
                <th style="text-align:left;border: 1px solid #000;">Employee:</th>
                <td style="text-align:left;border: 1px solid #000;">${quote.ContactName}</td>
            </tr>
            <tr>
                <th style="text-align:left;border: 1px solid #000;">Payments Terms:</th>
                <td style="text-align:left;border: 1px solid #000;"></td>
            </tr>`);
                $("#destination_data tbody").append(`<tr>
                <th colspan="6" width="50%" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Origin</th>
                <th colspan="6" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Destination</th>
            </tr>
            <tr>
                <td colspan="6" style="border: 1px solid #000;"></td>
                <td colspan="6" style="border: 1px solid #000;"></td>
            </tr>
            <tr>
                <td colspan="6" style="border: 1px solid #000;"></td>
                <td colspan="6" style="border: 1px solid #000;"></td>
            </tr>
            <tr>
                <td colspan="6" style="border: 1px solid #000;"></td>
                <td colspan="6" style="border: 1px solid #000;"></td>
            </tr>
            <tr>
                <td colspan="2" style="border: 1px solid #000;">Type of Move:</td>
                <td colspan="2" style="border: 1px solid #000;">${type_of_move}</td>
                <td colspan="2" style="border: 1px solid #000;">Origin:</td>
                <td colspan="2" style="border: 1px solid #000;">${dir_shipper}</td>
                <td colspan="2" style="border: 1px solid #000;">Destination:</td>
                <td colspan="2" style="border: 1px solid #000;">${dir_consignee}</td>
            </tr>`);
                $("#head thead").append(
                    `<th colspan="12" style="width: 100%; background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: center;">Cargo Information</th>`
                );
                if (!_.isEmpty(quote.Items)) {
                    //code
                    cantElem = [].concat.apply([], quote["Items"]["Item"]).length;
                    $("#items tbody").append(
                        `<tr>
                           <th style="border: 1px solid #000;">Pieces</th>
                           <th colspan="5" style="border: 1px solid #000;">Description</th>
                           <th colspan="2" style="border: 1px solid #000;text-align: right;">Weight</th>
                           <th colspan="2" style="border: 1px solid #000;text-align: right;">Volume</th>
                           <th colspan="2" style="border: 1px solid #000;text-align: right;">Volume Weight</th>
                       </tr>`);
                    //mas de un charge, array de objetos [{},{}]
                    if (cantElem > 1) {
                        $.map(quote["Items"]["Item"], function(k) {
                            $("#items tbody").append(
                                `<tr>
                                   <td style="border: 1px solid #000;">${k.Pieces}</td>
                                   <td colspan="5" style="border: 1px solid #000;">${k.PackageName}</td>
                                   <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(k.Weight)}</td>
                                   <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(k.Volume)}</td>
                                   <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(k.Weight)}</td>
                               </tr>`);
                        });
                        //<tr><td style="border: 1px solid #000;"></td><td>${k.Pieces}</td><td>${k.PackageName}</td><td>${k.Height} x ${k.Length} x ${k.Width}</td><td>${k.Weight}</td><td>${k.Volume}</td></tr>
                    } else {
                        //JSON {} de un solo elemento
                        charge = quote["Items"]["Item"];
                        $("#items tbody").append(
                            `<tr>
                           <td style="border: 1px solid #000;">${charge.Pieces}</td>
                           <td colspan="5" style="border: 1px solid #000;">${charge.PackageName}</td>
                           <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(charge.Weight)}</td>
                           <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(charge.Volume)}</td>
                           <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(charge.Weight)}</td>
                       </tr>`);
                    }
                }
                if (!_.isEmpty(quote.Charges)) {
                    //code
                    cantElem = [].concat.apply([], quote["Charges"]["Charge"]).length;
                    $("#charges thead").append(
                        `<tr>
                            <th colspan="6" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Description of Charges</th>
                            <th colspan="2" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: right;">Quantity</th>
                            <th colspan="2" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: right;">Price</th>
                            <th colspan="2" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;text-align: right;">Amount</th>
                        </tr>`);
                    //mas de un charge, array de objetos [{},{}]
                    if (cantElem > 1) {
                        var chargesAmount = 0;
                        $.each(quote["Charges"]["Charge"], function(k, v) {
                            chargesAmount += parseFloat(v.Amount);
                            $("#charges tbody").append(
                                `<tr>
                                        <td colspan="6" style="border: 1px solid #000;">${v.ChargeDefinition.Description}</td>
                                        <td colspan="2" style="border: 1px solid #000;text-align: right;">${v.Quantity}</td>
                                        <td colspan="2" style="border: 1px solid #000;text-align: right;">$${roundDec(v.Price)}</td>
                                        <td colspan="2" style="border: 1px solid #000;text-align: right;">$${roundDec(v.Amount)}</td>
                                    </tr>`);
                        });
                        $("#charges tbody").append(
                            `<tr>
                                    <td colspan="10" style="border: 1px solid #000;text-align: right;font-weight:700px;">Total</td>
                                    <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(chargesAmount)}</td>
                                </tr>`);
                        //<tr><td width="50%" colspan="5"></td><td>${v.ChargeDefinition.Description}</td><td>${v["Quantity"]}</td><td>${v.Price}</td><td>${v.Amount}</td></tr>
                        //$("#charges tbody").append(`<tr><td colspan="5"></td><td>Total</td><td></td><td></td><td>${quote.ChargesAmount}</td></tr>`);
                    } else {
                        //JSON {} de un solo elemento
                        charge = quote["Charges"]["Charge"];
                        console.log(charge)
                        $("#charges tbody").append(
                            `<tr>
                                    <td colspan="6" style="border: 1px solid #000;text-align: right;">${charge.ChargeDefinition.Description}</td>
                                    <td colspan="2" style="border: 1px solid #000;text-align: right;">${charge.Quantity}</td>
                                    <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(charge.Price)}</td>
                                    <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(charge.Amount)}</td>
                                </tr>`);
                        //<tr><td width="50%" colspan="5"></td><td>${charge.ChargeDefinition.Description}</td><td>${charge.Quantity}</td><td>${charge.Price}</td><td>${charge.Amount}</td></tr>
                        $("#charges tbody").append(
                            `<tr>
                                    <td colspan="10" style="border: 1px solid #000;text-align: right;font-weight: 700px;">Total</td>
                                    <td colspan="2" style="border: 1px solid #000;text-align: right;">${roundDec(charge.Amount)}</td>
                                </tr>`);
                        //<tr><td colspan="5"></td><td>Total</td><td></td><td></td><td>${charge.ChargesAmount}</td></tr>
                    }
                }
                $("#notes tbody").append(
                    `<tr>
                    <th colspan="12" style="background-color: lightgray; border-color: lightgray;border: 1px solid #000;">Notes</th>
                </tr>
                <tr>
                    <td colspan="12" style="border: 1px solid #000;"></td>
                </tr>`);

                $('#show-quote-id').modal({ show: true });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "No quote data",
                    icon: 'error'
                })
            }
        })
    })


//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;
    let t = num.toString();
    let regex = /(\d*.\d{0,4})/;
    return t.match(regex)[0];

}

    /*/view magaya quote
    $('#sortable1').bind("DOMSubtreeModified", function() {

    })*/
