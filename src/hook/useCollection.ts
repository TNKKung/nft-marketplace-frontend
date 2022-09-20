import axios from "axios";

import { baseUrl } from "../config";
const useCollection = () => {
    const createCollection = async (ownerAddress: string, collectionNameInp: string, descriptionInp: string) => {
        try {
            await axios.post(
                `${baseUrl}/collection/`,
                {
                    owner: ownerAddress,
                    collectionName: collectionNameInp,
                    description: descriptionInp
                }
            );
            return "Success";
        } catch (error) {
            return "Error";
        }
    }
    return {
        createCollection
    };
}
export default useCollection;