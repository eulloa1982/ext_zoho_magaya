const initialStateIntems = {
    items: [],
    itemsQuote: [],
    itemsOnNew: [],
    singleItem: []
  };

function reducerItem (state = initialStateIntems, actions)  {

    switch (actions.type) {
        case ADD_ITEM:
            //calculate volume and weigth
            //let system = actions.payload.magaya__Measure_System;

            return Object.assign({}, state, {
                items: state.items.concat(actions.payload)
            });

        case ADD_ITEM_ON_NEW:
            //calculate volume and weigth
            //let system = actions.payload.magaya__Measure_System;

            return Object.assign({}, state, {
                itemsOnNew: state.itemsOnNew.concat(actions.payload)
                });

        case DELETE_ITEM:
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
            return {
                ...state,
                singleItem: [byId, state.items[byId]]
            }
        }

        case GET_ITEM_QUOTE_ON_NEW: {
            //drop all first
            const byId = actions.payload.id
            state.singleItem = initialStateIntems.singleItem
            state.itemsOnNew[byId]["id"] = byId
            return {
                ...state,
                singleItem: [byId, state.itemsOnNew[byId]]
            }
        }

        case CALCULATE_VOLUME: {
            const idItem = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;

            const index = state.items.findIndex(item => item.id === idItem)
            newArray = [...state.items];
            newArray[index][field] = value
            //calculate volume
            let volume = newArray[index]['magaya__Height'] * newArray[index]['magaya__Length'] * newArray[index]['magaya__Width'];
            newArray[index]['magaya__Volume'] = roundDec(volume)
            //calculate weigth
            let system = newArray[index]['magaya__Measure_System']
            let factor = 166;
            if (system === "International")
                factor = 1000

            newArray[index]["magaya__Weigth"] = roundDec(volume / factor)

            return {
                ...state,
                itemsQuote: newArray
            }


        }


        case CALCULATE_VOLUME_ON_NEW: {
            const index = actions.payload.id;
            const field = actions.payload.field;
            const value = actions.payload.value;
            console.warn("Id en el store", index)
            newArray = [...state.itemsOnNew];
            newArray[index][field] = value
            //calculate volume
            let volume = newArray[index]['magaya__Height'] * newArray[index]['magaya__Length'] * newArray[index]['magaya__Width'];
            newArray[index]['magaya__Volume'] = roundDec(volume)
            //calculate weigth
            let system = newArray[index]['magaya__Measure_System']
            let factor = 166;
            if (system === "International")
                factor = 1000

            newArray[index]["magaya__Weigth"] = roundDec(volume / factor)

            return {
                ...state,
                itemsOnNew: newArray
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


storeItem.subscribe(() => {
    let u = storeItem.getState()
    console.log("State items now", u)
})


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
