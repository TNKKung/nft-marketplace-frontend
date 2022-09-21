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

    const getCollectionbyAddress = async (address: string) => {
        const BackEndResponse = await axios.get(
            `${baseUrl}/collection/getCollectionByOwner?owner=${address}`
        );
        return BackEndResponse?.data;
    }

    return {
        createCollection,
        getCollectionbyAddress
    };
}
export default useCollection;