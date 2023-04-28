import axios from 'axios'
import {homeTypes} from '../constants/action.types'
export const setTopFood = (data) => ({
    type: homeTypes.SET_TOP_FOOD,
    data
})
export const getTopFood = () => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post('http://localhost:8080/bill/top/')
    }
    catch(err) {
        console.log(err)
        return
    }
    dispatch(setTopFood(res.data.data))
}
