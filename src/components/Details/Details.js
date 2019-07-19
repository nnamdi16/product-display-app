import React, { Component } from "react";
import "./Details.css";

class Details extends Component {
  render() {
    return (
      <div className="container-fluid details-container">
        <div className="row">
          <div className="col-sm-7">
            <div className="triangle">Stop</div>
          </div>
          <div className="col-sm-5">
            <h1>UA CURRY 3</h1>
            <title>Men's Basketball Shop</title>
            <div>Stars</div>
            <section>
              <h3>INFINITE SUPPORT, TOTAL CONTROL</h3>
              <p>
                Thread borne delivers lightweight directional strength to
                support the game's most brilliant player: stephen curry.
              </p>
            </section>
            <div>Colors</div>
            <p>Sizes</p>
            <p>Size</p>
            <h2>$ 94.59</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
