import React, { Component } from "react";

class Home extends Component {
  state = {
    imageSrc: "",
  };
  handleSubmit() {
    console.log("submitted");
  }

  handleChange = (event) =>{
    const files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function(e){
        this.setState({
            imageSrc: e.target.result
        });
    }.bind(this);

  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-sm-8 mt-3">
            <h4>Upload Image</h4>

            <form
              className="mt-4"
              onSubmit={this.handleSubmit}
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="preview-images">
                <img style={{ maxHeight: "200px", maxWidth: "200px" }} src={this.state.imageSrc}></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
