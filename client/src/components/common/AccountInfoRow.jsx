import React from "react";

const AccountInfoRow = (props) => {
  const label = props.label;
  const user = props.user;
  return (
    <div className="row h30">
      <div className="col-4">
        <span className="label">{label}</span>
      </div>
      <div className="col-8">
        <span className="data-label wrap-label">{user}</span>
      </div>
    </div>
  );
};

export default AccountInfoRow;
