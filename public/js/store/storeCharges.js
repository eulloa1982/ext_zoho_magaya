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
        magaya__Paid_As: "",
        magaya__Price: 0,
        magaya__Status: "",
        magaya__Tax: 0,
        magaya__TaxRate: 0,
        magaya__Tax_Amount: 0,
        magaya__Unit: "",
        magaya__ApplyToAccounts: 0,
    },
    showEmptyCharge: false
  };

function reducerCharge (state = initialStateCharge, actions)  {

    switch (actions.type) {
        case ADD_CHARGE: {
            if (_.isEmpty(actions.payload.magaya__ApplyToAccounts))
                throw new UserException('Mandatory data not found: eigther Charge Name or Client are mandatory');
            if (_.isEmpty(actions.payload.magaya__ChargeCode) || actions.payload.magaya__ChargeCode === "select")
                throw new UserException('You need to select a Charge Type')

                if (_.size(actions.payload.Name) <= 0)
                    actions.payload.Name = 'No Description';

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

            if (byId < 0) {
                byId = 0
                newArray = state.singleCharge
            } else {
                if (!_.isEmpty (state.charges[byId])) {
                    newArray = {...state.charges[byId]}
                }
                else {
                    byId = 0
                    newArray = state.singleCharge
                }
            }
            //newArray = {...state.charges[byId]}

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

        case "EMPTY_CHARGE" : {
            state.emptyCharge = initialStateCharge.emptyCharge
            return {
                ...state,
                emptyCharges: initialStateCharge.emptyCharge
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
            //get values
            let price = roundDec(newArray[1]['magaya__Price'])
            let quantity = roundDec (newArray[1]['magaya__CQuantity'])
            let amount = roundDec(newArray[1]['magaya__Amount'])
            let amount_tax = roundDec(newArray[1]['magaya__Tax_Amount'])
            let amount_total = roundDec(newArray[1]['magaya__Amount_Total'])
            let tax_rate = roundDec(newArray[1]['magaya__TaxRate'])

            price = price > 0 ? price : 0;
            quantity = quantity > 0 ? quantity : 0
            amount = amount > 0 ? amount : 0
            amount_tax = amount_tax > 0 ? amount_tax : 0
            amount_total = amount_total > 0 ? amount_total : 0
            tax_rate = tax_rate > 0 ? tax_rate : 0

            //calculos
            amount = price * quantity;
            amount_tax = (roundDec(amount) / 100) * roundDec(tax_rate)
            amount_total = roundDec(amount + amount_tax)

            //back to field
            newArray[1]['magaya__Amount'] = roundDec(amount)
            newArray[1]['magaya__Tax_Amount'] = roundDec(amount_tax)
            newArray[1]['magaya__Amount_Total'] = roundDec(amount_total);

            if (_.isEmpty(newArray['Name']))
                newArray['Name'] = "No Description"
            if (_.isEmpty(newArray['magaya__Tax']) || newArray['magaya__Tax'] == 'null')
                newArray['magaya__Tax'] = ''

            return {
                ...state,
                singleCharge: newArray
            }
        }


        case ADD_CHARGE_ON_NEW: {
            if (_.isEmpty(actions.payload.magaya__ApplyToAccounts))
                throw new UserException('Mandatory data not found: eigther Charge Name or Client are mandatory');
            if (_.isEmpty(actions.payload.magaya__ChargeCode) || actions.payload.magaya__ChargeCode === "select")
                throw new UserException('You need to select a Charge Type')

            if (_.size(actions.payload.Name) <= 0)
                actions.payload.Name = 'No description';

                $.map(state.emptyCharge, function(k, v) {
                state.emptyCharge[v] = 0
            })

            return Object.assign({}, state, {
                chargesOnNew: state.chargesOnNew.concat(actions.payload)
            });
        }

        //Updating new charge
        /*case UPDATE_CHARGE_ON_NEW2 : {
            const field = actions.payload.field;
            const value = actions.payload.value;

            const index = state.singleCharge[0]

            newArray = {...state.singleCharge};
            newArray[1][field] = value

            let price = roundDec(newArray[1]['magaya__Price'])
            let quantity = roundDec (newArray[1]['magaya__CQuantity'])
            let amount = roundDec(newArray[1]['magaya__Amount'])
            let amount_tax = roundDec(newArray[1]['magaya__Tax_Amount'])
            let amount_total = roundDec(newArray[1]['magaya__Amount_Total'])
            let tax_rate = roundDec(newArray[1]['magaya__TaxRate'])

            price = price > 0 ? price : 0;
            quantity = quantity > 0 ? quantity : 0
            amount = amount > 0 ? amount : 0
            amount_tax = amount_tax > 0 ? amount_tax : 0
            amount_total = amount_total > 0 ? amount_total : 0
            tax_rate = tax_rate > 0 ? tax_rate : 0

            //calculos
            amount = price * quantity;
            amount_tax = (roundDec(amount) / 100) * roundDec(tax_rate)
            amount_total = roundDec(amount + amount_tax)

            //back to field
            newArray[1]['magaya__Amount'] = amount.toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]['magaya__Tax_Amount'] = amount_tax.toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]['magaya__Amount_Total'] = amount_total.toLocaleString('en-US', {  minimumFractionDigits: 2  } )

            /*if (_.size(newArray['Name']) <= 0) {
                console.log("Name size", _.size(newArray['Name']))
                newArray['Name'] = "No Description"

            }*
            if (_.size(newArray['magaya__Tax']) <= 0)
                newArray['magaya__Tax'] = ''
            state.chargesOnNew[index] = {...newArray[1]}

            return {
                ...state,
                singleCharge: newArray

            }
        }*/

        //new charge form, sendCharge form updateCharge form, updateChargeNew form
        case UPDATE_CHARGE_ON_NEW : {
            const field = actions.payload.field;
            const value = actions.payload.value;
            const index = state.singleCharge[0]
            newArray = {...state.singleCharge};
            newArray[1][field] = value

            let price = roundDec(newArray[1]['magaya__Price'])
            let quantity = roundDec (newArray[1]['magaya__CQuantity'])
            let amount = roundDec(newArray[1]['magaya__Amount'])
            let amount_tax = roundDec(newArray[1]['magaya__Tax_Amount'])
            let amount_total = roundDec(newArray[1]['magaya__Amount_Total'])
            let tax_rate = roundDec(newArray[1]['magaya__TaxRate'])

            price = price > 0 ? price : 0;
            quantity = quantity > 0 ? quantity : 0
            amount = amount > 0 ? amount : 0
            amount_tax = amount_tax > 0 ? amount_tax : 0
            amount_total = amount_total > 0 ? amount_total : 0
            tax_rate = tax_rate > 0 ? tax_rate : 0

            //calculos
            amount = price * quantity;
            amount_tax = (roundDec(amount) / 100) * roundDec(tax_rate)
            amount_total = roundDec(amount + amount_tax)

            //back to field
            newArray[1]['magaya__Amount'] = amount.toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]['magaya__Tax_Amount'] = amount_tax.toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]['magaya__Amount_Total'] = amount_total.toLocaleString('en-US', {  minimumFractionDigits: 2  } )

            /*if (_.size(newArray['Name']) <= 0) {
                console.log("Name size", _.size(newArray['Name']))
                newArray['Name'] = "No Description"

            }*/
            if (_.size(newArray[1]['magaya__Tax']) <= 0)
                newArray[1]['magaya__Tax'] = ''

            if (!_.isEmpty(state.chargesOnNew[index]))
                state.chargesOnNew[index] = {...newArray[1]}
            console.log("Empty charege", newArray)

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

            console.log(byId)
            //always get just 1 item on the state
            state.singleCharge = initialStateCharge.singleCharge;

            if (byId < 0) {
                byId = 0
                newArray = {...state.chargesOnNew[0]}
            } else {
                if (!_.isEmpty(state.chargesOnNew[byId]))
                    newArray = {...state.chargesOnNew[byId]}
                else {
                    byId = 0
                    newArray = {...state.chargesOnNew[0]}
                }
            }
            //newArray = {...state.chargesOnNew[byId]}
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

function updateChargeOnNew2(payload) {
    return {type: UPDATE_CHARGE_ON_NEW2, payload}
}


function emptyCharge() {
    return { type: "EMPTY_CHARGE" }
}
