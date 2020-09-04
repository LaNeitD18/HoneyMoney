const subCategoriesReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_SUB':
            return action.subCategories;
        default: 
            return state;
    }
}

export default subCategoriesReducer;