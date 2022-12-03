import Axios from 'axios';

const client_id = '';
const client_secret = '';

let _accessToken;

export const getAccessToken = async () => {
  if (_accessToken) {
    return _accessToken
  }
  const data = {
    grant_type: 'client_credentials',
    client_id,
    client_secret,
    scope: 'read',
  }
  const res = await Axios.post('/oauth/token/', data)
  return res.data.access_token;
}

export const getConfig = async () => {
  const accessToken = await getAccessToken();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return config;
}

const retrieveWishlist = async () => {
  const config = await getConfig();
  const res = await Axios.get('/api/v1/wishlist/', config)
  return res.data
}

const wishlistAdd = async (id) => {
  const config = await getConfig();
  const data = { id }
  return Axios.post('/api/v1/wishlist/', data, config)
}

const wishlistDelete = async (itemId) => {
  const config = await getConfig();
  return Axios.delete(`/api/v1/wishlist/${itemId}/`, config)
}

const wishlistCartStatus = async (id, added_to_cart) => {
  const config = await getConfig();
  const data = { id, added_to_cart };
  return Axios.patch(`/api/v1/wishlist/${id}/`, data, config)
}

const retrieveList = async (pageIndex, queryParams) => {
  const config = await getConfig();
  config['params'] = queryParams;
  config['params']['page'] = pageIndex;
  const res = await Axios.get('/api/v1/public/packages/', config);
  return res.data
}

const retrieveDetails = async (id) => {
  const config = await getConfig();
  const res = await Axios.get(`/api/v1/public/packages/${id}/`, config);
  return res.data
}

const createBooking = async (data) => {
  const config = await getConfig();
  const res = await Axios.post('/api/v1/bookings/', data, config);
  return res.data
}

const defaultExport = {
  retrieveWishlist,
  wishlistAdd,
  wishlistDelete,
  wishlistCartStatus,
  retrieveList,
  retrieveDetails,
  createBooking,
}

export default defaultExport;
