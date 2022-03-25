import React from "react";

import "./Profile.css";
import SideNav from "../Sidenav/SideNav";
import Home from "../Home/Home";

const Profile = () => {
  return (
    <div className="profile">
      <Home />
      <SideNav />
    </div>
  );
};

export default Profile;
