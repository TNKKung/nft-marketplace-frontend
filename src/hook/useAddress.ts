import Web3 from "web3";
const useAddress = () =>{

    const checkWalletAddress = (WalletAddress:string)=>{
        const address = WalletAddress
        const checkResult = Web3.utils.isAddress(address);
        return checkResult;
    }
    return{
        checkWalletAddress
    };
}
export default useAddress