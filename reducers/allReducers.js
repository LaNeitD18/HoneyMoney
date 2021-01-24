import {combineReducers} from 'redux';
import SampleReducer from './SampleReducer';// import reducer vao
import WalletReducer from './WalletReducer';
import selectedTypeReducer from '../reducers/selectedTypeReducer';
import renderedCategoriesReducer from '../reducers/renderedCategoriesReducer';
import allCategoriesReducer from '../reducers/allCategoriesReducer';
import searchTextReducer from '../reducers/searchTextReducer';
import chosenCategoryReducer from '../reducers/chosenCategoryReducer';
import categoryNameReducer from '../reducers/categoryNameReducer';
import subCategoriesReducer from '../reducers/subCategoriesReducer';
import isVisibleReducer from '../reducers/isVisibleReducer';
import addedSubCategoriesReducer from '../reducers/addedSubCategoriesReducer';
import isVisibleIconDialogReducer from '../reducers/isVisibleIconDialogReducer';
import editableButtonGroupReducer from '../reducers/editableButtonGroupReducer';
import isSignedInReducer from '../reducers/isSignedInReducer';

import selectedSubReducer from './selectedSubReducer';
import allSubReducer from './allSubReducer';
import showDatePickerReducer from './showDatePickerReducer';
import sodu_transReducer from './sodu_transReducer';
import datemode_transReducer from './datemode_transReducer';
import date_transReducer from './date_transReducer';
import selectedWalletReducer from './selectedWalletReducer';
import selectedTransactionReducer from './selectedTransactionReducer';
import selectedIconReducer from './selectedIconReducer';
import isWorkingWithSubReducer from './isWorkingWithSubReducer';
import userNameReducer from './userNameReducer';
import subcategoryNameReducer from './subcategoryNameReducer';

const allReducers = combineReducers({
    SampleReducer,
    WalletReducer,
    //them cac reducer khac vao day sau khi khai bao
    //Thang
    selectedSubReducer,
    allSubReducer,
    showDatePickerReducer,
    sodu_transReducer,
    datemode_transReducer,
    date_transReducer,
    selectedWalletReducer,
    selectedTransactionReducer,

    //Tien
    selectedType: selectedTypeReducer,
    renderedCategories: renderedCategoriesReducer,
    allCategories: allCategoriesReducer,
    searchText: searchTextReducer,
    chosenCategory: chosenCategoryReducer,
    categoryName: categoryNameReducer,
    subCategories: subCategoriesReducer,
    isVisible: isVisibleReducer,
    addedSubCategories: addedSubCategoriesReducer,
    isVisibleIconDialog: isVisibleIconDialogReducer,
    editableButtonGroup: editableButtonGroupReducer,
    isSignedIn: isSignedInReducer,
    selectedIcon: selectedIconReducer,
    isWorkingWithSub: isWorkingWithSubReducer,
    userName: userNameReducer,
    subcategoryName: subcategoryNameReducer
})

export default allReducers;