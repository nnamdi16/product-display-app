import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./form.css";
import { onGetShoe } from "../Details/actions";
import { onPostShoes, onUpdateShoe } from "./actions";
import ImageUpload from "./ImageUpload";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, RichUtils, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg";

class App extends Component {
  state = {
    name: "",
    price: "",
    editorState: EditorState.createEmpty(),
    image: ""
  };

  //Onchange method for getting the values of from react-draft
  onChange = editorState => {
    return this.setState({
      editorState
    });
  };

  componentDidMount() {
    this.handleGetShoe();
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  //event method to get a single shoe detail
  handleGetShoe = async () => {
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id");
    if (id) {
      try {
        const { payload } = await this.props.onGetShoe(id);
        const { name, price, description, image } = payload.data;
        const blocksFromHTML = htmlToDraft(description);
        const { contentBlocks, entityMap } = blocksFromHTML;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ name, price, image, editorState });
      } catch (err) {
        console.log({ err });
      }
    }
  };

  //event method to update a single detail.
  handleUpdate = async e => {
    e.preventDefault();
    //Create instance of URLSearchParams
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id");
    const shoe = this.handleData();
    const { name, price, description, image } = shoe;
    const updatedShoeDetails = {
      id,
      name,
      price,
      description,
      image
    };
    const cb = () => this.props.history.push(`/`);

    // Passed updated values to onUpdateShoe method
    await this.props.onUpdateShoe(updatedShoeDetails, cb);
  };

  handleData = () => {
    let convertedData = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    let imageUrl = this.state.image;

    //Setting the intial property state to the present state.
    const shoe = {
      name: this.state.name,
      price: this.state.price,
      description: convertedData,
      image: imageUrl
    };
    return shoe;
  };

  handleSave = async () => {
    // Assigning the data saved to the database to payload object.
    const shoe = this.handleData();

    try {
      const cb = () => this.props.history.push(`/`);
      const payload = await this.props.onPostShoes(shoe, cb);
      return payload;
    } catch (err) {
      console.log({ err });
    }
  };

  //submit event method  for passing the data to the database.
  handleSubmit = async e => {
    e.preventDefault();
    this.handleSave();
    await this.handleRefresh;
  };

  handleRefresh = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
      name: "",
      price: " "
    });
  };
  //Save and publish event method
  handleSaveAndPublish = async e => {
    e.preventDefault(e);
    const {
      payload: {
        data: { _id }
      }
    } = await this.handleSave();

    this.props.history.push(`/products/${_id}`);
  };

  //Method for getting the values of the event.
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
        image: ""
      });
    }
    return (reader.onloadend = () => {
      this.setState({
        file: file,
        image: reader.result
      });
    });
  }

  render() {
    //Assigning the details object to props.
    let { details } = this.props;
    let { name, price, editorState, image } = this.state;
    let imagePreview = null;
    if (image) {
      imagePreview = (
        <img src={image} className="upload-size" alt="img preview" />
      );
    }
    if (details) {
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
                  value={name}
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
                    value={price}
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
                    wrapperClassName="demo-wrapper"
                    editorClassName="editer-content"
                    toolbarClassName="toolbar-class"
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
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
}
const actioncreators = {
  onPostShoes,
  onGetShoe,
  onUpdateShoe
};

const mapStateToProps = state => {
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
