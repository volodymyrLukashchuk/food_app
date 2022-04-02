import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import triangle from "../../assets/triangle.svg";
import logoPic from "../../assets/logo-pic.png";
import bazar from "../../assets/bazar.svg";

import { userActions } from "../../features/redux/user/userSlice";
import { cartActions } from "../../features/redux/cartSlice";
import AuthModal from "../Modal/AuthModal";

import "./Header.css";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [modalState, setModalState] = useState("");
  const user = useSelector((state) => state.user.userData);

  const headerStyle = {
    position: pathname === "/" ? "absolute" : "",
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
    setDropdown(!dropdown);
    dispatch(cartActions.clearCart());
  };

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const homeButton = () => {
    history.push("/");
  };

  const signUpModalRedirect = () => {
    setModalState("signup");
  };

  const renderDropdown = () => {
    return (
      <section className="dropdown">
        <span className="triangle">
          <img src={triangle} alt="" />
        </span>
        <ul>
          <Link onClick={showDropdown} to="/">
            <li>Profile</li>
          </Link>
          <hr />
          <Link onClick={showDropdown} to="/checkout">
            <li>Checkout</li>
          </Link>
          <hr />
          <Link onClick={showDropdown} to="/">
            <li>Order</li>
          </Link>
          <hr />
          <Link to="/">
            <li onClick={handleLogout} className="last">
              Logout
            </li>
          </Link>
        </ul>
      </section>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <div onClick={homeButton} className="bazar-logo">
          <img src={bazar} alt="" />
        </div>
        <div className="header-input">
          <span>
            <BiSearch />
          </span>
          <input type="text" placeholder="Search your products from here" />
        </div>

        {user ? "" : <button onClick={signUpModalRedirect}>Join</button>}

        {user ? (
          <div className="logo-div">
            <span className="logo">
              <img onClick={showDropdown} src={logoPic} alt="" />
            </span>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <>
      <div className="header" style={headerStyle}>
        <AuthModal modalState={modalState} setModalState={setModalState} />
        {renderHeader()}
        {dropdown && renderDropdown()}
      </div>
    </>
  );
};

export default Header;
