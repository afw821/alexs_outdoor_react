import React from "react";

const HomeItem = ({ header, paragraph }) => {
  return (
    <div className="item">
      <h5>
        <strong>{header}</strong>
      </h5>
      <p>{paragraph}</p>
    </div>
  );
};

export default HomeItem;
