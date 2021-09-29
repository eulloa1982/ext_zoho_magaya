const initialStateChargesType = {

    chargesType: [],
};

function reducerChargesType (state = initialStateChargesType, actions)  {

    switch (actions.type) {
        case ADD_CHARGE_TYPE: {
            return Object.assign({}, state, {
                chargesType: state.chargesType.concat(actions.payload)
                });
        }



        default:
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeChargesType = Redux.createStore(reducerChargesType)


////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////

function addChargeType(payload) {
    return { type: ADD_CHARGE_TYPE, payload };
}
