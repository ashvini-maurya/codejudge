import React from "react";
import { NavLink } from "react-router-dom";

const navigation = () => {
  return (
    <div className="text-right">
      <NavLink to="/" activeClassName="selected">
        <span className="hmenu mx-3 cursorPointer">Add New Lead</span>
      </NavLink>
      <NavLink to="/leads" activeClassName="selected">
        <span className="hmenu mx-3 cursorPointer">All Leads</span>
      </NavLink>
    </div>
  );
};

export default navigation;
