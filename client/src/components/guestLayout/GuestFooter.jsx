import React from 'react';
import { Nav } from 'react-bootstrap';

const GuestFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {`
        .footer-section {
            background-color: black;
            color: #fff;
            text-align: center;
            padding: 15px 0;   /* Reduced height */
        }

        .footer-logo {
            font-size: 18px;   /* Reduced logo size */
            font-weight: 600;
            margin-bottom: 5px;
        }

        .copyright-text {
            margin-top: 5px;
            font-size: 12px;   /* Smaller text */
        }

        .social-icons {
            display: flex;
            justify-content: center;
            gap: 12px;          /* Reduced gap */
            margin-top: 8px;
        }

        .social-icon {
            color: #3c24f0;
            font-size: 14px;    /* Smaller icons */
            transition: 0.3s;
        }

        .social-icon:hover {
            color: #00bcd4;
        }

        @media (max-width: 600px) {
            .footer-logo {
                font-size: 16px;
            }
            .copyright-text {
                font-size: 11px;
            }
        }
        `}
      </style>

      <footer className="footer-section">
        <div className="container">
          <div className="footer-logo">
            Student Management System
          </div>

          <div className="copyright-text">
            © {currentYear} Student Management System | All Rights Reserved
          </div>

          <div className="social-icons">
            <Nav className="justify-content-center">
              <Nav.Link href="https://facebook.com" className="social-icon" target="_blank">
                <i className="fa fa-facebook"></i>
              </Nav.Link>
              <Nav.Link href="https://twitter.com" className="social-icon" target="_blank">
                <i className="fa fa-twitter"></i>
              </Nav.Link>
              <Nav.Link href="https://linkedin.com" className="social-icon" target="_blank">
                <i className="fa fa-linkedin"></i>
              </Nav.Link>
              <Nav.Link href="https://instagram.com" className="social-icon" target="_blank">
                <i className="fa fa-instagram"></i>
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GuestFooter;