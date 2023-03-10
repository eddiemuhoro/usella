import React, { useState, useEffect } from 'react';
import './Loader.css';

function Loader() {



  return (
    <>
      { (
        <div className="loader-container">
          <div className="loader">
            <div className="spinner"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loader;
