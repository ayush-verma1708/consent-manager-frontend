import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend API base URL

// Fetch all banners
export const fetchBanners = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/banners`);
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

// Fetch a single banner by ID
export const fetchBannerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching banner with ID ${id}:`, error);
    throw error;
  }
};

// Create a new banner
export const createBanner = async (bannerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/banners`, bannerData);
    return response.data;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

// Update a banner by ID
export const updateBanner = async (id, bannerData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/banners/${id}`,
      bannerData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating banner with ID ${id}:`, error);
    throw error;
  }
};

// Delete a banner by ID
export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting banner with ID ${id}:`, error);
    throw error;
  }
};

// // services/bannerApi.js
// import axios from 'axios';

// // Set up the base URL (you can use environment variables for different environments)
// const BASE_URL = 'http://localhost:5000/api/banners';

// // Save a banner
// export const saveBanner = async (bannerData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/save`, bannerData);
//     return response.data; // Success: return the banner ID
//   } catch (error) {
//     console.error('Error saving banner:', error);
//     throw error;
//   }
// };

// // Get a banner by ID
// export const getBanner = async (bannerId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/banner/${bannerId}`);
//     return response.data; // Success: return banner data
//   } catch (error) {
//     console.error('Error fetching banner:', error);
//     throw error;
//   }
// };

// // Get all banners
// export const getAllBanners = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/all`);
//     if (response.data.success) {
//       return response.data.banner; // Note the key is 'banner', not 'banners'
//     }
//     throw new Error('Failed to fetch banners');
//   } catch (error) {
//     console.error(
//       'Error fetching all banners:',
//       error.response || error.message
//     );
//     throw error;
//   }
// };
