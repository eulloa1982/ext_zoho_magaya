const initialStateChargesDef = {
    //charges def in magaya
    chargesDef:[],
    //charges def in crm
    singleChargeDef: []
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


        default:
            return state;
    }
}


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

function getChargeDef(payload){
    return {type: GET_CHARGE_DEF, payload}
}


