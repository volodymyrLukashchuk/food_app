import Home from "./components/Home/Home";

import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import SignupModal from "./components/Modal/SignupModal";
import LoginModal from "./components/Modal/LoginModal";
import User from "./components/User/User";
import PasswordModal from "./components/Modal/PasswordModal";
import Profile from "./components/Profile/Profile";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Product from "./components/Product/Product";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={SignupModal} />
            <Route path="/login" component={LoginModal} />
            <Route path="/password" component={PasswordModal} />
            <Route path="/user" component={User} />
            <Route path="/profile" component={Profile} />
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
