import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/collage.module.css';
import formImage8 from "../../public/formImages8.jpg"
import formImage2 from "../../public/formImages2.jpg"
import formImage3 from "../../public/formImages3.jpg"
import formImage11 from "../../public/formImages11.jpg"
import formImage5 from "../../public/formImages5.jpg"
import formImage7 from "../../public/formImages7.jpg"
import formImage10 from "../../public/formImages10.jpg"
import formImage9 from "../../public/formImages9.jpg"
import formImage from "../../public/formImages.jpg"

// Create a collage
const Collage = () => {
  const images = [
    formImage3, formImage, formImage2, formImage5, formImage8, formImage7, formImage9, formImage10
  ];

  // Render
  return (
    <div className = {styles.collageContainer}>
      {images.map((image, index) => (
        <div key = {index} className = {styles.imageContainer}>
          <Image src={image} alt={`Image ${index + 1}`} layout="responsive" objectFit="contain" />        
        </div>
      ))}
    </div>
  );
};

export default Collage;
