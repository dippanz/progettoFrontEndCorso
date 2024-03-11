import { combineReducers } from 'redux';
import { counterSlice } from './example';
export default combineReducers({
    example: counterSlice.reducer,
});