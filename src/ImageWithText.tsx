import React from 'react';
import './ImageWithText.css';

interface ImageWithTextProps {
  imageUrl: string;
  text: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageUrl, text }) => {
  return (
    <div className="image-with-text">
      <img src={imageUrl} alt="Background" className="background-image" />
      <div className="overlay-text">{text}</div>
    </div>
  );
};

export default ImageWithText;