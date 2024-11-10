const BASE_URL = process.env.REACT_APP_PROD_URL;

export const SIGNUP_URL = `${BASE_URL}/user/register/`;
export const RESET_PASSWORD_REQUEST = `${BASE_URL}/user/reset-password-request/`;
export const RESEND_VERIFICATION_URL = `${BASE_URL}/user/resend-verification-email/`;
export const LOGIN_URL = `${BASE_URL}/user/login/`;
export const SETTINGS_URL = `${BASE_URL}/settings/`;
export const UPDATE_SETTINGS_URL = `${BASE_URL}/settings/updateSettings/`;
export const SETTINGS_FETCH_URL = `${BASE_URL}/settings/`;
export const SETTINGS_UPDATE_URL = `${BASE_URL}/settings/updateSettings/`;
export const VIDEO_LIST_URL = `${BASE_URL}/video/videos/search`;
