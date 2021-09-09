const initialStateOrganization = {
    organization: [],
  };


function reducerOrganization (state = initialStateOrganization, actions)  {

    switch (actions.type) {
        case ADD: {
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
    return { type: ADD, payload };
}

