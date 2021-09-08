const initialStateCheckBox = {
    checkboxs: []
}


function reducerCheckbox(state = initialStateCheckBox, actions) {

    switch (actions.type) {
        case 'ADD-CHECK':
            return Object.assign({}, state, {
                checkboxs: state.checkboxs.concat(actions.payload)
            });
        case 'DROP':
            return {
                ...state,
                checkboxs: state.checkboxs.filter(checkbox => checkbox.id !== actions.payload.id)
            }
        default:
            return state;
    }
}


////////////////////////////////////////////////////
//REDUX Store
/////////////////////////////////////////////////////
const storeCheckBox = Redux.createStore(reducerCheckbox);


//////////////////////////////////////////////////////////
////////SUSCRIPTORES
///////////////////////////////////////////////////////////
storeCheckBox.subscribe(() => {
    let u = storeCheckBox.getState()
    console.log("CheckBoxes", u)
})



////////////////////////////////////////////////////
//REDUX Actions
/////////////////////////////////////////////////////
function addCheckBox(payload) {
    return { type: 'ADD-CHECK', payload };
}

function dropCheckBox(payload) {
    return { type: 'DROP', payload };
}

