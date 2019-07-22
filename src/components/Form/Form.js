import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import "./form.css";
import { onGetShoes } from "../Details/actions";
import { onPostShoes } from "./actions";
import imageUpload from "../images/arrow-up (1).svg";
import ImageUpload from "./ImageUpload";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg";
class App extends Component {
  state = {
    // imageUrl: "",
    id: new Date(),
    productName: "",
    price: "",
    editorState: EditorState.createEmpty()
    // file: "",
    // imagePreviewUrl: ""
  };
  // componentDidMount() {
  //   this.props.onGetShoes();
  // }
  onChange = editorState => {
    // console.log(description);
    return this.setState({
      editorState
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    let convertedData = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    const shoe = {
      name: this.state.name,
      price: this.state.price,
      description: convertedData
    };
    const { payload } = await this.props.onPostShoes(shoe);
    console.log("handle uploading", payload);
    await this.setState({
      editorState: EditorState.createEmpty()
    });
    console.log(payload);
    return payload;
  };

  handleSaveAndPublish = async e => {
    e.preventDefault(e);
    const { id } = await this.handleSubmit(e);
    console.log(id);
    this.props.history.push(`/footwears/${id}`);
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

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
        <div className="container-fluid ">
          <div className="row">
            {/* <form onSubmit={e => this.handleSubmit(e)}> */}
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
                name="name"
                onChange={e => this.handleInputChange(e)}
              />
              <div className="price-title">Pricing</div>
              <div class="input-group input-group-price">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="$0.00"
                  aria-label="price"
                  aria-describedby="button-addon2"
                  name="price"
                  onChange={e => this.handleInputChange(e)}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="jumbotron jumbotron-fluid input-editor">
                <Editor
                  // wrapperClassName="wrapper-class"
                  // editorClassName="editor-class"

                  wrapperClassName="demo-wrapper"
                  editorClassName="editer-content"
                  toolbarClassName="toolbar-class"
                  editorState={this.state.editorState}
                  onEditorStateChange={this.onChange}
                />
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
                <button
                  type="button"
                  className="btn btn-primary footer-button"
                  onClick={e => this.handleSubmit(e)}
                >
                  Save
                </button>
              </div>
              <div className="bd-highlight footer-row">
                <button
                  type="button"
                  className="btn btn-primary footer-button"
                  onClick={e => this.handleSaveAndPublish(e)}
                >
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const actioncreators = {
  onPostShoes
};

const mapStateToProps = state => {
  console.log(state.details.shoes);
  return {
    details: state.details.shoes
  };
};

export default connect(
  mapStateToProps,
  actioncreators
)(App);
