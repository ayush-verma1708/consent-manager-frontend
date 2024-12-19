import React from 'react';

const BannerCustomization = ({ bannerConfig, setBannerConfig }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerConfig({
      ...bannerConfig,
      [name]: value,
    });
  };

  const handleConsentCategoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCategories = [...bannerConfig.consentCategories];
    updatedCategories[index][name] = value;
    setBannerConfig({
      ...bannerConfig,
      consentCategories: updatedCategories,
    });
  };

  const addConsentCategory = () => {
    setBannerConfig({
      ...bannerConfig,
      consentCategories: [
        ...bannerConfig.consentCategories,
        { title: '', description: '', consentType: 'accepted' },
      ],
    });
  };

  const removeConsentCategory = (index) => {
    const updatedCategories = bannerConfig.consentCategories.filter(
      (_, i) => i !== index
    );
    setBannerConfig({
      ...bannerConfig,
      consentCategories: updatedCategories,
    });
  };

  return (
    <div className='mb-4'>
      <h3>Customize Your Banner</h3>
      <div className='form-group'>
        <label htmlFor='text'>Banner Text</label>
        <input
          type='text'
          id='text'
          name='text'
          className='form-control'
          value={bannerConfig.text}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='buttonText'>Button Text</label>
        <input
          type='text'
          id='buttonText'
          name='buttonText'
          className='form-control'
          value={bannerConfig.buttonText}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='backgroundColor'>Background Color</label>
        <input
          type='color'
          id='backgroundColor'
          name='backgroundColor'
          className='form-control'
          value={bannerConfig.backgroundColor}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='textColor'>Text Color</label>
        <input
          type='color'
          id='textColor'
          name='textColor'
          className='form-control'
          value={bannerConfig.textColor}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='buttonColor'>Button Color</label>
        <input
          type='color'
          id='buttonColor'
          name='buttonColor'
          className='form-control'
          value={bannerConfig.buttonColor}
          onChange={handleChange}
        />
      </div>

      {/* Consent Categories */}
      <div className='form-group'>
        <h5>Consent Categories</h5>
        {bannerConfig.consentCategories.map((category, index) => (
          <div key={index} className='d-flex'>
            <input
              type='text'
              className='form-control mr-2'
              name='title'
              value={category.title}
              onChange={(e) => handleConsentCategoryChange(index, e)}
              placeholder='Category Title'
            />
            <input
              type='text'
              className='form-control mr-2'
              name='description'
              value={category.description}
              onChange={(e) => handleConsentCategoryChange(index, e)}
              placeholder='Category Description'
            />
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => removeConsentCategory(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          className='btn btn-success'
          onClick={addConsentCategory}
        >
          Add Category
        </button>
      </div>

      {/* Other Fields */}
      <div className='form-group'>
        <label htmlFor='privacyPolicyLink'>Privacy Policy Link</label>
        <input
          type='url'
          id='privacyPolicyLink'
          name='privacyPolicyLink'
          className='form-control'
          value={bannerConfig.privacyPolicyLink}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='termsLink'>Terms of Service Link</label>
        <input
          type='url'
          id='termsLink'
          name='termsLink'
          className='form-control'
          value={bannerConfig.termsLink}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='consentExpiry'>Consent Expiry (in days)</label>
        <input
          type='number'
          id='consentExpiry'
          name='consentExpiry'
          className='form-control'
          value={bannerConfig.consentExpiry}
          onChange={handleChange}
        />
      </div>

      <div className='form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='granularity'
          name='granularity'
          checked={bannerConfig.granularity}
          onChange={(e) =>
            setBannerConfig({
              ...bannerConfig,
              granularity: e.target.checked,
            })
          }
        />
        <label className='form-check-label' htmlFor='granularity'>
          Enable Granularity (Multiple consent options)
        </label>
      </div>
    </div>
  );
};

export default BannerCustomization;
