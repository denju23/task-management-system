import sendTokenResponse from '../utils/sendTokenResponse.js';
import * as authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  sendTokenResponse(user, 201, res);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  sendTokenResponse(user, 200, res);
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);
  res.status(200).json({ success: true, user });
});


export const logout = (req, res) => {
  // If using cookies: res.clearCookie('token');
  // Stateless JWT: client simply drops token
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};