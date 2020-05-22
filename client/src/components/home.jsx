import React, { Component } from "react";
import { addProduct } from "../services/productService";

class Home extends Component {

  state = {
    imageSrc: "",
    file: null
  };
  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { file } = this.state;

      console.log("submitted");
      const formData = new FormData();
      formData.append('file', file, file.name);
      const result = await addProduct(formData);
      console.log('handle submit result', result);
    } catch (ex) {
      console.log('----ex----', ex);
    }

  }

  handleChange = (event) => {
    const files = event.target.files;
    this.setState({
      file: event.target.files[0]
    });
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({
        imageSrc: e.target.result
      });
    };
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-sm-8 mt-3">
            <h4>Upload Image</h4>

            <form
              className="mt-4"
              onSubmit={this.handleSubmit}
              // action="http://localhost:3922/api/products"
              // method="POST"
              encType="multipart/form-data"
            >
              <div className="form-group">
                <input
                  type="file"
                  name="file"
                  id="input-files"
                  onChange={this.handleChange}
                  className="form-control-file border"
                />
              </div>
              <button className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="preview-images">
              <img
                style={{ maxHeight: "200px", maxWidth: "200px" }}
                src={this.state.imageSrc}
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
