import React from 'react'
import "./Offer.css"
import eclusive_image from "../../Assets/exclusive_image.png"
export  const Offer = ()=> {
  return (
      <div className='offer'>
          <div className="offer-left">
              <h1>Exclusive</h1>
              <h1>Offer For You</h1>
              <p>NLY ONE BEST SELLER PRODUCT</p>
              <button>
                  Check Now
              </button>
          </div>
          <div className="offer-right">
              <img src={ eclusive_image} alt ="image"/>
          </div>
    </div>
  )
}
