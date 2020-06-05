import React, { Component } from "react";
import { getProducts } from "./../services/productService";
import baseBallGlove from "../assets/51JHaDsMjYL.jpg";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
} from "mdbreact";
class Products extends Component {
  state = {
    products: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  render() {
    return (
      <div className="row" style={{ marginTop: "65px" }}>
        <div className="col">
          <MDBCard style={{ width: "300px", height: "400px;" }}>
            <MDBCardImage
              hover
              overlay="white-light"
              className="card-img-top"
              src={baseBallGlove}
              alt="man"
            />

            <MDBCardBody cascade className="text-center">
              <MDBCardTitle className="card-title">
                <strong>Billy Coleman</strong>
              </MDBCardTitle>

              <p className="font-weight-bold blue-text">Wev developer</p>

              <MDBCardText>
                Sed ut perspiciatis unde omnis iste natus sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.{" "}
              </MDBCardText>

              <MDBCol md="12" className="d-flex justify-content-center">
                <MDBBtn rounded floating color="fb">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                </MDBBtn>

                <MDBBtn rounded floating color="tw">
                  <MDBIcon size="lg" fab icon="twitter"></MDBIcon>
                </MDBBtn>

                <MDBBtn rounded floating color="dribbble">
                  <MDBIcon size="lg" fab icon="dribbble"></MDBIcon>
                </MDBBtn>
              </MDBCol>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    );
  }
}

export default Products;
