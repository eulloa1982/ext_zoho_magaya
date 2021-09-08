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

const ADD_CHARGE = 'ADD_CHARGE'
const ADD_CHARGE_ON_NEW = 'ADD_CHARGE_ON_NEW'
const DELETE_CHARGE = 'DELETE_CHARGE'
const DELETE_CHARGE_ON_NEW = 'DELETE_CHARGE_ON_NEW'
const GET_CHARGE_QUOTE = 'GET_CHARGE_QUOTE'
const GET_CHARGE_QUOTE_ON_NEW = 'GET_CHARGE_QUOTE_ON_NEW'
const EMPTY_CHARGES = 'EMPTY_CHARGES'
const SET_AMOUNT = 'SET_AMOUNT'
const SET_AMOUNT_ON_NEW = 'SET_AMOUNT_ON_NEW'


const ADD_ACCOUNT = 'ADD_ACCOUNT'
const ADD_CONTACT = 'ADD_CONTACT'
const FIND_ACCOUNT = 'FIND_ACCOUNT'
const FIND_CONTACT = 'FIND_CONTACT'
const FIND_CONTACT_OF_ACCOUNT = 'FIND_CONTACT_OF_ACCOUNT'
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'

const ADD = "ADD"
const REST = "REST"
const FIND = "FIND"
const UPDATE_QUOTE = "UPDATE_QUOTE"
const CLEAR_QUOTE_TO_EDIT = "CLEAR_QUOTE_TO_EDIT"
const FIND_ALL = "FIND_ALL"
const FIND_BY_NAME = "FIND_BY_NAME"

//campos a mostrar en formularios de Charges
const CHARGES_FIELDS = {"Name": {"field": "Name"}, "magaya__Amount": {"field": "Amount"},
                "magaya__CQuantity": {"field": "Quantity"}, "magaya__Price": {"field": "Price"},
                "magaya__Paid_As": {"field": "Paid As", "values": ["Prepaid", "Collect"]},
                "magaya__Unit": {"field": "Unit", "values": ["U", "Lb"]}, "magaya__Tax_Rate": {"field": "Tax Rate"},

}

const ITEMS_FIELDS = {
    "Name": {"field": "Name"}, "magaya__Length": {"field": "Length"}, "magaya__Width": {"field": "Width"},
    "magaya__Weigth": {"field": "Weigth"}, "magaya__Status": {"field": "Status"}, "magaya__Height": {"field": "Height"},
    "magaya__Pieces": {"field": "Pieces"}, "magaya__Measure_System": {"field": "Measure System", "values": ["International", "English"]},
    "magaya__Volume": {"field": "Volume"}, "Modified_Time": {"field": "Modified Time"}
}
