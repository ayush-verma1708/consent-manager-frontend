import React from 'react';

const PredefinedTemplates = ({ setBannerConfig }) => {
  const templates = [
    {
      name: 'Basic Template',
      config: {
        text: 'We use cookies to enhance your experience.',
        buttonText: 'Accept',
        backgroundColor: '#f8f9fa',
        textColor: '#000000',
        buttonColor: '#28a745',
        consentCategories: [
          { title: 'Necessary', description: 'Essential cookies' },
        ],
        privacyPolicyLink: 'https://example.com/privacy',
        termsLink: 'https://example.com/terms',
        consentExpiry: 30,
      },
    },
    {
      name: 'Dark Theme',
      config: {
        text: 'We use cookies. Please accept.',
        buttonText: 'Agree',
        backgroundColor: '#343a40',
        textColor: '#ffffff',
        buttonColor: '#007bff',
        consentCategories: [
          { title: 'Analytics', description: 'Non-essential cookies' },
        ],
        privacyPolicyLink: 'https://example.com/privacy',
        termsLink: 'https://example.com/terms',
        consentExpiry: 30,
      },
    },
  ];

  const handleTemplateSelect = (templateConfig) => {
    setBannerConfig(templateConfig);
  };

  return (
    <div className='mb-4'>
      <h3>Select a Predefined Template</h3>
      <div className='list-group'>
        {templates.map((template, index) => (
          <button
            key={index}
            className='list-group-item list-group-item-action'
            onClick={() => handleTemplateSelect(template.config)}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PredefinedTemplates;
