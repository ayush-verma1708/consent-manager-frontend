import React, { useEffect, useState } from 'react';
import { getBanner } from '../../api/BannerApi';

const ViewBanner = ({ bannerId }) => {
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const response = await getBanner(bannerId);

        if (response.success && response.banner) {
          setBannerData(response.banner);
        } else {
          setError('Failed to retrieve banner data.');
        }
      } catch (err) {
        setError(err.message || 'Error fetching banner data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [bannerId]);

  if (loading) {
    return <div>Loading banner...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bannerData) {
    return <div>Banner not found.</div>;
  }

  return (
    <div
      style={{
        backgroundColor: bannerData.backgroundColor,
        color: bannerData.textColor,
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3>{bannerData.text}</h3>
      <p>{bannerData.buttonText}</p>

      {/* Consent Categories */}
      {bannerData.consentCategories.length > 0 && (
        <div>
          <h4>Consent Categories:</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {bannerData.consentCategories.map((category) => (
              <li key={category._id}>
                <strong>{category.title}:</strong> {category.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      {bannerData.privacyPolicyLink && (
        <p>
          <a
            href={bannerData.privacyPolicyLink}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: bannerData.buttonColor }}
          >
            Privacy Policy
          </a>
        </p>
      )}
      {bannerData.termsLink && (
        <p>
          <a
            href={bannerData.termsLink}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: bannerData.buttonColor }}
          >
            Terms of Service
          </a>
        </p>
      )}

      {/* Action Button */}
      <button
        style={{
          backgroundColor: bannerData.buttonColor,
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {bannerData.buttonText}
      </button>
    </div>
  );
};

export default ViewBanner;
