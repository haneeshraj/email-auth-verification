import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './store.js';
import HomeScreen from './HomeScreen.jsx';
import LoginScreen from './LoginScreen.jsx';
import RegisterScreen from './RegisterScreen.jsx';
import VerifyScreen from './VerifyScreen.jsx';
import PostsScreen from './PostsScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/verify" element={<VerifyScreen />} />
      <Route path="/posts" element={<PostsScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
