import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BannerPreview.css'; // External CSS file for styling
import axios from 'axios';

const translateText = async (text, targetLanguage) => {
  const subscriptionKey =
    '3Nv82Y2vYAQKLZbS1cwGJ7DWrmiBkyoMeraNkDtDZ4ytCcGyVxsDJQQJ99ALACqBBLyXJ3w3AAAbACOGGzXR'; // Replace with your Microsoft Translator API key
  const region = 'southeastasia'; // Replace with your Azure region (e.g., 'eastus')

  // Language code mapping, add more as needed
  const languageCodeMapping = {
    English: 'en',
    Punjabi: 'pa',
    // Add more languages here
  };

  const languageCode = languageCodeMapping[targetLanguage] || 'en'; // Default to English if no match

  const url = `https://${region}.api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${languageCode}`;
  try {
    const response = await axios.post(url, [{ Text: text }], {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
    });

    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Fallback to original text if translation fails
  }
};

const BannerPreviewPage = () => {
  const location = useLocation();
  const bannerData = location.state?.bannerData || {
    text: '',
    buttonText: '',
    backgroundColor: '#fff',
    textColor: '#000',
    buttonColor: '#007bff',
    languages: ['English'],
    consentCategories: [],
    privacyPolicyLink: '#',
    termsLink: '#',
  }; // Default values as fallback

  // State to store the selected consent options
  const [consentSelections, setConsentSelections] = useState(
    bannerData.consentCategories.map((category) => ({
      ...category,
      consentChoice: category.yesOrNo, // Default consent choice from the initial data
    }))
  );

  // State for the selected language
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const availableLanguages = bannerData.languages; // List of languages from the schema
  const [translations, setTranslations] = useState({});

  // Function to handle consent selection change
  const handleConsentChange = (index, choice) => {
    const updatedConsentSelections = [...consentSelections];
    updatedConsentSelections[index].consentChoice = choice;
    setConsentSelections(updatedConsentSelections);
  };

  // Function to change language and update page content
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  // Fetch translations for all dynamic content
  const fetchTranslations = async () => {
    // Check if translations already exist for the selected language
    if (translations[selectedLanguage]) return;

    // List of static labels to translate
    const labels = [
      'privacy',
      'terms',
      'consent',
      'yes',
      'no',
      'reason',
      'languages',
    ];

    const translatedLabels = {};

    try {
      // Translate static labels
      for (let label of labels) {
        const translated = await translateText(label, selectedLanguage);
        translatedLabels[label] = translated;
      }

      // Translate dynamic content like banner text, button text, and consent category titles/descriptions
      const dynamicContent = {
        bannerText: await translateText(bannerData.text, selectedLanguage),
        buttonText: await translateText(
          bannerData.buttonText,
          selectedLanguage
        ),
        consentCategories: await Promise.all(
          consentSelections.map(async (category) => ({
            ...category,
            title: await translateText(category.title, selectedLanguage),
            description: await translateText(
              category.description,
              selectedLanguage
            ),
            reason: await translateText(category.reason, selectedLanguage),
          }))
        ),
      };

      setTranslations((prev) => ({
        ...prev,
        [selectedLanguage]: {
          ...translatedLabels,
          ...dynamicContent,
        },
      }));
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, [selectedLanguage]);

  if (!location.state) {
    return (
      <p>
        Error: No banner data available. Please navigate from the main page.
      </p>
    );
  }

  const currentTranslations = translations[selectedLanguage] || {};

  return (
    <div className='banner-preview-page'>
      <h2 className='preview-heading'>
        {currentTranslations['privacy'] || 'Privacy Policy'} Preview
      </h2>

      <div
        className='banner-preview'
        style={{
          backgroundColor: bannerData.backgroundColor,
          color: bannerData.textColor,
        }}
      >
        <div className='banner-content'>
          <div className='banner-text'>
            {currentTranslations.bannerText || bannerData.text}
          </div>
          <div className='banner-button'>
            <button
              style={{
                backgroundColor: bannerData.buttonColor,
                color: bannerData.textColor,
              }}
            >
              {currentTranslations.buttonText || bannerData.buttonText}
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className='languages-section'>
          <h3>{currentTranslations['languages'] || 'Languages'}:</h3>
          <div className='language-buttons'>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                className={`language-button ${
                  lang === selectedLanguage ? 'active' : ''
                }`}
                onClick={() => handleLanguageChange(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Consent Categories */}
        <div className='consent-categories'>
          <h3>{currentTranslations['consent'] || 'Consent Categories'}:</h3>
          {consentSelections.map((category, index) => (
            <div key={index} className='category-item'>
              <div className='category-title'>
                {currentTranslations.consentCategories
                  ? currentTranslations.consentCategories[index]?.title ||
                    category.title
                  : category.title}
              </div>
              <p>
                {currentTranslations.consentCategories
                  ? currentTranslations.consentCategories[index]?.description ||
                    category.description
                  : category.description}
              </p>
              <div className='category-choice'>
                <label>
                  <input
                    type='radio'
                    name={`consent-${index}`}
                    value='yes'
                    checked={category.consentChoice === true}
                    onChange={() => handleConsentChange(index, true)}
                  />
                  {currentTranslations['yes'] || 'Yes'}
                </label>
                <label>
                  <input
                    type='radio'
                    name={`consent-${index}`}
                    value='no'
                    checked={category.consentChoice === false}
                    onChange={() => handleConsentChange(index, false)}
                  />
                  {currentTranslations['no'] || 'No'}
                </label>
              </div>
              <div className='category-reason'>
                <span>
                  {currentTranslations['reason'] || 'Reason'}: {category.reason}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy and Terms Links */}
        <div className='footer-section'>
          <div className='footer-links'>
            <a
              href={bannerData.privacyPolicyLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              {currentTranslations['privacy'] || 'Privacy Policy'}
            </a>
            <a
              href={bannerData.termsLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              {currentTranslations['terms'] || 'Terms of Service'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPreviewPage;
