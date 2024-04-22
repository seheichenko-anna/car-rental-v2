import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './cars/carsSlice';
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
import storage from 'redux-persist/lib/storage';
import { favoritesReducer } from './favorites/favoritesSlice';

const persistConfig = {
  key: 'fav',
  version: 1,
  storage,
  whitelist: ['favorites'],
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
