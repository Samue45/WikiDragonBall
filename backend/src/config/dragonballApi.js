const axios = require('axios');

const DRAGONBALL_API_URL = process.env.DRAGONBALL_API_URL || 'https://dragonball-api.com/api';
const TIMEOUT = process.env.DRAGONBALL_API_TIMEOUT || 5000;

const dragonballApi = axios.create({
  baseURL: DRAGONBALL_API_URL,
  timeout: parseInt(TIMEOUT),
});

module.exports = dragonballApi;
