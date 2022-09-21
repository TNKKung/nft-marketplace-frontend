import { useParams } from "react-router-dom";
import NFTBox from "../boxComponent/NFTBox/NFTBox";

const Collection: React.FC = () => {
    // const params = useParams();
    return (
        <div className="container-fluid">
            <div className="row bg-gray-50 py-5">
                <div className="col">
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-auto"><h4 className="m-0">{"Collection Name"}</h4></div>
                            <div className="col-auto">
                                <div className="d-flex flex-row">
                                    <button className="btn btn-secondary mx-1"><i className="bi bi-share-fill"></i> Copy link</button>
                                    <button className="btn btn-secondary mx-1" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button className="dropdown-item text-end">
                                                Add created NFT
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-end">
                                                Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-end">
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row"><div className="col-auto">Owned by <span>{"xxxx"}</span></div></div>
                        <div className="row mt-2 ps-2"><div className="col-auto text-muted">{"Description..."}</div></div>
                    </div>
                </div>
            </div>
            <div className="row py-3">
                <div className="col">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                                    <input className="form-control" placeholder="Search"></input>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row mt-3 flex-wrap">
                            <NFTBox TokenID="26"></NFTBox>
                            <NFTBox TokenID="31"></NFTBox>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default Collection