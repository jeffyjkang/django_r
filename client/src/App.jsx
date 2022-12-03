import './App.css';
import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import api from './api/service_api';
import List from './pages/List';
import Details from './pages/Details';
import { Checkout } from './pages/Checkout';

export const AppContext = React.createContext({
  item: null,
  booking: null,
  wishlist: [],
  toggleWishlist: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  setOrderItem: () => {},
  updateField: () => {},
  placeOrder: () => {},
})

function App() {

  const toggleWishlist = async (itemId) => {
    if (appState.wishlist.includes(itemId)) {
       await api.wishlistDelete(itemId);
    } else {
      await api.wishlistAdd(itemId);
    }
    const res = await api.retrieveWishlist
    setAppState({...appState, wishlist: res.data})
  }

  const updateField = (field, value) => {
    const { booking } = appState;
    booking[field] = value;
    setAppState({...appState, booking})
  }

  const setOrderItem = async (item) => {
    await api.wishlistCartStatus(item.id, true)
    setAppState({...appState, item})
  }

  const clearOrderItem = async (itemId) => {
    await api.wishlistCartStatus(itemId, false)
    setAppState({...appState, item: null})
  }

  const placeOrder =  async () => {
    const { booking, item } = appState;
    const bookingData = {...booking};
    bookingData.package = item.id;
    await api.createBooking(bookingData);
    setAppState({...appState, item: null});
  }

  const [appState, setAppState] = useState({
    wishlist: [],
    booking: {
      name: '',
      email_address: '',
      street_address: '',
      city: '',
    },
    item: null,
    toggleWishlist,
    updateField,
    setOrderItem,
    clearOrderItem,
    placeOrder,
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout appState={appState}/>}>
        <Route path='/' element={<List />}/>
        <Route path='/details/:id' element={<Details />}/>
        <Route path='/checkout' element={<Checkout />}/>
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
