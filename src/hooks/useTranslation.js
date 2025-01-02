import { useState } from 'react';

const useTranslation = (apiKey, endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const translateText = async (text, languages) => {
    setIsLoading(true);
    setError(null);

    try {
      const translations = await Promise.all(
        languages.map(async (language) => {
          const response = await fetch(`${endpoint}&to=${language}`, {
            method: 'POST',
            headers: {
              'Ocp-Apim-Subscription-Key': apiKey,
              'Ocp-Apim-Subscription-Region': 'centralindia',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ Text: text }]),
          });
          const data = await response.json();
          return {
            language,
            value: data[0]?.translations[0]?.text || '',
          };
        })
      );
      return translations;
    } catch (err) {
      setError(err.message);
      console.error('Translation error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { translateText, isLoading, error };
};

export default useTranslation;
