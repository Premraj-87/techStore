import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const getToken = () => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) return storedToken;

  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo)?.token : null;
};

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Orders API
export const ordersAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getMyOrders: (page = 1, limit = 109) =>
    api.get(`/orders?page=${page}&limit=${limit}`),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderToPaid: (id, paymentData) =>
    api.put(`/orders/${id}/pay`, paymentData),
  getOrderSummary: () => api.get('/orders/analytics/summary'),
};

// Reviews API
export const reviewsAPI = {
  createReview: (productId, reviewData) =>
    api.post(`/reviews/${productId}`, reviewData),
  getReviews: (productId) => api.get(`/reviews/${productId}`),
  updateReview: (productId, reviewId, reviewData) =>
    api.put(`/reviews/${productId}/${reviewId}`, reviewData),
  deleteReview: (productId, reviewId) =>
    api.delete(`/reviews/${productId}/${reviewId}`),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post(`/wishlist/${productId}`),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
  checkWishlist: (productId) => api.get(`/wishlist/check/${productId}`),
};

// Search API
export const searchAPI = {
  search: (params) =>
    api.get('/search/search', { params }),
  getByCategory: (category, page = 1, limit = 129) =>
    api.get(`/search/category/${category}?page=${page}&limit=${limit}`),
  getFilters: () => api.get('/search/filters'),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAnalytics: (startDate, endDate) =>
    api.get('/admin/analytics', { params: { startDate, endDate } }),
  getUsers: (page = 1, limit = 109) =>
    api.get(`/admin/users?page=${page}&limit=${limit}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getProducts: (page = 1, limit = 109) =>
    api.get(`/admin/products?page=${page}&limit=${limit}`),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getOrders: (page = 1, limit = 100, status) =>
    api.get(`/admin/orders?page=${page}&limit=${limit}&status=${status}`),
  updateOrderStatus: (id, statusData) =>
    api.put(`/admin/orders/${id}`, statusData),
};

// Invoice API
export const invoiceAPI = {
  generateInvoice: (orderId) =>
    api.get(`/invoices/${orderId}`, { responseType: 'blob' }),
  getInvoices: () => api.get('/invoices'),
};

export default api;
