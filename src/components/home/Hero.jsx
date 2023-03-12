import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
const Hero = () => {
  return (
    <div>
        <section className='hero-landing'>
            <div className="hero">
                <div className="hero-text">
                    <h1>Shop for your favorite products</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>

                <div className='hero-btn'>
                      <button className="button">
                        <span> <Link to='products'>Shop Now</Link></span>
                      </button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero