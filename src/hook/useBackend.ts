import axios from "axios";

import { baseUrl } from "../config";
const useBackend = () => {
    const readTokenIdData = async (tokenId: string | undefined) => {
        const BackEndResponse = await axios.get(
            `${baseUrl}/nft/getNFTByTokenId?tokenId=${tokenId}`
        );
        return BackEndResponse.data.response[0];
    }
    return{
        readTokenIdData
    };
}
export default useBackend;