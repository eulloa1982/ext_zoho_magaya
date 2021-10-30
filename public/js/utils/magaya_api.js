var MagayaAPI = function() {

    /**
     * Constants
     */
    TRANSACTIONS_FLAGS = {
        None: 0,
        IncludeIncomeCharges: 1,
        ExcludeAttachments: 2,
        LoadingGuideOnly: 4,
        SentMasterOnly: 8,
        NoWriteHouses: 16,
        TransEventsOnly: 32,
        AttachDocsSummary: 64,
        IncludeRelatedObj: 128,
        SwitchShipmentReferences: 256,
        ExcludeDocuments: 512,
        IncludeExpenseCharges: 1024,
        CreateEntities: 2048,
        ApiCall: 4096,
        UseLocalUnits: 8192,
        WmsApiCall: 16384,
        ExcludeSubitems: 32768,
        TrackingCall: 65536,
        IncludeTransactionUrl: 131072,
        IncludeLocationEntities: 262144,
        BasicFields: 524288,
        ReplaceEquivalentTransactions: 1048576,
        MainImageOnly: 2097152,
        ExcludeItems: 4194304,
        ExcludeItemsNotInWH: 8388608,
        OrderItemsByGUID: 16777216,
        XML_Hyperion_Filter: 134217728
    }


    ENTITY_TYPES = {
        Any: 0,
        Customer: 2,
        Warehouse_Provider: 4,
        Forwarding_Agent: 8,
        Carrier: 32,
        Vendor: 64,
        Employee: 128,
        Salesman: 4096,
        Division: 8192
    }

    TRANSACTION_TYPES = {
        Bill: 'BI',
        Booking: 'BK',
        Cargo_Release: 'CR',
        Carrier: 'CA',
        Check: 'CK',
        Client: 'CL',
        Category: 'CT',
        Deposit: 'DP',
        Employee: 'EM',
        Forwarding_Agent: 'FA',
        Invoice: 'IN',
        Item_Definitions: 'IV',
        Job: 'JB',
        Journal_Entry: 'JE',
        Payment: 'PM',
        Pickup_Order: 'PK',
        Port: 'PT',
        Purchase_Order: 'PO',
        Quotation: 'QT',
        Rate: 'RT',
        Sales_Order: 'SO',
        Sales_Person: 'SP',
        Shipment: 'SH',
        Trip: 'TR',
        Vendor: 'VE',
        Warehouse_Item: 'WI',
        Warehouse_Provider: 'WP',
        Warehouse_Receip: 'WH'

    }

    return {
        TRANSACTIONS_FLAGS: TRANSACTIONS_FLAGS,
        TRANSACTION_TYPES: TRANSACTION_TYPES,
        ENTITY_TYPES: ENTITY_TYPES,
        sendRequest: function(data, success, error) {

            //data.url = Utils.getConfig()['url']
            //data.url = localStorage.getItem('url');

            //data.url = getCookie('url');
            //data.url = "http://98.211.167.16:3691";
            //data.url = "http://localhost/zoho_magaya/blog/api"
            $.ajax({
                type: 'POST',
                url: 'https://zohomagaya.herokuapp.com/api',
                //url: "http://localhost/zoho_magaya/blog/public/api",
                //url: "api",

                data: data,
                beforeSend: function() {
                    Utils.blockUI()
                },
                success: function(resp) {
                    if (resp.data !== "Access denied.") {
                        success(resp)
                    }
                    else {
                        Swal.fire({
                            title: 'Access Denied',
                            html: "You need to login in again",
                            icon: 'error'
                        })
                        $("#no-configuration-alert").show();
                    }

                },
                error: function(resp) {
                    if (error) {
                        error(resp)
                    } else {
                        message_error = 'Unknown error during operation, please try again';
                        //error(message_error)
                        Swal.fire({
                            title: 'Unknown Error',
                            html: "Unknown error during operation, please try to <a class='startSession'>Login again</a>",
                            icon: 'error'
                        })
                        $("#no-configuration-alert").show();
                    }
                },
                complete: function() {
                    Utils.unblockUI()
                }

            })
        }



    }

}();
