import React, { Component } from 'react'
import Slider from '../components/slider/slider'
class SliderContainer extends Component {
    render() {
    
        return(
            <Slider handleClickUser = {()=>this.props.handleClickUser()} />
        )
    }
}
export default SliderContainer