// services/bannerApi.js
import axios from 'axios';

// Set up the base URL (you can use environment variables for different environments)
const BASE_URL = 'http://localhost:5000/api/banners';

// Save a banner
export const saveBanner = async (bannerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, bannerData);
    return response.data; // Success: return the banner ID
  } catch (error) {
    console.error('Error saving banner:', error);
    throw error;
  }
};

// Get a banner by ID
export const getBanner = async (bannerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/banner/${bannerId}`);
    return response.data; // Success: return banner data
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error;
  }
};

// Get all banners
export const getAllBanners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    if (response.data.success) {
      return response.data.banner; // Note the key is 'banner', not 'banners'
    }
    throw new Error('Failed to fetch banners');
  } catch (error) {
    console.error(
      'Error fetching all banners:',
      error.response || error.message
    );
    throw error;
  }
};
