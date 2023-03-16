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
}

export interface CollectionProps {
  CollectionId: string;
  CollectionName?: string;
  CollectionDescription?: string;
}
