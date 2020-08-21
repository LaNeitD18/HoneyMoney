import {connect} from 'react-redux';
import SampleComponent from '../component/SampleComponent';
import { increaseAction } from '../actions';

const mapStateToProps = (state) => {
    return{
        time: state.SampleReducer, //y nghia: gan prop time voi gia tri state của SampleReducers
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onIncrement: (step) => {     // y nghia: gan props onIncrement voi thong so dau vao step cho hanh dong dispatch
            dispatch(increaseAction(step));
        }
    };
}

const SampleContainer = connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
export default SampleContainer;