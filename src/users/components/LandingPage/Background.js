import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Background.css';
import Header from '../Header/Header';
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-background">
      <Header />
      <div className="landing-overlay">
        <h1 className="landing-title">
          Ti govoriš, Docora beleži. Izveštaji bez čekanja.
        </h1>
        <p className="landing-subtitle">
          Docora je moderna platforma za sve medicinske profesionalce koja ubrzava izradu dokumentacije glasovnim komandama. Brzo, efikasno i jednostavno.
        </p>

        <div className="landing-benefits">
          <p>
            Smanjite vreme kreiranja izveštaja — napravite ga za samo 30 sekundi.<br />
            Uštedite do 20 sati mesečno.<br />
            Lako i jednostavno, sa Docora platformom.
          </p>
        </div>

        <button className="landing-button" onClick={() => navigate('/login')}>
          Započni
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
