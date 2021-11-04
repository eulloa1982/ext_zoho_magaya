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

    if(_.has(ERRORS_TYPES, [errorCode])) {
        console.log("Type error encountered", _.get(ERRORS_TYPES, [errorCode]))
        errorCode = _.get(ERRORS_TYPES, [errorCode])
    }
    if(showInfo) {
        $("#quote-alert").css("display", "block").css("height","100px").delay(3000).fadeOut("slow");
        $("#message-alert").html(`Upss!!! There is an error: ${errorCode},<br> please check the field "${field}"`);
    }
    else {
        $("#quote-alert").css("display", "block").css("height","120px").delay(3000).fadeOut("slow");;
        $("#message-alert").html(`<p>That's an error: ${errorCode}</p>`)
    }

})


///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addError(payload){
    return {type: 'ERROR', payload}
}

