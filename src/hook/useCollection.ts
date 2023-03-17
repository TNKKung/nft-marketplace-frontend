import axios from "axios";

import { baseUrl } from "../config";
import useAuth from "./useAuth";

const useCollection = () => {
  const { getConfig } = useAuth();
  const createCollection = async (
    ownerAddress: string,
    collectionNameInp: string,
    descriptionInp: string
  ) => {
    try {
      const config = await getConfig();
      await axios.post(
        `${baseUrl}/collection/`,
        {
          owner: ownerAddress,
          collectionName: collectionNameInp,
          description: descriptionInp,
        },
        config
      );
      return "Success";
    } catch (error) {
      return "Error";
    }
  };

  const editCollection = async (
    collectionId: string | undefined,
    collectionNameInp: string,
    descriptionInp: string
  ) => {
    try {
      const config = await getConfig();
      await axios.patch(
        `${baseUrl}/collection/`,
        {
          id: collectionId,
          collectionName: collectionNameInp,
          description: descriptionInp,
        },
        config
      );
      return "Success";
    } catch (error) {
      return "Error";
    }
  };

  const deleteCollection = async (collectionId: string) => {
    try {
      const config = await getConfig();
      await axios.delete(`${baseUrl}/collection/?id=${collectionId}`, config);

      return "Success";
    } catch (error) {
      return "Error";
    }
  };

  const getCollectionbyAddress = async (address: string) => {
    const config = await getConfig();
    const BackEndResponse = await axios.get(
      `${baseUrl}/collection/getCollectionByOwner?owner=${address}`,
      config
    );
    return BackEndResponse?.data.response;
  };

  const getCollectionbyId = async (collectionId: string | undefined) => {
    const config = await getConfig();
    try {
      const BackEndResponse = await axios.get(
        `${baseUrl}/collection/getCollectionById?id=${collectionId}`,
        config
      );
      return BackEndResponse?.data.response;
    } catch (error) {
      return undefined;
    }
  };

  const getAllCollection = async () => {
    const config = await getConfig();
    const BackEndResponse = await axios.get(`${baseUrl}/collection/`, config);
    return BackEndResponse?.data.response;
  };

  const getLengthCollection = async () => {
    const config = await getConfig();
    const BackEndResponse = await axios.get(
      `${baseUrl}/collection/length`,
      config
    );
    return BackEndResponse?.data.response;
  };

  const getRandomCollection = async () => {
    const config = await getConfig();
    const BackEndResponse = await axios.get(
      `${baseUrl}/collection/random`,
      config
    );
    return BackEndResponse?.data.response;
  };

  return {
    createCollection,
    deleteCollection,
    getCollectionbyAddress,
    getCollectionbyId,
    getAllCollection,
    editCollection,
    getRandomCollection,
    getLengthCollection,
  };
};
export default useCollection;
