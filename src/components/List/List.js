import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import "../Form/form.css";
import { onGetShoes } from "../Details/actions";
import { onDeleteShoe } from "../Form/actions";
import editBtn from "../images/edit.svg";
import deleteBtn from "../images/rubbish-bin.svg";
import "./List.css";
class App extends Component {
  state = {
    name: "",
    price: "",
    description: ""
  };

  componentDidMount() {
    this.props.onGetShoes();
  }

  handleClick = (e, { id }) => {
    e.preventDefault();
    this.props.history.push(`/footwears/${id}`);
  };

  handleDelete = (e, { id }) => {
    e.preventDefault();
    const cb = () => this.props.onGetShoes();
    this.props.onDeleteShoe(id, cb);
    console.log(this.props.details);

    // return this.setState({
    //   details: this.props.details
    // });
  };

  handleUpdate = (e, { id }) => {
    e.preventDefault();
    console.log(id);
    this.setState(
      {
        details: this.props.details
      },
      () => {
        this.props.history.push(`/edit?id=${id}`);
      }
    );
  };

  renderList() {
    const details = this.props.details || [];
    console.log(details);
    return details.map(detail => {
      return (
        <tr key={detail.id}>
          <th scope="row">{detail.id}</th>
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
      <Fragment>
        <table className="table table-hover form-bg text-center p-4">
          <thead>
            <tr>
              <th scope="col-md-1">id</th>
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
      </Fragment>
    );
  }
}

const actionCreators = {
  onGetShoes,
  onDeleteShoe
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
