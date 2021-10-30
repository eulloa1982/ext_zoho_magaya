const initialStateProvidersDef = {
    providersDef:[],
    //charges def in crm
    singleProviderDef: [],
    active: false
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerProvidersDef = (state = initialStateProvidersDef, actions) => {

    switch (actions.type) {

        case ADD_PROVIDERS_DEF: {
            return {
                ...state,
                providersDef: state.providersDef.concat(actions.payload)
            };
        }


        case GET_PROVIDER_DEF: {
            const byId = actions.payload.id
            const newArray = state.providersDef[byId]
            return {
                ...state,
                singleProviderDef:newArray
            };
        }

        case GET_PROVIDERS_DEF: {
            return {
                ...state,
                providersDef: state.providersDef
            }
        }

        case MAKE_ACTIVE_PROVIDERDEF: {
            return {
                ...state,
                active: true
            }
        }

        case MAKE_INACTIVE_PROVIDERDEF: {
            return {
                ...state,
                active: false
            }
        }

        default: {
            return {
                ...state,
                active: false
            }
        }


    }

}

////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeProvidersDef = Redux.createStore(reducerProvidersDef)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addProvidersDef(payload){
    return {type: ADD_PROVIDERS_DEF, payload}
}

function getProvidersDef(payload){
    return {type: GET_PROVIDERS_DEF, payload}
}

function getProviderDef(payload){
    return {type: GET_PROVIDER_DEF, payload}
}

function makeInactiveProviderDef() {
    return {type: MAKE_INACTIVE_PROVIDERDEF};
}

function makeActiveProviderDef() {
    return {type: MAKE_ACTIVE_PROVIDERDEF};
}

