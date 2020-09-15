const isVisibleIconDialogReducer = (state=false, action) => {
    switch(action.type){
        case 'OPEN_ICON_DIALOG':
            return !state;
        case 'CLOSE_ICON_DIALOG':
            return !state;
        default:
            return state;
    }
}

export default isVisibleIconDialogReducer;