const initialStateCrm = {
    //
    itemsCrm: []
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerCrm = (state = initialStateCrm, actions) => {

    switch (actions.type) {

        case ADD_ITEMS_CRM: {
            return {
                ...state,
                itemsCrm: state.itemsCrm.concat(actions.payload)
            };

        }

        case DELETE_ITEM_CRM: {
            const byId = actions.payload.id
            return {
                ...state,
                itemsCrm: state.itemsCrm.filter(item => item.id !== byId)
            }
        }

        case EMPTY_ITEMS_CRM: {
            return {
                ...state,
                itemsCrm: initialStateCrm.itemsCrm
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
const storeCrm = Redux.createStore(reducerCrm)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addItemCrm(payload){
    return {type: ADD_ITEMS_CRM, payload}
}


function deleteItemCrm(payload) {
    return { type: DELETE_ITEM_CRM, payload}
}

function emptyItemsCrm() {
    return { type: EMPTY_ITEMS_CRM }
}
