import { h, render, Component } from 'preact';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';

import {
  requestRoom,
  requestRoomEvents
} from './src/actions';
import bingoReducer from './src/reducers';

import { App } from './src/app';


const store = createStore(bingoReducer, applyMiddleware(thunk));

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#play-container");
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  );
});

