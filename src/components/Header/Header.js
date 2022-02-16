import React, { useState } from "react";
import "./Header.css";
import { BiSearch } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";
import flag from "../../assets/flag.svg";
import triangle from "../../assets/triangle.svg";
import logoPic from "../../assets/logo-pic.png";
import bazar from "../../assets/bazar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { allProductsSelector } from "../../features/redux/selector";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();


  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [searchError, setSearchError] = useState(false);

  const products = useSelector(allProductsSelector);
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

  return (
    <>
      <div className="header" style={headerStyle}>
        <div className="bazar-logo">
          <Link to="/">
            <img src={bazar} alt="" />
          </Link>
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
          style={{ display: pathname === "/user" ? "none" : "" }}
          onClick={() => history.push("/signup")}
        >
          Join
        </button>
        <div
          className="logo-div"
          style={{ display: pathname === "/user" ? "block" : "" }}
        >
          <span className="logo">
            <img onClick={() => setDropdown(!dropdown)} src={logoPic} alt="" />
          </span>
        </div>

        {dropdown && (
          <section
            className="dropdown"
            style={{ display: pathname === "/user" ? "" : "none" }}
          >
            <span className="triangle">
              <img src={triangle} alt="" />
            </span>
            <ul>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <hr />
              <Link to="/checkout">
                <li>Checkout</li>
              </Link>
              <hr />
              <Link to="/profile">
                <li>Order</li>
              </Link>
              <hr />
              <Link to="/login">
                <li className="last">Logout</li>
              </Link>
            </ul>
          </section>
        )}
      </div>
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
