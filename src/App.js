import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/App.css";
import Home from "./components/Home";
import CityPage from "./Pages/CityPage";
import AdventureDetail from "./Pages/AdventureDetail"; 
import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "./Pages/Register/Registerpage";
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reg" element={<Registerpage/>}></Route>
          <Route path="/log" element={<Loginpage/>}></Route>
          <Route path="/:cityId" element={<CityPage />} />
          <Route path="/adventure/:adventureId" element={<AdventureDetail />} />
         
        </Routes>
      </Router>
      );
    }
}

