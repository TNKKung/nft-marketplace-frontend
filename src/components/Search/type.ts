export interface INFTValue {
  category: any;
  collectionId: string;
  createdCollaborator: string[];
  createdOwner: string;
  description: string;
  nameNFT: string;
  ownerAddress: string;
  statusSale: boolean;
  tokenId: number;
  transactionHash: string[];
}

export interface ICollectionValue {
  collectionId: string;
  collectionName: string;
  description: string;
  owner: string;
}

export interface IUserValue {
  address: string;
  backgroundImage: string;
  bio: string;
  contact: string;
  favoriteNFT: any;
  friendList: string[];
  instagram: string;
  messageToSign: string;
  name: string;
  profileImage: string;
  twitter: string;
}
