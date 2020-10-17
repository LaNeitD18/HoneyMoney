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
import selectedSubReducer from './selectedSubReducer';
import allSubReducer from './allSubReducer';
import showDatePickerReducer from './showDatePickerReducer';
import sodu_transReducer from './sodu_transReducer';
import datemode_transReducer from './datemode_transReducer';

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

    //Tien
    selectedType: selectedTypeReducer,
    renderedCategories: renderedCategoriesReducer,
    allCategories: allCategoriesReducer,
    searchText: searchTextReducer,
    chosenCategory: chosenCategoryReducer,
    categoryName: categoryNameReducer,
    subCategories: subCategoriesReducer,
    isVisible: isVisibleReducer,
})

export default allReducers;