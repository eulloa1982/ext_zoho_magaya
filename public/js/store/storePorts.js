const initialStatePorts = {
    ports:[],
    currentPorts:[]
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerPorts = (state = initialStatePorts, actions) => {

    switch (actions.type) {

        case ADD_PORTS: {
            return {
                ...state,
                ports: state.ports.concat(actions.payload),
                currentPorts: state.ports
            };
        }

        /*case ADD_PORTS_DEF: {
            return {
                ...state,
                portsDef: state.portsDef.concat(actions.payload)
            }
        }

        case GET_CHARGE_DEF: {
            const byId = actions.payload.id
            const newArray = state.chargesDef[byId]
            return {
                ...state,
                singleChargeDef:newArray
            };
        }

        case GET_CURRENT_ITEM_DEF: {
            const module = actions.payload.module
            console.log("Module is ", module)
            switch (module) {
                case "magaya__Ports": {
                    return {
                        ...state,
                        currentItems: state.portsDef
                    }
                }

                case "magaya__Charges_Type": {
                    return {
                        ...state,
                        currentItems: state.chargesDef
                    }
                }*/

                default: {
                    state.currentPorts = state.ports
                    return {
                        ...state,
                        currentPorts: state.currentPorts
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
const storePorts= Redux.createStore(reducerPorts)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addPorts(payload){
    return {type: ADD_PORTS, payload}
}



