import React from "react";
import { Link } from "react-router-dom";

export default class Part1nav extends React.Component {
  render() {
    return (
      <>
        <nav>
          <ul>
            <li><a href="">Qtrip</a></li>
            <div id="ul1">
              <ul>
                <li><button id="bb1"><a href="">Home</a></button></li>
                <li><button id="bb2"><a href="">Reservations</a></button></li>
                <li>
                  <Link to="/log">
                    <button id="b1">Login Here</button>
                  </Link>
                </li>
                <li>
                  <Link to="/reg">
                    <button id="b2">Register</button>
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </nav>
      </>
    );
  }
}
