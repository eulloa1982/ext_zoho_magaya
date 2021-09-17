const initialStateCurrentModule = {

    currentModule:'',

}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerCurrentModule = (state = initialStateCurrentModule, actions) => {

    switch (actions.type) {

        case "ADD_CURRENT_MODULE": {
            const newArray = actions.payload
            return {
                ...state,
                currentModule: newArray
            };

        }


        default:
            return state;
    }
}


////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeCurrentModule = Redux.createStore(reducerCurrentModule)



///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addCurrentModule(payload){
    return {type: "ADD_CURRENT_MODULE", payload}
}
