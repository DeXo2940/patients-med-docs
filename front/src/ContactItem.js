import * as React from "react";
import './App.css';

export const ContactItem = ({   phone }) => {
  return (
    <li className="item">
      <div className="content">
        <div className="description">{phone}</div>
      </div>
    </li>
  );
};
