const searchTextReducer = (state = "", action) => {
    switch(action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return action.text;
        default:
            return state;
    }
}

export default searchTextReducer;