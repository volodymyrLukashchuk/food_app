import React, { useState, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { allProductsSelector } from "../../features/redux/selector";

import triangle from "../../assets/triangle.svg";
import logoPic from "../../assets/logo-pic.png";
import bazar from "../../assets/bazar.svg";
import flag from "../../assets/flag.svg";

import { userActions } from "../../features/redux/userSlice";
import SignUpModal from "../Modal/SignUpModal";
import { ModalContext } from "../../App";

import "./Header.css";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [searchError, setSearchError] = useState(false);

  const [showSignUpModal, setShowSignUpModal] = useState("");

  const products = useSelector(allProductsSelector);
  const user = useSelector((state) => state.user.userData);
  const searchData = products.find((product) => product.name === title);

  const itemSearchHandler = (e) => {
    if (e.key === "Enter" && !searchData) {
      setSearchError(!searchError);
    }

    if (e.key === "Enter" && searchData) {
      history.push(`/product/${searchData.id}`);
    } else {
      return;
    }
  };

  const headerStyle = {
    position:
      pathname === "/" ||
      pathname === "/signup" ||
      pathname === "/login" ||
      pathname === "/user" ||
      pathname === "/password" ||
      pathname === "/profile"
        ? "absolute"
        : "",
  };

  const buttonLangStyles = {
    display:
      pathname === "/profile" ||
      pathname === "/signup" ||
      pathname === "/login" ||
      pathname === "/password"
        ? "block"
        : "",
  };

  const clearStorage = () => {
    dispatch(userActions.logout());
    setDropdown(!dropdown);
  };

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const { showModal } = useContext(ModalContext);

  return (
    <>
      <div className="header" style={headerStyle}>
        <div className="bazar-logo">
          <img src={bazar} alt="" />
        </div>
        <div className="header-input">
          <span>
            <BiSearch />
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={itemSearchHandler}
            type="text"
            placeholder="Search your products from here"
          />
        </div>

        <div className="lang" style={buttonLangStyles}>
          <button>
            <span>
              <img src={flag} alt="" />
            </span>
            English
          </button>
        </div>

        <button
          style={{
            display: user ? "none" : "",
          }}
          onClick={() => showModal("signup")}
        >
          Join
        </button>

        <div className="logo-div" style={{ display: user ? "block" : "" }}>
          <span className="logo">
            <img onClick={() => setDropdown(!dropdown)} src={logoPic} alt="" />
          </span>
        </div>

        {dropdown && (
          <section className="dropdown" style={{ display: user ? "" : "none" }}>
            <span className="triangle">
              <img src={triangle} alt="" />
            </span>
            <ul>
              <Link onClick={showDropdown} to="/profile">
                <li>Profile</li>
              </Link>
              <hr />
              <Link onClick={showDropdown} to="/checkout">
                <li>Checkout</li>
              </Link>
              <hr />
              <Link onClick={showDropdown} to="/profile">
                <li>Order</li>
              </Link>
              <hr />
              <Link to="/">
                <li onClick={clearStorage} className="last">
                  Logout
                </li>
              </Link>
            </ul>
          </section>
        )}
      </div>
      {showSignUpModal && (
        <SignUpModal
          setShowSignUpModal={setShowSignUpModal}
          showSignUpModal={showSignUpModal}
        />
      )}
      <div className={searchError ? "error" : "active-error error"}>
        {searchError && (
          <p>
            Try <b>Lime</b> or <b>Fresh Beef</b>
            <span onClick={() => setSearchError(!searchError)}>
              <IoIosClose />
            </span>
          </p>
        )}
      </div>
    </>
  );
};

export default Header;
