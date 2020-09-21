import React from "react";
import SearchBox from "./../Shared/SearchBox";
import DropDownBtn from "./../Shared/DropDownBtn";

const ProductFilterMobile = ({
  searchQuery,
  handleSearch,
  categories,
  selectedTab,
  handleTabChange,
}) => {
  return (
    <>
      {" "}
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <SearchBox value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <DropDownBtn
            title={"Filter by Category"}
            items={categories}
            selectedTab={selectedTab}
            handleChange={handleTabChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductFilterMobile;
