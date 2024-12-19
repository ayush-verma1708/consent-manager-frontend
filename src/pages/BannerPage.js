import React, { useState, useEffect } from 'react';
import { getAllBanners } from '../api/BannerApi';
import ViewBanner from '../components/BannerComponents/ViewBanner';

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBannerId, setSelectedBannerId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const bannerData = await getAllBanners();
        setBanners(bannerData);
      } catch (err) {
        setError(err.message || 'Error fetching banners.');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleBannerChange = (event) => {
    setSelectedBannerId(event.target.value);
  };

  if (loading) {
    return <div>Loading banners...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container my-4'>
      <h1 className='text-center mb-4'>View Banners</h1>

      {/* Banner Selection Dropdown */}
      <div className='form-group'>
        <label htmlFor='bannerSelect'>Select a Banner:</label>
        <select
          id='bannerSelect'
          className='form-control'
          value={selectedBannerId}
          onChange={handleBannerChange}
        >
          <option value=''>-- Select a Banner --</option>
          {banners.map((banner) => (
            <option key={banner._id} value={banner._id}>
              {banner.text || `Banner ID: ${banner._id}`}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Banner */}
      {selectedBannerId && <ViewBanner bannerId={selectedBannerId} />}
    </div>
  );
};

export default BannerPage;
