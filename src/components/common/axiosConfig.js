import axios from 'axios';

// Obtener la URL base desde las variables de entorno
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiToken = process.env.REACT_APP_API_TOKEN; 

// Crear una instancia de Axios
const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'X-4B7F7C13A7D1': `${apiToken}`,
  },
});

export default instance;