import React from 'react';

function ToyCard(props) {


    return (
      <div className="card">
        <h2>{props.toy.name}</h2>
        <img src={props.toy.image} alt={props.toy.name} className="toy-avatar" />
        <p>{props.toy.likes} Likes </p>
        <button onClick={() => props.like(props.toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => props.delete(props.toy)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
}

export default ToyCard;
