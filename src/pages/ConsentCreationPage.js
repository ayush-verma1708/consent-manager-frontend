import React, { useState } from 'react';
import BannerCustomization from '../components/BannerCreationComponents/BannerCustomization';
import PreviewBanner from '../components/BannerCreationComponents/PreviewBanner';
import PredefinedTemplates from '../components/BannerCreationComponents/PredefinedTemplates';

// Import the API functions
import { saveBanner } from '../api/BannerApi';

import 'bootstrap/dist/css/bootstrap.min.css';

const ConsentCreationPage = () => {
  const [bannerConfig, setBannerConfig] = useState({
    text: '',
    buttonText: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#007bff',
    consentCategories: [],
    privacyPolicyLink: '',
    termsLink: '',
    consentExpiry: 30,
    granularity: false,
  });

  const [preview, setPreview] = useState(false);

  // Function to save the banner configuration using the API
  const handleSave = async () => {
    try {
      const response = await saveBanner(bannerConfig);

      if (response.success) {
        alert('Banner saved successfully!');
        console.log('Banner Saved:', bannerConfig);
      } else {
        alert('Error saving banner');
      }
    } catch (error) {
      alert('Error saving banner');
      console.error('Error:', error);
    }
  };

  // Function to toggle preview mode
  const handlePreview = () => {
    setPreview(true);
  };

  return (
    <div className='container my-4'>
      <h1 className='text-center mb-4'>Create Your Consent Banner</h1>

      {/* Predefined Templates */}
      <PredefinedTemplates setBannerConfig={setBannerConfig} />

      {/* Banner Customization */}
      <BannerCustomization
        bannerConfig={bannerConfig}
        setBannerConfig={setBannerConfig}
      />

      {/* Action Buttons */}
      <div className='d-flex justify-content-between'>
        <button onClick={handlePreview} className='btn btn-secondary'>
          Preview Banner
        </button>
        <button onClick={handleSave} className='btn btn-primary'>
          Save Banner
        </button>
      </div>

      {/* Preview the Banner */}
      {preview && <PreviewBanner bannerConfig={bannerConfig} />}
    </div>
  );
};

export default ConsentCreationPage;

// import React, { useState } from 'react';
// import BannerCustomization from '../components/BannerComponents/BannerCustomization';
// import PreviewBanner from '../components/BannerComponents/PreviewBanner';
// import PredefinedTemplates from '../components/BannerComponents/PredefinedTemplates';

// // Import the API functions
// import { saveBanner } from '../api/BannerApi';

// import 'bootstrap/dist/css/bootstrap.min.css';

// const ConsentCreationPage = () => {
//   const [bannerConfig, setBannerConfig] = useState({
//     text: '',
//     buttonText: '',
//     backgroundColor: '#ffffff',
//     textColor: '#000000',
//     buttonColor: '#007bff',
//     consentCategories: [],
//     languages: ['en', 'hi'],
//     privacyPolicyLink: '',
//     termsLink: '',
//     consentExpiry: 30,
//     granularity: false,
//   });

//   const [preview, setPreview] = useState(false);

//   // Function to save the banner configuration using the API
//   const handleSave = async () => {
//     try {
//       console.log('Sending banner config:', bannerConfig);
//       const response = await saveBanner(bannerConfig);

//       if (response.success) {
//         alert('Banner saved successfully!');
//       } else {
//         alert('Error saving banner');
//       }
//     } catch (error) {
//       alert('Error saving banner');
//       console.error(
//         'Error:',
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   // Function to toggle preview mode
//   const handlePreview = () => {
//     setPreview(true);
//   };

//   return (
//     <div className='container my-4'>
//       <h1 className='text-center mb-4'>Create Your Consent Banner</h1>

//       {/* Predefined Templates */}
//       <PredefinedTemplates setBannerConfig={setBannerConfig} />

//       {/* Banner Customization */}
//       <BannerCustomization
//         bannerConfig={bannerConfig}
//         setBannerConfig={setBannerConfig}
//       />

//       {/* Action Buttons */}
//       <div className='d-flex justify-content-between'>
//         <button onClick={handlePreview} className='btn btn-secondary'>
//           Preview Banner
//         </button>
//         <button onClick={handleSave} className='btn btn-primary'>
//           Save Banner
//         </button>
//       </div>

//       {/* Preview the Banner */}
//       {preview && <PreviewBanner bannerConfig={bannerConfig} />}
//     </div>
//   );
// };

// export default ConsentCreationPage;
