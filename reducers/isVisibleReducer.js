const isVisibleReducer = (state=false, action) => {
    switch(action.type){
        case 'OPEN_DIALOG':
            return !state;
        case 'CLOSE_DIALOG':
            return !state;
        default:
            return state;
    }
}

export default isVisibleReducer;