import axios from "axios";

import { baseUrl } from "../config";
const useBackend = () => {
    const readTokenIdData = async (tokenId: string | undefined) => {
        const BackEndResponse = await axios.get(
            `${baseUrl}/nft/getNFTByTokenId?tokenId=${tokenId}`
        );
        return BackEndResponse.data.response[0];
    }

    const readTokenIdFromAddress = async (address: string | undefined) => {
        const BackEndResponse = await axios.get(
            `${baseUrl}/nft/getNFTByOwner?address=${address}`
        );
        return BackEndResponse.data.response;
    }
    return{
        readTokenIdData,
        readTokenIdFromAddress
    };
}
export default useBackend;