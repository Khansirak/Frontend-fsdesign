// ImageContext.js
import { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const useImageContext = () => {
  return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  const setImageData = (newImage) => {
    setImage(newImage);
  };

  return (
    <ImageContext.Provider value={{ image, setImageData }}>
      {children}
    </ImageContext.Provider>
  );
};
