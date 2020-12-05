import React from "react";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdbreact";
import AccountInfoRow from "./../Account/AccountInfoRow";
import StripeContainer from "../Stripe/StripeContainer";
import CCIcons from "./../Shared/CCIcons";
import StripePic from "../../assets/stripe_test.PNG";

const StripePaymentWrapper = ({
  user,
  setActiveTab,
  activeTab,
  clientWidth,
  error,
  handleResetError,
}) => {
  return (
    <>
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeTab === "1"}
            onClick={() => setActiveTab("1")}
            role="tab"
          >
            Billing
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeTab === "2"}
            onClick={() => setActiveTab("2")}
            role="tab"
          >
            Payment
          </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={activeTab}>
        <MDBTabPane tabId="1" role="tabpanel">
          <p className="mt-2 ml-3">
            <AccountInfoRow label="Email" user={user.email} />
          </p>
          <p className="mt-2 ml-3">
            <AccountInfoRow label="Country" user="United States" />
          </p>
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel">
          <p className="mt-2">
            ***NOTE*** Stripe payments is currently in test mode. Do not enter
            real CC info. It wll not work! Please enter as displayed below!
            <img style={{ width: "75%", height: "75%" }} src={StripePic} />
          </p>
          <p className="mt-2">
            Payments are processed with{" "}
            <MDBIcon fab icon="cc-stripe mt-4" style={{ fontSize: "30px" }} />,
            a third party payment processing server
          </p>
          <p className="mt-2">
            <CCIcons clientWidth={clientWidth} />
          </p>
          <p className="mt-2">
            <MDBCard style={{ backgroundColor: "lightgray" }}>
              <MDBCardBody
                style={error.displayMessage ? { border: "1px solid red" } : {}}
              >
                <StripeContainer />
              </MDBCardBody>
            </MDBCard>
            {error.displayMessage ? (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {error.message}
                <button
                  onClick={(e) => handleResetError({})}
                  type="button"
                  className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : (
              ""
            )}
          </p>
        </MDBTabPane>
      </MDBTabContent>
    </>
  );
};

export default StripePaymentWrapper;
