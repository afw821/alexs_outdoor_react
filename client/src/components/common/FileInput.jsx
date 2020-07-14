import React from "react";

const FileInput = ({
  name,
  label,
  type = "file",
  handleFileUpload,
  imageSrc,
  alt,
  error,
}) => {
  return (
    <>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Upload</span>
        </div>
        <div className="custom-file">
          <input
            type={type}
            className="custom-file-input"
            id={name}
            onChange={handleFileUpload}
            aria-describedby="inputGroupFileAddon01"
          />
          <label className="custom-file-label" htmlFor={name}>
            Choose file
          </label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="preview-images">
            <img
              style={{ maxHeight: "200px", maxWidth: "200px" }}
              src={imageSrc}
              alt={alt}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInput;
