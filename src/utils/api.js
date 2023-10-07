const host = import.meta.env.VITE_SERVER_URL;
// USER ROUTES 
export const createUser = `${host}api/user/create`;
export const checkUser = `${host}api/user/checkUser`;
export const getSpecific = `${host}api/user/specific/`;
// PRODUCT ROUTES 
export const getAllProducts = `${host}api/product/all`;
export const getSpecificProduct = `${host}api/product/specific`;
// LOCAL STOREAGE 
export const google_id = localStorage.getItem("google_id");
export const TOKEN = localStorage.getItem("TOKEN");
export const USERID = localStorage.getItem("USERID");
export const STOREID = localStorage.getItem("STOREID");
export const USER = JSON.parse(localStorage.getItem("USER"));
export const STORE = JSON.parse(localStorage.getItem("STORE"));