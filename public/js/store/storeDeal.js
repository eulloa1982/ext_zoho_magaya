const initialStateDeal = {
    deals: [],
    dealQuote:[]
  };

function reducerDeal (state = initialStateDeal, actions)  {

    switch (actions.type) {
        case ADD_DEAL:
            //calculate volume and weigth
            //let system = actions.payload.magaya__Measure_System;
            return Object.assign({}, state, {
                deals: state.deals.concat(actions.payload)
            });


        case GET_DEAL: {
            const byId = actions.payload.id;
            state.dealQuote = initialStateDeal.dealQuote

            return {
                ...state,
                dealQuote: state.deals.filter(deal => deal.id === byId),
            }
        }


        default:
            return state;
    }

}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeDeal = Redux.createStore(reducerDeal)


////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////
//add new item when editing a mquote
function addDeal(payload) {
    return { type: ADD_DEAL, payload };
}

//add new item on new mquote form
function getDeal(payload) {
    return { type: GET_DEAL, payload }
}
