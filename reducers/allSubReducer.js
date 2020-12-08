const {UPDATESUBCATEGORY } = require("../actions/actionType");
import {categoryRef} from "../components/DataConnect"

const allSubReducer = (state = [], action) => {
    switch(action.type){
        case UPDATESUBCATEGORY:
            state = [];
            categoryRef.child(action.category.key + "/SubCategories/").on('value',(snap) => {
                snap.forEach(element => {
                    state.push({
                        key: element.key,
                        categoryName: element.toJSON().CategoryName,
                        icon: element.toJSON().Icon,
                    })
                })
            });
            return state;
        default:
            return state;
    }
}

export default allSubReducer;