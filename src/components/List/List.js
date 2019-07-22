import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import "../Form/form.css";
import { onGetShoes } from "../Details/actions";

class App extends Component {
  componentDidMount() {
    this.props.onGetShoes();
  }
  renderList() {
    const details = this.props.details || [];
    return details.map(detail => {
      return (
        <tr>
          <th scope="row">{detail.id}</th>
          <td className="text-left">{detail.name}</td>
          <td>{detail.price}</td>
          <td>View</td>
          <td>Edit</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <Fragment>
        <table className="table table-hover form-bg text-center p-4">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col" className="text-left">
                Name
              </th>
              <th scope="col">Picture</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
      </Fragment>
    );
  }
}

const actionCreators = {
  onGetShoes
};

const mapStateToProps = state => {
  console.log(state);
  return {
    details: state.details.shoes
  };
};
export default connect(
  mapStateToProps,
  actionCreators
)(App);
