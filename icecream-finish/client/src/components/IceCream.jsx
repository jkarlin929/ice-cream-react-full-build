import React, { Component } from 'react';

const IceCream = (props) => {
  return (
    <div className="ic-inlist">
      <img src={props.icecream.url} />
      <h2>{props.icecream.flavor}</h2>
      <p>{props.icecream.description}</p>
      <p>Rating: {props.icecream.rating || 'N/A'}</p>
    </div>
  )
}

export default IceCream;