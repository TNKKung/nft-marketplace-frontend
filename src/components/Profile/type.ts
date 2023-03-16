export interface FriendListImportModalProps {
  isOpen: boolean;
  handleClose: () => void;
  friendList: any;
}

export interface NFTObject {
  nameNFT: string;
  price: string;
  tokenId: number;
  tokenURI: string;
  statusSale: boolean;
}

export interface FavoriteNFTObject {
  category: { label: string; value: string }[];
  nameNFT: string;
  tokenId: number;
}
