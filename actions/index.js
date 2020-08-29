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
// Tien
export function changeType(selectedType) {
    return {
        type: 'CHANGE_TYPE',
        selectedType: selectedType
    };
}