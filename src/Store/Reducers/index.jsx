import { combineReducers } from 'redux';
import { counterSlice } from './example';
import { counterSliceLogin } from "./Login";
export default combineReducers({
    example: counterSlice.reducer,
    login: counterSliceLogin.reducer
});