import * as firebase from 'firebase';
import { categoryRef, userRef } from '../components/DataConnect'; 

const defaultCategories = () => {
    const categories = [];
    let uid = 'none';
    if(firebase.auth().currentUser) {
        uid = firebase.auth().currentUser.uid;
    }
    const userCategoryRef = userRef.child(uid).child('Category')
    userCategoryRef.orderByChild('TypeID').equalTo('002').on('value', (snapshot) => {
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

const renderedCategoriesReducer = (state = defaultCategories(), action) => {
    if(action.type === 'RELOAD_CATEGORY') {
        state = [];
        action.categories.forEach(element => {
            state.push({
                key: element.key,
                categoryName: element.categoryName,
                icon: element.icon,
                parentID: element.parentID,
                typeID: element.typeID
            });
        });
        return state;
    }
    return state;
}

export default renderedCategoriesReducer;