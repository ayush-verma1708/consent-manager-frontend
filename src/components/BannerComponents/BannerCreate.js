import React from 'react';
import './CreateBanner.css'; // External CSS for styling

const CreateBanner = ({
  bannerData = {}, // Fallback to an empty object
  setBannerData,
  handleInputChange,
  handleConsentCategoryChange,
  addConsentCategory,
  removeConsentCategory,
  handleSubmit,
  generatePreview,
}) => {
  const {
    languages = [], // Ensure languages is always an array
    consentCategories = [], // Ensure consentCategories is always an array
  } = bannerData;

  const availableLanguages = [
    'Hindi',
    'English',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Gujarati',
    'Urdu',
    'Kannada',
    'Odia',
    'Malayalam',
    'Punjabi',
    'Assamese',
    'Maithili',
    'Santali',
    'Kashmiri',
    'Nepali',
    'Sindhi',
    'Dogri',
    'Konkani',
    'Bodo',
    'Manipuri',
  ];

  const handleLanguageSelection = (lang) => {
    if (!languages.includes(lang)) {
      setBannerData({
        ...bannerData,
        languages: [...languages, lang],
      });
    }
  };

  const handleRemoveLanguage = (lang) => {
    setBannerData({
      ...bannerData,
      languages: languages.filter((language) => language !== lang),
    });
  };

  return (
    <form className='create-banner-form' onSubmit={handleSubmit}>
      <h2>Create Banner</h2>
      <div className='form-section'>
        <label>Text:</label>
        <input
          type='text'
          name='text'
          value={bannerData.text}
          onChange={handleInputChange}
          required
          placeholder='Enter banner text'
        />
      </div>

      <div className='form-section'>
        <label>Button Text:</label>
        <input
          type='text'
          name='buttonText'
          value={bannerData.buttonText}
          onChange={handleInputChange}
          required
          placeholder='Enter button text'
        />
      </div>

      <div className='form-section'>
        <label>Background Color:</label>
        <input
          type='color'
          name='backgroundColor'
          value={bannerData.backgroundColor}
          onChange={handleInputChange}
        />
      </div>

      <div className='form-section'>
        <label>Text Color:</label>
        <input
          type='color'
          name='textColor'
          value={bannerData.textColor}
          onChange={handleInputChange}
        />
      </div>

      <div className='form-section'>
        <label>Button Color:</label>
        <input
          type='color'
          name='buttonColor'
          value={bannerData.buttonColor}
          onChange={handleInputChange}
        />
      </div>

      <div className='form-section'>
        <label>Languages:</label>
        <select
          name='languages'
          multiple
          value={languages}
          onChange={(e) => {
            const selectedLanguages = [...e.target.selectedOptions].map(
              (o) => o.value
            );
            setBannerData({
              ...bannerData,
              languages: selectedLanguages,
            });
          }}
          className='languages-select'
        >
          {availableLanguages.map((lang) => (
            <option
              key={lang}
              value={lang}
              onDoubleClick={() => handleLanguageSelection(lang)}
            >
              {lang}
            </option>
          ))}
        </select>

        {/* Display selected languages below */}
        <div className='selected-languages'>
          {languages.length > 0 && (
            <ul>
              {languages.map((lang) => (
                <li key={lang} className='selected-language'>
                  {lang}
                  <span
                    className='remove-icon'
                    onClick={() => handleRemoveLanguage(lang)}
                  >
                    ✖
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='form-section'>
        <label>Privacy Policy Link:</label>
        <input
          type='url'
          name='privacyPolicyLink'
          value={bannerData.privacyPolicyLink}
          onChange={handleInputChange}
          placeholder='Enter URL'
        />
      </div>

      <div className='form-section'>
        <label>Terms Link:</label>
        <input
          type='url'
          name='termsLink'
          value={bannerData.termsLink}
          onChange={handleInputChange}
          placeholder='Enter URL'
        />
      </div>

      <div className='form-section'>
        <label>Consent Expiry (days):</label>
        <input
          type='number'
          name='consentExpiry'
          value={bannerData.consentExpiry}
          onChange={handleInputChange}
        />
      </div>

      <div className='form-section'>
        <label>
          Granularity:
          <input
            type='checkbox'
            name='granularity'
            checked={bannerData.granularity}
            onChange={(e) =>
              setBannerData({ ...bannerData, granularity: e.target.checked })
            }
          />
        </label>
      </div>

      <div className='form-section'>
        <button
          type='button'
          onClick={addConsentCategory}
          className='add-category-btn'
        >
          Add Consent Category
        </button>
        {consentCategories.map((category, index) => (
          <div key={index} className='consent-category'>
            <input
              type='text'
              placeholder='Title'
              value={category.title}
              onChange={(e) =>
                handleConsentCategoryChange(index, 'title', e.target.value)
              }
              required
            />
            <textarea
              placeholder='Description'
              value={category.description}
              onChange={(e) =>
                handleConsentCategoryChange(
                  index,
                  'description',
                  e.target.value
                )
              }
              required
            />
            <label>
              Yes or No:
              <input
                type='checkbox'
                checked={category.yesOrNo}
                onChange={(e) =>
                  handleConsentCategoryChange(
                    index,
                    'yesOrNo',
                    e.target.checked
                  )
                }
              />
            </label>
            <input
              type='text'
              placeholder='Reason'
              value={category.reason}
              onChange={(e) =>
                handleConsentCategoryChange(index, 'reason', e.target.value)
              }
              required
            />
            <button
              type='button'
              onClick={() => removeConsentCategory(index)}
              className='remove-category-btn'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className='form-actions'>
        <button type='submit' className='submit-btn'>
          Submit
        </button>
        <button type='button' onClick={generatePreview} className='preview-btn'>
          Generate Preview
        </button>
      </div>
    </form>
  );
};

export default CreateBanner;
