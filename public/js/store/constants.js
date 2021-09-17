const ADD_ITEM = 'ADD_ITEM'
const ADD_ITEM_ON_NEW = 'ADD_ITEM_ON_NEW'
const DELETE_ITEM = 'DELETE_ITEM'
const DELETE_ITEM_ON_NEW = 'DELETE_ITEM_ON_NEW'
const GET_ITEM_QUOTE = 'GET_ITEM_QUOTE'
const CALCULATE_VOLUME = 'CALCULATE_VOLUME'
const CALCULATE_VOLUME_ON_NEW = 'CALCULATE_VOLUME_ON_NEW'
const EMPTY_ITEMS = 'EMPTY_ITEMS'
const GET_ITEM_QUOTE_ON_NEW = "GET_ITEM_QUOTE_ON_NEW"
const UPDATE_ITEM_ON_NEW = "UPDATE_ITEM_ON_NEW"
const UPDATE_ITEM = "UPDATE_ITEM"

const ADD_CHARGE = 'ADD_CHARGE'
const ADD_CHARGE_ON_NEW = 'ADD_CHARGE_ON_NEW'
const DELETE_CHARGE = 'DELETE_CHARGE'
const DELETE_CHARGE_ON_NEW = 'DELETE_CHARGE_ON_NEW'
const GET_CHARGE_QUOTE = 'GET_CHARGE_QUOTE'
const GET_CHARGE_QUOTE_ON_NEW = 'GET_CHARGE_QUOTE_ON_NEW'
const EMPTY_CHARGES = 'EMPTY_CHARGES'
const SET_AMOUNT = 'SET_AMOUNT'
const SET_AMOUNT_ON_NEW = 'SET_AMOUNT_ON_NEW'
const UPDATE_CHARGE = 'UPDATE_CHARGE'
const ADD_CHARGES_XML = "ADD_CHARGES_XML"


const ADD_ACCOUNT = 'ADD_ACCOUNT'
const ADD_CONTACT = 'ADD_CONTACT'
const FIND_ACCOUNT = 'FIND_ACCOUNT'
const FIND_CONTACT = 'FIND_CONTACT'
const FIND_CONTACT_OF_ACCOUNT = 'FIND_CONTACT_OF_ACCOUNT'
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
const GET_ACCOUNT = 'GET_ACCOUNT'
const ADD_QUOTE_ACCOUNT = "ADD_QUOTE_ACCOUNT"
const EMPTY_ACCOUNTS = "EMPTY_ACCOUNTS"
const ALL_ACCOUNTS = "ALL_ACCOUNTS"
const EMPTY_ALL_ACCOUNTS = "EMPTY_ALL_ACCOUNTS"

const ADD_CHARGES_DEF = "ADD_CHARGES_DEF"
const ADD_ITEMS_CRM = "ADD_ITEMS_CRM"
const GET_CHARGE_DEF = "GET_CHARGE_DEF"
const DELETE_ITEM_CRM = "DELETE_ITEM_CRM"
const EMPTY_ITEMS_CRM = "EMPTY_ITEMS_CRM"
const GET_CHARGES_DEF = "GET_CHARGES_DEF"
const MAKE_ACTIVE_CHARGEDEF = "MAKE_ACTIVE_CHARGEDEF"
const MAKE_INACTIVE_CHARGEDEF = "MAKE_INACTIVE_CHARGEDEF"

const ADD_PORTS = "ADD_PORTS"
const GET_PORTS = "GET_PORTS"
const MAKE_ACTIVE_PORT = "MAKE_ACTIVE_PORT"
const MAKE_INACTIVE_PORT = "MAKE_INACTIVE_PORT"

const ADD = "ADD"
const REST = "REST"
const FIND = "FIND"
const UPDATE_QUOTE = "UPDATE_QUOTE"
const CLEAR_QUOTE_TO_EDIT = "CLEAR_QUOTE_TO_EDIT"
const FIND_ALL = "FIND_ALL"
const FIND_BY_NAME = "FIND_BY_NAME"
const FIND_BY_ID = "FIND_BY_ID"

const ADD_DEAL = "ADD_DEAL"
const GET_DEAL = "GET_DEAL"

//campos a mostrar en formularios de Charges
const CHARGES_FIELDS = {"Name": {"field": "Description"}, "magaya__Amount": {"field": "Amount", "type": "number"},
                "magaya__CQuantity": {"field": "Quantity", "type": "number"}, "magaya__Price": {"field": "Price", "type": "number"},
                "magaya__Tax_Amount": {"field": "Tax Amount", "type": "number"}, "magaya__Amount_Total":{"field": "Total Amount", "type": "number"},
                "magaya__Paid_As": {"field": "Paid As", "values": ["Prepaid", "Collect"]},
                "magaya__Unit": {"field": "Unit", "values": ["U", "Lb"]},"magaya__Final_Amount": {"field": "Final Amount", "type": "number"},

                //"magaya__TaxRate": {"field": "Tax Rate", "type": "number"},

}

const ITEMS_FIELDS = {
    "Name": {"field": "Description"}, "magaya__Length": {"field": "Length", "type": "number"}, "magaya__Width": {"field": "Width", "type": "number"},
    "magaya__Weigth": {"field": "Weigth", "type": "number"}, "magaya__Status": {"field": "Status", "values":["InQuote"]}, "magaya__Height": {"field": "Height", "type": "number"},
    "magaya__Pieces": {"field": "Pieces", "type": "number"}, "magaya__Measure_System": {"field": "Measure System", "values": ["International"]},
    "magaya__Volume": {"field": "Volume", "type": "number"}
}
