import React, { useState } from 'react';
import { createBanner } from '../api/BannerApi'; // Import the createBanner function
import CreateBanner from '../components/BannerComponents/BannerCreate.js';
import BannerPreview from '../components/BannerComponents/BannerPreview.js';
import DemoTemplates from '../components/BannerComponents/DemoTemplates.js';
import useTranslation from '../hooks/useTranslation.js';

const ConsentCreation = () => {
  const [bannerData, setBannerData] = useState({
    text: '',
    buttonText: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#007bff',
    languages: ['en'],
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
  const { translateText, isLoading } = useTranslation(
    '5hpZWQuacrI3IW5T24rHszpm5Qn7uv1kOy2U5wxGW99ErsS5WKoxJQQJ99ALACGhslBXJ3w3AAAbACOG6pJS',
    'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
  );

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(bannerData);
  //   // try {
  //   //   console.log(bannerData);
  //   //   // const response = await createBanner(bannerData); // Use the createBanner API function
  //   //   alert(`Banner created successfully: ${response.message}`);
  //   //   setBannerData({
  //   //     text: '',
  //   //     buttonText: '',
  //   //     backgroundColor: '#ffffff',
  //   //     textColor: '#000000',
  //   //     buttonColor: '#007bff',
  //   //     languages: ['English'],
  //   //     consentCategories: [
  //   //       {
  //   //         title: '',
  //   //         description: '',
  //   //         yesOrNo: false,
  //   //         reason: '',
  //   //         consentType: 'accepted',
  //   //       },
  //   //     ],
  //   //     privacyPolicyLink: '',
  //   //     termsLink: '',
  //   //     consentExpiry: 30,
  //   //     granularity: false,
  //   //   });
  //   //   setPreviewBanner(null);
  //   // } catch (error) {
  //   //   alert(
  //   //     `Error creating banner: ${
  //   //       error.response?.data?.message || error.message
  //   //     }`
  //   //   );
  //   // }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { languages, text, buttonText, consentCategories } = bannerData;

  //   const translatedText = await translateText(text, languages);
  //   const translatedButtonText = await translateText(buttonText, languages);

  //   const translatedConsentCategories = await Promise.all(
  //     consentCategories.map(async (category) => ({
  //       title: await translateText(category.title, languages),
  //       description: await translateText(category.description, languages),
  //       reason: await translateText(category.reason, languages),
  //       yesOrNo: category.yesOrNo,
  //       consentType: category.consentType,
  //     }))
  //   );

  //   const formattedSubmission = {
  //     text: translatedText,
  //     buttonText: translatedButtonText,
  //     consentCategories: translatedConsentCategories,
  //     backgroundColor: bannerData.backgroundColor,
  //     textColor: bannerData.textColor,
  //     buttonColor: bannerData.buttonColor,
  //     privacyPolicyLink: bannerData.privacyPolicyLink,
  //     termsLink: bannerData.termsLink,
  //     consentExpiry: bannerData.consentExpiry,
  //     granularity: bannerData.granularity,
  //   };

  //   console.log('Formatted Submission:', formattedSubmission);
  //   // Call the API to create the banner
  //   const result = await createBanner(formattedSubmission);

  //   // Handle the response from the server (e.g., show a success message)
  //   console.log('Banner created successfully:', result);
  //   alert('Banner created successfully!');
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { languages, text, buttonText, consentCategories } = bannerData;

  //   try {
  //     // Translate text fields based on selected languages
  //     const translatedText = await translateText(text, languages);
  //     const translatedButtonText = await translateText(buttonText, languages);

  //     // Translate consent categories
  //     const translatedConsentCategories = await Promise.all(
  //       consentCategories.map(async (category) => ({
  //         title: await translateText(category.title, languages),
  //         description: await translateText(category.description, languages),
  //         reason: await translateText(category.reason, languages),
  //         yesOrNo: category.yesOrNo,
  //         consentType: category.consentType,
  //       }))
  //     );

  //     // Prepare formatted submission data
  //     const formattedSubmission = {
  //       text: translatedText,
  //       buttonText: translatedButtonText,
  //       consentCategories: translatedConsentCategories,
  //       backgroundColor: bannerData.backgroundColor,
  //       textColor: bannerData.textColor,
  //       buttonColor: bannerData.buttonColor,
  //       privacyPolicyLink: bannerData.privacyPolicyLink,
  //       termsLink: bannerData.termsLink,
  //       consentExpiry: bannerData.consentExpiry,
  //       granularity: bannerData.granularity,
  //     };

  //     // Log the formatted submission to check
  //     console.log('Formatted Submission:', formattedSubmission);

  //     // Call createBanner to submit the data
  //     const response = await createBanner(formattedSubmission);
  //     console.log('Banner created successfully:', response);
  //   } catch (error) {
  //     console.error('Error during submission:', error);
  //     alert('An error occurred while submitting the banner. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { languages, text, buttonText, consentCategories } = bannerData;

    // Translate text and buttonText
    const translatedText = await translateText(text, languages);
    const translatedButtonText = await translateText(buttonText, languages);

    // Translate consentCategories
    const translatedConsentCategories = await Promise.all(
      consentCategories.map(async (category) => ({
        title: await translateText(category.title, languages),
        description: await translateText(category.description, languages),
        reason: await translateText(category.reason, languages),
        yesOrNo: category.yesOrNo,
        consentType: category.consentType,
      }))
    );

    // Format the data before submission
    // const formattedSubmission = {
    //   text: translatedText.map((t, idx) => ({
    //     language: languages[idx],
    //     value: t,
    //   })),
    //   buttonText: translatedButtonText.map((t, idx) => ({
    //     language: languages[idx],
    //     value: t,
    //   })),
    //   consentCategories: translatedConsentCategories.map((category) => ({
    //     title: category.title.map((t, idx) => ({
    //       language: languages[idx],
    //       value: t,
    //     })),
    //     description: category.description.map((t, idx) => ({
    //       language: languages[idx],
    //       value: t,
    //     })),
    //     reason: category.reason.map((t, idx) => ({
    //       language: languages[idx],
    //       value: t,
    //     })),
    //     yesOrNo: category.yesOrNo,
    //     consentType: category.consentType,
    //   })),
    //   backgroundColor: bannerData.backgroundColor,
    //   textColor: bannerData.textColor,
    //   buttonColor: bannerData.buttonColor,
    //   privacyPolicyLink: bannerData.privacyPolicyLink,
    //   termsLink: bannerData.termsLink,
    //   consentExpiry: bannerData.consentExpiry,
    //   granularity: bannerData.granularity,
    // };
    // const formattedSubmission = {
    //   text: translatedText.map((t, idx) => ({
    //     language: languages[idx],
    //     value: t,
    //   })),
    //   buttonText: translatedButtonText.map((t, idx) => ({
    //     language: languages[idx],
    //     value: t,
    //   })),
    //   consentCategories: translatedConsentCategories.map((category) => ({
    //     title: category.title.map((t, idx) => ({
    //       language: languages[idx],
    //       value: t,
    //     })),
    //     description: category.description.map((t, idx) => ({
    //       language: languages[idx],
    //       value: t,
    //     })),
    //     reason: category.reason.map((t, idx) => ({
    //       language: languages[idx],
    //       value: t,
    //     })),
    //     yesOrNo: category.yesOrNo,
    //     consentType: category.consentType,
    //   })),
    //   backgroundColor: bannerData.backgroundColor,
    //   textColor: bannerData.textColor,
    //   buttonColor: bannerData.buttonColor,
    //   privacyPolicyLink: bannerData.privacyPolicyLink,
    //   termsLink: bannerData.termsLink,
    //   consentExpiry: bannerData.consentExpiry,
    //   granularity: bannerData.granularity,
    // };
    // const formattedSubmission = {
    //   text: translatedText.map((t, idx) => ({
    //     language: languages[idx],
    //     value: String(t), // Ensure value is a string
    //   })),
    //   buttonText: translatedButtonText.map((t, idx) => ({
    //     language: languages[idx],
    //     value: String(t), // Ensure value is a string
    //   })),
    //   consentCategories: translatedConsentCategories.map((category) => ({
    //     title: category.title.map((t, idx) => ({
    //       language: languages[idx],
    //       value: String(t), // Ensure value is a string
    //     })),
    //     description: category.description.map((t, idx) => ({
    //       language: languages[idx],
    //       value: String(t), // Ensure value is a string
    //     })),
    //     reason: category.reason.map((t, idx) => ({
    //       language: languages[idx],
    //       value: String(t), // Ensure value is a string
    //     })),
    //     yesOrNo: category.yesOrNo,
    //     consentType: category.consentType,
    //   })),
    //   backgroundColor: bannerData.backgroundColor,
    //   textColor: bannerData.textColor,
    //   buttonColor: bannerData.buttonColor,
    //   privacyPolicyLink: bannerData.privacyPolicyLink,
    //   termsLink: bannerData.termsLink,
    //   consentExpiry: bannerData.consentExpiry,
    //   granularity: bannerData.granularity,
    // };
    const formattedSubmission = {
      text: translatedText.map((t, idx) => ({
        language: languages[idx],
        value: t.value ? t.value : String(t), // Ensure value is a string, extracting the 'value' property
      })),
      buttonText: translatedButtonText.map((t, idx) => ({
        language: languages[idx],
        value: t.value ? t.value : String(t), // Ensure value is a string, extracting the 'value' property
      })),
      consentCategories: translatedConsentCategories.map((category) => ({
        title: category.title.map((t, idx) => ({
          language: languages[idx],
          value: t.value ? t.value : String(t), // Ensure value is a string, extracting the 'value' property
        })),
        description: category.description.map((t, idx) => ({
          language: languages[idx],
          value: t.value ? t.value : String(t), // Ensure value is a string, extracting the 'value' property
        })),
        reason: category.reason.map((t, idx) => ({
          language: languages[idx],
          value: t.value ? t.value : String(t), // Ensure value is a string, extracting the 'value' property
        })),
        yesOrNo: category.yesOrNo,
        consentType: category.consentType,
      })),
      backgroundColor: bannerData.backgroundColor,
      textColor: bannerData.textColor,
      buttonColor: bannerData.buttonColor,
      privacyPolicyLink: bannerData.privacyPolicyLink,
      termsLink: bannerData.termsLink,
      consentExpiry: bannerData.consentExpiry,
      granularity: bannerData.granularity,
    };

    console.log('Formatted Submission:', formattedSubmission);

    // Send the data to the backend
    try {
      const response = await createBanner(formattedSubmission);
      console.log('Banner created successfully:', response);
    } catch (error) {
      console.error('Error during submission:', error);
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
      {/* <BannerPreview previewData={previewBanner} /> */}
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
