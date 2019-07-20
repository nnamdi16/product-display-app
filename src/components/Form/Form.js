import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./form.css";
import { onGetShoes } from "../Details/actions";
import imageUpload from "../images/arrow-up (1).svg";
import ImageUpload from "./ImageUpload";
class App extends Component {
  state = {
    imageUrl: "",
    productName: "",
    price: "",
    description: "",
    file: "",
    imagePreviewUrl: ""
  };

  handleSubmit(e) {
    e.preventDEfault();
    console.log("handle uploading", this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    } else {
      this.setState({
        file: "",
        imagePreviewUrl: ""
      });
    }
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
  }
  componentDidMount() {
    this.props.onGetShoes();
  }
  render() {
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (
        <img src={imagePreviewUrl} className="upload-size" alt="img preview" />
      );
    }
    return (
      <div className="form-bg text-center p-4">
        <h1>Edit Digital Product</h1>
        <nav className="navbar navbar-expand-lg navbar-light form-bg">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
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
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-4 my-5">
              <ImageUpload
                handleImageChange={e => this.handleImageChange(e)}
                imagePreview={imagePreview}
              />
              <p>Tag</p>
              <p>Categories</p>
            </div>
            <div className="col-sm-8 my-5 body-layout">
              <input
                className="form-control form-control-lg product-input"
                type="text"
                placeholder="Enter a digital product name ...."
              />
              <div className="price-title">Pricing</div>
              <div class="input-group input-group-price">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
              </div>
              <div className="jumbotron jumbotron-fluid input-editor">
                <div className="container">
                  <h1 className="display-4">Fluid jumbotron</h1>
                  <p className="lead">
                    This is a modified jumbotron that occupies the entire
                    horizontal space of its parent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row ">
            <div className="d-flex flex-row bd-highlight mb-3 ">
              <div className="bd-highlight footer-row">
                <button
                  type="button"
                  className="btn btn-primary footer-button "
                >
                  Cancel
                </button>
              </div>
              <div className=" bd-highlight footer-row">
                <button type="button" className="btn btn-primary footer-button">
                  Delete
                </button>
              </div>
              <div className="bd-highlight footer-row">
                <button type="button" className="btn btn-primary footer-button">
                  Save
                </button>
              </div>
              <div className="bd-highlight footer-row">
                <button type="button" className="btn btn-primary footer-button">
                  Save & Publish
                </button>
              </div>

              <div className="bd-highlight footer-row">
                <button type="button" className="btn btn-primary footer-button">
                  Primary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.details.shoes);
  return {
    details: state.details.shoes
  };
};

export default connect(
  mapStateToProps,
  { onGetShoes }
)(App);
