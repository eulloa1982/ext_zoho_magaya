const initialStatePagination = {
    page: 1
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerPagination = (state = initialStatePagination, actions) => {

    switch (actions.type) {

        case ADD_PAGE: {
            paginate = state.page + 1
            console.log("+ page", paginate)
            return {
                ...state,
                page: paginate
            };
        }

        case LESS_PAGE: {
            paginate = state.page - 1
            console.log("- page", paginate)

            return {
                ...state,
                page: paginate
            };
        }

        default:
            return state;
    }
}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storePagination = Redux.createStore(reducerPagination);

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
function addPage(payload){
    return {type: ADD_PAGE }
}


function lessPage(){
    return { type: LESS_PAGE }
}
