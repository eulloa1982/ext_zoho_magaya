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
        magaya__Charge_Type: 0,
        magaya__Charge_Name: "",
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

        //add charge to an existing mquote
        case ADD_CHARGE: {
            if (_.isEmpty(actions.payload.magaya__ApplyToAccounts)) {
                codeError = 'required field not found'
                show = true;
                field = 'applyToName';
                module = 'Charges'
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
            }

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

        //add charge empty on table-charges
        //add a new charge empty, id = size(charges)
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

        //add charge empty on table-charges-new
        //add charge empty, id = size(chargeOnNew)
        case ADD_CHARGE_EMPTY_NEW: {
            const length = _.size(state.chargesOnNew)
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


        case EMPTY_CHARGES : {
            state.charges = initialStateCharge.charges
            state.chargesOnNew = initialStateCharge.chargesOnNew
            state.chargesQuotes = initialStateCharge.chargesQuotes
            return {
                ...state
            }
        }

        case EMPTY_CHARGE : {
            state.emptyCharge = initialStateCharge.emptyCharge
            return {
                ...state,
                emptyCharges: initialStateCharge.emptyCharge
            }
        }

        //update all charge entity
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

        //add new charge on table-charge-new to store
        case ADD_CHARGE_ON_NEW: {
            if (_.isEmpty(actions.payload.magaya__ApplyToAccounts)) {
                codeError = 'required field not found'
                show = true;
                field = 'applyToName';
                module = 'Charges'
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

            }
            if (_.size(actions.payload.Name) <= 0)
                actions.payload.Name = 'No description';

                $.map(state.emptyCharge, function(k, v) {
                    state.emptyCharge[v] = 0
                })

            return Object.assign({}, state, {
                chargesOnNew: state.chargesOnNew.concat(actions.payload)
            });
        }


        //new charge form, sendCharge form updateCharge form, updateChargeNew form
        case UPDATE_CHARGE_ON_NEW : {
            const field = actions.payload.field;
            const value = actions.payload.value;
            const index = state.singleCharge[0]
            newArray = {...state.singleCharge};
            newArray[1][field] = value

            charge_name = $("select[name=magaya__Charge_Type] option:selected").text()
            //numeros de 12 digitos
            let price = roundDec(newArray[1]['magaya__Price'])
            price = digitCount2(price) > 12 ? 0 : price
            let quantity = roundDec(newArray[1]['magaya__CQuantity'])
            quantity = digitCount2(quantity) > 12 ? 0 : quantity
            let amount = roundDec(newArray[1]['magaya__Amount'])
            amount = digitCount2(amount) > 12 ? 0 : amount
            let amount_tax = roundDec(newArray[1]['magaya__Tax_Amount'])
            amount_tax = digitCount2(amount_tax) > 12 ? 0 : amount_tax
            let amount_total = roundDec(newArray[1]['magaya__Amount_Total'])
            amount_total = digitCount2(amount_total) > 12 ? 0 : amount_total
            let tax_rate = roundDec(newArray[1]['magaya__TaxRate'])
            tax_rate = digitCount2(tax_rate) > 12 ? 0 : tax_rate
            let tax = newArray[1]['magaya__Tax'] === "0" ? "" : newArray[1]['magaya__Tax']
            let name = (newArray[1]['Name'] && newArray[1]['Name'].length > 0) ?  sanitize(newArray[1]['Name']) : charge_name
            newArray[1]['Name'] = name.slice(0, 50)
            newArray[1]['magaya__Status']  = (newArray[1]['magaya__Status']).length > 0 ?  sanitize(newArray[1]['magaya__Status']) : 'Open'
            newArray[1]['magaya__Charge_Type'] = newArray[1]['magaya__Charge_Type']
            newArray[1]['magaya__Charge_Name'] = charge_name

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
            newArray[1]['magaya__Price'] = price
            newArray[1]['magaya__Tax'] = tax
            newArray[1]['magaya__Amount'] = amount
            newArray[1]['magaya__Tax_Amount'] = amount_tax
            newArray[1]['magaya__Amount_Total'] = amount_total
            newArray[1]['magaya__CQuantity'] = quantity

            //if (tax_rate <= 0)
            //    newArray[1]['magaya__Tax'] = ''
            if (!_.isEmpty(state.chargesOnNew[index])) {


                state.chargesOnNew[index] = {...newArray[1]}
            }

            return {
                ...state,
                emptyCharge: newArray,
                singleCharge: newArray

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

        //get a charge on table-charge-new table
        case GET_CHARGE_QUOTE_ON_NEW: {
            const byId = actions.payload.id;

            //always get just 1 item on the state
            state.singleCharge = initialStateCharge.singleCharge;

            if (byId < 0) {
                newArray = state.emptyCharge
            } else {
                if (!_.isEmpty(state.chargesOnNew[byId]))
                    newArray = {...state.chargesOnNew[byId]}
                else {
                    newArray = state.emptyCharge
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


        //get a charge on a table-charge table
        case GET_CHARGE_QUOTE: {
            const byId = actions.payload.id;
            //always get just 1 item on the state
            state.singleCharge = initialStateCharge.singleCharge;

            if (byId < 0) {
                newArray = state.emptyCharge
            } else {
                if (!_.isEmpty (state.charges[byId])) {
                    newArray = {...state.charges[byId]}
                }
                else {
                    newArray = state.emptyCharge
                }
            }

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

function deleteCharge(payload) {
    return { type: DELETE_CHARGE, payload };
}

function deleteChargeOnNew(payload) {
    return { type: DELETE_CHARGE_ON_NEW, payload };
}

function getCharge(payload) {
    return { type: GET_CHARGE_QUOTE, payload }
}

function getChargeOnNew(payload) {
    return { type: GET_CHARGE_QUOTE_ON_NEW, payload }
}

function emptyCharges() {
    return { type: EMPTY_CHARGES}
}

function addChargesXML(payload) {
    return { type: ADD_CHARGES_XML, payload }
}

function updateChargeOnNew(payload) {
    return {type: UPDATE_CHARGE_ON_NEW, payload}
}

function updateCharge(payload) {
    return { type: UPDATE_CHARGE, payload }
}

function addChargeEmpty() {
    return {type: ADD_CHARGE_EMPTY}
}

function addChargeEmptyNew() {
    return {type: ADD_CHARGE_EMPTY_NEW}
}

function emptyCharge() {
    return { type: EMPTY_CHARGE }
}
