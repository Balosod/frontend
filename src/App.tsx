import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AllUsers from "./pages/AllUsers";
import { AuthProvider } from "./context/Context";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/users">
            <AllUsers />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
