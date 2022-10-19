import { create } from "ipfs-http-client";

const useIPFS = (): any => {

    //Infua ipfs
    const projectId = process.env.REACT_APP_IPFS_PROJECT_ID;
    const projectSecret = process.env.REACT_APP_IPFS_API_KEY;
    const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
    const client = create({
        host: "infura-ipfs.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });

    // //local ipfs
    // const client = create({ host: 'localhost', port: 5001, protocol: 'http' });

    const getIPFS = async (imageNFT: any) => {
        try {
            const added = await client.add(imageNFT);
            const uri = 'https://ce29.infura-ipfs.io/ipfs/'+added.path;
            // const uri = 'http://localhost:8080/ipfs/' + added.path;
            return uri;
        } catch (error) {
            console.log('Error uploading file: ', error);
            return false;
        }
        /////get file https://ce29.infura-ipfs.io/ipfs/QmdifLLzwFvEqPaELq7C1emwgyExndN6K27avd3YTvTcdi
        /////get file http://localhost:8080/ipfs/QJumQEtSZbjc54r2gFprPioF4F9p1E2ekp4cxX9KYL1aNv **Note QJumQEt.. is CID
    }

    return {
        getIPFS,
    };
};

export default useIPFS;
