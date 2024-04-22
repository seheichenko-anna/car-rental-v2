import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '../../../redux/favorites/favoritesSlice';
import { useModal } from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import ModalContent from '../../ModalContent/ModalContent';
import Button from '../../Buttons/Button';
import imageNotFound from '../../../assets/image-not-found.jpg';
import sprite from '/sprite.svg';
import s from './CarsCatalogitem.module.css';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDipatch';
import { Car } from '../../../redux/cars/carsSlice';

interface CarProps {
  car: Car;
}

const CarsCatalogItem = ({ car }: CarProps) => {
  const {
    id,
    year,
    make,
    model,
    type,
    img,
    accessories,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
  } = car;

  const city = address.split(',')[1];
  const country = address.split(',')[2];
  const favorites = useAppSelector(selectFavorites);
  const { isOpen, toggle } = useModal();
  const isFavorite = favorites.some(favorite => favorite.id === id);
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ id }));
    } else {
      dispatch(addToFavorites({ car }));
    }
  };

  return (
    <div className={s.car_card}>
      <div className={s.img_wrapper}>
        <img
          src={img || imageNotFound}
          alt={`${make} ${model}`}
          className={s.img}
        />
        <button className={s.btn_favorite} onClick={handleToggleFavorite}>
          <svg className={isFavorite ? s.icon_heart_fill : s.icon_heart}>
            <use xlinkHref={`${sprite}#heart`} />
          </svg>
        </button>
      </div>
      <div className={s.title_wrapper}>
        <h2 className={s.title}>
          <span>{make} </span>
          <span className="accent">{model}, </span>
          <span>{year}</span>
        </h2>
        <p className={s.price}>{rentalPrice}</p>
      </div>
      <ul className={s.list}>
        <li>{city}</li>
        <li>{country}</li>
        <li>{rentalCompany}</li>
        <li>{type}</li>
        <li>{model}</li>
        <li>{mileage}</li>
        <li>{accessories[0]}</li>
      </ul>
      <Button onClick={toggle}>Learn more</Button>
      {isOpen && (
        <Modal closeModal={toggle}>
          <ModalContent car={car} />
        </Modal>
      )}
    </div>
  );
};

export default CarsCatalogItem;
