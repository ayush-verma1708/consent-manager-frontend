import React from 'react';
import './CreateBanner.css';
import LanguageSelector from './LanguageSelector';

const CreateBanner = ({
  bannerData = {},
  setBannerData,
  handleInputChange,
  handleConsentCategoryChange,
  addConsentCategory,
  removeConsentCategory,
  handleSubmit,
  generatePreview,
}) => {
  const { consentCategories = [], languages = [] } = bannerData;

  const availableLanguages = [
    { name: 'Hindi', code: 'hi' },
    { name: 'English', code: 'en' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Telugu', code: 'te' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Gujarati', code: 'gu' },
    { name: 'Urdu', code: 'ur' },
    { name: 'Kannada', code: 'kn' },
    { name: 'Odia', code: 'or' },
    { name: 'Malayalam', code: 'ml' },
    { name: 'Punjabi', code: 'pa' },
    { name: 'Assamese', code: 'as' },
    { name: 'Maithili', code: 'mai' },
    { name: 'Santali', code: 'sat' },
    { name: 'Kashmiri', code: 'ks' },
    { name: 'Nepali', code: 'ne' },
    { name: 'Sindhi', code: 'sd' },
    { name: 'Dogri', code: 'doi' },
    { name: 'Konkani', code: 'kok' },
    { name: 'Bodo', code: 'brx' },
    { name: 'Manipuri', code: 'mni' },
  ];

  const updateLanguages = (selectedLanguages) => {
    setBannerData((prevData) => ({
      ...prevData,
      languages: selectedLanguages,
    }));
  };

  const formFields = [
    {
      label: 'Text',
      name: 'text',
      type: 'text',
      placeholder: 'Enter banner text',
      required: true,
    },
    {
      label: 'Button Text',
      name: 'buttonText',
      type: 'text',
      placeholder: 'Enter button text',
      required: true,
    },
    {
      label: 'Background Color',
      name: 'backgroundColor',
      type: 'color',
    },
    {
      label: 'Text Color',
      name: 'textColor',
      type: 'color',
    },
    {
      label: 'Button Color',
      name: 'buttonColor',
      type: 'color',
    },
    {
      label: 'Privacy Policy Link',
      name: 'privacyPolicyLink',
      type: 'url',
      placeholder: 'Enter URL',
    },
    {
      label: 'Terms Link',
      name: 'termsLink',
      type: 'url',
      placeholder: 'Enter URL',
    },
    {
      label: 'Consent Expiry (days)',
      name: 'consentExpiry',
      type: 'number',
    },
  ];

  return (
    <form className='create-banner-form'>
      <h2>Create Banner</h2>

      {formFields.map((field, index) => (
        <div className='form-section' key={index}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            name={field.name}
            value={bannerData[field.name] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}

      <div className='form-section'>
        <LanguageSelector
          availableLanguages={availableLanguages}
          selectedLanguages={languages}
          onChange={updateLanguages}
        />
        {/* <div>
          <h3>Selected Languages:</h3>
          <ul>
            {languages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </div> */}
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
              value={category.title || ''}
              onChange={(e) =>
                handleConsentCategoryChange(index, 'title', e.target.value)
              }
              required
            />
            <textarea
              placeholder='Description'
              value={category.description || ''}
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
                checked={category.yesOrNo || false}
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
              value={category.reason || ''}
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
        <button type='submit' onClick={handleSubmit} className='submit-btn'>
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

// import React from 'react';
// import './CreateBanner.css'; // External CSS for styling
// import LanguageSelector from './LanguageSelector'; // Import the LanguageSelector component

// const CreateBanner = ({
//   bannerData = {}, // Fallback to an empty object
//   setBannerData,
//   handleInputChange,
//   handleConsentCategoryChange,
//   addConsentCategory,
//   removeConsentCategory,
//   handleSubmit,
//   generatePreview,
// }) => {
//   const {
//     consentCategories = [], // Ensure consentCategories is always an array
//   } = bannerData;
//   const [languages, setLanguages] = React.useState([]);

//   const availableLanguages = [
//     { name: 'Hindi', code: 'hi' },
//     { name: 'English', code: 'en' },
//     { name: 'Bengali', code: 'bn' },
//     { name: 'Telugu', code: 'te' },
//     { name: 'Marathi', code: 'mr' },
//     { name: 'Tamil', code: 'ta' },
//     { name: 'Gujarati', code: 'gu' },
//     { name: 'Urdu', code: 'ur' },
//     { name: 'Kannada', code: 'kn' },
//     { name: 'Odia', code: 'or' },
//     { name: 'Malayalam', code: 'ml' },
//     { name: 'Punjabi', code: 'pa' },
//     { name: 'Assamese', code: 'as' },
//     { name: 'Maithili', code: 'mai' },
//     { name: 'Santali', code: 'sat' },
//     { name: 'Kashmiri', code: 'ks' },
//     { name: 'Nepali', code: 'ne' },
//     { name: 'Sindhi', code: 'sd' },
//     { name: 'Dogri', code: 'doi' },
//     { name: 'Konkani', code: 'kok' },
//     { name: 'Bodo', code: 'brx' },
//     { name: 'Manipuri', code: 'mni' },
//   ];

//   const formFields = [
//     {
//       label: 'Text',
//       name: 'text',
//       type: 'text',
//       placeholder: 'Enter banner text',
//       required: true,
//     },
//     {
//       label: 'Button Text',
//       name: 'buttonText',
//       type: 'text',
//       placeholder: 'Enter button text',
//       required: true,
//     },
//     {
//       label: 'Background Color',
//       name: 'backgroundColor',
//       type: 'color',
//     },
//     {
//       label: 'Text Color',
//       name: 'textColor',
//       type: 'color',
//     },
//     {
//       label: 'Button Color',
//       name: 'buttonColor',
//       type: 'color',
//     },
//     {
//       label: 'Privacy Policy Link',
//       name: 'privacyPolicyLink',
//       type: 'url',
//       placeholder: 'Enter URL',
//     },
//     {
//       label: 'Terms Link',
//       name: 'termsLink',
//       type: 'url',
//       placeholder: 'Enter URL',
//     },
//     {
//       label: 'Consent Expiry (days)',
//       name: 'consentExpiry',
//       type: 'number',
//     },
//   ];

//   return (
//     <form className='create-banner-form'>
//       <h2>Create Banner</h2>

//       {/* Dynamic Form Fields */}
//       {formFields.map((field, index) => (
//         <div className='form-section' key={index}>
//           <label>{field.label}:</label>
//           <input
//             type={field.type}
//             name={field.name}
//             value={bannerData[field.name]}
//             onChange={handleInputChange}
//             placeholder={field.placeholder}
//             required={field.required}
//           />
//         </div>
//       ))}

//       {/* Languages Section */}
//       <div className='form-section'>
//         <h1>Language Selector</h1>
//         <LanguageSelector
//           availableLanguages={availableLanguages}
//           selectedLanguages={languages}
//           onChange={setLanguages}
//         />
//         <div>
//           <h3>Selected Languages:</h3>
//           <ul>
//             {languages.map((lang) => (
//               <li key={lang}>{lang}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Consent Categories */}
//       <div className='form-section'>
//         <button
//           type='button'
//           onClick={addConsentCategory}
//           className='add-category-btn'
//         >
//           Add Consent Category
//         </button>
//         {consentCategories.map((category, index) => (
//           <div key={index} className='consent-category'>
//             <input
//               type='text'
//               placeholder='Title'
//               value={category.title}
//               onChange={(e) =>
//                 handleConsentCategoryChange(index, 'title', e.target.value)
//               }
//               required
//             />
//             <textarea
//               placeholder='Description'
//               value={category.description}
//               onChange={(e) =>
//                 handleConsentCategoryChange(
//                   index,
//                   'description',
//                   e.target.value
//                 )
//               }
//               required
//             />
//             <label>
//               Yes or No:
//               <input
//                 type='checkbox'
//                 checked={category.yesOrNo}
//                 onChange={(e) =>
//                   handleConsentCategoryChange(
//                     index,
//                     'yesOrNo',
//                     e.target.checked
//                   )
//                 }
//               />
//             </label>
//             <input
//               type='text'
//               placeholder='Reason'
//               value={category.reason}
//               onChange={(e) =>
//                 handleConsentCategoryChange(index, 'reason', e.target.value)
//               }
//               required
//             />
//             <button
//               type='button'
//               onClick={() => removeConsentCategory(index)}
//               className='remove-category-btn'
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Form Actions */}
//       <div className='form-actions'>
//         <button type='submit' onClick={handleSubmit} className='submit-btn'>
//           Submit
//         </button>
//         <button type='button' onClick={generatePreview} className='preview-btn'>
//           Generate Preview
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CreateBanner;
