import {combineReducers} from 'redux';
import SampleReducer from './SampleReducer';// import reducer vao

const allReducers = combineReducers({
    SampleReducer,
    //them cac reducer khac vao day sau khi khai bao
})

export default allReducers;