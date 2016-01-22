import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';

function loadStore(config) {
  
}

export default function App({ config }) {
  const store = loadStore(config);
  return Provider({ store }, Router({ config }));
}