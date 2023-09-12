// LanguageDropdown.js
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import i18n from '../../../helpers/i18n'; // Import the i18n instance from i18n.js

const LanguageDropdown = () => {
  const handleLanguageChange = (event) => {
    const selectedLanguage = event;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <NavDropdown title={i18n.language === 'en' ? '🇺🇸 English' : (i18n.language === 'es' ? '🇪🇸 Español' : '🇫🇷 Français')} id="basic-nav-dropdown" onSelect={handleLanguageChange}>
      <NavDropdown.Item eventKey="en">🇺🇸 English</NavDropdown.Item>
      <NavDropdown.Item eventKey="es">🇪🇸 Español</NavDropdown.Item>
      <NavDropdown.Item eventKey="fr">🇫🇷 Français</NavDropdown.Item>
    </NavDropdown>
  );
};

export default LanguageDropdown;
