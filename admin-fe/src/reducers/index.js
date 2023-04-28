import { combineReducers } from 'redux'
import foodReducers from './food.reducer'
import userReducers from './user.reducer'
import homeReducers from './home.reducer';
export default combineReducers({
    foodReducers,
    userReducers,
    homeReducers,
})