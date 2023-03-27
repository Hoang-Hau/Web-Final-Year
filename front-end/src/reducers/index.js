import { combineReducers } from 'redux'
import cartReducers from './cart.reducer'
import homeReducers from './home.reducer'
import productReducers from './product.reducer'
import profileReducers from './profile.reducer'
import purchaseReducers from './purchase.reducer'
import userReducers from './user.reducer'
export default combineReducers({
    userReducers,
    homeReducers,
    productReducers,
    profileReducers,
    cartReducers,
    purchaseReducers,
})