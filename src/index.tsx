import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client'
import client from './client'
import { AppProvider } from './contexts/AppContext'

// https://stackoverflow.com/questions/61540007/react-usestate-usecontext-typeerror-setstate-is-not-a-function-what-a
ReactDOM.render(
  <AppProvider>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </AppProvider>,
  document.getElementById('root')
);
