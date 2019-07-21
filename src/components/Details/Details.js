import React, { Component } from "react";
import { connect } from "react-redux";
import { onGetShoe } from "../Details/actions";
import { Link } from "react-router-dom";
import "./Details.css";

class Details extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onGetShoe(id);
  }

  render() {
    const { details } = this.props;
    console.log(this.props);
    console.log(details);
    if (!details.id) {
      return <div>NO RESULTS FOUND</div>;
    }

    return (
      <div className="container-fluid details-container">
        <div className="row">
          <div className="col-sm-7">
            <div className="triangle">Stop</div>
          </div>
          <div className="col-sm-5">
            <h1>{details.name}</h1>
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
            <h2>{details.price}</h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = details => {
  return { details: details.details.shoe };
};

export default connect(
  mapStateToProps,
  { onGetShoe }
)(Details);
