import React from 'react';

const PreviewBanner = ({ bannerConfig }) => {
  return (
    <div
      style={{
        backgroundColor: bannerConfig.backgroundColor,
        color: bannerConfig.textColor,
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3>{bannerConfig.text}</h3>
      <p>{bannerConfig.buttonText}</p>

      {/* Consent Categories (Optional) */}
      {bannerConfig.consentCategories.length > 0 && (
        <div>
          <h4>Consent Categories:</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {bannerConfig.consentCategories.map((category, index) => (
              <li key={index}>
                <strong>{category.title}:</strong> {category.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      <button
        style={{
          backgroundColor: bannerConfig.buttonColor,
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {bannerConfig.buttonText}
      </button>
    </div>
  );
};

export default PreviewBanner;
