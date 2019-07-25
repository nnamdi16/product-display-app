import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import "../Form/form.css";
import { onGetShoes } from "../Details/actions";
import { onDeleteShoe } from "../Form/actions";
import editBtn from "../images/edit.svg";
import deleteBtn from "../images/rubbish-bin.svg";
import "./List.css";
import { trackPromise } from "react-promise-tracker";
class App extends Component {
  state = {
    name: "",
    price: "",
    description: ""
  };

  componentDidMount() {
    trackPromise(this.props.onGetShoes());
  }

  handleClick = (e, { _id }) => {
    e.preventDefault();
    this.props.history.push(`/products/${_id}`);
  };

  handleDelete = (e, { _id }) => {
    e.preventDefault();
    const cb = () => this.props.onGetShoes();
    this.props.onDeleteShoe(_id, cb);
  };

  handleUpdate = (e, { _id }) => {
    e.preventDefault();
    this.setState(
      {
        details: this.props.details
      },
      () => {
        this.props.history.push(`/edit?id=${_id}`);
      }
    );
  };

  renderList() {
    const details = this.props.details || [];
    return details.map((detail, index) => {
      return (
        <tr key={detail._id}>
          <th scope="row">{index + 1}</th>
          <td className="text-left">{detail.name}</td>
          <td>{detail.price}</td>
          <td>
            <button
              onClick={e => this.handleClick(e, detail)}
              className=" btn btn-default astext"
            >
              Preview
            </button>
          </td>
          <td>
            <input
              type="image"
              src={editBtn}
              name="editButton"
              alt="edit button"
              className="edit-button"
              onClick={e => this.handleUpdate(e, detail)}
            />
          </td>
          <td>
            <input
              type="image"
              src={deleteBtn}
              name="deleteButton"
              alt="delete button"
              className="edit-button"
              onClick={e => this.handleDelete(e, detail)}
            />
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover form-bg text-center p-4">
          <thead>
            <tr>
              <th scope="col-md-1">S/N</th>
              <th scope="col-md-4" className="text-left">
                Name
              </th>
              <th scope="col-md-3">Price</th>
              <th scope="col-md-2" />
              <th scope="col-md-2" />
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
      </div>
    );
  }
}

const actionCreators = {
  onGetShoes,
  onDeleteShoe
};

const mapStateToProps = state => {
  return {
    details: state.details.shoes.data
  };
};
export default connect(
  mapStateToProps,
  actionCreators
)(App);
