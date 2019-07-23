import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./form.css";
import { onGetShoe } from "../Details/actions";
import { onPostShoes, onUpdateShoe } from "./actions";
import imageUpload from "../images/arrow-up (1).svg";
import ImageUpload from "./ImageUpload";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg";
class App extends Component {
  state = {
    // imageUrl: "",
    name: "",
    price: "",
    editorState: EditorState.createEmpty()
    // file: "",
    // imagePreviewUrl: ""
  };

  //Onchange method for getting the values of from react-draft
  onChange = editorState => {
    return this.setState({
      editorState
    });
  };

  componentDidMount() {
    //Create instance of URLSearchParams
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id");

    //Condition to check if id exists
    if (id) {
      this.handleGetShoe(id);
    }
  }

  //event method to get a single shoe detail
  handleGetShoe = id => {
    this.props.onGetShoe(id);
  };

  //event method to update a single detail.
  handleUpdate = e => {
    e.preventDefault();

    //Create instance of URLSearchParams
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id");
    const { name, price, description } = this.props.details;
    const updatedShoeDetails = {
      id,
      name,
      price,
      description
    };

    //Passed updated values to onUpdateShoe method
    this.props.onUpdateShoe(updatedShoeDetails);
    this.setState({
      id: "",
      name: "",
      price: "",
      description: ""
    });
  };

  //submit event method  for passing the data to the database.
  handleSubmit = async e => {
    e.preventDefault();

    let convertedData = convertToRaw(
      this.state.editorState.getCurrentContent()
    );

    //Setting the intial property state to the present state.
    const shoe = {
      name: this.state.name,
      price: this.state.price,
      description: convertedData
    };

    //Assigning the data saved to the database to payload object.
    const { payload } = await this.props.onPostShoes(shoe);

    await this.setState({
      editorState: EditorState.createEmpty()
    });

    return payload;
  };

  //Save and publish event method
  handleSaveAndPublish = async e => {
    e.preventDefault(e);
    const { id } = await this.handleSubmit(e);
    console.log(id);
    this.props.history.push(`/footwears/${id}`);
  };

  //Method for getting the values of the event.
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };
  //Method to get the uploaded image for the local system.
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
    //Assigning the details object to props.
    let { details } = this.props;
    console.log(details);
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;

    if (imagePreviewUrl) {
      imagePreview = (
        <img src={imagePreviewUrl} className="upload-size" alt="img preview" />
      );
    }
    console.log(this.props.details);
    return (
      <div className="form-bg text-center p-4">
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
                name="name"
                onChange={e => this.handleInputChange(e)}
                defaultValue={details.name}
                contentEditable="true"
              />
              <div className="price-title">Pricing</div>
              <div className="input-group input-group-price">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="$0.00"
                  aria-label="price"
                  aria-describedby="button-addon2"
                  name="price"
                  defaultValue={details.price}
                  contentEditable="true"
                  onChange={e => this.handleInputChange(e)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
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
                <button
                  type="button"
                  className="btn btn-primary footer-button"
                  onClick={e => this.handleUpdate(e)}
                >
                  Update
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
  onPostShoes,
  onGetShoe,
  onUpdateShoe
};

const mapStateToProps = state => {
  console.log(state.details.shoe);
  return {
    details: state.details.shoe
  };
};

export default connect(
  mapStateToProps,
  actioncreators
)(App);

App.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  imagePreview: PropTypes.string.isRequired
};

App.defaultProps = {
  handleImageChange: () => {},
  imagePreview: ""
};
