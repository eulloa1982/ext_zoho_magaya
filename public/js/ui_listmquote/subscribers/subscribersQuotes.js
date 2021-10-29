var quoteToEdit = []
var quoteXML = []
$(document).ready(function(){

//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    let u = storeQuote.getState()
    console.log("State quote now", u)
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
        let accountName = !_.isEmpty(quote[0]['Account']) ? quote[0]['Account']['name'] : ''

        $("#quote-search tbody").empty()

        append += `<tr>
            <td>
                <a><span class="material-icons oculto edit" data-id="${quote[0]['id']}">visibility</span></a>
                <a><span class="material-icons oculto delete" data-id=${quote[0]['id']}>delete_forever</span></a>
            </td>
            <td>${quote[0]['magaya__Number']}</td>
            <td>${accountName}</td>
            <td>${quote[0]['magaya__QuoteTotalAmount']}</td>
            </tr>`

        $("#quote-search tbody").append(append)
    }

    //editing a quote
    quoteToEdit = u.quoteToEdit;
    dataQuotes = u.quotes
    data = []
 //dataQuotes = _.sortBy({dataQuotes}, {v['Modified_Time']})
    if (_.size(dataQuotes) == 0) {
        dataQuotes = {id: 1, Name:"Quote Test"}
    } else {

        $.map(dataQuotes, function(v) {
            let mt =  v["Modified_Time"]
            //primera porcion
            mt = mt.split("T")
            v["Modified_Time"] = `${mt[0]}`
            if (mt[1]) {
                mt[1] = mt[1].slice(0, -6)
                v["Modified_Time"] += ` ${mt[1]}`
            }
            data.push(v)

        })

        let gfg = _.sortBy(data, ['Created_Time', 'Name']);

        $("#table-quotes").jsGrid({
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,

            data: gfg,
            fields: [
                { type: "control",  title:"Options", width: 'auto', editButton: false, deleteButton: false, title: "Action",
                itemTemplate: function(value, item) {
                    let $iconPencil = $(`<a><span class="material-icons oculto edit" data-id="${item.id}">create</span></a>`);
                    let $iconTrash = $(`<a><span class="material-icons oculto delete" data-id="${item.id}">delete_forever</span></a>`);
                    let $sendMagaya = $(`<a><span class="material-icons oculto send" data-id="${item.id}">send</span></a>`);
                    let $checkbox = $(`<a><input type="checkbox" class="quoteCheckBox" data-id="${item.id}" /></a>`);
                    let $iconView = $(`<a><span class="material-icons oculto btn-slide" data-id="${item.id}">visibility</span></a>`)
                    return $("<div>").attr({class: "btn-toolbar"})
                                .append($checkbox)
                                //.append($sendMagaya)
                                //.append($iconPencil)
                                //.append($iconTrash)
                                .append($iconView)
                    }
                },

                //{ type: "checkbox",width: 5 },
                { name: "Name", title: "NUMBER", width: 220, formatter:'number'},
                { name: "Account.name", title: "CUSTOMER", type: "text", width: 300},
                { name: "magaya__Status", type: "text", width: 120, title: "STAGE" },
                { name: "magaya__QuoteTotalAmount", title: "AMOUNT", width: 145, type: "number", formatter: "number", classes: 'number'},
                { name: "Modified_Time", type: "text", width: 300, title: "MODIFIED TIME"},
            ]

            });
        }

    //quote to edit
    if (!_.isEmpty(u.quoteToEdit)) {
        $(".arrows-quote").html(`${arrow_prev} ${arrow_next}`)
        $("#Title").html("Edit mQuote");
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
                $("<option value='" + id + "' selected>" + client + "</option>").appendTo("select[name=Account]");
                storeAccounts.dispatch(findContactOfAccount({id: id}))
                $("#AccountPreview").html(client)
                //$("select[name=Account]").val(id)
            }

            //representative
            if (!_.isEmpty(quoteToEdit["magaya__Representative"])) {
                //$("select[name=magaya__Representative]").empty()
                let idContact = quoteToEdit["magaya__Representative"]["id"];
                let nameContact = sanitize(quoteToEdit["magaya__Representative"]["name"]);
                storeAccounts.dispatch(findContact({id: idContact}));
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

                $("#RepresentativePreview").html(nameContact)

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
            let incotermsValues = $("select[name=magaya__Incoterms] option")
            $.map(incotermsValues, function(k, v) {
                //console.log(k.text === incoterms, k.text)
                if (k.text === incoterms) {
                    $(`select[name=magaya__Incoterms] option:contains(${incoterms})`).prop('selected', true);
                    $(`select[name=magaya__Incoterms]`).change()
                } else {
                    $(`select[name=magaya__Incoterms]`).prop('selected', false);

                }
            })
            //$("select[name=magaya__Incoterms]").val(incoterms).change()

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
