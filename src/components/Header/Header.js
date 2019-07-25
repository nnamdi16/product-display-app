import React, { Component } from "react";
import "../Form/form.css";
import { Link, withRouter } from "react-router-dom";
//Header Component
class App extends Component {
  state = {
    hide: false
  };

  onToggleButton = e => {
    e.preventDefault();
    const { hide } = this.state;

    this.setState({
      hide: !hide
    });
  };

  render() {
    const { pathname } = this.props.location;

    const isEdit = pathname.includes("/edit");
    return (
      <div className="form-bg text-center p-4">
        <div className="form-bg text-center p-4">
          <div className="row">
            <div className="col-sm-8">
              <h1>Edit Digital Product</h1>
            </div>
            <div className="col-sm-4">
              {!isEdit && (
                <Link to="/edit" className="btn btn-outline-secondary">
                  Create Product
                </Link>
              )}
            </div>
          </div>

          <nav className="navbar navbar-expand-lg navbar-light form-bg">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse menubar"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav menu mt-4">
                <li className="nav-item w-25">
                  <a className="nav-link pb-4 " href="#">
                    Item<span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item w-25">
                  <a className="nav-link pb-4" href="#">
                    Pricing and Upload<span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item w-25">
                  <a className="nav-link pb-4" href="#">
                    Aditional Info
                  </a>
                </li>
                <li className="nav-item w-25">
                  <a className="nav-link pb-4" href="#">
                    Form
                  </a>
                </li>
                <li className="nav-item w-25">
                  <a className="nav-link pb-4" href="#">
                    Options
                  </a>
                </li>
                <li className="nav-item w-25">
                  <a className="nav-link pb-4" href="#">
                    Social
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
