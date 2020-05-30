import React from "react";

const OrderInfo = ({ user }) => {
  const { Purchases, firstName } = user;

  if (!Purchases) {
    console.log("made it here");
    return <div>{`You have no purchases ${firstName}`}</div>;
  }

  return <div>You have Purchases</div>;
};

export default OrderInfo;
