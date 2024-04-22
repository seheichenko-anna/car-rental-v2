import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCarsThunk, fetchGetMoreCarsThunk } from './operations';

export interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string;
  mileage: number;
}

interface CarsState {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  makes: string[];
}

const initialState: CarsState = {
  cars: [],
  isLoading: false,
  error: null,
  currentPage: 0,
  makes: [
    'Buick',
    'Volvo',
    'HUMMER',
    'Subaru',
    'Mitsubishi',
    'Nissan',
    'Lincoln',
    'GMC',
    'Hyundai',
    'MINI',
    'Bentley',
    'Mercedes-Benz',
    'Aston Martin',
    'Pontiac',
    'Lamborghini',
    'Audi',
    'BMW',
    'Chevrolet',
    'Chrysler',
    'Kia',
    'Land',
  ],
};
const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  selectors: {
    selectCars: state => state.cars,
    selectIsLoading: state => state.isLoading,
    selectCurrentPage: state => state.currentPage,
    selectMakes: state => state.makes,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCarsThunk.fulfilled,
        (state, action: PayloadAction<Car[]>) => {
          state.currentPage = 0;
          state.cars = action.payload;
          state.currentPage = state.currentPage + 1;
          state.isLoading = false;
        }
      )
      .addCase(fetchCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchGetMoreCarsThunk.fulfilled,
        (state, action: PayloadAction<Car[]>) => {
          state.cars = [...state.cars, ...action.payload];
          state.currentPage = state.currentPage + 1;
          state.isLoading = false;
        }
      );
  },
});

export const carsReducer = slice.reducer;
export const { selectCars, selectIsLoading, selectCurrentPage, selectMakes } =
  slice.selectors;
