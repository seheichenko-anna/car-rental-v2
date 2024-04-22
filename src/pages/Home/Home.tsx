import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import s from './Home.module.css';
import car from '../../assets/car-main.png';

const Home = () => {
  return (
    <section className={s.hero}>
      <div className={s.main_title}>
        <h1>
          Want to <span className="accent">find the car</span> <br />
          you want when you <br />
          need it?
        </h1>
        <p>
          Do you want to discover the best cars
          <br /> for you?
        </p>
        <Link to="/catalog" className={s.discover}>
          <Button>Discover</Button>
        </Link>
      </div>
      <img src={car} className={s.img_car} alt="BMW" />
    </section>
  );
};

export default Home;
