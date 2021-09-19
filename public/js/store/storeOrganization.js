const initialStateO = {
    organization: [],
  };


function reducerOrganization (state = initialStateO, actions)  {

    switch (actions.type) {
        case ADD_ORG: {
            //agregar validacion del account
            return Object.assign({}, state, {
                organization: state.organization.concat(actions.payload)
            });
        }


        default:
            //currentAccount = 0;
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeOrganization = Redux.createStore(reducerOrganization);




////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////

function addOrganization(payload) {
    return { type: ADD_ORG, payload };
}

