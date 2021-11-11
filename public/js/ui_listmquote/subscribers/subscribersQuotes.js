var quoteToEdit = []
var quoteXML = []
$(document).ready(function(){

//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    $("#quote-search tbody").empty()
    let u = storeQuote.getState()
    //console.log("State quote now", u)
    quoteXML = u.singleQuote
    $(".arrows-quote").html(``)
    let arrow_content = '';
    let arrow_next = `<span class="material-icons cursor-hand oculto2">arrow_forward_ios</span>`;
    let arrow_prev = `<span class="material-icons cursor-hand oculto2">arrow_back_ios_new</span>`
    if (!_.isEmpty(u.nextQuote)) {
        arrow_next = `<span class="material-icons cursor-hand" onClick="move_quote('${u.nextQuote.id}')">arrow_forward_ios</span>`
    }

    if (!_.isEmpty(u.prevQuote)) {
        arrow_prev = `<span class="material-icons cursor-hand" onClick="move_quote('${u.prevQuote.id}')">arrow_back_ios_new</span>`
    }


    //search quote by id
    if (!_.isEmpty(u.quotes2)) {
        let append = ''
        let quote = u.quotes2

        $.map(quote, function(k, v) {
            let accountName = !_.isEmpty(k['Account']) ? k['Account']['name'] : ''

            $("#quote-search tbody").empty()

            append += `<tr>
                <td>
                    <a><span class="material-icons oculto btn-slide" data-id="${k['id']}">visibility</span></a>
                    <a><span class="material-icons oculto delete" data-id=${k['id']}>delete_forever</span></a>
                </td>
                <td>${k['magaya__Number']}</td>
                <td>${accountName}</td>
                <td>${k['magaya__QuoteTotalAmount']}</td>
                </tr>`

            $("#quote-search tbody").append(append)
        })

    }


    //editing a quote
    quoteToEdit = u.quoteToEdit;
    dataQuotes = u.quotes
    data = []
 //dataQuotes = _.sortBy({dataQuotes}, {v['Modified_Time']})
    if (_.size(dataQuotes) == 0) {
        dataQuotes = {id: 1, Name:"Quote Test"}
    } else {
        //alert (dataQuotes)
        $.map(dataQuotes, function(v) {
            let mt =  v["Modified_Time"]
            //primera porcion
            mt = mt.split("T")
            v["Modified_Time"] = `${mt[0]}`
            if (mt[1]) {
                mt[1] = mt[1].slice(0, -6)
                v["Modified_Time"] += ` ${mt[1]}`
            }
            v["create"] = `
                    <a><input type="checkbox" class="quoteCheckBox" data-id="${v.id}" /></a>
                    <a><span class="material-icons oculto edit" data-id="${v.id}">create</span></a>
                    <a><span class="material-icons oculto delete" data-id="${v.id}">delete_forever</span></a>
                    <a><span class="material-icons oculto send" data-id="${v.id}">send</span></a>
                    <a><span class="material-icons oculto btn-slide" data-id="${v.id}">visibility</span></a>
                    `
            data.push(v)

        })


        var table = $('#table-quotes').DataTable( {
            'destroy': true,
            retrieve: true,
            responsive: true,
            "scrollX": true,
            "order": [[ 1, "desc" ]], //order by name by default
            data: data,
        columns: [
            { "data": "create"},
            { "data": "Name" },
            { "data": "magaya__Deal.name",
                "defaultContent": "No set"
            },
            { "data": "Account.name",
                "defaultContent": "No set"
            },

            { "data": "magaya__Status" },
            { "data": "magaya__QuoteTotalAmount"},
            { "data": "Modified_Time", "visible": false},
            { "data": "Created_Time", "visible": false},
            { "data": "Magaya_updated", "visible": false},
            { "data": "magaya__Description", "visible": false},
            { "data": "magaya__Destination", "visible": false},
            { "data": "magaya__Origin", "visible": false},
            { "data": "magaya__Seller", "visible": false},
            { "data": "magaya__Service", "visible": false},
            { "data": "magaya__Terms", "visible": false},
            { "data": "magaya__MagayaGUID", "visible": false},
            //{ title: "magaya__Status" },

        ]
        } );

        //show and hide columns
        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();
            let column = table.column( $(this).attr('data-column') );
            // Toggle the visibility
            column.visible( ! column.visible() );
            if (!column.visible()) {
                console.log($(this).children())
                $(this).children().remove()
                $(this).prepend(`<span class="material-icons mr-2 oculto">visibility_off</span>`)
            }
            else {
                $(this).children().remove()
                $(this).prepend(`<span class="material-icons mr-2 oculto">visibility</span>`)
            }
        } );

        /*let gfg = _.sortBy(dataQuotes, ['Created_Time', 'Name']);

        $.map (gfg, function(k, v) {
            let account_name = ''
            if (!_.isEmpty(k.Account))
                account_name = k.Account.name
            let quote = `
            <tr>
                <td>
                    <a><span class="material-icons oculto edit" data-id="${k.id}">create</span></a>
                    <a><span class="material-icons oculto delete" data-id="${k.id}">delete_forever</span></a>
                    <a><span class="material-icons oculto send" data-id="${k.id}">send</span></a>
                    <a><input type="checkbox" class="quoteCheckBox" data-id="${k.id}" /></a>
                    <a><span class="material-icons oculto btn-slide" data-id="${k.id}">visibility</span></a>
                </td>
                <td>${k.Name}</td>
                <td>${account_name}</td>
                <td>${k.magaya__Status}</td>
                <td>${k.magaya__QuoteTotalAmount}</td>
                <td>${k.Modified_Time}</td>

            </tr>`

            $("#table-quotes tbody").append(quote)
        })*/


        /*$("#table-quotes").jsGrid({
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,
            data: data,
            fields: [
                { name:"", width: 180, editButton: false, deleteButton: false,
                itemTemplate: function(value, item) {
                    let $iconPencil = $(`<a><span class="material-icons oculto edit" data-id="${item.id}" style="font-size: 14px">create</span></a>`);
                    let $iconTrash = $(`<a><span class="material-icons oculto delete" data-id="${item.id}" style="font-size: 14px">delete_forever</span></a>`);
                    let $sendMagaya = $(`<a><span class="material-icons oculto send" data-id="${item.id}" style="font-size: 14px">send</span></a>`);
                    let $checkbox = $(`<a><input type="checkbox" class="quoteCheckBox" data-id="${item.id}" /></a>`);
                    let $iconView = $(`<a><span class="material-icons oculto btn-slide" data-id="${item.id}" style="font-size: 14px">visibility</span></a>`)
                    /*let $tools = $(`<div class="btn-group" style="margin-left: 10px;">
                    <span class="material-icons dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_horiz</span>
                    <div class="dropdown-menu" style="padding: 10px 5px 5px 10px;">
                    <a><span class="material-icons oculto edit" data-id="${item.id}" style="margin-left: 8px">create</span></a>
                    <a><span class="material-icons oculto delete" data-id="${item.id}" style="margin-left: 8px">delete_forever</span></a>
                    <a><span class="material-icons oculto send" data-id="${item.id}" style="margin-left: 8px">send</span></a>
                    <a><span class="material-icons oculto btn-slide" data-id="${item.id}" style="margin-left: 8px">visibility</span></a>
                    <a><span title="Get PDF mQuote" id="toPdf" class="material-icons oculto float-right toPdf" data-id="${item.id}" style="margin-left: 8px">picture_as_pdf</span></a>

                    </div>
                  </div>`)*//*
                    //.attr({class: "btn-toolbar"})
                    return $("<div>").attr({display: "inline"})
                                .append($checkbox)
                                .append($iconPencil)
                                .append($iconTrash)
                                .append($sendMagaya)
                                .append($iconView)
                                //.append($tools)
                    }
                },


                { name: "Name", index: "Name", title: "NUMBER", width: 150, formatter:'number'},
                { name: "magaya__Deal.name", index: "amount", title: "DEAL", type: "text", width: 200},
                { name: "Account.name", title: "CUSTOMER", type: "text", width: 200},
                { name: "magaya__Status", type: "text", width: 100, title: "STAGE" },
                { name: "magaya__QuoteTotalAmount", title: "AMOUNT", width: 125, type: "number", formatter: "number", classes: 'number'},
                { name: "Modified_Time", type: "text", width: 'auto', title: "MODIFIED TIME"},

            ],
        });*/
    }

    //quote to edit
    if (!_.isEmpty(u.quoteToEdit)) {
        $(".arrows-quote").html(`${arrow_prev} ${arrow_next}`)
        $("#Title").html("Edit mQuote").css("font-size","14px");
        $("#table-charges-preview tbody").empty()
        $("#table-items-preview tbody").empty()
        $("#table-charges-preview tfoot").empty()
        $("#table-items-preview tfoot").empty()
        //.preview empty
        $(".preview").html("")
        $("#toPdf").attr('data-id', u.quoteToEdit.id)
        $("#sendToMagaya").attr('data-id', u.quoteToEdit.id)
        $("#deleteQuote").attr('data-id', u.quoteToEdit.id)
        $("#duplicateQuote").attr('data-id', u.quoteToEdit.id)
        let modifiedBy = u.quoteToEdit.Modified_By.name
        $("#Modified_By").html(modifiedBy)

        quoteToEdit = u.quoteToEdit
        //drop the state temporal items and charges
        storeItem.dispatch(emptyItems())
        storeCharge.dispatch(emptyCharges())
        storeAccounts.dispatch(emptyAllAccounts())

        //set tab quotatioFor active by default
        $("#nav-home-tab").addClass("active");
        $("#menu5").addClass("active show");
        $("#nav-general-tab").removeClass("active");
        $("#nav-routing-tab").removeClass("active");
        $("#nav-charges-tab").removeClass("active");
        $("#nav-items-tab").removeClass("active");
        $("#nav-terms-tab").removeClass("active");
        $("#nav-notes-tab").removeClass("active");
        $("#menu1").removeClass("show active");
        $("#menu2").removeClass("show active");
        $("#menu3").removeClass("show active");
        $("#menu4").removeClass("show active");
        $("#menu6").removeClass("show active");
        $("#menu7").removeClass("show active");

        $("#table-charges").show();
        $("#table-charges tbody").empty();
        $("#table-charges-new").hide();

        $("#table-items").show();
        $("#table-items tbody").empty();
        $("#table-items-new").hide();

        $("#New").hide();
        $("#Save").show();

        $("#sendCharges").show();
        $("#newCharges").hide();
        $("#sendItem").show();
        $("#newItem").hide();

        $("#table-charges").show();
        $("#table-charges-new").hide();

        $("#table-items").show();
        $("#table-items-new").hide();

        $("#addNoteNew").hide()
        $("#notes-new").hide()
        $("#addNote").show()
        $("#notes").show()

        $("select[name=Deal]").val("")

        storeAccounts.dispatch(emptySingleContact())

        //relleno los campos
        //campos q no son objetos
        $("#magaya__Description").val(quoteToEdit.magaya__Description)
        let idAccount = !_.isEmpty(quoteToEdit.Account) ? quoteToEdit.Account.id : 0
            storeAccounts.dispatch(addQuoteAccount({id: idAccount}))
            $.map(quoteToEdit, function(k, v) {
                if (!_.isObject(v) && !v.includes("$") && !_.isEmpty(k)) {
                    $(`input[name=${v}]`).val(k)
                    $(`select[name=${v}]`).val(k)
                    //preview
                    let preview = `${v}Preview`
                    $(`#${preview}`).html(k)
                }
            })
            $("input[name=NameQuote]").val(quoteToEdit.Name)
            //$("#NamePreview").html(quoteToEdit.Name)

            let owner = quoteToEdit.Owner.id
            let ownerName = quoteToEdit.Owner.name
            let ownerValues = $("select[name=Owner] option")
            $.map(ownerValues, function(k, v) {
                if (k.value === owner) {
                    $(`select[name=Owner] option:contains(${k.text})`).prop('selected', true);
                    $(`select[name=Owner]`).change()
                } else {
                    $(`select[name=Owner]`).prop('selected', false)
                }

            })

            //account, cliente de la cotizacion
            if (!_.isEmpty(quoteToEdit["Account"])) {
                const id = quoteToEdit["Account"]["id"];
                const client = sanitize(quoteToEdit["Account"]["name"]);
                $(`<option value='${id} selected>${client}</option>`).appendTo("select[name=Account]");
                storeAccounts.dispatch(findContactOfAccount({id: id}))
                $("#AccountPreview").html(client)
                //$("select[name=Account]").val(id)
            }

            //representative
            if (!_.isEmpty(quoteToEdit["magaya__Representative"])) {
                //$("select[name=magaya__Representative]").empty()
                let idContact = quoteToEdit["magaya__Representative"]["id"];
                let nameContact = sanitize(quoteToEdit["magaya__Representative"]["name"]);
                //storeAccounts.dispatch(findContact({id: idContact}));
                //get values
                let contactValues = $("select[name=magaya__Representative] option")
                $.map(contactValues, function(k, v) {
                    if (k.value === idContact) {
                        $(`select[name=magaya__Representative] option:contains(${k.text})`).prop('selected', true);
                        $(`select[name=magaya__Representative]`).change()
                    } else {
                        $(`select[name=magaya__Representative]`).prop('selected', false);

                    }
                })

                $("#RepresentativeNamePreview").html(nameContact)
            }

           //deal en la cotizacion
            if (!_.isEmpty(quoteToEdit['magaya__Deal'])) {
                //$("select[name=Deal]").empty()
                let idDeal = quoteToEdit["magaya__Deal"]["id"];
                let nameDeal = sanitize(quoteToEdit["magaya__Deal"]["name"]);
                storeDeal.dispatch(getDeal({id: idDeal}))
                //$(`<option value="${idDeal}" selected>${nameDeal}</option>`).appendTo("select[name=Deal]");
                $("select[name=Deal]").val(idDeal)
                $("#DealPreview").html(nameDeal)
            }

            //is hazardous
            let is_hazardous = quoteToEdit["magaya__Is_Hazardous"]
            if (is_hazardous === true) {
                $("input[name=magaya__Is_Hazardous]").prop("checked", true)
            } else {
                $("input[name=magaya__Is_Hazardous]").prop("checked", false)

            }

            //is sent to magaya
            let sent_to_magaya = quoteToEdit["Magaya_updated"]
            if (sent_to_magaya === true) {
                $("input[name=Magaya_updated]").prop("checked", true)
                $("input[name=In_Magaya]").prop("checked", true)
            } else {
                $("input[name=Magaya_updated]").prop("checked", false)
                $("input[name=In_Magaya]").prop("checked", false)
            }

            //is sent to magaya
            let imported_from_magaya = quoteToEdit["magaya__MagayaGUID"]
            if (!_.isEmpty(imported_from_magaya) && _.size(imported_from_magaya) > 8) {
                $("input[name=magaya__QuoteInMagaya]").prop("checked", true)
                $("input[name=From_Magaya]").prop("checked", true)
            } else {
                $("input[name=magaya__QuoteInMagaya]").prop("checked", false)
                $("input[name=From_Magaya]").prop("checked", false)
            }

            //Stage of mQuote
            let stage = quoteToEdit["magaya__Status"]
            $("select[name=magaya__mQuoteStatus]").val(stage)

            //Shipper y Consignee
            //hay que buscar el texto , hasta que tengamos un lookup para eliminar esto
            let shipper = quoteToEdit.magaya__Shipper
            $("select[name=magaya__Shipper] option").each(function(k) {
                if ($(this).text() === shipper)
                    $("select[name=magaya__Shipper]").val($(this).val())
            })


            let consignee = quoteToEdit.magaya__ConsigneeName
            $("select[name=magaya__ConsigneeName] option").each(function(k) {
                if ($(this).text() === consignee)
                    $("select[name=magaya__ConsigneeName]").val($(this).val())
            })


            let nameQuote = quoteToEdit.magaya__Number
            $(":input[name=NameQuote]").val(nameQuote)

            //magaya terms
            let terms = quoteToEdit.magaya__Terms
            $("#magaya__Terms").val(terms)

            //Incoterms
            let incoterms = quoteToEdit.magaya__Incoterm_rule
            let incotermsValues = $("select[name=magaya__Incoterm_rule] option")
            $.map(incotermsValues, function(k, v) {
                //console.log(k.text === incoterms, k.text)
                if (k.text === incoterms) {
                    $(`select[name=magaya__Incoterm_rule] option:contains(${incoterms})`).prop('selected', true);
                    $(`select[name=magaya__Incoterm_rule]`).change()
                } else {
                    $(`select[name=magaya__Incoterm_rule]`).prop('selected', false);

                }
            })


            //other modules related
            if (!_.isEmpty(quoteToEdit.magaya__Routing)) {
                let routingId = quoteToEdit.magaya__Routing.id

                ZOHO.CRM.API.getRecord( {Entity: "magaya__Routing", RecordID: routingId })
                    .then(function(response) {
                        $.map(response.data[0], function(k, v) {
                            if (!_.isObject(v) && !v.includes("$") && !_.isEmpty(k)) {
                                $(`input[name=${v}]`).val(k)
                                $(`select[name=${v}]`).val(k)
                            }
                        })

                        let data = response.data[0]
                        let idMainCarrier = 0
                        if (!_.isEmpty(data.magaya__MainCarrier)) {
                            let carriersValues = $("select[name=magaya__MainCarrier] option")
                            idMainCarrier = data.magaya__MainCarrier.id
                            $.map(carriersValues, function(k, v) {
                                if (k.value === idMainCarrier) {
                                    $(`select[name=magaya__MainCarrier]`).val(idMainCarrier).prop('selected', true)
                                    $(`select[name=magaya__MainCarrier]`).change()
                                } else {

                                    $(`select[name=magaya__MainCarrier]`).prop('selected', false);
                                }
                            })
                        }

                        if (!_.isEmpty(data.magaya__ModeofTransportation)) {
                            let idMethod = data.magaya__ModeofTransportation.id
                            let method = getTranspMethod(idMethod).then(res => {
                                $("select[name=magaya__TransportationMode]").val(res[0]['id'])
                                $("input[name=ModeOfTransportation]").val(res[0]['Name'])
                            })

                        }

                        let shipper = data.magaya__Shipper;
                        let shipperValues = $("select[name=magaya__Shipper] option")
                        //$("select[name=magaya__Shipper] option:selected").prop("selected", false)
                        $.map(shipperValues, function(k, v) {
                            //$(`select[name=magaya__Shipper] option`).attr('selected', false)
                            if (k.text === shipper) {
                                $(`select[name=magaya__Shipper] option:contains(${shipper})`).prop('selected', true);
                                $(`select[name=magaya__Shipper]`).change()
                            } else {
                                $(`select[name=magaya__Shipper]`).prop('selected', false);

                            }
                        })
                        let consignee = data.magaya__Consignee;
                        let consigneeValues = $("select[name=magaya__Consignee] option")
                        $.map(consigneeValues, function(k, v) {
                            //$(`select[name=magaya__Consignee] option`).attr("selected", false)
                            if (k.text === consignee) {
                                $(`select[name=magaya__Consignee] option:contains(${consignee})`).prop('selected', true);
                                $(`select[name=magaya__Consignee]`).change()
                            } else {
                                $(`select[name=magaya__Consignee]`).prop('selected', false)
                            }
                        })

                        //$(`select[name=magaya__MainCarrier] option:contains(${idMainCarrier})`).val(idMainCarrier);
                        //$("select[name=magaya__MainCarrier]").selectpicker('render');
                    })

            }


            //cargo items
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: quoteToEdit.id, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
                .then(function(response) {
                    if (!_.isEmpty(response.data)) {
                        idemItems = response.data
                        $("#table-items tbody").empty();
                        $.each(idemItems, function(i, k) {
                            //dispatch items to store
                            storeItem.dispatch(addItem({...k}))

                            }) //each

                    }
                }) //then*/

            //service items
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: quoteToEdit.id, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
                .then(function(response) {
                    $("#table-charges tbody").empty();
                    if (!_.isEmpty(response.data)) {
                        idemCharges = response.data
                        amountTotal = cont = 0;
                        $.each(idemCharges, function(i, k) {
                            storeCharge.dispatch(addCharge({ ...k}))
                        })
                    } //IF
                }) //then*/

                //si existen valores en el mquote, sobreescribirlos
                $("input[name=Mailing_City]").val(quoteToEdit.magaya__BillingCity)
                $("input[name=Mailing_Country]").val(quoteToEdit.magaya__BillingCountry)
                $("input[name=Mailing_State]").val(quoteToEdit.magaya__BillingState)
                $("input[name=Mailing_Street]").val(quoteToEdit.magaya__BillingStreet)
                $("input[name=Mailing_Zip]").val(quoteToEdit.magaya__Billing_Zip)
                $("input[name=Email]").val(quoteToEdit.magaya__ContactEmail)
                $("input[name=Mobile]").val(quoteToEdit.magaya__ContactMobile)
                $("input[name=Phone]").val(quoteToEdit.magaya__ContactPhone)

                //service items
                /*ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idmQuoteToEdit, RelatedList: "Notes", page: 1, per_page: 200 })
                    .then(function(response) {
                        console.log("Notes", response)
                        //$
                    })*/

                    //$("#DealPreview").html("aaaaaa")
    }
})



})

