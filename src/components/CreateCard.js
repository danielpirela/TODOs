import React from 'react';
import './styles/CreateCard.css';

function CreateCard(props) {

  return (
    <div className="CreateCard-container">
        <form className="CreateCard-from" >
        <p>Title</p>
        <input type="text" name="titulo"/>
        </form>
    </div>
  );
}

export { CreateCard };
