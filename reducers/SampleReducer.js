const { INCREMENT, DECREMENT } = require("../actions/actionType");

const SampleReducer = (time = 0, action) =>
{
    switch (action.type){
        case INCREMENT:
            return ++time;
        case DECREMENT:
            return --time;
        default:
            return time; //nghia la khong thay doi state
    }
}

export default SampleReducer;