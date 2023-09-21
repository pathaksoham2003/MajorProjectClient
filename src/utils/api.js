const host = import.meta.env.VITE_SERVER_URL;
// USER ROUTES 
export const createUser = `${host}api/createUser`;
export const checkUser = `${host}api/checkUser`;
// PRODUCT ROUTES 
export const getAllProducts = `${host}api/product/getall`;
export const getParticularProduct = `${host}api/product/get`;
// LOCAL STOREAGE 
export const TOKEN = localStorage.getItem("TOKEN");
export const USERID = localStorage.getItem("USERID");
export const STOREID = localStorage.getItem("STOREID");
export const USER = JSON.parse(localStorage.getItem("USER"));
export const STORE = JSON.parse(localStorage.getItem("STORE"));