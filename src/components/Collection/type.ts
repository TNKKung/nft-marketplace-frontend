export interface EditCollectionProps {
  collectionId?: string;
  setPopup: Function;
  popupState: any;
  setCollection: Function;
}

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
