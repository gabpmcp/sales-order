import axios from 'axios'

export const externalServiceClient = axios.create({
  baseURL: process.env.EXTERNAL_SERVICE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.EXTERNAL_SERVICE_API_KEY}`,
  },
})

export const getExternalData = async (endpoint: string) => {
  try {
    const response = await externalServiceClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from external service:', error);
    throw new Error('Failed to fetch data from external service');
  }
}
