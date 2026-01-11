import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import CssBaseline from '@mui/material/CssBaseline';

// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import { Accueil } from './components/HomePage/Home';
import { Header } from './components/CommonComponents/Header';
import { Footer } from './components/CommonComponents/Footer';
import { Contact } from './components/ContactPage/Contact';
import { GeneralConditions } from './components/GeneralConditionsPage/GeneralConditions';
import { Produits } from './components/ProductPage/Products';
import { ScrollToTop } from './components/ScrollToTop';
import { Cart } from './components/CartPage/Cart';

//  redux
import { Provider } from 'react-redux';
import cart from './reducers/cart';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({
  cart,
});

// --- REDUX PERSIST SETUP ---
const persistConfig = {
  key: 'root',
  storage
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ScrollToTop />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route index element={<Accueil />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/conditions-generales' element={<GeneralConditions />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/produits/:product' element={<Produits />} />
                <Route path='*' element={<Accueil />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
