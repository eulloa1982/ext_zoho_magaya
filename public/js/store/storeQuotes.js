const initialStateQuote = {
    quotes: [],
    quoteToEdit: [],
    singleQuote: [],
    nextQuote: [],
    prevQuote: []
    //currentAccount: 0

  };


function reducerQuote (state = initialStateQuote, actions)  {

    switch (actions.type) {
        case ADD: {
            //agregar validacion del account
            return Object.assign({}, state, {
                quotes: state.quotes.concat(actions.payload)
            });
        }

        case "ADD_STARTING": {
            let quote = actions.payload
            return {
                ...state,
                quotes: [quote, ...state.quotes]
            }
        }


        case REST: {
            return {
                    ...state,
                    quotes: state.quotes.filter(quote => quote.id !== actions.payload.id),
                }
            }

        case FIND: {
            let byId = actions.payload.id;
            let quoteToEdit = {}
            let nextQuote = []
            let prevQuote = []

            state.quotes.map(function(quote, k) {
                if (quote.id === byId) {
                    let indiceNext = k + 1;
                    let indicePrev = k - 1
                    quoteToEdit = quote;

                    if (state.quotes[indiceNext])
                        nextQuote = state.quotes[indiceNext]
                    if (state.quotes[indicePrev])
                        prevQuote = state.quotes[indicePrev]
                    //currentAccount = quote.Account
                }
            })
            return {
                ...state,
                quoteToEdit,
                nextQuote,
                prevQuote
            }
        }

        case UPDATE_QUOTE: {
            let byId = actions.payload.id
            let body = actions.payload[0]

            const index = state.quotes.findIndex(quote => quote.id === byId)
            state.quotes[index] = body
            quoteToEdit = body
            return {
                ...state,
                quotes: state.quotes,
                quoteToEdit
            }
        }

        case UPDATE_QUOTE_BY_FIELD: {
            let byId = actions.payload.id
            let field = actions.payload.field
            let value = actions.payload.value

            const index = state.quotes.findIndex(quote => quote.id === byId)
            state.quotes[index][field] = value
            return {
                ...state,
                quotes: state.quotes
            }
        }

        case CLEAR_QUOTE_TO_EDIT: {
            state.quoteToEdit = initialStateQuote.quoteToEdit
            return {
                ...state,
                quoteToEdit: state.quoteToEdit
            }
        }

        case FIND_ALL:
            return {
                ...state
            }

        case FIND_BY_NAME: {
            charSeeker = actions.payload.char;
            charSeeker = charSeeker.replace(/[ ]/g, '')
            console.log(charSeeker)
            state.quotes2 = []

            return {
                ...state,
                quotes2: state.quotes.filter(quote => quote.Name === charSeeker)
            }
        }


        case FIND_BY_ID: {
            return {
                ...state,
                singleQuote: state.quotes.filter(quote => quote.id === actions.payload.id)
            }
        }
        default:
            //currentAccount = 0;
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeQuote = Redux.createStore(reducerQuote);




////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////

function addQuote(payload) {
    return { type: ADD, payload };
}

function deleteQuote(payload) {
    return { type: REST, payload };
}

function findQuote(payload) {
    return { type: FIND, payload };
}

function findAll() {
    return { type: FIND_ALL }
}

function updateQuote(payload) {
    return { type: UPDATE_QUOTE, payload}
}

function updateQuoteByField(payload) {
    return {type: UPDATE_QUOTE_BY_FIELD, payload}
}

function setAccountQuote(payload) {
    return { type: SET_ACCOUNT, payload }
}

function clearQuoteToEdit() {
    return { type: CLEAR_QUOTE_TO_EDIT };
}

function findByName(payload) {
    return { type: FIND_BY_NAME, payload };
}

function findById(payload) {
    return { type: FIND_BY_ID, payload };
}

function addStarting(payload) {
    return { type: "ADD_STARTING", payload }
}

