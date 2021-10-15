const initialStateAccount = {
    accounts: [],
    contacts: [],
    contactList: [],
    singleContact:[],
    accountShipper:[],
    accountConsignee:[],
    quoteAccount:[],
    allAccounts: []
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
            let accountA = {}
            state.accounts.map(account => {
                if (account.id === byId) {
                    accountA = account;
                }
            })
            return {
                ...state, singleAccount: accountA
            }
        }

        /*case "FIND_ACCOUNT_BYNAME": {
            let name = actions.payload.name;
            let accountA = {}
            let copy = [...state.accounts]
            copy.filter(account => {
                if (account.Account_Name === name) {
                    accountA = account
                    console.log("Account founded", account)
                }
            })
            return {
                state, singleAccount: accountA
            }
        }*/


        case SET_ACCOUNT_SHIPPER: {
            let byId = actions.payload.id;
            state.accountShipper = initialStateAccount.accountShipper

            return {
                ...state,
                accountShipper: state.accounts.filter(account => account.id === byId)
            }
        }

        case SET_ACCOUNT_CONSIGNEE: {
            let byId = actions.payload.id;
            state.accountConsignee = initialStateAccount.accountConsignee

            return {
                ...state,
                accountConsignee: state.accounts.filter(account => account.id === byId)
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
            const accountId = actions.payload.id;
            console.log(" Finding contact of", accountId)
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

        case ADD_QUOTE_ACCOUNT: {
            let byId = actions.payload.id
            const index = state.accounts.findIndex(account => account.id === byId)
            return {
                ...state,
                quoteAccount: state.accounts[index]
            }
        }


        case EMPTY_ACCOUNTS: {
            state.contactList = initialStateAccount.contactList
            state.singleContact = initialStateAccount.singleContact
            //state.singleAccount = initialStateAccount.singleAccount
            state.quoteAccount = initialStateAccount.quoteAccount
            state.allAccounts = initialStateAccount.allAccounts
            return {
                ...state
            }
        }

        case ALL_ACCOUNTS: {
            return {
                ...state,
                allAccounts: state.accounts
            }
        }

        case EMPTY_SINGLE_CONTACT: {
            state.singleContact = initialStateAccount.singleContact
            return {
                ...state
            }
        }

        case EMPTY_ALL_ACCOUNTS: {
            return {
                ...state,
                allAccounts: initialStateAccount.allAccounts
            }
        }

        default:
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeAccounts = Redux.createStore(reducerAccounts);



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

function findAccountByName(payload) {
    return {type: "FIND_ACCOUNT_BYNAME", payload}
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

function getAccount(payload) {
    return { type: FIND_ACCOUNT, payload }
}


function addQuoteAccount(payload) {
    return { type: ADD_QUOTE_ACCOUNT, payload };
}


function emptyAccounts() {
    return { type: EMPTY_ACCOUNTS };
}


function getAllAccounts() {
    return { type: ALL_ACCOUNTS };
}

function emptyAllAccounts() {
    return { type: EMPTY_ALL_ACCOUNTS };
}

function setAccountShipper(payload) {
    return {type: SET_ACCOUNT_SHIPPER, payload}
}

function setAccountConsignee(payload) {
    return {type: SET_ACCOUNT_CONSIGNEE, payload}
}

function emptySingleContact() {
    return {type: EMPTY_SINGLE_CONTACT}
}
