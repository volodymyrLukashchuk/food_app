import React, { useState } from "react";
import "./Header.css";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import flag from "../../assets/flag.svg";
import triangle from "../../assets/triangle.svg";
import logoPic from "../../assets/logo-pic.png";
import bazar from "../../assets/bazar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";

const Header = () => {
  const history = useHistory();

  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [searchError, setSearchError] = useState(false);

  const products = useSelector((state) => state.bazar.allProducts);
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

  return (
    <>
      <div className="header">
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

        <div className="lang">
          <button>
            <span>
              <img src={flag} alt="" />
            </span>
            English
          </button>
        </div>

        <button onClick={() => history.push("/signup")}>Join</button>
        <div className="logo-div">
          <span className="logo">
            <img onClick={() => setDropdown(!dropdown)} src={logoPic} alt="" />
          </span>
        </div>

        {dropdown && (
          <section className="dropdown">
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
