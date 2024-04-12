import React from "react";
import abclogo from "../assets/abclogo.svg";

function Header() {
  return (
    <div className="header">
      <div></div>
      <img className="abclogo" src={abclogo} alt="abclogo" />
      <p className="tagline">From Chaos to Clarity, Master Your Invoices Today.</p>
    </div>
  );
}

export default Header;
