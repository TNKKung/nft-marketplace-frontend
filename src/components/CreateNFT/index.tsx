import React, { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { create } from 'ipfs-http-client'
import { useUserAccount } from '../../store/UserAction/hook';
import CreatorRoyaltyFee from './CreatorRoyaltyFee';

const CreateNFT: React.FC = () => {
  const { address } = useUserAccount();

  const [imageNFT, setImageNFT] = useState([]);
  const [previewimageNFT, setPreviewImageNFT] = useState("");
  const [previewDisplay, setPreviewDisplay] = useState("d-none");
  const [inputFileClass, setInputFileClass] = useState("");

  const [nftName, setNftName] = useState("");
  const [pictureNameInputClass, setPictureNameInputClass] = useState("");
  const [pictureNameInvalidText, setPictureNameInvalidText] = useState("");

  const [nftDescription, setNftDescription] = useState("");
  const [descriptionInputClass, setDescriptionInputClass] = useState("");
  const [descriptionInvalidText, setDescriptionInvalidText] = useState("");

  const [selectedCategory, setselectedCategory] = useState<MultiValue<{ value: string; label: string; }>>([]);
  const categoryOptions = [
    { value: 'artwork', label: 'Artwork' },
    { value: 'memes', label: 'Memes' },
    { value: 'photography', label: 'Photography' },
    { value: 'collections', label: 'Collections' },
  ];

  const onSelectFile = (e: any) => {
    const selectedFiles = e.target.files[0];
    setImageNFT(selectedFiles);
    setInputFileClass("");
    try {
      setPreviewImageNFT(URL.createObjectURL(selectedFiles));
      setPreviewDisplay("");
    } catch {
      setPreviewDisplay("d-none");
    }
  }

  const [creatorAddressList, setCreatorAddressList] = useState([]);

  const [creatorAddressInput, setCreatorAddressInput] = useState(address);
  const [creatorAddressClass, setCreatorAddressClass] = useState('');
  const [creatorEarnInput, setCreatorEarnInput] = useState<number>(0);

  const addCreator = () => {
    if (creatorAddressInput !== "") {
      var creatorData = {
        creatorAddress: creatorAddressInput,
        creatorEarn: creatorEarnInput
      };
      var dummyCreatorAddressList: any = [...creatorAddressList];
      console.log(dummyCreatorAddressList);
      const checkEqual = dummyCreatorAddressList.some((element: any) =>
        element.creatorAddress == creatorData.creatorAddress)

      if (checkEqual == false) {
        dummyCreatorAddressList.push(creatorData);
        setCreatorAddressList(dummyCreatorAddressList);
        setCreatorAddressInput("");
        setCreatorEarnInput(0);
      }
    } else {
      setCreatorAddressClass('is-invalid');
    }
  }


  function createNFT() {
    //Picture Name
    var nftNameApprove = true;
    if (nftName.length <= 0) {
      nftNameApprove = false;
      setPictureNameInputClass("is-invalid");
      setPictureNameInvalidText("Please provide picture name.");
    } else {
      if (nftName.length > 30) {
        nftNameApprove = false;
        setPictureNameInputClass("is-invalid");
        setPictureNameInvalidText("Invalid input. Please enter name between 1-30");
      }
    }

    //Description
    var nftDescriptionApprove = true;
    if (nftDescription.length > 100) {
      nftDescriptionApprove = false;
      setDescriptionInputClass("is-invalid");
      setDescriptionInvalidText("Invalid input. Please enter name between 1-30");
    }

    //Image
    var nftImageApprove = true;
    try {
      if (imageNFT.length == 0) {
        nftImageApprove = false;
        setInputFileClass("is-invalid");
      }
    } catch {
      nftImageApprove = false;
      setInputFileClass("is-invalid");
    }

    if (nftNameApprove == true && nftDescriptionApprove == true && nftImageApprove == true) {
      console.log('Success');
      console.log(imageNFT);
      console.log(nftName);
      console.log(nftDescription);
      console.log(selectedCategory);
      //infura IPFS
      // const projectId = '';
      // const projectSecret = '';
      // const auth =
      //   'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
      // const client = create({
      //   host: 'ipfs.infura.io',
      //   port: 5001,
      //   protocol: 'https',
      //   headers: {
      //     authorization: auth,
      //   },
      // });
      // client.add('Hello World').then((res: any) => {
      //   console.log(res);
      // });

      //Local IPFS
      // const client = create({ host: 'localhost', port: 5001, protocol: 'http' });
      // client.add(imageNFT).then((pathCID: any) => {
      //   console.log('http://localhost:8080/ipfs/' + pathCID.path);
      // });
      /////////get file http://localhost:8080/ipfs/QJumQEtSZbjc54r2gFprPioF4F9p1E2ekp4cxX9KYL1aNv **Note QJumQEt.. is CID
    }
  }
  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-auto"><h4>Create NFT</h4></div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-6">
            <div className='container-fluid'>
              <div className='row justify-content-end'>
                <div className='col-6'>
                  <div className='container-fluid'>
                    <div className='row justify-content-center'><div className='col-auto'><h5>Upload Image<span className="text-danger">*</span></h5></div></div>
                    <div className='row justify-content-center'>
                      <div className='col-12'>
                        <div className="form-text">Types supported: JPG, PNG</div>
                        <input type="file" accept='image/png, image/jpeg' className={"form-control " + inputFileClass}
                          onChange={onSelectFile}></input>
                        <div id="validationPictureNameFeedback" className="invalid-feedback">
                          Please upload image.
                        </div>
                      </div>
                    </div>
                    <div className='row mt-2 justify-content-center'>
                      <div className='col-12'>
                        <img src={previewimageNFT} className={"img-thumbnail " + previewDisplay} alt="Image"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="container-fluid">
              <div className='row'>
                <div className="col-6 mb-3">
                  <label htmlFor="pictureNameInput" className="form-label">Name<span className="text-danger">*</span></label>
                  <input className={"form-control " + pictureNameInputClass} id="pictureNameInput" placeholder="Name" type="text"
                    onChange={e => {
                      setNftName(e.target.value);
                      setPictureNameInputClass("");
                    }} />
                  <div id="validationPictureNameFeedback" className="invalid-feedback">
                    {pictureNameInvalidText}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col-6 mb-3">
                  <label htmlFor="descriptionInput" className={"form-label " + descriptionInputClass}>Description (optional)</label>
                  <textarea className="form-control" id="descriptionInput"
                    onChange={e => {
                      setNftDescription(e.target.value);
                      setDescriptionInputClass("");
                    }}></textarea>
                  <div id="validationDescriptionFeedback" className="invalid-feedback">
                    {descriptionInvalidText}
                  </div>
                </div>
              </div>
              <div className='row mb-3'>
                <div className="col-6">
                  <label htmlFor="royaltyInput" className="form-label">Category</label>
                  <Select onChange={setselectedCategory} options={categoryOptions} isMulti={true} />
                </div>
              </div>
              <div className='row'>
                <div className="col-8 py-2 border rounded">
                  <div className='container-fluid'>
                    <div className='row h5'>Creator royalty fee (%)</div>
                    <CreatorRoyaltyFee creatorList={creatorAddressList} setCreatorList={setCreatorAddressList}/>
                    <div className='row mt-2 align-items-center'>
                      <div className='col-9 text-end fw-bold'>Total</div>
                      <div className='col-2 text-center fw-bold'>0</div>
                      <div className='col-1 fw-bold'>%</div>
                    </div>
                    <div className='row h6 mt-2'>Add creator</div>
                    <div className='row'>
                      <div className='col-9'>
                        <input className={'form-control ' + creatorAddressClass} type='text'
                          placeholder='Creator wallet address' value={creatorAddressInput}
                          onChange={e => {
                            setCreatorAddressInput(e.target.value);
                            setCreatorAddressClass('');
                          }}></input>
                        <div id="validationWalletAddress" className="invalid-feedback">
                          Please provide wallet address.
                        </div>
                      </div>
                      <div className='col-2'>
                        <input className='form-control text-end' type='number' min="0" max="10" value={creatorEarnInput}
                          onChange={e => {
                            setCreatorEarnInput(e.target.valueAsNumber);
                          }}></input>
                      </div>
                      <div className='col-1'>%</div>
                    </div>
                    <div className='row h6 mt-3'><button className="btn btn-secondary" onClick={addCreator}>Add Creator</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-auto">
          <button
            className="btn btn-secondary text-white"
            onClick={() => {
              createNFT();
            }}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateNFT;