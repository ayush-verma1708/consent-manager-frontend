import React, { useState } from 'react';
import { createBanner } from '../api/BannerApi'; // Import the createBanner function
import CreateBanner from '../components/BannerComponents/BannerCreate.js';
import BannerPreview from '../components/BannerComponents/BannerPreview.js';
import DemoTemplates from '../components/BannerComponents/DemoTemplates.js';

const ConsentCreation = () => {
  const [bannerData, setBannerData] = useState({
    text: '',
    buttonText: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#007bff',
    languages: ['English'],
    consentCategories: [
      {
        title: '',
        description: '',
        yesOrNo: false,
        reason: '',
        consentType: 'accepted',
      },
    ],
    privacyPolicyLink: '',
    termsLink: '',
    consentExpiry: 30,
    granularity: false,
  });

  const [previewBanner, setPreviewBanner] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData({ ...bannerData, [name]: value });
  };

  const handleConsentCategoryChange = (index, field, value) => {
    const updatedCategories = [...bannerData.consentCategories];
    updatedCategories[index][field] = value;
    setBannerData({ ...bannerData, consentCategories: updatedCategories });
  };

  const addConsentCategory = () => {
    setBannerData({
      ...bannerData,
      consentCategories: [
        ...bannerData.consentCategories,
        {
          title: '',
          description: '',
          yesOrNo: false,
          reason: '',
          consentType: 'accepted',
        },
      ],
    });
  };

  const removeConsentCategory = (index) => {
    const updatedCategories = bannerData.consentCategories.filter(
      (_, i) => i !== index
    );
    setBannerData({ ...bannerData, consentCategories: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBanner(bannerData); // Use the createBanner API function
      alert(`Banner created successfully: ${response.message}`);
      setBannerData({
        text: '',
        buttonText: '',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonColor: '#007bff',
        languages: ['English'],
        consentCategories: [
          {
            title: '',
            description: '',
            yesOrNo: false,
            reason: '',
            consentType: 'accepted',
          },
        ],
        privacyPolicyLink: '',
        termsLink: '',
        consentExpiry: 30,
        granularity: false,
      });
      setPreviewBanner(null);
    } catch (error) {
      alert(
        `Error creating banner: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const generatePreview = () => {
    setPreviewBanner({ ...bannerData });
  };

  const handleTemplateSelect = (template) => {
    setBannerData({ ...template });
    setPreviewBanner({ ...template });
  };

  return (
    <div className='consent-creation-page'>
      <h2>Create New Consent Banner</h2>
      <DemoTemplates onSelectTemplate={handleTemplateSelect} />
      <CreateBanner
        bannerData={bannerData}
        setBannerData={setBannerData}
        handleInputChange={handleInputChange}
        handleConsentCategoryChange={handleConsentCategoryChange}
        addConsentCategory={addConsentCategory}
        removeConsentCategory={removeConsentCategory}
        handleSubmit={handleSubmit}
        generatePreview={generatePreview}
      />
      <BannerPreview previewData={previewBanner} />
    </div>
  );
};

export default ConsentCreation;

// import React, { useState } from 'react';
// import axios from 'axios';
// import CreateBanner from '../components/BannerComponents/BannerCreate.js';
// import BannerPreview from '../components/BannerComponents/BannerPreview.js';
// import DemoTemplates from '../components/BannerComponents/DemoTemplates.js';

// const ConsentCreation = () => {
//   const [bannerData, setBannerData] = useState({
//     text: '',
//     buttonText: '',
//     backgroundColor: '#ffffff',
//     textColor: '#000000',
//     buttonColor: '#007bff',
//     languages: ['English'],
//     consentCategories: [
//       {
//         title: '',
//         description: '',
//         yesOrNo: false,
//         reason: '',
//         consentType: 'accepted',
//       },
//     ],
//     privacyPolicyLink: '',
//     termsLink: '',
//     consentExpiry: 30,
//     granularity: false,
//   });

//   const [previewBanner, setPreviewBanner] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBannerData({ ...bannerData, [name]: value });
//   };

//   const handleConsentCategoryChange = (index, field, value) => {
//     const updatedCategories = [...bannerData.consentCategories];
//     updatedCategories[index][field] = value;
//     setBannerData({ ...bannerData, consentCategories: updatedCategories });
//   };

//   const addConsentCategory = () => {
//     setBannerData({
//       ...bannerData,
//       consentCategories: [
//         ...bannerData.consentCategories,
//         {
//           title: '',
//           description: '',
//           yesOrNo: false,
//           reason: '',
//           consentType: 'accepted',
//         },
//       ],
//     });
//   };

//   const removeConsentCategory = (index) => {
//     const updatedCategories = bannerData.consentCategories.filter(
//       (_, i) => i !== index
//     );
//     setBannerData({ ...bannerData, consentCategories: updatedCategories });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/banners', bannerData);
//       alert(`Banner created successfully: ${response.data.message}`);
//       setBannerData({
//         text: '',
//         buttonText: '',
//         backgroundColor: '#ffffff',
//         textColor: '#000000',
//         buttonColor: '#007bff',
//         languages: ['English'],
//         consentCategories: [
//           {
//             title: '',
//             description: '',
//             yesOrNo: false,
//             reason: '',
//             consentType: 'accepted',
//           },
//         ],
//         privacyPolicyLink: '',
//         termsLink: '',
//         consentExpiry: 30,
//         granularity: false,
//       });
//       setPreviewBanner(null);
//     } catch (error) {
//       alert(
//         `Error creating banner: ${
//           error.response?.data?.message || error.message
//         }`
//       );
//     }
//   };

//   const generatePreview = () => {
//     setPreviewBanner({ ...bannerData });
//   };

//   const handleTemplateSelect = (template) => {
//     setBannerData({ ...template });
//     setPreviewBanner({ ...template });
//   };

//   return (
//     <div className='consent-creation-page'>
//       <h2>Create New Consent Banner</h2>
//       <DemoTemplates onSelectTemplate={handleTemplateSelect} />
//       <CreateBanner
//         bannerData={bannerData}
//         setBannerData={setBannerData}
//         handleInputChange={handleInputChange}
//         handleConsentCategoryChange={handleConsentCategoryChange}
//         addConsentCategory={addConsentCategory}
//         removeConsentCategory={removeConsentCategory}
//         handleSubmit={handleSubmit}
//         generatePreview={generatePreview}
//       />
//       <BannerPreview previewData={previewBanner} />
//     </div>
//   );
// };

// export default ConsentCreation;
