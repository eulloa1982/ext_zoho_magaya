const initialState = {
    accountQuote: [],
    contactQuote:[],
    page: 0
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducer = (state = initialState, actions) => {

    switch (actions.type) {

        case 'ADD_ACCOUNT': {
            return {
                ...state,
                accountQuote: state.accountQuote.concat(actions.payload)
            };
        }

        case 'ADD_CONTACT': {
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


        default:
            return state;
    }
}


const reducerClientQuote = (state = {}, actions) => {
    let {
        client = '',
        id = 0,
    } = actions
    switch (actions.type) {
        case 'SET':
            return Object.assign({}, state, {
                client: actions.value.client,
                id: actions.value.id
            });
        default:
            return state;
    }
}


////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const store = Redux.createStore(reducer);
const storeClientQuote = Redux.createStore(reducerClientQuote)


////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
/*store.subscribe(() => {
    let {account, contact} = store.getState();
    console.log(store.getState())

})
*/

///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addQuoteAccount(payload){
    return {type: 'ADD_ACCOUNT', payload}
}


function addQuoteContact(){
    return { type: 'ADD_CONTACT', payload }
}

function addPage() {
    return {type: "ADD_PAGE"}
}
