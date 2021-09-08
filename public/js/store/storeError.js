const initialStateError = {
    errors: [],
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerError = (state = initialStateError, actions) => {

    switch (actions.type) {

        case 'ERROR':
            return Object.assign({}, state, {
                errors: state.errors.concat(actions.payload)
                /*errorCode: actions.value.errorCode,
                showInfo: true,
                field: actions.value.field,
                module: actions.value.module*/
            });

        default:
            return state;
    }
}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeError = Redux.createStore(reducerError);


////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
storeError.subscribe(() => {
     let error = storeError.getState();
     let errorData = _.last(error.errors)
     let {errorCode, showInfo, field, module} = errorData

    if(showInfo) {
        $("#quote-alert").css("display", "block").show("slow");
        $("#message-alert").html(`Error code: "${errorCode}", on field "${field}" on module "${module}"`);

    }
    else {
        $("#quote-alert").append(`<p>Error: "${errorCode}"</p>`).css("display", "block").fadeIn("slow").delay(4000).fadeOut("slow");
    }

    //$("#quote-alert").empty()
})


///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addError(payload){
    return {type: 'ERROR', payload}
}

