const initialStateIntems = {
    items: [],
    itemsQuote: [],
    itemsOnNew: [],
    singleItem: [],
  };

function reducerItem (state = initialStateIntems, actions)  {

    switch (actions.type) {
        case ADD_ITEM: {
            return Object.assign({}, state, {
                items: state.items.concat(actions.payload)
            });

        }


        case ADD_ITEM_ON_NEW: {
            //calculate totales
            newArray = state.itemsOnNew;

            return Object.assign({}, state, {
                itemsOnNew: state.itemsOnNew.concat(actions.payload),
                });
        }


        case DELETE_ITEM:
            const index = actions.payload.id
            if (index <= 0) {
                return {
                    ...state,
                    items: initialStateIntems.items
                }
            }
            return {
                ...state,
                items: state.items.filter(item => item.id !== actions.payload.id),
            }


        case DELETE_ITEM_ON_NEW: {
            const index = actions.payload.id
            let newArray = state.itemsOnNew
            if (index > 0) {
                newArray.splice(index, index)
            }
            else {
                newArray.splice(0,1);
            }
            return {
                ...state,
                itemsOnNew: newArray
            }

        }


        case GET_ITEM_QUOTE: {
            const byId = actions.payload.id;
            state.singleItem = initialStateIntems.singleItem;

            if (byId < 0) {
                newArray = initialStateItem.singleItem
            } else {
                newArray = {...state.items[byId]}
            }

            return {
                ...state,
                singleItem: [byId, newArray]
            }
        }


        case GET_ITEM_QUOTE_ON_NEW: {
            //drop all first
            const byId = actions.payload.id
            state.singleItem = initialStateIntems.singleItem
            state.itemsOnNew[byId]["id"] = byId
            //calculate totales

            return {
                ...state,
                singleItem: [byId, state.itemsOnNew[byId]]
            }
        }

        case UPDATE_ITEM: {
            const id = actions.payload.id
            const index = state.items.findIndex(item => item.id === id)
            state.items[index] = actions.payload
            newArray = actions.payload
            return {
                ...state,
                singleItem: newArray
            }
        }

        case UPDATE_ITEM_ON_NEW: {
            const field = actions.payload.field;
            const value = actions.payload.value;
            state.singleItem[field] = value
            return {
                ...state,
                singleItem: state.singleItem
            }

        }

        case CALCULATE_VOLUME: {
            //const idItem = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;
            //const index = state.items.findIndex(item => item.id === idItem)
            newArray = { ...state.singleItem};
            newArray[1][field] = value
            //calculate volume
            let volume = newArray[1]['magaya__Height'] * newArray[1]['magaya__Length'] * newArray[1]['magaya__Width'];
            newArray[1]['magaya__Volume'] = roundDec(volume)
            //calculate weigth
            let system = newArray[1]['magaya__Measure_System']
            //let factor = 166;
            //if (system === "International")
            //    factor = 1000

            //newArray[1]["magaya__Weigth"] = roundDec(volume / factor)
            //calculate totales

            return {
                ...state,
                singleItem: newArray
            }


        }


        case CALCULATE_VOLUME_ON_NEW: {
            //const index = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;
            const index = state.singleItem[0]

            state.singleItem = initialStateIntems.singleItem

            newArray = state.itemsOnNew[index];
            console.log("Copy array", newArray)
            newArray[field] = value
            //calculate volume
            let volume = newArray['magaya__Height'] * newArray['magaya__Length'] * newArray['magaya__Width'];
            newArray['magaya__Volume'] = roundDec(volume)
            //calculate weigth
            let system = newArray['magaya__Measure_System']
            //let factor = 166;
            //if (system === "International")
            //    factor = 1000

            //newArray["magaya__Weigth"] = roundDec(volume / factor)

            return {
                ...state,
                singleItem: [index, newArray]
            }
        }


        case EMPTY_ITEMS : {
            state.items = initialStateIntems.items
            state.itemsQuote = initialStateIntems.itemsQuote
            state.itemsOnNew = initialStateIntems.itemsOnNew
            return {
                ...state
            }
        }

        default:
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeItem = Redux.createStore(reducerItem)


/*storeItem.subscribe(() => {
    let u = storeItem.getState()
    //console.log("State items now", u)
})
*/

////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////
//add new item when editing a mquote
function addItem(payload) {
    return { type: ADD_ITEM, payload };
}

//add new item on new mquote form
function addItemOnNew(payload) {
    return { type: ADD_ITEM_ON_NEW, payload }
}

//drop an item on editing mquote
function deleteItem(payload) {
    return { type: DELETE_ITEM, payload };
}

//drop an item on a new mquote form
function deleteItemOnNew(payload) {
    return { type: DELETE_ITEM_ON_NEW, payload };
}

//get a single item while editing mquote
function getItemQuote(payload) {
    return { type: GET_ITEM_QUOTE, payload };
}

//get a single item on a new mquote form
function getItemQuoteOnNew(payload) {
    return { type: GET_ITEM_QUOTE_ON_NEW, payload };
}

//set volume while editing mquote
function setVolume(payload) {
    return {type: CALCULATE_VOLUME, payload}
}

//set volume on new mquote form
function setVolumeOnNew(payload) {
    return {type: CALCULATE_VOLUME_ON_NEW, payload}
}

//empty store, ready to fill it again
//when edit an item or add new one
function emptyItems() {
    return { type: EMPTY_ITEMS }
}

function updateItemOnNew(payload) {
    return { type: UPDATE_ITEM_ON_NEW, payload }
}

function updateItem(payload) {
    return { type: UPDATE_ITEM, payload }
}

