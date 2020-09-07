const isVisibleReducer = (state=false, action) => {
    switch(action.type){
        case 'OPEN_DIALOG':
            return action.visible;
        case 'CLOSE_DIALOG':
            return action.visible
        default:
            return state;
    }
}

export default isVisibleReducer;