import { selectMakes } from '../../redux/cars/carsSlice';
import { fetchCarsThunk } from '../../redux/cars/operations';
import Select, { StylesConfig } from 'react-select';
import Button from '../Buttons/Button';
import s from './Form.module.css';
import { useAppDispatch } from '../../hooks/useAppDipatch';
import { useAppSelector } from '../../hooks/useAppSelector';

interface FormProps {
  make: string;
  setMake: React.Dispatch<React.SetStateAction<string>>;
}

interface OptionType {
  value: string;
  label: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: provided => ({
    ...provided,
    border: 'none',
    borderRadius: '14px',
    backgroundColor: '#F7F7FB',
    width: '224px',
    height: '48px',
    padding: '0 18px',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '##3470FFf',
    },
  }),
  singleValue: provided => ({
    ...provided,
    color: '#121417',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#121417',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: 8,
    boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02)',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3470FF' : 'transparent',
    color: state.isSelected ? '#fff' : 'rgb(18, 20, 23, 0.2)',
    '&:hover': {
      backgroundColor: '#3470FF',
      color: '#fff',
    },
  }),
};

const Form: React.FC<FormProps> = ({ make, setMake }) => {
  const makes = useAppSelector(selectMakes);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchCarsThunk({ page: 1, make: make === 'All' ? null : make }));
  };

  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setMake(selectedOption.value);
    }
  };

  return (
    <div className={s.form_wrapper}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          Car brand
          <Select
            options={[
              { value: 'All', label: 'All' },
              ...makes.map(make => ({ value: make, label: make })),
            ]}
            onChange={handleSelectChange}
            placeholder="Enter the text"
            styles={customStyles}
            classNamePrefix="select"
            className={s.select}
          />
        </label>
        <Button
          style={{
            padding: '14px 44px',
            alignSelf: ' flex-end',
            height: '48px',
          }}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Form;
