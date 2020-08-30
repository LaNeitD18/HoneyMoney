import * as firebase from 'firebase';
import { categoryRef } from '../components/DataConnect'; 

const defaultCategories = () => {
    const categories = [];
    categoryRef.on('value', (snapshot) => {
        snapshot.forEach(element => {
            categories.push({
                key: element.key,
                categoryName: element.toJSON().CategoryName,
                icon: element.toJSON().Icon,
                parentID: element.toJSON().ParentID,
                typeID: element.toJSON().TypeID
            });
        });
    });
    return categories;
}

const allCategoriesReducer = (state = defaultCategories(), action) => {
    if(action.type === 'UPDATE_CATEGORIES') {
        state = [];
        action.categories.forEach(element => {
            state.push({
                key: element.key,
                categoryName: element.toJSON().CategoryName,
                icon: element.toJSON().Icon,
                parentID: element.toJSON().ParentID,
                typeID: element.toJSON().TypeID
            });
        });
        return state;
    }
    return state;
}

export default allCategoriesReducer;