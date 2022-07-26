import axios from 'axios';

const getSearchResults = async (
  searchQuery,
  coords = '0,0',
  long = '0',
  lat = '0'
) => {
  try {
    if (searchQuery !== '') {
      // Create params object
      const params = new URLSearchParams({
        fuzzyMatch: true,
        language: 'en',
        limit: 10,
        proximity: coords ? `${long},${lat}` : '0,0',
      });

      const response = await axios.get(`api/search/${searchQuery}?${params}`);

      return response?.data?.features;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getSearchResults;
