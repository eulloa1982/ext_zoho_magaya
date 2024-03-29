const ACTION_EDITED_COUNTER = "ACTION_EDITED_COUNTER"
const CLEAN_ACTIONS_EDITED = "CLEAN_ACTIONS_EDITED"

const ADD_ITEM = 'ADD_ITEM'
const ADD_ITEM_ON_NEW = 'ADD_ITEM_ON_NEW'
const DELETE_ITEM = 'DELETE_ITEM'
const DELETE_ITEM_ON_NEW = 'DELETE_ITEM_ON_NEW'
const GET_ITEM_QUOTE = 'GET_ITEM_QUOTE'
const EMPTY_ITEMS = 'EMPTY_ITEMS'
const GET_ITEM_QUOTE_ON_NEW = "GET_ITEM_QUOTE_ON_NEW"
const UPDATE_ITEM_ON_NEW = "UPDATE_ITEM_ON_NEW"
const UPDATE_ITEM = "UPDATE_ITEM"
const UPDATE_ALL_ITEM_ON_NEW = "UPDATE_ALL_ITEM_ON_NEW"
const ADD_ITEM_EMPTY = "ADD_ITEM_EMPTY"


const ADD_CHARGE = 'ADD_CHARGE'
const ADD_CHARGE_ON_NEW = 'ADD_CHARGE_ON_NEW'
const DELETE_CHARGE = 'DELETE_CHARGE'
const DELETE_CHARGE_ON_NEW = 'DELETE_CHARGE_ON_NEW'
const GET_CHARGE_QUOTE = 'GET_CHARGE_QUOTE'
const GET_CHARGE_QUOTE_ON_NEW = 'GET_CHARGE_QUOTE_ON_NEW'
const EMPTY_CHARGES = 'EMPTY_CHARGES'
const ADD_CHARGES_XML = "ADD_CHARGES_XML"
const UPDATE_CHARGE_ON_NEW = "UPDATE_CHARGE_ON_NEW"
const UPDATE_CHARGE = "UPDATE_CHARGE"
const ADD_CHARGE_EMPTY = "ADD_CHARGE_EMPTY"
const ADD_CHARGE_EMPTY_NEW = "ADD_CHARGE_EMPTY_NEW"
const EMPTY_CHARGE = "EMPTY_CHARGE"


const ADD_ACCOUNT = 'ADD_ACCOUNT'
const ADD_CONTACT = 'ADD_CONTACT'
const UPDATE_CONTACT = "UPDATE_CONTACT"
const FIND_ACCOUNT = 'FIND_ACCOUNT'
const FIND_CONTACT = 'FIND_CONTACT'
const FIND_CONTACT_OF_ACCOUNT = 'FIND_CONTACT_OF_ACCOUNT'
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
const SET_ACCOUNT_SHIPPER = 'SET_ACCOUNT_SHIPPER'
const SET_ACCOUNT_CONSIGNEE = 'SET_ACCOUNT_CONSIGNEE'
const ADD_QUOTE_ACCOUNT = "ADD_QUOTE_ACCOUNT"
const EMPTY_ACCOUNTS = "EMPTY_ACCOUNTS"
const ALL_ACCOUNTS = "ALL_ACCOUNTS"
const EMPTY_ALL_ACCOUNTS = "EMPTY_ALL_ACCOUNTS"
const UPDATE_QUOTE_BY_FIELD = "UPDATE_QUOTE_BY_FIELD"
const EMPTY_SINGLE_CONTACT = "EMPTY_SINGLE_CONTACT"

const ADD_CHARGES_DEF = "ADD_CHARGES_DEF"
const ADD_ITEMS_CRM = "ADD_ITEMS_CRM"
const GET_CHARGE_DEF = "GET_CHARGE_DEF"
const DELETE_ITEM_CRM = "DELETE_ITEM_CRM"
const EMPTY_ITEMS_CRM = "EMPTY_ITEMS_CRM"
const GET_CHARGES_DEF = "GET_CHARGES_DEF"
const MAKE_ACTIVE_CHARGEDEF = "MAKE_ACTIVE_CHARGEDEF"
const MAKE_INACTIVE_CHARGEDEF = "MAKE_INACTIVE_CHARGEDEF"

const ADD_CHARGE_TYPE = "ADD_CHARGE_TYPE"
const GET_ITEM_CRM = "GET_ITEM_CRM"
const GET_ITEM_EMPTY_CRM = "GET_ITEM_EMPTY_CRM"

const ADD_PORTS = "ADD_PORTS"
const GET_PORTS = "GET_PORTS"
const GET_PORT_DEF = "GET_PORT_DEF"
const MAKE_ACTIVE_PORT = "MAKE_ACTIVE_PORT"
const MAKE_INACTIVE_PORT = "MAKE_INACTIVE_PORT"
const SEARCH_PORTS_BY_TYPE = "SEARCH_PORTS_BY_TYPE"
const UPDATE_ITEM_CRM = "UPDATE_ITEM_CRM"
const ADD_PROVIDERS_DEF = "ADD_PROVIDERS_DEF"
const GET_PROVIDER_DEF = "GET_PROVIDER_DEF"
const GET_PROVIDERS_DEF = "GET_PROVIDERS_DEF"
const MAKE_ACTIVE_PROVIDERDEF = "MAKE_ACTIVE_PROVIDERDEF"
const MAKE_INACTIVE_PROVIDERDEF = "MAKE_INACTIVE_PROVIDERDEF"

const ADD = "ADD"
const REST = "REST"
const FIND = "FIND"
const UPDATE_QUOTE = "UPDATE_QUOTE"
const CLEAR_QUOTE_TO_EDIT = "CLEAR_QUOTE_TO_EDIT"
const FIND_ALL = "FIND_ALL"
const FIND_BY_NAME = "FIND_BY_NAME"
const FIND_BY_ID = "FIND_BY_ID"
const CLEAR_ALL_QUOTES = "CLEAR_ALL_QUOTES"
const ADD_STARTING = "ADD_STARTING"

const ADD_ORG = "ADD_ORG"

const ADD_DEAL = "ADD_DEAL"
const GET_DEAL = "GET_DEAL"

//mquotes pagination
const ADD_PAGE = "ADD_PAGE"
const LESS_PAGE = "LESS_PAGE"

//campos a mostrar en formularios de Charges
/*const CHARGES_FIELDS = {"magaya__ChargeCode": {"field": "Type", "editable":"readonly", "place": 1}, "Name": {"field": "Description", "type": "textarea", "editable":"", "place": 2},
                "magaya__CQuantity": {"field": "Quantity", "type": "number", "editable":"", "place": 3}, "magaya__Unit": {"field": "Unit", "values": ["U", "Lb"], "editable":"", "place": 4},
                "magaya__Price": {"field": "Price", "type": "number", "editable":"", "place": 5}, "magaya__Amount": {"field": "Amount", "type": "number", "editable":"readonly", "place": 6},
                "magaya__Tax": {"field": "Tax Code", "editable": "readonly", "place": 7}, "magaya__Tax_Amount":{"field": "Tax Amount", "type": "number", "editable":"readonly", "place": 9}, "magaya__Amount_Total":{"field": "Amount + Tax", "type": "number", "editable":"readonly", "place": 10},
                "magaya__ChargeCurrency": {"field": "Currency", "editable":"readonly", "values": ["USD"], "place": 11}, "magaya__Paid_As": {"field": "Paid As", "values": ["Paid", "Collect"], "editable":"", "place": 12},
                "magaya__Status": {"field": "Status", "values": ["Open", "Posted", "Paid"], "editable":"", "place": 13},

}


const ITEMS_FIELDS = {
    "Name": {"field": "Description", "place": 1, "editable":"readonly"}, "magaya__Package_Description": {"field": "Description", "place": 2, "type": "textarea"},
    "magaya__Length": {"field": "Length", "type": "number", "place": 4}, "magaya__Width": {"field": "Width", "type": "number", "place": 6},
    "magaya__Weigth": {"field": "Weigth", "type": "number", "place": 7}, "magaya__Height": {"field": "Height", "type": "number", "place": 5},
    "magaya__Pieces": {"field": "Pieces", "type": "number", "place": 3}, "magaya__Measure_System": {"field": "Measure System", "values": ["International", "English"], "place": 9},
    "magaya__Volume": {"field": "Volume", "type": "number", "place": 8}
}*/

const ITEMS_CRM = {
    "Name": {"field": "Name"}, "magaya__AccountDefinitionType":{"field": "Account Definition"},
    "magaya__ChargesCode": {"field": "Charge Code"}, "magaya__Type": {"field": "Charge Type"},
    "magaya__AccountDefinitionDescription": {"field": "Account Description"},

    "magaya__This_Port_is_used_by_my_Company":{"field": "Is port", "values":[true, false]}, "magaya__Port_Code": {"field": "Port Code"},
    "magaya__Country": {"field": "Port Country"}, "magaya__Roadway": {"field": "RoadWay", "values":[false, true]},
    "magaya__Airway": {"field": "AirWay", "values":[false, true]}, "magaya__Other": {"field": "Other", "values":[false, true]},
    "magaya__Waterway": {"field": "WaterWay", "values":[false, true]}, "magaya__Railway": {"field": "RailWay", "values":[false, true]},

    "magaya__Carrier_Type":{"field": "Type"}, "magaya__BillingAddress_City": {"field": "City"},
    "magaya__BillingAddress_Country": {"field": "Country"}, "magaya__BillingAddress_State": {"field": "State"},
    "magaya__BillingAddress_Street": {"field": "Street"}, "magaya__BillingAddress_ZipCode": {"field": "Zip Code"},

    "magaya__PackageHeight": {"field": "Height"}, "magaya__PackageLength": {"field": "Length"},
    "magaya__PackageWeigth": {"field": "Weigth"}, "magaya__PackageWidth": {"field": "Width"}
}


const MQUOTE_XML = {
    "Created_Time": "CreatedOn", "Name": "Number", "magaya__ExpirationDate": "ExpirationDate",
    "magaya__Service": "Service", "magaya__Direction": "Direction", "magaya__Description": "DescriptionOfGoods",
    "magaya__ContactName": "RepresentativeName"
}


const ERRORS_TYPES = {
    'MANDATORY_NOT_FOUND': "Required Field Missing",
    'required field not found': "Required Field Missing",
    "Client Quote not found": 'Mandatory data not found: Client Quote is not defined'
}
