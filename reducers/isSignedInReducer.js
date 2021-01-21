const isSignedInReducer = (state=false, action) => {
    switch(action.type){
        case 'SIGNIN':
            state = true;
            console.log(state);
            return state;
        case 'SIGNOUT':
            state = false;
            return state;
        default:
            return state;
    }
}

export default isSignedInReducer;