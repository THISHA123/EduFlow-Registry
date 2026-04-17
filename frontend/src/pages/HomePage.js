/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <img src="/logo.png" alt="Logo" className="home-logo" />

      <h1 className="home-title"> Welcome to the Course Registration System</h1>
      <p className="home-subtext">Register for your favorite courses in just a few clicks. Fast, colorful, and easy!</p>

      <button className="home-button" onClick={() => navigate('/login')}>
        Go to Login
      </button>

      <footer className="home-footer">
        © {new Date().getFullYear()} Course Registration System. All rights reserved.
      </footer>


    </div>
  );
};

export default HomePage;
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <main className="home-content">
        <header className="home-header">
          <img src="/logo.png" alt="System Logo" className="home-logo" />
        </header>

        <section className="home-hero">
          <h1 className="home-title">Course Registration System</h1>
          <p className="home-subtext">
            Streamline your academic journey. Access high-quality courses and manage your registrations in one unified platform.
          </p>
          <div className="home-actions">
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Get Started
            </button>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="footer-line"></div>
        <p>© {new Date().getFullYear()} Course Registration System. All professional rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
