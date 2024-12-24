import React, { useState } from 'react';
import {
  MenuItem,
  Select,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from '@mui/material';
const demoTemplates = [
  {
    id: 1,
    name: 'Analytics Consent Banner',
    description: 'A consent banner tailored for analytics purposes.',
    preview: {
      text: 'We use cookies to analyze our website traffic and performance.',
      buttonText: 'Accept Analytics',
      backgroundColor: '#e0f7fa',
      textColor: '#00796b',
      buttonColor: '#004d40',
      languages: ['English'],
      consentCategories: [
        {
          title: 'Analytics Cookies',
          description: 'Used to monitor website traffic and usage patterns.',
          yesOrNo: true,
          reason: 'To improve user experience based on analytics insights.',
          consentType: 'accepted',
        },
      ],
      privacyPolicyLink: 'https://example.com/privacy-policy',
      termsLink: 'https://example.com/terms',
      consentExpiry: 365,
      granularity: true,
    },
  },
  {
    id: 2,
    name: 'Marketing Consent Banner',
    description: 'A consent banner for marketing and promotional activities.',
    preview: {
      text: 'We use cookies for personalized marketing and promotions.',
      buttonText: 'Allow Marketing',
      backgroundColor: '#ffebee',
      textColor: '#d32f2f',
      buttonColor: '#b71c1c',
      languages: ['English', 'Spanish'],
      consentCategories: [
        {
          title: 'Marketing Cookies',
          description:
            'Used to deliver personalized advertisements and content.',
          yesOrNo: true,
          reason: 'To tailor our promotions to your preferences.',
          consentType: 'accepted',
        },
      ],
      privacyPolicyLink: 'https://example.com/privacy-policy',
      termsLink: 'https://example.com/terms',
      consentExpiry: 180,
      granularity: true,
    },
  },
  {
    id: 3,
    name: 'Healthcare Consent Banner',
    description: 'A consent banner for healthcare and medical websites.',
    preview: {
      text: 'We collect data to improve healthcare services.',
      buttonText: 'Agree & Proceed',
      backgroundColor: '#e8f5e9',
      textColor: '#2e7d32',
      buttonColor: '#1b5e20',
      languages: ['English'],
      consentCategories: [
        {
          title: 'Healthcare Data',
          description: 'Used for enhancing healthcare services and treatments.',
          yesOrNo: true,
          reason: 'To provide accurate and timely healthcare recommendations.',
          consentType: 'accepted',
        },
      ],
      privacyPolicyLink: 'https://example.com/privacy-policy',
      termsLink: 'https://example.com/terms',
      consentExpiry: 730,
      granularity: true,
    },
  },
  {
    id: 4,
    name: 'E-commerce Consent Banner',
    description: 'A consent banner for e-commerce websites.',
    preview: {
      text: 'We use cookies to improve your shopping experience.',
      buttonText: 'Accept & Shop',
      backgroundColor: '#fff3e0',
      textColor: '#f57c00',
      buttonColor: '#e65100',
      languages: ['English', 'French'],
      consentCategories: [
        {
          title: 'Shopping Preferences',
          description:
            'Used to remember your preferences and optimize shopping.',
          yesOrNo: true,
          reason: 'To offer personalized product recommendations.',
          consentType: 'accepted',
        },
      ],
      privacyPolicyLink: 'https://example.com/privacy-policy',
      termsLink: 'https://example.com/terms',
      consentExpiry: 90,
      granularity: true,
    },
  },
  {
    id: 5,
    name: 'Banking Consent Banner',
    description: 'A consent banner for banking and financial services.',
    preview: {
      text: 'We use cookies to enhance your banking experience securely.',
      buttonText: 'Accept & Continue',
      backgroundColor: '#e3f2fd',
      textColor: '#1565c0',
      buttonColor: '#0d47a1',
      languages: ['English', 'German'],
      consentCategories: [
        {
          title: 'Security Cookies',
          description:
            'Used to ensure secure transactions and fraud detection.',
          yesOrNo: true,
          reason: 'To protect your banking information and transactions.',
          consentType: 'accepted',
        },
      ],
      privacyPolicyLink: 'https://example.com/privacy-policy',
      termsLink: 'https://example.com/terms',
      consentExpiry: 365,
      granularity: true,
    },
  },
];

const DemoTemplates = ({ onSelectTemplate }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const template = demoTemplates.find((t) => t.id === selectedId);
    setSelectedTemplateId(selectedId);
    if (template && onSelectTemplate) {
      onSelectTemplate(template.preview);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant='h4' gutterBottom>
        Demo Templates
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Select a Template</InputLabel>
        <Select onChange={handleSelectChange} label='Select a Template'>
          {demoTemplates.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DemoTemplates;

// import React from 'react';
// import './DemoTemplates.css'; // External CSS for better styling

// const demoTemplates = [
//   {
//     id: 1,
//     name: 'Minimalist Banner',
//     description: 'A clean and simple consent banner with minimalistic design.',
//     preview: {
//       text: 'We value your privacy.',
//       buttonText: 'Accept',
//       backgroundColor: '#f5f5f5',
//       textColor: '#333',
//       buttonColor: '#007bff',
//     },
//   },
//   {
//     id: 2,
//     name: 'Dark Theme Banner',
//     description: 'A stylish banner with a dark theme.',
//     preview: {
//       text: 'This website uses cookies.',
//       buttonText: 'Agree',
//       backgroundColor: '#333',
//       textColor: '#fff',
//       buttonColor: '#ff5722',
//     },
//   },
//   {
//     id: 3,
//     name: 'Colorful Banner',
//     description: 'A vibrant and colorful banner to attract attention.',
//     preview: {
//       text: 'We use cookies to improve your experience.',
//       buttonText: 'Got it!',
//       backgroundColor: '#ffeb3b',
//       textColor: '#000',
//       buttonColor: '#4caf50',
//     },
//   },
// ];

// const DemoTemplates = ({ onSelectTemplate }) => {
//   return (
//     <div className='demo-templates'>
//       <h2 className='section-title'>Demo Templates</h2>
//       <div className='template-list'>
//         {demoTemplates.map((template) => (
//           <div key={template.id} className='template-card'>
//             <div className='card-header'>
//               <h3 className='template-name'>{template.name}</h3>
//               <p className='template-description'>{template.description}</p>
//             </div>
//             <div
//               className='template-preview'
//               style={{
//                 backgroundColor: template.preview.backgroundColor,
//                 color: template.preview.textColor,
//               }}
//             >
//               <p className='preview-text'>{template.preview.text}</p>
//               <button
//                 className='preview-button'
//                 style={{
//                   backgroundColor: template.preview.buttonColor,
//                 }}
//               >
//                 {template.preview.buttonText}
//               </button>
//             </div>
//             <button
//               className='select-button'
//               onClick={() => onSelectTemplate(template.preview)}
//             >
//               Use Template
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DemoTemplates;
