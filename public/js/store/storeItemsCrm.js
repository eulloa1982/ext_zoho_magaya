const initialStateCrm = {
    //
    itemsCrm: [],
    itemCrm: [],
    newItem: false
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
            const index = state.itemsCrm.findIndex(quote => quote.id === byId)

            let item_1 = item
            state.itemsCrm[index] = item[0]

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

        case GET_ITEM_CRM: {
            const byId = actions.payload.id
            let item = state.itemsCrm.filter(item => item.id == byId)
            return {
                    ...state,
                    itemCrm: state.itemsCrm.filter(item => item.id == byId),
                    newItem: false
                }

        }

        case GET_ITEM_EMPTY_CRM: {
            let item = {...state.itemsCrm[0]}
            $.map(item, function(k, v) {
                item[v] = ""
            })
            return {
                    ...state,
                    itemCrm: [item],
                    newItem: true
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
    return { type: GET_ITEM_CRM, payload }
}

function getItemEmptyCrm() {
    return { type: GET_ITEM_EMPTY_CRM }
}

