import axios from 'axios';

const BASE_URL = 'https://api.eathalal.com';

export const checkHalalStatus = async (barcode) => {
    try {
        const response = await axios.get(`${BASE_URL}/check/${barcode}`);
        return response.data;
    } catch (error) {
        console.error('Error checking halal status:', error);
        throw error;
    }
};
