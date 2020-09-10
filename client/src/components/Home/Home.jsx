import React, { Component } from "react";
import { MDBMask, MDBRow, MDBBtn, MDBView, MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import HomeItem from "./HomeItem";
import "../../Home.css";

class Home extends Component {
  componentDidMount() {
    console.log("cdm from home", this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("cdu from home prev props");
  }
  render() {
    const { handleSetActiveTab, clientWidth, activeTab } = this.props;

    return (
      <div id="contactformpage">
        <MDBView>
          <MDBMask />
          <MDBContainer
            style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
            className="d-flex justify-content-center align-items-center"
          >
            <MDBRow>
              <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                <h1 className="display-4 font-weight-bold">
                  Conquer the Outdoors{" "}
                </h1>
                <hr className="hr-light" />
                <h6 className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                  repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                  sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                  iste.
                </h6>
                <Link
                  to="/products"
                  onClick={() => handleSetActiveTab("Products")}
                >
                  <MDBBtn outline color="white">
                    Products
                  </MDBBtn>
                </Link>
                <Link
                  to="/contact"
                  onClick={() => handleSetActiveTab("Contact")}
                >
                  <MDBBtn outline color="white">
                    Contact
                  </MDBBtn>
                </Link>
              </div>
            </MDBRow>
          </MDBContainer>
        </MDBView>

        <MDBContainer>
          <div className="row" style={{ padding: "5%" }}>
            <div className="col">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <h1>This Site Is</h1>
                </div>
              </div>
              <div className="item-wrapper-container clearfix">
                <HomeItem
                  header="Built with React"
                  paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua."
                />
                <HomeItem
                  header="Built with Node.js"
                  paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua."
                />
                <HomeItem
                  header="Built with MySQL"
                  paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua."
                />
                <HomeItem
                  header="Built with Express"
                  paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua."
                />
              </div>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default Home;
