import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ icon, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={icon} alt={title} className="icon" />
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

export default CategoryCard; 