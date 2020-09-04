const chosenCategoryReducer = (state = "", action) => {
    if(action.type === 'CHOOSE_CATEGORY') {
        state = "";
        state = {
            key: action.category.key,
            categoryName: action.category.categoryName,
            icon: action.category.icon,
            parentID: action.category.parentID,
            typeID: action.category.typeID
        };
        return state;
    }
    return state;
}

export default chosenCategoryReducer;