$(document).ready(function(){
    packageType = [];
    transpMethods = [];
    deals = [];
    mquotes = [];
    idmQuoteToEdit = 0;
    let page = 1;
    var dataQuotes = []



    ///////////////////////////////////////////////////////////////////////////
    /////// tabla mquotes, estado inicial con todas las mquotes en el modulo
    //////////////////////////////////////////////////////////////////////////


    /*var MyDateField = function(config) {
        jsGrid.Field.call(this, config);
    };

    MyDateField.prototype = new jsGrid.Field({

        css: "date-field",            // redefine general property 'css'
        align: "center",              // redefine general property 'align'

        myCustomProperty: "foo",      // custom property

        sorter: function(date1, date2) {
            return "new Date(date1) - new Date(date2)";
        },

        itemTemplate: function(value) {
            return this._insertPicker = $("<input type='checkbox' class='form-control'>");
        },

        insertTemplate: function(value) {
            return this._insertPicker = $("<input>");
        },

        editTemplate: function(value) {
            return this._editPicker = $("<input>");
        },

        insertValue: function() {
            return this._insertPicker;
        },

        editValue: function() {
            return this._editPicker;
        }
    });

    jsGrid.fields.date = MyDateField;*/


    storeQuote.subscribe(() => {
        dataQuotes = storeQuote.getState().quotes
        data = []

        if (_.isEmpty(dataQuotes)) {
            dataQuotes = {id: 1, Name:"Quote Test"}
        }


            $.map(dataQuotes, function(v) {
                data.push(v)

            })

            $("#table-quotes").jsGrid({
                width: "100%",
                //height: "400px",

                /*inserting: true,
                editing: true,*/
                sorting: true,
                paging: true,
                pageSize: 10,

                data: data,
                fields: [
                    { type: "control", width: 10, title:"Options", editButton: false, deleteButton: false,
                    itemTemplate: function(value, item) {
                        var $iconPencil = $(`<a><span class="material-icons edit" data-id="${item.id}">create</span></a>`);
                        var $iconTrash = $(`<a><span class="material-icons delete" data-id=${item.id}>clear</span></a>`);
                        var $other = $(`<a><input type="checkbox" class="add" id="data-show" data-id=${item.id}/></a>`);
                        //var $other = $(`<a class="add">Show</a>`);
                        return $("<div>").attr({class: "btn-toolbar"})
                            .append($other)
                            .append($iconPencil)
                            .append($iconTrash);
                    } },

                    //{ type: "checkbox",width: 5 },
                    { name: "Name", title: "NUMBER", width: 10, formatter:'number'},
                    { name: "Account.name", title: "CUSTOMER", type: "text", width: 10 },
                    { name: "magaya__Status", type: "text", width: 10, title: "STAGE" },
                    { name: "magaya__Quote_Amount", title: "Amount", width: 10 },
                    { name: "Modified_Time", type: "text", width: 10, title: "MODIFIED TIME" },
                    //{ name: "magaya__Description", type: "text", width: 30, title: "Description"},
                    //{ name: "magaya__ExpirationDate", type: "date", width: 60, title: "Expiration Date" },
                    //{ name: "magaya__Direction", type: "text", width: 15, title: "Direction"},
                ]

            });
    })

    /*function sanitizer (cellvalue, options, rowObject) {
        alert ("ddd")
        if (cellvalue === "ASA500" || cellvalue == 1451520000) {
            // a specific date that should show as blank
            return '';
        } else {
            // here is where I'd like to just call the $.fmatter.util.DateFormat
            var dt = new Date(cellvalue * 1000);
            var op = $.extend({},opts.date);
            if(!isUndefined(opts.colModel.formatoptions)) {
                op = $.extend({},op,opts.colModel.formatoptions);
            }
            return $.fmatter.util.DateFormat(op.srcformat,dt,op.newformat,op);
        }

        //return cellvalue.replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
    }*/



    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        //Las 100 primeras mQuotes
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__SQuotes",sort_order:"desc",per_page:150,page:page})
            .then(function(data){
                let quotes = data.data;

                if (_.isEmpty(quotes)) {
                    quotes = { "id": 1, "Name": "Quote Test", "magaya__Status": "Draft", "magaya__Description": "Do a new mquote, i'll gone" }
                }
                //return all data quotes to initial statel
                return quotes

            })
            .then(function(quotes) {
                //console.log("From data", quotes)
                //sanitizer
                $.map(quotes, function(k, v) {
                    k.Name = sanitize(k.Name)
                    k.magaya__Status = sanitize(k.magaya__Status)
                    if (!_.isEmpty(k.Account)) {
                        k.Account.name = sanitize(k.Account.name)
                    }
                })
                storeQuote.dispatch(addQuote(quotes))
                Utils.unblockUI()
            })
        //Packages Types
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:20,page:1})
            .then(function(data){
                $("#select-package").empty();
                $.map (data.data, function (k, i){
                    $("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#select-package");
                    packageType.push(k);
                })
            })

        //get current user
        ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
            $.map (data.users, function (k, i) {
                currentUser = k.full_name;
                $(":input[name=magaya__IssuedByName]").val(k.full_name);
                $(":input[name=magaya__SellerName]").val(k.full_name);
            })

        });

        ZOHO.CRM.API.getAllRecords({Entity: "Accounts", sort_order: "asc"})
            .then(function(response){
                $.map (response.data, function (k, i) {
                    var accountId = k.id;
                    $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=magaya__Account]");
                    $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ShipperName]");
                    $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ConsigneeName]");
                })
                storeAccounts.dispatch(addAccount(response.data))
            })

        ZOHO.CRM.API.getAllRecords({Entity: "Contacts", sort_order: "asc"})
            .then(function(response){
                storeAccounts.dispatch(addContact(response.data))
            })

        //get all records of the given module
        ZOHO.CRM.API.getAllRecords({Entity: "Deals", sort_order: "asc"})
            .then(function(response){
                $.map (response.data, function (k, i) {
                    $("<option value='"+k.id+"'>"+k.Deal_Name+"</option>").appendTo("select[name=Deals]");
                })
            })

        //get all transports methods
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__TransportationMethods", sort_order: "asc"})
            .then(function(response){
                $.map (response.data, function (k, i) {
                    $("<option value='"+k.id+"'>"+k.Name+"</option>").appendTo("select[name=magaya__TransportationMode]");
                    transpMethods.push (k);
                })
            })

        //Charges Type
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
            .then(function (response) {
                if (!_.isEmpty (response.data)) {
                    $.map(response.data, function (k, i) {
                            $(`<option value="${k.magaya__ChargesCode}">${k.Name}</option>`).appendTo("select[name=ChargeType]");

                    })
                }
            })

        //Charges Type
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__ii", sort_order: "asc"})
            .then(function (response) {
                if (!_.isEmpty (response.data)) {
                    $.map(response.data, function (k, i) {
                        $(`<option value="${k.magaya__Tax_Rate}">${k.Name}</option>`).appendTo("select[name=TaxCode]");

                    })
                }
            })

    });


    ZOHO.embeddedApp.init()

})
