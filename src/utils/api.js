const host = import.meta.env.VITE_SERVER_URL;
// USER ROUTES 
export const createUser = `${host}/api/user/create`;
export const checkuser = `${host}/api/user/check`;
export const getSpecific = `${host}/api/user/specific/`;
// PRODUCT ROUTES 
export const getAllProducts = `${host}/api/product/all`;
export const getSpecificProduct = `${host}/api/product/specific`;
export const getAllProductsByCategory = `${host}/api/product/category`;
// LOCAL STOREAGE 
export const google_id = localStorage.getItem("google_id");
export const TOKEN = localStorage.getItem("TOKEN");
export const USERID = localStorage.getItem("user_id");
export const STOREID = localStorage.getItem("STOREID");
export const USER = JSON.parse(localStorage.getItem("USER"));
export const STORE = JSON.parse(localStorage.getItem("STORE"));
export const SELECTEDTHEME = localStorage.getItem("selectedTheme");