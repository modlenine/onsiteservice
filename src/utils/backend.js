/** Backend API base — dev ใช้ relative path ให้ vue proxy ไป MAMP (เหมือน VMI/NCP) */
const API_BASE = (process.env.VUE_APP_API_BASE_URL || '/intsys/onsiteservice/onsite_backend/api').replace(/\/$/, '');

export function apiUrl(path = '') {
  if (!path) {
    return API_BASE;
  }
  return `${API_BASE}/${String(path).replace(/^\//, '')}`;
}

export default API_BASE;
