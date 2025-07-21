import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h4>About Securelytix</h4>
          <p>
            Securelytix is a full-stack monitoring and automation platform built
            for enterprise and growth. We simplify client and employee management
            securely and efficiently.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Info</h4>
          <ul>
            <li>Clients</li>
            <li>Employees</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: support@securelytix.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Address: Tech Park, Bengaluru, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Securelytix. All rights reserved.</p>
        <p>
          Developed by <strong>Yash Kumar Sahu</strong> |&nbsp;
          <a
            href="https://yks.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-link"
          >
            Portfolio 🔗
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
