import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Car } from './carsSlice';

axios.defaults.baseURL = 'https://6605c371d92166b2e3c2bdf3.mockapi.io';

interface FetchCarsThunkArg {
  page: number;
  make: string | null;
}

const createFetchThunk = (type: string) =>
  createAsyncThunk<Car[], FetchCarsThunkArg, { rejectValue: string }>(
    type,
    async ({ page, make }: FetchCarsThunkArg, thunkAPI) => {
      try {
        const params = make ? { page, limit: 12, make } : { page, limit: 12 };

        const { data } = await axios.get('/catalog', {
          params,
        });

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return thunkAPI.rejectWithValue(error.message);
        }
        throw error;
      }
    }
  );

export const fetchCarsThunk = createFetchThunk('cars/fetch');
export const fetchGetMoreCarsThunk = createFetchThunk('cars/pagination');
