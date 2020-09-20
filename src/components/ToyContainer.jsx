import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const renderToys = () => {
    return props.toys.map(toyObj => <ToyCard like={props.like} delete={props.delete} key={toyObj.id} toy={toyObj} />)
  }

  return(
    <div id="toy-collection">
      {renderToys()}
    </div>
  );
}

export default ToyContainer;
