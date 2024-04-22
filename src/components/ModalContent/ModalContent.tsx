import Button from '../Buttons/Button';
import s from './ModalContent.module.css';
import imageNotFound from '../../assets/image-not-found.jpg';
import { Car } from '../../redux/cars/carsSlice';

interface modalContentProps {
  car: Car;
}

const ModalContent = ({ car }: modalContentProps) => {
  const {
    id,
    year,
    make,
    model,
    type,
    img,
    description,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalPrice,
    address,
    rentalConditions,
    mileage,
  } = car;

  const city = address.split(',')[1];
  const country = address.split(',')[2];
  const rentalConditionsList = rentalConditions.split('\n');

  return (
    <div className={s.modal_content_wrapper}>
      <div>
        <div className={s.img_wrapper}>
          <img
            src={img || imageNotFound}
            alt={`${make} ${model}`}
            className={s.img}
          />
        </div>
        <div className={s.title_wrapper}>
          <h2 className={s.title}>
            <span>{make} </span>
            <span className={s.model}>{model}, </span>
            <span>{year}</span>
          </h2>
        </div>
        <ul className={s.list}>
          <li>{city}</li>
          <li>{country}</li>
          <li>Id: {id}</li>
          <li>Year: {year}</li>
          <li>Type: {type}</li>
        </ul>
        <ul className={s.list}>
          <li>Fuel Consumption: {fuelConsumption}</li>
          <li>Engine Size: {engineSize}</li>
        </ul>
        <p className={s.description}>{description}</p>
      </div>
      <div>
        <p className={s.list_title}>Accessories and functionalities:</p>
        <ul className={s.list}>
          {accessories.map(accessory => (
            <li key={accessory}>{accessory}</li>
          ))}
        </ul>
        <ul className={s.list}>
          {functionalities.map(functionality => (
            <li key={functionality}>{functionality}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className={s.list_title}>Rental Conditions:</p>
        <ul className={s.list_conditions}>
          <li>
            Minimum age:{' '}
            <span className="accent">
              {rentalConditionsList[0].split(':')[1]}
            </span>
          </li>
          <li>{rentalConditionsList[1]}</li>
          <li>{rentalConditionsList[2]}</li>
          <li>
            Mileage:{' '}
            <span className="accent">
              {mileage.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </li>
          <li>
            Price: <span className="accent">{rentalPrice}</span>
          </li>
        </ul>
      </div>
      <a href="tel:+380730000000">
        <Button style={{ alignSelf: 'flex-start' }}>Rental car</Button>
      </a>
    </div>
  );
};

export default ModalContent;
