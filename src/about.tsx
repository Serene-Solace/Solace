import React from 'react';
import './AboutPage.css';
import pankaj from './assets/collabrators/pankaj.png'
import ritesh from './assets/collabrators/ritesh.jpeg'
import anshu from './assets/collabrators/anshu.png'

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="section">
        <h2>Our Mission</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula fermentum purus, ac hendrerit libero ultricies et.</p>
      </section>

      <section className="section">
        <h2>Our Vision</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula fermentum purus, ac hendrerit libero ultricies et.</p>
      </section>

      <section className="section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={ritesh} alt="Team Member 1" />
            <h3>Ritesh Gupta</h3>
            <p>Software Engineer</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/rishup132">LinkedIn</a>
              <a href="https://github.com/rishup132">GitHub</a>
            </div>
          </div>

          <div className="team-member">
            <img src={pankaj} alt="Team Member 2" />
            <h3>Pankaj Sharma</h3>
            <p>Software Engineer</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/pankajs1998/">LinkedIn</a>
              <a href="https://github.com/pankaj3108">GitHub</a>
            </div>
          </div>

          <div className="team-member">
            <img src={anshu} alt="Team Member 2" />
            <h3>Anshu Singh</h3>
            <p>UX Designer</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/anshu-kaira/">LinkedIn</a>
              <a href="https://github.com/anshukaira">GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;