export interface NFTObject {
  tokenId: number;
  nameNFT: string;
  tokenURI: string;
  price: string;
}
export interface CollectionDataObject {
  collectionName: string;
  description: string;
  listNFT: NFTObject[];
  collectionId: string;
  owner: string;
}

export interface AddCollectionProps {
  setPopup: () => void;
  popupState: boolean;
  setCollectionList: () => void;
}

export interface DeleteCollectionProps {
  setPopup: () => void;
  popupState: boolean;
  setCollectionList: () => void;
  collectionObject: any;
}
