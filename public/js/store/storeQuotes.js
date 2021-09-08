const initialStateQuote = {
    quotes: [],
    quoteToEdit: [],
    //currentAccount: 0

  };


function reducerQuote (state = initialStateQuote, actions)  {

    switch (actions.type) {
        case 'ADD': {
            //agregar validacion del account
            return Object.assign({}, state, {
                quotes: state.quotes.concat(actions.payload)
            });
        }

        case 'REST': {
            return {
                    ...state,
                    quotes: state.quotes.filter(quote => quote.id !== actions.payload.id),
                }
            }

        case 'FIND': {
            let byId = actions.payload.id;
            var quoteToEdit = {}
            state.quotes.map(quote => {
                if (quote.id === byId) {
                    quoteToEdit = quote;
                    //currentAccount = quote.Account
                }
            })
            return {
                ...state, quoteToEdit
            }
        }

        case 'UPDATE_QUOTE': {
            let byId = actions.payload.id
            let body = actions.payload
            const index = state.quotes.findIndex(quote => quote.id === byId)
            const newArray = [...state.quotes];
            newArray[index] = actions.payload
            return {
                ...state,
                quotes: newArray
            }
        }

        case 'FIND_ALL':
            return {
                ...state
            }

        /*case 'SET_ACCOUNT': {
            currentAccount = actions.payload.account;
            return {
                currentAccount
            }
        }*/
        default:
            //currentAccount = 0;
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeQuote = Redux.createStore(reducerQuote);


//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeQuote.subscribe(() => {
    let u = storeQuote.getState()
    console.log("State quote now", u)
    let i = 0;
})

////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////

function addQuote(payload) {
    return { type: 'ADD', payload };
}

function deleteQuote(payload) {
    return { type: 'REST', payload };
}

function findQuote(payload) {
    return { type: 'FIND', payload };
}

function findAll() {
    return { type: 'FIND_ALL' }
}

function updateQuote(payload) {
    return { type: 'UPDATE_QUOTE', payload}
}

function setAccountQuote(payload) {
    return { type: 'SET_ACCOUNT', payload }
}


