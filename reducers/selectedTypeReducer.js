const selectedTypeReducer = (state = 1, action) => {
    if(action.type === 'CHANGE_TYPE') {
        console.log(action.selectedType);
        return action.selectedType
    }
    return state;
}

export default selectedTypeReducer;