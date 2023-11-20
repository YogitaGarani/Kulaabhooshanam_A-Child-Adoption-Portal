import React from 'react';
import Image from 'next/image';
import styles from '../../styles/collage.module.css';
import formImage8 from "../../public/formImages8.jpg"
import formImage2 from "../../public/formImages2.jpg"
import formImage3 from "../../public/formImages3.jpg"
import formImage from "../../public/formImages.jpg"
import formImage5 from "../../public/formImages5.jpg"
import formImage7 from "../../public/formImages7.jpg"

// Create a collage
const Collage = () => {
  const images = [
    formImage, formImage3, formImage5, formImage2, formImage7, formImage8
  ];

  // Render
  return (
    <div className = {styles.collageContainer}>
      {images.map((image, index) => (
        <div key = {index} className = {styles.imageContainer}>
          <Image src = {image} alt = {`Image ${index + 1}`} layout = "responsive" objectFit = "contain" />        
        </div>
      ))}
    </div>
  );
};

export default Collage;
