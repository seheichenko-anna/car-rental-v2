import { useState } from 'react';
import { selectCars, selectCurrentPage } from '../../redux/cars/carsSlice';
import { fetchGetMoreCarsThunk } from '../../redux/cars/operations';
import { selectFavorites } from '../../redux/favorites/favoritesSlice';
import CarsCatalogItem from './CarsCatalogItem/CarsCatalogItem';
import s from './CarsCatalog.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDipatch';
import Form from '../Form/Form';

interface CarsCatalogProps {
  type: 'catalog' | 'favorites';
}

const CarsCatalog: React.FC<CarsCatalogProps> = ({ type }) => {
  const [make, setMake] = useState<string>('');

  const cars = useAppSelector(selectCars) || [];
  const favorites = useAppSelector(selectFavorites);
  const currentPage = useAppSelector(selectCurrentPage);
  const maxPage = 32 / 12;

  const dispatch = useAppDispatch();

  const getMoreCars = () => {
    dispatch(
      fetchGetMoreCarsThunk({
        page: currentPage + 1,
        make: make === 'All' ? null : make,
      })
    );
  };

  const mapCars = type === 'favorites' ? favorites : cars;

  return (
    <>
      {type === 'catalog' && <Form setMake={setMake} make={make} />}
      <section className={s.catalog_section}>
        <div className={s.cars_container}>
          {mapCars.map(car => (
            <CarsCatalogItem car={car} key={car.id} />
          ))}
        </div>
        {type === 'catalog' &&
          currentPage < maxPage &&
          mapCars.length >= 12 && (
            <button type="button" onClick={getMoreCars} className={s.load_more}>
              Load more
            </button>
          )}
      </section>
    </>
  );
};

export default CarsCatalog;
