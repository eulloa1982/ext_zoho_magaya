var singleAccount = []
//get one charge
storeAccounts.subscribe(() => {
    let u = storeAccounts.getState();
    singleAccount = u.singleAccount
    console.log("State accounts now", u)
})

