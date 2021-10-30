const initialStatePorts = {
    ports:[],
    singlePortDef: [],
    active: false
    //charges def in crm
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerPorts = (state = initialStatePorts, actions) => {

    switch (actions.type) {

        case ADD_PORTS: {
            return {
                ...state,
                ports: state.ports.concat(actions.payload)
            }
        }


        case GET_PORTS: {
            return {
                ...state,
                ports: state.ports
            }
        }

        case GET_PORT_DEF: {
            const byId = actions.payload.id
            const newArray = state.ports[byId]
            return {
                ...state,
                singlePortDef:newArray
            };
        }

        case MAKE_ACTIVE_PORT: {

            return {
                ...state,
                active: true
            }
        }

        case MAKE_INACTIVE_PORT: {

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
        /*case 'ADD_CONTACT': {
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

        case "ACTION_EDITED_COUNTER": {
            return {
                ...state,
                actionsCounter: state.actionsCounter += 1
            }
        }

        case "CLEAN_ACTIONS_EDITED": {
            return {
                ...state,
                actionsCounter: initialState.actionsCounter
            }
        }*/




////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storePortsDef = Redux.createStore(reducerPorts)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addPorts(payload){
    return {type: ADD_PORTS, payload}
}

function makeActivePort() {
    return {type: MAKE_ACTIVE_PORT}
}

function makeInactivePort() {
    return {type: MAKE_INACTIVE_PORT};
}

function getPortDef(payload){
    return {type: GET_PORT_DEF, payload}
}


