import React from "react";
import imageUpload from "../images/arrow-up (1).svg";

const ImageUpload = ({ handleImageChange, imagePreview }) => {
  // console.log(props);
  return (
    <div className="input-group mb-3">
      <div className="custom-file file-upload">
        <input
          onChange={handleImageChange}
          type="file"
          className="input-upload custom-file-input "
          id="inputGroupFile02"
        />
        {imagePreview}
        <img src={imageUpload} alt="file upload" className="img-upload" />
      </div>
    </div>
  );
};

export default ImageUpload;
