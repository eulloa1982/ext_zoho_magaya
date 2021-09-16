const initialStateChargesCrm = {
    //charges def in magaya
    chargesDef:[],
    //charges def in crm
    chargesType: []
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerChargesCrm = (state = initialStateChargesCrm, actions) => {

    switch (actions.type) {

        case ADD_CHARGES_TYPE: {
            return {
                ...state,
                chargesType: state.chargesType.concat(actions.payload)
            };

        }

        case DELETE_CHARGES_TYPE: {
            const byId = actions.payload.id
            console.log("deleting charge number", byId)
            return {
                ...state,
                chargesType: state.chargesType.filter(charge => charge.id !== byId)
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


        default:
            return state;
    }
}


////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeChargesCrm = Redux.createStore(reducerChargesCrm)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addChargesType(payload){
    return {type: ADD_CHARGES_TYPE, payload}
}


function deleteChargeType(payload) {
    return { type: DELETE_CHARGES_TYPE, payload}
}

