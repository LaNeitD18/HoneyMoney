import {combineReducers} from 'redux';
import SampleReducer from './SampleReducer';// import reducer vao
import selectedTypeReducer from '../reducers/selectedTypeReducer';

const allReducers = combineReducers({
    SampleReducer,
    //them cac reducer khac vao day sau khi khai bao
    selectedType: selectedTypeReducer
})

export default allReducers;