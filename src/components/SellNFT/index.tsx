import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useContracts from "../../hook/useContracts";
import useBackend from "../../hook/useBackend";
import { blockchainName } from "../../config";
import "./sellNFT.css";

import { useUserAccount } from "../../store/UserAction/hook";

const SellNFT: React.FC = () => {
  const params = useParams();
  const { address } = useUserAccount();
  let navigate = useNavigate();

  const [URLImage, setURLImage] = useState();
  const [nftName, setNFTName] = useState<string>("");
  const { readTokenURI, readOwnerTokenID } = useContracts();
  const { readTokenIdData } = useBackend();

  const [amountInput, setAmountInput] = useState(1);

  const [loadingClass, setLoadingClass] = useState("");
  const [textPlaceholder, setTextPlaceholder] = useState("placeholder-glow");
  const [mainClass1, setMainClass1] = useState("d-none");

  const handleAmountInput = useCallback((e: any) => {
    setAmountInput(e.target.value);
  }, []);

  const fetchData = useCallback(async () => {
    const TokenURI = await readTokenURI(params.tokenID);
    setURLImage(TokenURI);
    const ownerAddress = await readOwnerTokenID(params.tokenID);
    if (ownerAddress !== address) {
      navigate("/viewNFT/" + params.tokenID);
    }
    const DataDetail = await readTokenIdData(params.tokenID);

    try {
      setNFTName(DataDetail.nameNFT);
    } catch (error) {
      setNFTName("Name NFT");
    }
    setLoadingClass("d-none");
    setMainClass1("");
    setTextPlaceholder("");
  }, [
    params.tokenID,
    readTokenURI,
    readOwnerTokenID,
    readTokenIdData,
    navigate,
    address,
  ]);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 990) {
    } else {
    }
  }, []);

  useEffect(() => {
    handleResize();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div>
      <div
        className={
          "container-fluid mt-5 d-flex justify-content-center " + loadingClass
        }
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className={mainClass1}>
        <div className="container-fluid bg-light py-3 shadow-sm">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <Link to={"/viewNFT/" + params.tokenID}>
                  <i className="bi bi-chevron-left sellNFT_BackButton"></i>
                </Link>
              </div>
              <div className="col-auto">
                <img
                  className="sellNFT_previewImg"
                  src={URLImage}
                  alt="img"
                ></img>
              </div>
              <div className={"col-auto h4" + textPlaceholder}>{nftName}</div>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-auto h5">
              <i className="bi bi-graph-up"></i> Set price
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-auto h6">Price</div>
          </div>
          <div className="row">
            <div className="col-auto input-group">
              <span className="input-group-text">{blockchainName}</span>
              <input
                className="form-control"
                type="number"
                step="0.1"
                placeholder="Amount"
                value={amountInput}
                onChange={handleAmountInput}
              ></input>
              {/* <span className="input-group-text">$ 0.00</span> */}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-auto h6">Fee</div>
          </div>
          <div className="container-fluid border rounded p-2">
            <div className="row justify-content-between">
              <div className="col-auto text-muted">NFT Marketplace Fee</div>
              <div className="col-auto text-muted">2.5%</div>
            </div>
            <div className="row justify-content-between">
              <div className="col-auto text-muted">Creator Earn</div>
              <div className="col-auto text-muted">2.5%</div>
            </div>
            <div className="row mt-3 justify-content-between">
              <div className="col-auto h6">Total Earning (GoerliETH)</div>
              <div className="col-auto h6">
                {amountInput * ((100 - 2.5 - 2.5) / 100)}
              </div>
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-auto">
              <button className="btn btn-secondary">Sell your NFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellNFT;
