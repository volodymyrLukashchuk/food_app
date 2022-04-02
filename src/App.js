import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";

import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Product from "./components/Product/Product";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/payment" component={Payment} />
            <Route path="/product/:id" component={Product} />
            <Route path="/auth/google/callback" component={AuthRedirect} />
          </Switch>
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
