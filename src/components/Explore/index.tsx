import React, { useEffect, useState } from "react";

interface Exploreprops {
  name: string;
  dropdown: boolean;
  setFilter?: any;
  children?: React.ReactNode;
}

const Explore: React.FC<Exploreprops> = ({
  dropdown,
  name,
  setFilter,
  children,
}) => {
  //state
  const [dropdownSelect, setDropdownSelect] = useState("All");

  useEffect(() => {
    if (setFilter) {
      if (dropdownSelect === "All") {
        setFilter("");
      } else {
        setFilter(dropdownSelect);
      }
    }
  }, [dropdownSelect, setFilter]);

  return (
    <>
      {setFilter === undefined ? (
        <div className="container">
          <div className="mt-5 row justify-content-between align-items-center">
            <h5 className="col-auto mb-0">Explore {name}</h5>
          </div>
          {children}
        </div>
      ) : (
        <div className="container">
          <div className="mt-5 row justify-content-between align-items-center">
            <h5 className="col-auto mb-0">Explore {name}</h5>
            {dropdown === true ? (
              <div className="col-auto">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {dropdownSelect}
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <button
                      className="dropdown-item text-end"
                      onClick={() => {
                        setDropdownSelect("All");
                      }}
                    >
                      All
                    </button>
                    <button
                      className="dropdown-item text-end"
                      onClick={() => {
                        setDropdownSelect("Artwork");
                      }}
                    >
                      Artwork
                    </button>
                    <button
                      className="dropdown-item text-end"
                      onClick={() => {
                        setDropdownSelect("Memes");
                      }}
                    >
                      Memes
                    </button>
                    <button
                      className="dropdown-item text-end"
                      onClick={() => {
                        setDropdownSelect("Photography");
                      }}
                    >
                      Photography
                    </button>
                    <button
                      className="dropdown-item text-end"
                      onClick={() => {
                        setDropdownSelect("Collections");
                      }}
                    >
                      Collections
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {children}
        </div>
      )}
    </>
  );
};
export default Explore;
