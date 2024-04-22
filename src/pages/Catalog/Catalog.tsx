import { useEffect } from 'react';
import CarsCatalog from '../../components/CarsCatalog/CarsCatalog';
import { fetchCarsThunk } from '../../redux/cars/operations';
import { useAppDispatch } from '../../hooks/useAppDipatch';

const Catalog = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCarsThunk({ page: 1, make: null }));
  }, [dispatch]);

  return <CarsCatalog type="catalog" />;
};

export default Catalog;
