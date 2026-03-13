import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselImageStyle = {
    height: '72vh',
    objectFit: 'cover',
    width: '100%'
  };

  const captionStyle = {
    background: 'radial-gradient(961px at 1.9% 5%, rgb(242, 241, 36) 0%, rgb(11, 236, 218) 90%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow: '0px 0px 3px rgba(121, 4, 4, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center'
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={2000}
      >
        <Carousel.Item>
          <img
            src="https://img.freepik.com/premium-vector/back-school-illustration_1302918-33836.jpg?semt=ais_user_personalization&w=740&q=80"
            alt="Student Management System"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            I am capable," "I am enough," or "I am in control of my future.
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://img.freepik.com/free-vector/e-learning-infographic-set_1284-16836.jpg?semt=ais_user_personalization&w=740&q=80"
            alt="Student Management System"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.vidyalayaschoolsoftware.com/webassets/images/school_software_1.png"
            alt="Student Management System"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
      
      </div>
    </div>
  );
};

export default Home;