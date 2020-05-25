import React from "react";

const FileInput = ({
  name,
  label,
  type = "file",
  handleFileUpload,
  imageSrc,
  alt,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={handleFileUpload}
        name={name}
        type={type}
        id={name}
        className="form-control mb-4"
      />
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
    </div>
  );
};

export default FileInput;
