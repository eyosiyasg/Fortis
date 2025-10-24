// File: client/src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About Fortis cleaning products </h1>
          <p>Your trusted partner in professional cleaning solutions</p>
        </div>
      </section>

     { <section className="our-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Fories Trading PLC. began with a simple mission: to provide professional-grade 
              cleaning products that deliver exceptional results. What started as a small operation in 
              a garage has grown into a trusted brand used by cleaning professionals and homeowners alike.
            </p>
            <p>
              Our commitment to innovation, quality, and environmental responsibility has driven us to 
              develop products that not only perform exceptionally but also minimize their ecological footprint.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder"></div>
          </div>
        </div>
      </section>}

      <section className="our-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality Excellence</h3>
              <p>We never compromise on the quality of our products, ensuring they meet the highest professional standards.</p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our priority. We listen, innovate, and deliver solutions that meet your needs.</p>
            </div>
            <div className="value-card">
              <h3>Sustainable Practices</h3>
              <p>We're committed to environmentally responsible manufacturing and sustainable business practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/*<section className="meet-team">*/}
        {/*<div className="container">*/}
         {/* <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>Alex Johnson</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>Sarah Williams</h3>
              <p>Product Development</p>
            </div>
            <div className="team-member">
              <div className="member-avatar"></div>
              <h3>Michael Chen</h3>
              <p>Operations Manager</p>
            </div>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</section>*/}
    </div>
  );
};

export default About;