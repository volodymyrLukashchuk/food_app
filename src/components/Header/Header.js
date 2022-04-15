import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import triangle from "../../assets/triangle.svg";
import logoPic from "../../assets/logo-pic.png";
import bazar from "../../assets/bazar.svg";

import { userActions } from "../../features/redux/user/userSlice";
import { userSelector } from "../../features/redux/user/userSelector";
import { cartActions } from "../../features/redux/cart/cartSlice";
import AuthModal from "../Modal/AuthModal";

import "./Header.css";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(userSelector);
  const headerStyle = {
    position: pathname === "/" ? "absolute" : "",
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
    setDropdown(!dropdown);
    dispatch(cartActions.clearCart());
    setShowModal(false);
  };

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleHomeButtonClick = () => {
    history.push("/");
  };

  const closeModal = () => {
    setShowModal(false);
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
        <div onClick={handleHomeButtonClick} className="bazar-logo">
          <img src={bazar} alt="" />
        </div>
        <div className="header-input">
          <span>
            <BiSearch />
          </span>
          <input type="text" placeholder="Search your products from here" />
        </div>

        {user ? null : <button onClick={() => setShowModal(true)}>Join</button>}

        {user ? (
          <div className="logo-div">
            <span className="logo">
              <img onClick={showDropdown} src={logoPic} alt="" />
            </span>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className="header" style={headerStyle}>
        {showModal && <AuthModal closeModal={closeModal} />}
        {renderHeader()}
        {dropdown && renderDropdown()}
      </div>
    </>
  );
};

export default Header;
