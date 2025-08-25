export const isProduction = process.env.NODE_ENV === 'production';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
export const PROXY_TARGET = process.env.REACT_APP_API_PROXY || 'http://localhost:5000';
export const USE_MOCKS = (process.env.REACT_APP_USE_MOCKS || 'true') === 'true'; 