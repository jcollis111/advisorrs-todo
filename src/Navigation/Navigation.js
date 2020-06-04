import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.css";
import archiveLargeWhite from "../graphics/archive-large-white.svg";
import archiveLargeBlue from "../graphics/archive-large-blue.svg";
import tTaskerLarge from "../graphics/TTasker-large.png";
import tTaskerSmall from "../graphics/TTasker-small.png";

const navigation = (props) => {
  if (props.page.toString() === "Active") {
    return (
      <nav className={classes.nav}>
        <img src={tTaskerLarge} alt="Logo" className={classes.icon} />
        <NavLink to="/archived">
          <img src={archiveLargeBlue} alt="Archive" />
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav className={classes.nav}>
        <img src={tTaskerLarge} alt="Logo" />
        <NavLink to="/">
          <img src={archiveLargeWhite} alt="Active" />
        </NavLink>
      </nav>
    );
  }
};

export default navigation;
