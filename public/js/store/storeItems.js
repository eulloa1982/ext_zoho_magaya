const initialStateIntems = {
    isItemNew: false,
    items: [],
    itemsQuote: [],
    itemsOnNew: [],
    singleItem: [],
    isChargeNew: true,
    //empty item to inserting actions
    itemEmpty:{
        Name: "",
        magaya__Length: 0,
        magaya__Weigth: 0,
        magaya__Height: 0,
        magaya__Pieces: 0,
        magaya__Width: 0,
        magaya__Measure_System: "",
        magaya__Volume: 0,
        magaya__Package_Description: ""

    },
    showEmptyItem: false,
    itemNew: []
  };

function reducerItem (state = initialStateIntems, actions)  {

    switch (actions.type) {

        case ADD_ITEM: {
            return Object.assign({}, state, {
                items: state.items.concat(actions.payload)
            });

        }

        case ADD_ITEM_EMPTY: {
            const length = _.size(state.items)
            const index = length + 1

            $.map(state.itemEmpty, function(k, v) {
                if (v !== "Name")
                    state.itemEmpty[v] = 0
                else state.itemEmpty["Name"] = ""
            })
            let newArray = state.itemEmpty;
            Object.assign(newArray, {"id": index})
            return {
                ...state,
                singleItem: [index, newArray],
                showEmptyItem: true
            }
        }

        case ADD_ITEM_ON_NEW: {
            //calculate totales
            newArray = state.itemsOnNew;
            $.map(state.itemNew, function(k, v) {
                state.itemNew[v] = 0
            })

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
                byId = 0
                newArray = initialStateItem.singleItem
            } else {
                if (!_.isEmpty(state.items[byId])) {
                    newArray = {...state.items[byId]}
                }
                else {
                    byId = 0
                    newArray = initialStateItem.singleItem
                }
            }

            return {
                ...state,
                singleItem: [byId, newArray],
                showEmptyItem: false
            }
        }


        case GET_ITEM_QUOTE_ON_NEW: {
            //drop all first
            const byId = actions.payload.id
            state.singleItem = initialStateIntems.singleItem

            if (byId < 0) {
                //state.itemsOnNew[0]["id"] = 0
                newArray = state.itemEmpty
            } else {
                if (!_.isEmpty(state.itemsOnNew[byId])) {
                    state.itemsOnNew[byId]["id"] = byId
                }
                else {
                    newArray = state.itemEmpty
                }
            }

            return {
                ...state,
                singleItem: [byId, state.itemsOnNew[byId]],
                showEmptyItem: false
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


        //update all item when package type change
        case UPDATE_ALL_ITEM_ON_NEW : {
            const height = actions.payload.height
            const width = actions.payload.width
            const length = actions.payload.length
            const package = actions.payload.package

            let newArray = {...state.singleItem}
            newArray[1]["magaya__Package_Type"] = package
            newArray[1]["magaya__Length"] = length
            newArray[1]["magaya__Height"] = height
            newArray[1]["magaya__Width"] = width
            newArray[1]["magaya__Volume"] = roundDec(width * length * height)

            return {
                ...state,
                singleItem: newArray
            }
        }

        //item empty on new on inserting
        case UPDATE_ITEM_ON_NEW: {
            const field = actions.payload.field;
            const value = actions.payload.value;

            let newArray ={...state.singleItem}
            newArray[1][field] = value

            let pieces = parseInt(newArray[1]["magaya__Pieces"])
            let height = roundDec(newArray[1]["magaya__Height"]);
            let length = roundDec(newArray[1]["magaya__Length"]);
            let width = roundDec(newArray[1]["magaya__Width"]);
            let weigth = roundDec(newArray[1]["magaya__Weigth"]);
            newArray[1]['Name'] = (newArray[1]['Name']).length > 0 ?  sanitize(newArray[1]['Name']) : 'No description'
            let measure_system = sanitize(newArray[1]["magaya__Measure_System"])
            //calculate volume
            let volume = height * length * width
            newArray[1]["magaya__Height"] = height.toString().replace(/[,]/g, '').toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]["magaya__Length"] = length.toString().replace(/[,]/g, '').toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]["magaya__Width"] = width.toString().replace(/[,]/g, '').toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]["magaya__Weigth"] = weigth.toString().replace(/[,]/g, '').toLocaleString('en-US', {  minimumFractionDigits: 2  } )
            newArray[1]["magaya__Pieces"] = pieces
            newArray[1]["magaya__Volume"] = roundDec(volume).toLocaleString('en-US', {  minimumFractionDigits: 2  } )

            newArray[1]["magaya__Measure_System"] = measure_system !== null ? measure_system : "International"

            return {
                ...state,
                itemNew: newArray
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

//add item, on new and on charge
function addItemEmpty() {
    return {type: ADD_ITEM_EMPTY}
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

function updateAllItemNew(payload){
    return { type: UPDATE_ALL_ITEM_ON_NEW, payload }
}
