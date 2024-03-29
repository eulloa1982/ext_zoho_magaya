const initialStateChargesDef = {
    chargesDef:[],
    //charges def in crm
    singleChargeDef: [],
    active: false
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerChargesDef = (state = initialStateChargesDef, actions) => {

    switch (actions.type) {

        case ADD_CHARGES_DEF: {
            return {
                ...state,
                chargesDef: state.chargesDef.concat(actions.payload)
            };
        }


        case GET_CHARGE_DEF: {
            const byId = actions.payload.id
            const newArray = state.chargesDef[byId]
            return {
                ...state,
                singleChargeDef:newArray
            };
        }

        case GET_CHARGES_DEF: {
            return {
                ...state,
                chargesDef: state.chargesDef
            }
        }

        case MAKE_ACTIVE_CHARGEDEF: {
            return {
                ...state,
                active: true
            }
        }

        case MAKE_INACTIVE_CHARGEDEF: {
            return {
                ...state,
                active: false
            }
        }

        default: {
            return {
                ...state,
                active: false
            }
        }


    }

}

        /*case 'ADD_CONTACT': {
            return Object.assign({}, state, {
                contactQuote: state.contactQuote.concat(actions.payload)
            });
        }

        case 'ADD_PAGE':
            state.page = state.page + 1
            let actual_page = state.page
            return {
                ...state,
                actual_page
            }

        case "ACTION_EDITED_COUNTER": {
            return {
                ...state,
                actionsCounter: state.actionsCounter += 1
            }
        }

        case "CLEAN_ACTIONS_EDITED": {
            return {
                ...state,
                actionsCounter: initialState.actionsCounter
            }
        }*/




////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeChargesDef = Redux.createStore(reducerChargesDef)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addChargesDef(payload){
    return {type: ADD_CHARGES_DEF, payload}
}

function addPortsDef(payload) {
    return { type: ADD_PORTS_DEF, payload };
}

function getChargeDef(payload){
    return {type: GET_CHARGE_DEF, payload}
}

function getCurrentItemDef(payload) {
    return { type: GET_CURRENT_ITEM_DEF, payload };
}

function makeInactiveChargeDef() {
    return {type: MAKE_INACTIVE_CHARGEDEF};
}

function makeActiveChargeDef() {
    return {type: MAKE_ACTIVE_CHARGEDEF};
}

