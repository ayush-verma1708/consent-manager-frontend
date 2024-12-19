import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='container-fluid p-0'>
      {/* Header Section */}
      <header className='text-center py-5 bg-primary text-white'>
        <h1 className='display-4'>
          Welcome to the Consent Manager Admin Portal
        </h1>
        <p className='lead'>
          Streamline user consent management and ensure privacy compliance with
          ease.
        </p>
      </header>

      {/* Features Section */}
      <main className='container my-5'>
        <div className='row g-4'>
          {/* Feature Card 1 */}
          <div className='col-lg-4 col-md-6'>
            <div className='card shadow h-100'>
              <div className='card-body text-center'>
                <h5 className='card-title text-primary'>
                  Create Consent Banners
                </h5>
                <p className='card-text'>
                  Use pre-designed templates to create banners customized to
                  your needs.
                </p>
                <Link to='/create-banner' className='btn btn-outline-primary'>
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className='col-lg-4 col-md-6'>
            <div className='card shadow h-100'>
              <div className='card-body text-center'>
                <h5 className='card-title text-primary'>View Analytics</h5>
                <p className='card-text'>
                  Gain insights into user preferences and improve strategies.
                </p>
                <button className='btn btn-outline-secondary' disabled>
                  View Analytics
                </button>
              </div>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className='col-lg-4 col-md-6'>
            <div className='card shadow h-100'>
              <div className='card-body text-center'>
                <h5 className='card-title text-primary'>Manage Users</h5>
                <p className='card-text'>
                  Assign roles and manage consent-related data effortlessly.
                </p>
                <button className='btn btn-outline-secondary' disabled>
                  Manage Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className='text-center py-4 bg-light border-top'>
        <p className='mb-0'>
          &copy; 2024 Consent Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
