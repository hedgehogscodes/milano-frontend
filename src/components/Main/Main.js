import { memo } from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Contacts from '../Contacts/Contacts';
import './Main.css';

function Main({ onApplicateClick }) {
  return(
    <main className="main">
      <Promo onApplicateClick={ onApplicateClick } />
      <AboutProject />
      <Techs />
      <AboutMe /> 
      <Contacts />
    </main>
  );
}

export default memo(Main);