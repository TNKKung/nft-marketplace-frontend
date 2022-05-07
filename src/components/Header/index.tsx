import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 text-gray-600 bg-gray-100 border-b-2 h-14">
      <div className="flex flex-row items-center w-full space-x-4">
        <div className="flex flex-col items-center justify-center text-xs font-bold">
          <p>NFT</p>
          <p>Marketplace</p>
        </div>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-5 h-5 mt-2 ml-2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="py-1 pl-8 border-2 rounded-md w-96"
            placeholder="Search by Collection / User / Address"
          />
        </div>
        <button className="flex flex-row items-center justify-between w-20 px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 hover:text-gray-700">
          Filter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <button className="flex items-center px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded-2xl">
        Connect
      </button>
    </div>
  );
};

export default Header;
