const initialStateCharge = {
    charges: [],
    chargesQuotes: [],
    //a list of charges on a new mquote form
    chargesOnNew: [],
    singleCharge: []
  };

function reducerCharge (state = initialStateCharge, actions)  {

    switch (actions.type) {
        case ADD_CHARGE: {
            if (_.isEmpty(actions.payload.Name) || _.isEmpty(actions.payload.magaya__ApplyToAccounts))
                throw new UserException('Mandatory data not found: eigther Charge Name or Client are mandatory');

                newArray = actions.payload
                let amount = newArray['magaya__Price'] * newArray['magaya__CQuantity']
                newArray['magaya__Amount'] = roundDec(amount)
                let amount_tax = (newArray['magaya__Amount']/100)*newArray['magaya__Tax_Rate']
                newArray['magaya__Tax_Amount'] = roundDec(amount_tax);
                let amount_total = amount + amount_tax;
                newArray['magaya__Amount_Total'] = amount_total;

                return Object.assign({}, state, {
                charges: state.charges.concat(newArray)
            });
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
            return {
                ...state,
                singleCharge: [byId, state.charges[byId]]
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

        case SET_AMOUNT: {
            const idCharge = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;

            const index = state.charges.findIndex(charge => charge.id === idCharge)
            newArray = [...state.charges];
            newArray[index][field] = value
            //calculate volume
            let amount = newArray[index]['magaya__Price'] * newArray[index]['magaya__CQuantity'];
            newArray[index]['magaya__Amount'] = roundDec(amount)
            let amount_tax = (newArray[index]['magaya__Amount']/100)*newArray[index]['magaya__Tax_Rate']
            newArray[index]['magaya__Tax_Amount'] = roundDec(amount_tax);
            let amount_total = amount + amount_tax;
            newArray[index]['magaya__Amount_Total'] = amount_total;
            return {
                ...state,
                chargesQuotes: newArray
            }
        }


        case ADD_CHARGE_ON_NEW: {
            if (_.isEmpty(actions.payload.Name)  || _.isEmpty(actions.payload.magaya__ApplyToAccounts))
                throw new UserException('Mandatory data not found: eigther Charge Name or Client are mandatory');
            if (_.isEmpty(actions.payload.magaya__ChargeCode) || actions.payload.magaya__ChargeCode === "select")
                throw new UserException('You need to select a Charge Type')

            newArray = actions.payload
            let amount = newArray['magaya__Price'] * newArray['magaya__CQuantity']
            newArray['magaya__Amount'] = roundDec(amount)
            let amount_tax = (newArray['magaya__Amount']/100)*newArray['magaya__Tax_Rate']
            newArray['magaya__Tax_Amount'] = roundDec(amount_tax);
            let amount_total = amount + amount_tax;
            newArray['magaya__Amount_Total'] = amount_total;

            return Object.assign({}, state, {
                chargesOnNew: state.chargesOnNew.concat(newArray)
            });
        }

        case SET_AMOUNT_ON_NEW: {
            const index = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;

            newArray = [...state.chargesOnNew];
            newArray[index][field] = value
            //calculate amount
            let amount = newArray[index]['magaya__Price'] * newArray[index]['magaya__CQuantity'];
            newArray[index]['magaya__Amount'] = roundDec(amount)
            //calculate amount tax
            let amount_tax = (newArray[index]['magaya__Amount']/100)*newArray[index]['magaya__Tax_Rate']
            newArray[index]['magaya__Tax_Amount'] = amount_tax
            let amount_total = amount + amount_tax;
            newArray[index]["magaya__Amount_Total"] = amount_total
            return {
                ...state,
                chargesOnNew: newArray
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
            //always get just 1 item on the state
            state.singleCharge = initialStateCharge.singleCharge;
            state.chargesOnNew[byId]["id"] = byId
            return {
                ...state,
                singleCharge: [byId, state.chargesOnNew[byId]]
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


storeCharge.subscribe(() => {
    let u = storeCharge.getState()
})


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


