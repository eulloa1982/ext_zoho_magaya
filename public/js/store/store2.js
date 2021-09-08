const initialStateError = {
    errors: [],
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerError = (state = initialStateError, actions) => {

    switch (actions.type) {

        case 'ERROR':
            console.log('Error', actions.payload)
            return Object.assign({}, state, {
                errors: state.errors.concat(actions.payload)
                /*errorCode: actions.value.errorCode,
                showInfo: true,
                field: actions.value.field,
                module: actions.value.module*/
            });
        case 'SUCCESS':
            console.log('Success', actions.payload)
            return Object.assign({}, state, {
                errors: state.errors.concat(actions.payload)
                /*errorCode: '',
                showInfo: false,
                field:  '',
                module: actions.value.module*/
            });
        default:
            return state;
    }
}


const reducerClientQuote = (state = {}, actions) => {
    let {
        client = '',
        id = 0,
    } = actions
    switch (actions.type) {
        case 'SET':
            return Object.assign({}, state, {
                client: actions.value.client,
                id: actions.value.id
            });
        default:
            return state;
    }
}


////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeError = Redux.createStore(reducerError);
const storeClientQuote = Redux.createStore(reducerClientQuote)


////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
storeError.subscribe(() => {
    let {errorCode, showInfo, field, module} = storeError.getState();


    if (showInfo) {
        $("#quote-alert").html(`Error code: ${errorCode}, on field ${field} on module ${module}`).css("display", "block").fadeIn("slow").delay(2000).fadeOut("slow");
    } else {
        $("#quote-info").html(`Operation Success on module ${module}`).css("display", "block").fadeIn("slow").delay(2000).fadeOut("slow");

    }

})


///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addError(payload){
    console.warn('Payload error', payload)
    return {type: 'ERROR', payload}
}

function addSuccess(payload) {
    console.warn('Payload success', payload)

    return {type: 'SUCCESS', payload}
}


