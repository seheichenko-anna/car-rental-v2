import React from 'react';
import s from './Button.module.css';

interface ButtonsProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonsProps> = ({ children, onClick, style }) => {
  return (
    <button className={s.btn} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
