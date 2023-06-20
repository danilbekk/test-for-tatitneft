import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../storage/redux/store';
import { BrowserRouter } from 'react-router-dom';
import './GlobalStyles.css';

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </ReduxProvider>
    </React.StrictMode>
  );
};
