import React, { Component } from "react";
import { connect } from "react-redux";
import { onGetShoe } from "../Details/actions";
import { trackPromise } from "react-promise-tracker";
import "./Details.css";
import parse from "html-react-parser";
import Container from "./Container";
import { withRouter } from "react-router-dom";
class Details extends Component {
  state = {
    loading: false
  };
  setActivity = () => {
    this.setState(({ loading }) => ({ loading: !loading }));
  };

  //Make request to get all the shoe details in the database
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setActivity();
    trackPromise(this.props.onGetShoe(id, this.setActivity));
  }

  render() {
    //Passed props to detail object.
    const details = this.props.details || {};
    const { description } = details;
    let blocksFromHTML;
    if (description) {
      blocksFromHTML = parse(description);
    }
    const empty = Object.keys(details).length < 1 && !this.state.loading;
    const fetched = Object.keys(details).length > 1 && !this.state.loading;
    // Check if the details object id exists

    return (
      <>
        {empty && <div>NO RESULTS FOUND</div>}
        {fetched && (
          <Container details={details} blocksFromHTML={blocksFromHTML} />
        )}
      </>
    );
  }
}

//Connecting the details object form the store to Details Component
const mapStateToProps = state => {
  return { details: state.details.shoe.data };
};

//Connecting the action and the props to the store.
export default connect(
  mapStateToProps,
  { onGetShoe }
)(withRouter(Details));
