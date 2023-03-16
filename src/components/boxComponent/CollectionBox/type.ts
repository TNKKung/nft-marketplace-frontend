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
  owner: string;
  description: string;
  collectionId: string;
  collectionName: string;
  nftImage: string;
  ownerName: string;
  profileImage: string;
}
