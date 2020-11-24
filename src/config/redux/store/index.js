import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';

// store, tempat untuk menampung state global supaya bisa digunakan di semua component
export const store = createStore(reducer, applyMiddleware(thunk));