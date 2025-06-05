import React from 'react';

const DocoraLogo = () => (
  <svg
    width="150"
    height="40"
    viewBox="0 0 150 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Krst */}
    <rect x="8" y="10" width="7" height="20" fill="#ffffff" rx="1.5" />
    <rect x="2" y="17" width="20" height="7" fill="#ffffff" rx="1.5" />

    {/* Talasi - simbol govora */}
    <path
      d="M40 12 Q48 20 40 28"
      stroke="#ffffff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M50 8 Q62 20 50 32"
      stroke="#ffffff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Tekst */}
    <text
      x="70"
      y="27"
      fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      fontWeight="700"
      fontSize="22"
      fill="#ffffff"
      letterSpacing="1"
    >
      Docora
    </text>
  </svg>
);

export default DocoraLogo;
