const initialStateSuccess = {
    success: [],
}

////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
const reducerSuccess = (state = initialStateSuccess, actions) => {

    switch (actions.type) {
        case 'SUCCESS':
            return Object.assign({}, state, {
                success: state.success.concat(actions.payload)
            });

        default:
            return state;
    }
}



////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeSuccess = Redux.createStore(reducerSuccess);


////////////////////////////////////////////////////
//REDUX Reducers
/////////////////////////////////////////////////////
storeSuccess.subscribe(() => {
    let message = storeSuccess.getState();
    let message_success = _.last(message.success)
    //$("#show-success").empty()
    //$("#quote-info").html(`Operation Success: ${message}`).css("display", "block").addClass("animate__backInLeft").fadeIn("slow").delay(2000).fadeOut("slow");
    //$("#quote-info").append(`<p class="animate__animated animate__bounceInLeft">Operation success: ${message_success.message}</p>`).css("display", "block").fadeIn("slow").delay(6000).fadeOut("slow");
    //$("#quote-info").css("display", "block").css("height","120px").delay(3000).fadeOut("slow");
    //$("#message-info").html(`<p>Operation success: ${message_success.message}</p>`);
    Swal.fire({
        title: "Operation success",
        text: message_success.message,
        icon: "success",
        confirmButtonText: "Yes",
    })

})


///////////////////////////////////////////////////////
///////// actions
////////////////////////////////////////////////////////
function addSuccess(payload) {
    console.warn('Payload success', payload)

    return {type: 'SUCCESS', payload}
}


