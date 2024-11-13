import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const client = (() => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  });
  // Add a request interceptor to add the token
  instance.interceptors.request.use(
    (config) => {
      // Retrieve token from local storage or any other secure storage
      const token = localStorage.getItem("token");
      
      if (token) {
        // Attach token to the Authorization header
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      // Handle error
      return Promise.reject(error);
    }
  );

  return instance;
})();


export const request = async(options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return response?.data;
  };

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response
    });
  };

  return client(options).then(onSuccess).catch(onError);
};