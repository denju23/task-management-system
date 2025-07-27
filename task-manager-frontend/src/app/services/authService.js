import axiosInstance from './axiosInstance';

// Login
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};


// Register
export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};


// export const googleLoginUser = async (token) => {
//   const res = await axiosInstance.post(`auth/google-login`, {
//     token, // pass token as key
//   });
//   return res.data;
// };


export const googleLoginUser = async (token) => {
  const res = await fetch('http://localhost:5000/api/v1/auth/google-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token }),
  });

  const data = await res.json();
  return data
};