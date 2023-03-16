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

export interface CategoryObject {
  label: string;
  value: string;
}

export interface NFTObject {
  category: CategoryObject[];
  collectionId: string;
  createdCollaborator: string[];
  createdOwner: string;
  description: string;
  nameNFT: string;
  ownerAddress: string;
  statusSale: boolean;
  tokenId: number;
  transactionHash: string;
}
