import React from "react";
import PropTypes from "prop-types";
const App = ({ details, blocksFromHTML }) => {
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
            <div>{blocksFromHTML && blocksFromHTML}</div>
          </section>
          <div>Colors</div>
          <p>Sizes</p>
          <p>Size</p>
          <h2>{details.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default App;

// Props type checking.
App.propTypes = {
  details: PropTypes.object.isRequired,
  blocksFromHTML: PropTypes.array.isRequired
};
