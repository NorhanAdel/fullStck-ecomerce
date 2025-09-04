import React from 'react'
import { Link } from 'react-router-dom'
import "./Items.css"
export  const Items = (props)=> {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img src={props.image} onClick={ window.scroll(0,0)} />
        <p>{props.name}</p>
        <div className="item-price">
          <div className="price-new">$ {props.new_price}</div>
          <div className="price-old">$ {props.old_price}</div>
        </div>
      </Link>
    </div>
  );
}
