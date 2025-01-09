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
    reject_button_Text: '',
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
    dpoContact: { name: '', email: '' }, // New field
    consentManagerContact: { name: '', email: '' }, // New field
  });

  const [previewBanner, setPreviewBanner] = useState(null);
  const { translateText, isLoading } = useTranslation(
    '5hpZWQuacrI3IW5T24rHszpm5Qn7uv1kOy2U5wxGW99ErsS5WKoxJQQJ99ALACGhslBXJ3w3AAAbACOG6pJS',
    'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData({
      ...bannerData,
      [name]: value, // Directly update the value in the state
    });
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

    // Ensure consentManagerContact is not undefined
    if (!bannerData.consentManagerContact) {
      console.error('consentManagerContact is undefined');
      return;
    }

    const {
      languages,
      text,
      buttonText,
      reject_button_Text,
      consentCategories,
    } = bannerData;

    // Translate text and buttonText
    const translatedText = await translateText(text, languages);
    const translatedButtonText = await translateText(buttonText, languages);
    const transltedRejectTest = await translateText(
      reject_button_Text,
      languages
    );

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
    const formattedSubmission = {
      text: translatedText.map((t, idx) => ({
        language: languages[idx],
        value: t.value ? t.value : String(t),
      })),
      buttonText: translatedButtonText.map((t, idx) => ({
        language: languages[idx],
        value: t.value ? t.value : String(t),
      })),

      reject_button_Text: transltedRejectTest.map((t, idx) => ({
        language: languages[idx],
        value: t.value ? t.value : String(t),
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
      // Handling the DPO and Consent Manager contacts
      dpoContact: {
        name: bannerData.dpoContact?.name,
        email: bannerData.dpoContact?.email,
      },
      consentManagerContact: {
        name: bannerData.consentManagerContact?.name,
        email: bannerData.consentManagerContact?.email,
      },
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
