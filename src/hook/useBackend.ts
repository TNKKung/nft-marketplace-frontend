import axios from "axios";

import { baseUrl } from "../config";
import useAuth from "./useAuth";
const useBackend = () => {
    const { getConfig } = useAuth();

    const readTokenIdData = async (tokenId: string | undefined) => {
        const config = await getConfig();
        const BackEndResponse = await axios.get(
            `${baseUrl}/nft/getNFTByTokenId?tokenId=${Number(tokenId)}`,
            config
        );
        return BackEndResponse.data.response[0];
    }

    const readTokenIdFromAddress = async (address: string | undefined) => {
        const config = await getConfig();
        const BackEndResponse = await axios.get(
            `${baseUrl}/nft/getNFTByOwner?address=${address}`,
            config
        );
        return BackEndResponse.data.response;
    }

    const readProfileAddress = async (address: string | undefined) => {
        const config = await getConfig();
        const BackEndResponse = await axios.get(
            `${baseUrl}/user/getUserByAddress?address=${address}`,
            config
        );
        return BackEndResponse.data.response[0];
    }

    const checkLikeUser = async (profileAddress: string, address: string) => {
        const config = await getConfig();
        const BackEndResponse = await axios.get(
            `${baseUrl}/user/getUserByAddress?address=${address}`,
            config
        );
        try {
            const addressFriendList = BackEndResponse.data.response[0].friendList;
            if (addressFriendList.includes(profileAddress) === true) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const addLikeUser = async (profileAddress: string, address: string) => {
        try {
            const config = await getConfig();
            await axios.post(
                `${baseUrl}/user/addFriendList?address=${address}`,
                { friendAddress: profileAddress },
                config
            );
            return "Success"
        }
        catch (error) {
            return "Error"
        }
    }

    const removeLikeUser = async (profileAddress: string, address: string) => {
        try {
            const config = await getConfig();
            await axios.post(
                `${baseUrl}/user/unfriendList?address=${address}`,
                { friendAddress: profileAddress },
                config
            );
            return "Success"
        }
        catch (error) {
            return "Error"
        }
    }

    const editInfoProfile = async (name: string, bio: string, twitter: string, instagram: string, contact: string, address: string) => {
        try {
            const config = await getConfig();
            await axios.post(
                `${baseUrl}/user/editInfoUser?address=${address}`,
                {
                    name: name,
                    bio: bio,
                    twitter: twitter,
                    instagram: instagram,
                    contact: contact
                },
                config
            );
        } catch (error) {
            console.log(error);
        }
    }

    const editImageProfile = async (profileImage: string, address: string) => {
        try {
            const config = await getConfig();
            await axios.post(
                `${baseUrl}/user/editImageProfile?address=${address}`,
                {
                    profileImage: profileImage
                },
                config
            );
        } catch (error) {
            console.log(error);
        }
    }

    const editImageBackground = async (profileImage: string, address: string) => {
        const config = await getConfig();
        try {
            await axios.post(
                `${baseUrl}/user/editImageBackground?address=${address}`,
                {
                    backgroundImage: profileImage
                },
                config
            );
        } catch (error) {
            console.log(error);
        }
    }

    const checkLikeNFT = async (tokenId: string | undefined, address: string) => {
        const config = await getConfig();
        const BackEndResponse = await axios.get(
            `${baseUrl}/user/getUserByAddress?address=${address}`,
            config
        );
        try {
            const favoriteNFTList = BackEndResponse.data.response[0].favoriteNFT;
            const filterFavoriteNFT = favoriteNFTList.filter((Nftlist: any) => {
                return Nftlist.tokenId === Number(tokenId)
            })
            if (filterFavoriteNFT.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const addLikeNFT = async (tokenId: string | undefined, nameNFT: string, category: any[], address: string) => {
        try {
            const config = await getConfig();
            await axios.post(
                `${baseUrl}/user/addFavoriteNFT?address=${address}`,
                {
                    tokenId: Number(tokenId),
                },
                config
            );
            return "Success"
        }
        catch (error) {
            return "Error"
        }
    }

    const removeLikeNFT = async (tokenId: string | undefined, address: string) => {
        try {
            const config = await getConfig();
            await axios.post(
                `${baseUrl}/user/removeFavoriteNFT?address=${address}`,
                { tokenId: Number(tokenId) },
                config
            );
            return "Success"
        }
        catch (error) {
            return "Error"
        }
    }

    const getAllTransaction = async (idDocNFT: string) =>{
        try{
            const config = await getConfig();
            const transactionRes = await axios.get(
                `${baseUrl}/nft/getAllTransaction?id=${idDocNFT}`,
                config
            );
            return transactionRes.data.response
        }catch(error){
            return false
        }
    }

    const getSearchValue = async (searchValue: string|undefined) =>{
        try{
            const config = await getConfig();
            const searchRes = await axios.get(
                `${baseUrl}/search/?keyword=${searchValue}`,
                config
            );
            return searchRes.data.response
        }catch(error){
            return false
        }
    }

    return {
        readTokenIdData,
        readTokenIdFromAddress,
        readProfileAddress,
        checkLikeUser,
        addLikeUser,
        removeLikeUser,
        editInfoProfile,
        editImageProfile,
        editImageBackground,
        checkLikeNFT,
        addLikeNFT,
        removeLikeNFT,
        getAllTransaction,
        getSearchValue

    };
}
export default useBackend;