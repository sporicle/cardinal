import React from 'react';

const ItemDisplay = ({ stats, imageUrl, name, description, effect}) => {
    return (
      <div className="item-display">
        <img className="item-image" src={imageUrl} alt={name} />
        <h2>{name}</h2>
        <p>Description: {description}</p>
        <p>Effect: {effect}</p>
        <ul>
          {Object.entries(stats).map(([key, value]) => (
            <li key={key}>
              <span>{key}:</span> {value}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default ItemDisplay;
