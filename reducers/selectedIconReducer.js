const selectedIconReducer = (state=0, action) => {
    switch(action.type) {
        case 'SELECT_ICON':
            console.log("acin " + action.index);
            state = action.index;
            console.log("s" + state);
            return state;
        default:
            return state;
    }
}

export default selectedIconReducer;