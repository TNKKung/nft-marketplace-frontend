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

    const deleteCollection = async (collectionId: string) => {
        try{
            await axios.delete(`${baseUrl}/collection/?id=${collectionId}`);
            return "Success";
        } catch (error){
            return "Error";
        }
    }

    const getCollectionbyAddress = async (address: string) => {
        const BackEndResponse = await axios.get(
            `${baseUrl}/collection/getCollectionByOwner?owner=${address}`
        );
        return BackEndResponse?.data;
    }

    const getCollectionbyId = async (collectionId: string) => {
        const BackEndResponse = await axios.get(
            `${baseUrl}/collection/getCollectionById?id=${collectionId}`
        );
        return BackEndResponse?.data;
    }

    return {
        createCollection,
        deleteCollection,
        getCollectionbyAddress,
        getCollectionbyId
    };
}
export default useCollection;