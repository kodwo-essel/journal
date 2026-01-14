import React, { useState } from 'react';
import './BirthdaySlider.css';
import birthdayData from '../data/birthday.json';

const BirthdaySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const { birthdayReflections } = birthdayData;

  const handleNext = () => {
    if (currentSlide + 1 >= birthdayReflections.length) {
      setHasEnded(true);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentSlide(0);
    setHasEnded(false);
    setHasStarted(true);
  };

  const handleHome = () => {
    setCurrentSlide(0);
    setHasEnded(false);
    setHasStarted(false);
  };

  if (!hasStarted) {
    return (
      <div className="theater">
        <div className="stage">
          <div className="hero-image" style={{ backgroundImage: `url(${birthdayReflections[0].image})` }} />
          <div className="spotlight" />
          <div className="overlay" />
          
          <div className="start-screen">
            <h1 className="start-title">BIRTHDAY REFLECTIONS</h1>
            <p className="start-subtitle">A journey through thoughts and moments</p>
            <button className="start-button" onClick={() => setHasStarted(true)}>
              BEGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (hasEnded) {
    return (
      <div className="theater">
        <div className="stage">
          <div className="hero-image" style={{ backgroundImage: `url(${birthdayReflections[birthdayReflections.length - 1].image})` }} />
          <div className="spotlight" />
          <div className="overlay" />
          
          <div className="end-screen">
            <h1 className="end-title">THE END</h1>
            <p className="end-subtitle">Thank you for experiencing this journey</p>
            <div className="end-buttons">
              <button className="restart-button" onClick={handleRestart}>
                RESTART
              </button>
              <button className="home-button" onClick={handleHome}>
                HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const current = birthdayReflections[currentSlide];

  return (
    <div className="theater">
      <div className="stage">
        <div className="spotlight" />
        <div className="hero-image" style={{ backgroundImage: `url(${current.image})` }} />
        <div className="overlay" />
        
        <div className="content">
          <div className="left-side">
            <div className="number">{String(currentSlide + 1).padStart(2, '0')}</div>
            <h1 className="title">{current.question}</h1>
            <div className="controls">
              <button onClick={() => setCurrentSlide(prev => prev === 0 ? 0 : prev - 1)}>←</button>
              <button onClick={handleRestart}>↻</button>
              <button onClick={handleNext}>→</button>
            </div>
          </div>
          <div className="right-side">
            <p className="explanation">{current.answer}</p>
            {/* <button className="home-link" onClick={handleHome}>HOME</button> */}
          </div>
        </div>
        
        <div className="progress">
          <div className="bar" style={{ width: `${((currentSlide + 1) / birthdayReflections.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default BirthdaySlider;