import React from 'react';
// src/components/ui/Card.jsx
const Card = ({ 
    children, 
    className = "", 
    padding = true 
  }) => {
    return (
      <div className={`
        bg-white rounded-lg shadow-md 
        ${padding ? 'p-4' : ''} 
        ${className}
      `}>
        {children}
      </div>
    );
  };
  
export default Card;