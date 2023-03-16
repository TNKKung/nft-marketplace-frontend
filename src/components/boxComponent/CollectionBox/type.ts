export interface nftObject {
  tokenId: number;
  nameNFT: string;
  tokenURI: string;
  price: string;
}
export interface collectionDataObject {
  collectionName: string;
  description: string;
  listNFT: nftObject[];
}
