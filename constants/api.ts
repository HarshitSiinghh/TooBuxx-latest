// // export const BASE_URL = "192.168.1.6:3001/api/v1";
// export const BASE_URL = "https://trade.toobux.com/api/v1";
// 
// 
// export const BASE_URL = "http://192.168.1.13:3001/api/v1";
export const BASE_URL = "http://10.0.2.2:3001/api/v1";


// export const BASE_URL = "http://10.0.2.2:3001/api/v1";







//claud//

// Keep your original BASE_URL as is (no changes needed in other files)
// export const BASE_URL = "https://trade.toobux.com/api/v1";
export const BASE_URL_PROFILE_PIC = "http://10.0.2.2:3001/api";
// export const BASE_URL_PROFILE_PIC = "https://trade.toobux.com/api";
// Add this new constant for images/media files ONLY
// This removes the /api/v1 part for static file access
export const IMAGE_BASE_URL = BASE_URL.replace('/api/v1', '');

// For production:
// export const BASE_URL = "https://trade.toobux.com/api/v1";
// export const IMAGE_BASE_URL = BASE_URL.replace('/api/v1', '');

// Result:
// BASE_URL = "http://10.0.2.2:3001/api/v1" (for API calls - no change)
// IMAGE_BASE_URL = "http://10.0.2.2:3001" (for images only)