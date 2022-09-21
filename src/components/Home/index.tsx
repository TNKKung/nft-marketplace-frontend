import React from 'react'
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <div className={"container-fluid mt-5 d-flex justify-content-center "}>
      <div className="d-flex">
        <div className="h4">NFT marketplace Home page (testing path)</div>
        <Link to="/viewNFT/25"><button className="btn btn-secondary mx-2">TokenID25</button></Link>
        <Link to="/viewNFT/26"><button className="btn btn-secondary mx-2">TokenID26</button></Link>
        <Link to="/viewNFT/31"><button className="btn btn-secondary">TokenID31</button></Link>
      </div>
    </div>
  )
}
export default Home;