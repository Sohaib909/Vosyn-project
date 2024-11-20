const BASE_URL = process.env.REACT_APP_PROD_URL;

export const SIGNUP_URL = `${BASE_URL}/user/register/`;
export const RESET_PASSWORD_REQUEST = `${BASE_URL}/user/reset-password-request/`;
export const RESEND_VERIFICATION_URL = `${BASE_URL}/user/resend-verification-email/`;
export const LOGIN_URL = `${BASE_URL}/user/login/`;
export const SETTINGS_URL = `${BASE_URL}/settings/`;
export const UPDATE_SETTINGS_URL = `${BASE_URL}/settings/updateSettings/`;
export const VIDEO_DETAIL_URL = `${BASE_URL}/video/videos/`;
export const VIDEO_LIST_URL = `${BASE_URL}/video/videos/search`;

export const COMMENTS_URL = `${BASE_URL}/interactions/comments/`;
export const TRANSLATE_URL = `${BASE_URL}/translate`;

export const ADD_CONTENT_TO_PLAYLIST_URL = `${BASE_URL}/interactions/playlistcontent/`;
export const PLAYLIST_URL = `${BASE_URL}/interactions/playlist/`;
export const GET_PLAYLISTS_OF_CONTENT = `${BASE_URL}/interactions/playlistcontent/check-content-playlist/`;
export const GET_CONTENT_IN_PLAYLIST = `${BASE_URL}/interactions/playlistcontent/get-all-content/`;

export const VOSYN_ASSIST_CHAT = `${BASE_URL}/vosynassist/chat/`;

export const LANGUAGES_URL = `https://pkgstore.datahub.io/core/language-codes/language-codes-full_json/data/573588525f24edb215c07bec3c309153/language-codes-full_json.json`;
