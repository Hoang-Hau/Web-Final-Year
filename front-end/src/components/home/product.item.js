import React from 'react'
import { Link } from 'react-router-dom'
const ProductItem = ({urlImg, price, name, id, product,amount ,restaurant}) => (
    <div className="col-sm-4">
        <div className="product-image-wrapper">
            <div className="single-products">
                <div className="productinfo text-center"
                >   
                    <Link to={'/product/' + id}><img style={{marginTop:"18px"}} src={urlImg} alt="" /></Link>
                    <h4 className='name-product'>{name}</h4>
                    <div style={{marginTop:"-20px"}}>
                    <span style={{fontWeight:"bold",color:"orangered"}}>Số lượng:   </span>
                    <span>{amount}</span><br/>
                    <span style={{fontWeight:"bold",color:"orangered"}}>Giá:   </span>
                    <span>{price} VNĐ</span><br/>
                    <span style={{fontWeight:"bold",color:"orangered"}}>Nhà hàng:   </span>
                    <span>{restaurant}</span>
                    </div>
                    
                    
                  
                </div>
            </div>
        </div>
    </div>
)
export default ProductItem