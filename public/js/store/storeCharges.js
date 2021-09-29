const initialStateCharge = {
    charges: [],
    chargesQuotes: [],
    //a list of charges on a new mquote form
    chargesOnNew: [],
    singleCharge: [],
    chargesOnXml: [],
    emptyCharge: {
        Name: "",
        magaya__Amount: 0,
        magaya__Amount_Total: 0,
        magaya__CQuantity: 0,
        magaya__ChargeCode: 0,
        magaya__ChargeCurrency: "",
        magaya__Charge_Description: "",
        magaya__Final_Amount: 0,
        magaya__Paid_As: "",
        magaya__Price: 0,
        magaya__Status: "",
        magaya__TaxRate: 0,
        magaya__Tax_Amount: 0,
        magaya__Unit: "",
        magaya__ApplyToAccounts: 0,
        Adjustment: 0
    },
    showEmptyCharge: false
  };

function reducerCharge (state = initialStateCharge, actions)  {

    switch (actions.type) {
        case ADD_CHARGE: {
            if (_.isEmpty(actions.payload.Name) || _.isEmpty(actions.payload.magaya__ApplyToAccounts))
                throw new UserException('Mandatory data not found: eigther Charge Name or Client are mandatory');

                return Object.assign({}, state, {
                    charges: state.charges.concat(actions.payload)
                });
        }

        case ADD_CHARGES_XML: {
            state.chargesOnXml = initialStateCharge.chargesOnXml;
            return Object.assign({}, state, {
                chargesOnXml: state.chargesOnXml.concat(actions.payload)
            })
        }

        case ADD_CHARGE_EMPTY: {
            const length = _.size(state.charges)
            const index = length + 1

            $.map(state.emptyCharge, function(k, v) {
                state.emptyCharge[v] = ""
            })

            let newArray = state.emptyCharge;
            console.log(newArray)
            Object.assign(newArray, {"id": index})
            return {
                ...state,
                singleCharge: [index, newArray],
                showEmptyCharge: true
            }
        }



        case DELETE_CHARGE: {
            const byId = actions.payload.id
            return {
                    ...state,
                    charges: state.charges.filter(charge => charge.id !== byId),
                }
            }



        case GET_CHARGE_QUOTE: {
            const byId = actions.payload.id;
            //always get just 1 item on the state
            state.singleCharge = initialStateCharge.singleCharge;
            newArray = {...state.charges[byId]}

            return {
                ...state,
                singleCharge: [byId, newArray],
                showEmptyCharge: false
            }
        }

        case EMPTY_CHARGES : {
            state.charges = initialStateCharge.charges
            state.chargesOnNew = initialStateCharge.chargesOnNew
            state.chargesQuotes = initialStateCharge.chargesQuotes
            return {
                ...state
            }
        }

        case UPDATE_CHARGE: {
            const id = actions.payload.id
            const index = state.charges.findIndex(charge => charge.id === id)
            state.charges[index] = actions.payload
            newArray = actions.payload
            return {
                ...state,
                singleCharge: newArray
            }

        }

        //set amount on charge editing
        case SET_AMOUNT: {
            const field = actions.payload.field;
            const value = actions.payload.value;

            newArray = {...state.singleCharge};
            newArray[1][field] = value
            //calculate volume
            let amount = roundDec(newArray[1]['magaya__Price']) * roundDec(newArray[1]['magaya__CQuantity']);
            newArray[1]['magaya__Amount'] = roundDec(amount)
            let amount_tax = (roundDec(newArray[1]['magaya__Amount']) / 100) * roundDec(newArray[1]['magaya__TaxRate'])
            newArray[1]['magaya__Tax_Amount'] = roundDec(amount_tax);
            let amount_total = roundDec(amount + amount_tax);
            newArray[1]['magaya__Amount_Total'] = roundDec(amount_total);

            let final_amount = roundDec(amount_total) + roundDec(newArray[1]['magaya__Adjustment'])
             newArray[1]['magaya__Final_Amount'] = roundDec(final_amount)
            return {
                ...state,
                singleCharge: newArray
            }
        }


        case ADD_CHARGE_ON_NEW: {
            if (_.isEmpty(actions.payload.Name)  || _.isEmpty(actions.payload.magaya__ApplyToAccounts))
                throw new UserException('Mandatory data not found: eigther Charge Name or Client are mandatory');
            if (_.isEmpty(actions.payload.magaya__ChargeCode) || actions.payload.magaya__ChargeCode === "select")
                throw new UserException('You need to select a Charge Type')

            $.map(state.emptyCharge, function(k, v) {
                state.emptyCharge[v] = 0
            })

            return Object.assign({}, state, {
                chargesOnNew: state.chargesOnNew.concat(actions.payload)
            });
        }


        /*case SET_AMOUNT_ON_NEW: {
            //const index = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;
            const index = state.singleCharge[0];
            //state.singleCharge = initialStateCharge.singleCharge
            newArray = state.chargesOnNew[index];
            newArray[field] = value
            //calculate amount
            let amount = parseFloat(newArray['magaya__Price']) * parseFloat (newArray['magaya__CQuantity']);
            newArray['magaya__Amount'] = roundDec(amount)
            //calculate amount tax
            let amount_tax = (newArray['magaya__Amount'] / 100) * parseFloat (newArray['magaya__TaxRate'])
            newArray['magaya__Tax_Amount'] = roundDec(amount_tax)
            let amount_total = amount + amount_tax;
            newArray["magaya__Amount_Total"] = roundDec(amount_total)
            return {
                ...state,
                singleCharge: [index, newArray]
            }
        }*/


        case UPDATE_CHARGE_ON_NEW : {
            const field = actions.payload.field;
            const value = actions.payload.value;

            newArray = {...state.emptyCharge}
            newArray[field] = value

            let amount = roundDec(newArray['magaya__Price']) * roundDec (newArray['magaya__CQuantity']);
            newArray['magaya__Amount'] = roundDec(amount)
            //calculate amount tax
            let amount_tax = (newArray['magaya__Amount'] / 100) * roundDec (newArray['magaya__TaxRate'])
            newArray['magaya__Tax_Amount'] = roundDec(amount_tax)
            let amount_total = amount + amount_tax;
            newArray["magaya__Amount_Total"] = roundDec(amount_total)

            newArray['Name'] = newArray["magaya__Charge_Description"]
            newArray["magaya__TaxRate"] = newArray["magaya__TaxCode"]
            newArray["magaya__Final_Amount"] = roundDec(newArray["magaya__Adjustment"]) + roundDec(amount_total)
            return {
                ...state,
                emptyCharge: newArray

            }
        }

        case DELETE_CHARGE_ON_NEW: {
            const index = actions.payload.id
            let newArray = state.chargesOnNew
            if (index > 0) {
                newArray.splice(index, index)
            }
            else {
                newArray.splice(0,1);
            }
            return {
                ...state,
                chargesOnNew: newArray
            }

        }

        case GET_CHARGE_QUOTE_ON_NEW: {
            const byId = actions.payload.id;

            console.log("Getting new charge with id", byId)
            //always get just 1 item on the state
            state.singleCharge = initialStateCharge.singleCharge;
            newArray = {...state.chargesOnNew[byId]}
            //state.chargesOnNew[byId]["id"] = byId
            return {
                ...state,
                singleCharge: [byId, newArray],
                showEmptyCharge: false
            }
        }

        default:
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeCharge = Redux.createStore(reducerCharge)


/*storeCharge.subscribe(() => {
    let u = storeCharge.getState()
})*/


////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////

function addCharge(payload) {
    return { type: ADD_CHARGE, payload };
}

function addChargeOnNew(payload) {
    return { type: ADD_CHARGE_ON_NEW, payload }
}

function getCharge(payload) {
    return { type: GET_CHARGE_QUOTE, payload }
}

function getChargeOnNew(payload) {
    return { type: GET_CHARGE_QUOTE_ON_NEW, payload }
}

function deleteCharge(payload) {
    return { type: DELETE_CHARGE, payload };
}

function deleteChargeOnNew(payload) {
    return { type: DELETE_CHARGE_ON_NEW, payload };
}


function emptyCharges() {
    return { type: EMPTY_CHARGES}
}

function setAmount(payload) {
    return { type: SET_AMOUNT, payload }
}

function setAmountOnNew(payload) {
    return { type: SET_AMOUNT_ON_NEW, payload }
}


function updateCharge(payload) {
    return { type: UPDATE_CHARGE, payload }
}

function addChargesXML(payload) {
    return { type: ADD_CHARGES_XML, payload }
}

function addChargeEmpty() {
    return {type: ADD_CHARGE_EMPTY}
}

function updateChargeOnNew(payload) {
    return {type: UPDATE_CHARGE_ON_NEW, payload}
}
