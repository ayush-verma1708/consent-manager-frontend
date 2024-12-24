import React from 'react';

const BannerPreview = ({ previewData }) => {
  if (!previewData) {
    return (
      <p>
        No preview available. Please fill in the form and click "Generate
        Preview".
      </p>
    );
  }

  return (
    <div
      style={{
        backgroundColor: previewData.backgroundColor || '#ffffff',
        color: previewData.textColor || '#000000',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
        border: '1px solid #ddd',
        maxWidth: '600px',
        margin: '20px auto',
      }}
    >
      <h3>{previewData.text || 'Banner Text'}</h3>
      <button
        style={{
          backgroundColor: previewData.buttonColor || '#007bff',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {previewData.buttonText || 'Button Text'}
      </button>
      <div
        style={{
          marginTop: '20px',
          textAlign: 'left',
        }}
      >
        {previewData.consentCategories &&
          previewData.consentCategories.length > 0 && (
            <div>
              <h4>Consent Categories:</h4>
              {previewData.consentCategories.map((category, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: '1px solid #ddd',
                    marginBottom: '10px',
                    paddingBottom: '10px',
                  }}
                >
                  <strong>{category.title || 'Category Title'}</strong>
                  <p>{category.description || 'Category Description'}</p>
                  <p>
                    <strong>Consent:</strong> {category.yesOrNo ? 'Yes' : 'No'}
                  </p>
                  <p>
                    <strong>Reason:</strong> {category.reason || 'Reason'}
                  </p>
                </div>
              ))}
            </div>
          )}
      </div>
      <div
        style={{
          marginTop: '20px',
          textAlign: 'left',
        }}
      >
        {previewData.privacyPolicyLink && (
          <p>
            <a
              href={previewData.privacyPolicyLink}
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: previewData.buttonColor || '#007bff' }}
            >
              Privacy Policy
            </a>
          </p>
        )}
        {previewData.termsLink && (
          <p>
            <a
              href={previewData.termsLink}
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: previewData.buttonColor || '#007bff' }}
            >
              Terms and Conditions
            </a>
          </p>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>
          <strong>Consent Expiry:</strong> {previewData.consentExpiry || 30}{' '}
          days
        </p>
        <p>
          <strong>Granularity:</strong>{' '}
          {previewData.granularity ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    </div>
  );
};

export default BannerPreview;
