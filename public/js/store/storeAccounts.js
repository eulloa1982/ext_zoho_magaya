const initialStateAccount = {
    accounts: [],
    contacts: [],
    contactList: [],
    singleContact:[]
  };


function reducerAccounts (state = initialStateAccount, actions)  {

    switch (actions.type) {
        case ADD_ACCOUNT: {
            return Object.assign({}, state, {
                accounts: state.accounts.concat(actions.payload)
            });
        }

        case ADD_CONTACT: {
            return Object.assign({}, state, {
                contacts: state.contacts.concat(actions.payload)
            });
        }

        case FIND_ACCOUNT: {
            let byId = actions.payload.id;
            var accountToEdit = {}
            state.accounts.map(account => {
                if (account.id === byId) {
                    accountToEdit = account;
                    //currentAccount = quote.Account
                }
            })
            return {
                ...state, accountToEdit
            }
        }

        case FIND_CONTACT: {
            let byId = actions.payload.id;

            return {
                ...state,
                singleContact: state.contacts.filter(contact => contact.id === byId)
            }
        }

        case FIND_CONTACT_OF_ACCOUNT: {
            let accountId = actions.payload.id;
            newR = state.contacts
            ass = []
            $.map(newR, function(k, v) {
                let a = (_.isEmpty (k.Account_Name) ? '0' : k)
                if (a !== '0')
                    ass.push(a)

            })

            //solo los que tengan account definido
            state.contacts = [...ass]
            return {
                ...state,
                contactList: state.contacts.filter(contact => contact.Account_Name.id === accountId)
            }
        }

        case UPDATE_ACCOUNT: {
            let byId = actions.payload.id
            let body = actions.payload
            const index = state.accounts.findIndex(account => account.id === byId)
            const newArray = [...state.accounts];
            newArray[index] = actions.payload
            return {
                ...state,
                accounts: newArray
            }
        }


        /*case 'SET_ACCOUNT': {
            currentAccount = actions.payload.account;
            return {
                currentAccount
            }
        }*/
        default:
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeAccounts = Redux.createStore(reducerAccounts);


//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeAccounts.subscribe(() => {
    console.log("State contacts now", storeAccounts.getState())
})

////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////

function addAccount(payload) {
    return { type: ADD_ACCOUNT, payload };
}

function addContact(payload) {
    return { type: ADD_CONTACT, payload};
}

function findAccount(payload) {
    return { type: FIND_ACCOUNT, payload };
}

function findContact(payload) {
    return { type: FIND_CONTACT, payload };
}

function findContactOfAccount(payload) {
    return { type: FIND_CONTACT_OF_ACCOUNT, payload}
}

function updateAccount(payload) {
    return { type: UPDATE_ACCOUNT, payload}
}


