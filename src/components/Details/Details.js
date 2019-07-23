import React, { Component } from "react";
import { connect } from "react-redux";
import { onGetShoe } from "../Details/actions";
import PropTypes from "prop-types";
import "./Details.css";

class Details extends Component {
  //Make request to get all the shoe details in the database
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onGetShoe(id);
  }

  render() {
    //Passed props to detail object.
    const { details } = this.props;
    const { description: { blocks } = [] } = details;

    //Check if the details object id exists
    if (!details.id) {
      return <div>NO RESULTS FOUND</div>;
    }

    return (
      <div className="container-fluid details-container detail-body">
        <div className="row">
          <div className="col-sm-7">
            <div className="triangle">
              <img
                src={details.image}
                alt={`${details.name}`}
                className="product-image rounded mx-auto d-block"
              />
            </div>
          </div>
          <div className="col-sm-5">
            <h1>{details.name}</h1>
            <title>Men's Basketball Shop</title>
            <div>Stars</div>
            <section>
              <h3>INFINITE SUPPORT, TOTAL CONTROL</h3>
              {blocks.map(block => (
                <p key={"key"}>{block.text}</p>
              ))}
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

//Connecting the details object form the store to Details Component
const mapStateToProps = details => {
  return { details: details.details.shoe };
};

//Connecting the action and the props to the store.
export default connect(
  mapStateToProps,
  { onGetShoe }
)(Details);

//Props type checking.
Details.propTypes = {
  details: PropTypes.array.isRequired,
  blocks: PropTypes.array.isRequired
};
