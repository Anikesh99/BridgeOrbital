import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper black">
            <Link to="/"
              style={{
                fontFamily: "Calibri",
                fontSize: 24,
              }}
              className="col s12 left white-text">
              Bridge.com
              </Link>
            <Link to="/room"
              style={{
                fontFamily: "Calibri",
                fontSize: 18,
              }}
              className="col s12 right white-text">
              {/* <i className="material-icons">code</i> */}
                Continue as guest
              </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;