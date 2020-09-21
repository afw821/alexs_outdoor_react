import React from "react";
import SearchBox from "./../Shared/SearchBox";
import ListItem from "./../Shared/ListItem";

const ProductFilterCol = ({
  searchQuery,
  handleSearch,
  categories,
  selectedTab,
  handleTabChange,
}) => {
  return (
    <div className="col-2">
      <div className="row">
        <div className="col">
          <SearchBox value={searchQuery} onChange={handleSearch} />
        </div>
      </div>

      <div className="row">
        <div className="col d-flex justify-content-center">
          <p style={{ fontWeight: "bolder" }}>
            <strong>Filter By Category</strong>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ListItem
            items={categories}
            selectedTab={selectedTab}
            handleChange={handleTabChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterCol;
