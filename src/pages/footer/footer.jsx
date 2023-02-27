import React from 'react';
import '../assets/css/style.css';
import {Link} from "react-router-dom";
import AppImg from "../shared/app-img";
const Footer = (props) => {
  return (
      <footer className="footer">
      <span className="footer__text">
        from
        <Link className="footer__link" to="https://binary-studio.com">
          binary studio
        </Link>
        with
        <AppImg src='heart.svg' className='footer__icon' alt='heart icon' />

      </span>
      </footer>
  );
}

export default Footer;