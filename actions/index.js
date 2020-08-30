//Tat ca cac action duoc khai bao o actionType va dinh nghia o index
//Nho import vao day truoc
import {
    INCREMENT,
    DECREMENT,
    UPDATEWALLETLIST
} from './actionType'

//bat dau khai bao cac thanh phan cua action ben duoi
export const increaseAction = (step) => { //khai bao cac tham so cua action trong ngoac tron sau dau =
    return {
        type: INCREMENT, //action type
        step: step, //so luong tang len
    }
}

export const decreaseAction = (step) => {
    return {
        type: DECREMENT, //action type
        step: step, //so luong giam xuong
    }
}
//Thang
export const UpdateWalletAction = (snap) =>{
    return {
        type: UPDATEWALLETLIST,
        snap: snap,
    }
}

//#region Tien

//#region selectedType 
export function changeType(selectedType) {
    return {
        type: 'CHANGE_TYPE',
        selectedType: selectedType
    };
}
//#endregion

//#region renderedCategories
export function reloadCategory(categories) {
    return {
        type: 'RELOAD_CATEGORY',
        categories: categories
    }
}
//#endregion

//#region allCategories
export function updateCategories(categories) {
    return {
        type: 'UPDATE_CATEGORIES',
        categories: categories
    }
}
//#endregion

//#region searchText
export function changeSearchText(text) {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        text: text
    }
}
//#endregion

//#endregion