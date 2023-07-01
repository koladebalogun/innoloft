import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navigation from './components/Navigation';
import MainPage from './pages/MainPage';
import ProductView from './pages/ProductView';
import ProductEdit from './pages/ProductEdit';
import { fetchAppConfiguration } from './store/configurationSlice';
import { useDispatch } from 'react-redux';


const App: React.FC = () => {
  const dispatch = useDispatch<any>();

  const APP_ID = import.meta.env.VITE_REACT_APP_APP_ID ? parseInt(import.meta.env.VITE_REACT_APP_APP_ID as string) : 1;


  useEffect(() => {
    dispatch(fetchAppConfiguration(APP_ID));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow p-4  md:p-8">
          <Routes>
            <Route path="/"  element={<MainPage />} />
            <Route path="/product"  element={<ProductView/>} />
            <Route path="/product/edit" element={<ProductEdit/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
