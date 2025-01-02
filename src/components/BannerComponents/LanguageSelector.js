import React from 'react';
import Select from 'react-select';

const LanguageSelector = ({
  availableLanguages,
  selectedLanguages,
  onChange,
}) => {
  const languageOptions = availableLanguages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  const handleChange = (selectedOptions) => {
    const languages = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    onChange(languages);
  };

  return (
    <div className='form-section'>
      <label>Languages:</label>
      <Select
        options={languageOptions}
        isMulti
        value={selectedLanguages.map((lang) => ({
          value: lang,
          label: availableLanguages.find((l) => l.code === lang)?.name,
        }))}
        onChange={handleChange}
        placeholder='Select or add languages'
      />
    </div>
  );
};

export default LanguageSelector;
