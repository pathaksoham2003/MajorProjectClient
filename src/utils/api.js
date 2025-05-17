const host = import.meta.env.VITE_SERVER_URL;

const API_ROUTE = `${host}/api/`;
// USER ROUTES
export const createUser = `${host}/api/user/create`;
export const checkuser = `${host}/api/user/check`;
export const getSpecific = `${host}/api/user/specific`;
// PRODUCT ROUTES
export const getAllProducts = `${host}/api/product/all`;
export const getSpecificProduct = `${host}/api/product/specific`;
export const getAllProductsByCategory = `${host}/api/product/category`;
// CHECKOUT STRIPE
export const checkoutProduct = `${host}/api/product/checkout`;
// LOCAL STOREAGE
export const google_id = localStorage.getItem("google_id");
export const TOKEN = localStorage.getItem("TOKEN");
export const USERID = localStorage.getItem("user_id");
export const STOREID = localStorage.getItem("STOREID");
export const USER = JSON.parse(localStorage.getItem("USER"));
export const STORE = JSON.parse(localStorage.getItem("STORE"));
export const SELECTEDTHEME = localStorage.getItem("selectedTheme");

// OWNER FLOW
export const ownerBase = `${API_ROUTE}owner/`;
export const owner = {
  register: `${ownerBase}register/`,
  verifyEmail: `${ownerBase}verify-email/`,
  login: `${ownerBase}login/`,
  details: `${ownerBase}owner/`,
  googleAuth: `${ownerBase}google-login/`,
};

export const userBase = `${API_ROUTE}user/`;
export const user = {
  register: `${userBase}register/`,
  verifyEmail: `${userBase}verify-email/`,
  login: `${userBase}login/`,
  details: `${userBase}user/`,
  googleAuth: `${ownerBase}google-login/`,
};


// SHOP ROUTES
export const shopBase = `${API_ROUTE}shop/`;
export const shop = {
  createShop: `${shopBase}`,
  getShopDetails: `${shopBase}`,  // Endpoint to get the shop details
  updateShopDetails: `${shopBase}update/`,  // Endpoint to update the shop details
  getProducts: `${shopBase}products/`,
  filterProducts: `${shopBase}filters/`,
  filterOptions: `${shopBase}filters/options`,
};

export const productBase = `${API_ROUTE}pro/`; // Assuming API_ROUTE is defined
export const product = {
  createProduct: `${productBase}`,               // POST /pro/
  getProductDetails: `${productBase}`,           // GET /pro/:id
  updateProductDetails: `${productBase}`, // PUT /pro/update/:id
};

// INVENTORY ROUTES
export const inventoryBase = `${API_ROUTE}inventory/`;
export const inventory = {
  getAllInventory: `${inventoryBase}`,                    // GET /inventory/
  getInventoryById: (id) => `${inventoryBase}${id}`,      // GET /inventory/:id
  createInventory: `${inventoryBase}`,                    // POST /inventory/
  updateInventory: (id) => `${inventoryBase}${id}`,       // PUT /inventory/:id
  deleteInventory: (id) => `${inventoryBase}${id}`,       // DELETE /inventory/:id
  getInventoryByPinCode: (pinCode) => `${inventoryBase}pin-code/${pinCode}`, // GET /inventory/pin-code/:pin_code
};

// FAVORITE ROUTES
export const favoriteBase = `${API_ROUTE}favorite/`;
export const favorite = {
  getAllFavorites: `${favoriteBase}`,                     // GET /favorite/
  addToFavorites: `${favoriteBase}`,                      // POST /favorite/
  removeFromFavorites: (productId) => `${favoriteBase}${productId}`, // DELETE /favorite/:productId
  checkFavorite: (productId) => `${favoriteBase}check/${productId}`, // GET /favorite/check/:productId
};

// CART ROUTES
export const cartBase = `${API_ROUTE}cart/`;
export const cart = {
  getCart: `${cartBase}`,
  addToCart: `${cartBase}`,
  updateCartItem: (cartItemId) => `${cartBase}${cartItemId}`,
  removeFromCart: (cartItemId) => `${cartBase}${cartItemId}`,
  clearCart: `${cartBase}`
};

export const addressBase = `${API_ROUTE}address/`;
export const couponBase = `${API_ROUTE}coupon/`;
export const coupon = {
  getCouponsByProductId: (shopId) => `${couponBase}product/${shopId}`,
  updateCoupon: (couponId) => `${couponBase}${couponId}`,
  deleteCoupon: (couponId) => `${couponBase}${couponId}`,
  createCoupon: `${couponBase}`
};
