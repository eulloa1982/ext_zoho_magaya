const initialStateCrm = {
    //
    itemsCrm: [],
    itemCrm: []
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

        case UPDATE_ITEM_CRM: {
            const byId = actions.payload.id
            const item = actions.payload.item

            const newArray = {...state.itemsCrm}
            let item_1 = state.itemsCrm.filter(i => i.id === byId )
            const index = state.itemsCrm.findIndex(quote => quote.id === byId)

            item_1 = item
            state.itemsCrm[index] = item[index]
            return {
                ...state,
                itemCrm: item_1,
                itemsCrm: state.itemsCrm
            }

        }

        case DELETE_ITEM_CRM: {
            const byId = actions.payload.id
            const module = actions.payload.module
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

        case "GET_ITEM_CRM": {
            const byId = actions.payload.id
            console.log("Searching ", byId)
            return {
                    ...state,
                    itemCrm: state.itemsCrm.filter(item => item.id == byId),
                }

        }


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

function updateItemCrm(payload) {
    return { type: UPDATE_ITEM_CRM, payload }
}

function getItemCrm(payload) {
    return { type: "GET_ITEM_CRM", payload }
}

