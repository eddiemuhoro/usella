import React, { useState, useEffect } from 'react';

const SlidingImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    'http://localhost:3000/static/media/image.9779b4d9935fa4e195b1.png',
    'https://sophicalcontent.com/wp-content/uploads/2021/07/firmbee-com-eMemmpUojlw-unsplash.jpg',
    'https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWVsYW5jZXxlbnwwfHwwfHw%3D&w=1000&q=80'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images]);

  return (
    <div>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
    </div>
  );
};

export default SlidingImages;
